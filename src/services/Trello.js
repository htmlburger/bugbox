import Tracker from 'services/Tracker';
import LocalStorage from 'services/LocalStorage';
import ExtensionStorage from 'services/ExtensionStorage';
import axios from 'axios';
import { popupWindow, dataURItoFile } from 'helpers/utils';

/**
 * Constants.
 */
const META_LIST_TITLE = 'Project Meta';
const META_URL_TITLE = 'Project Meta: URL';

export default class Trello extends Tracker {
	/**
	 * Create a Trello Tracker.
	 */
	constructor() {
		super();

		const key = process.env.TRELLO_API_KEY;
		const baseURL = process.env.TRELLO_API_URL;

		this.localAuthToken = new LocalStorage('TrelloToken');
		this.extensionAuthToken = new ExtensionStorage('TrelloToken');

		/**
		 * Initialize XHR client.
		 * @type {Object}
		 */
		this.getToken().then((token) => {
			this.client = axios.create({
				baseURL,
				params: {
					key,
					token
				}
			});
		});
	}

	/**
	 * Get trello token from local storage.
	 * @return {Promise}
	 */
	getToken() {
		this.extensionAuthToken.get().then(val => console.log(val))
		return this.localAuthToken.has()
			.then((hasLocalAuthToken) => {
				if (hasLocalAuthToken) {
					return this.localAuthToken.get();
				} else {
					return this.extensionAuthToken
						.get()
						.then(value => this.localAuthToken.set(value));
				}
			});

	}

	/**
	 * Set trello token in browser and local storage.
	 * @param {String} token
	 */
	setToken(token) {
		if (this.client && this.client.defaults && this.client.defaults.params) {
			this.client.defaults.params['token'] = token;
		}

		this.localAuthToken.set(token);
		this.extensionAuthToken.set(token)
	}

	/**
	 * Get session storage key for selected project id item.
	 * @return {String}
	 */
	getSessionStorageProjectKey() {
		return 'BugboxTrelloProject';
	}

	/**
	 * Get selected project id from session storage.
	 * @return {String}
	 */
	getSelectedProject() {
		return window.sessionStorage.getItem(this.getSessionStorageProjectKey());
	}

	/**
	 * Set trello project id in session storage.
	 * @param {String} id
	 */
	setSelectedProject(id) {
		if (id) {
			return window.sessionStorage.setItem(this.getSessionStorageProjectKey(), id);
		} else {
			return window.sessionStorage.removeItem(this.getSessionStorageProjectKey());
		}
	}

	/**
	 * Get local storage key for meta card cache id.
	 * @return {String}
	 */
	getLocalStorageMetaIdCache() {
		return 'BugboxTrelloMetaIdCache';
	}

	/**
	 * Get meta card cache id from local storage.
	 * @return {String}
	 */
	getMetaIdCache() {
		return window.localStorage.getItem(this.getLocalStorageMetaIdCache());
	}

	/**
	 * Set meta card cache id in local storage.
	 * @param {String} id
	 */
	setMetaIdCache(id) {
		if (id) {
			return window.localStorage.setItem(this.getLocalStorageMetaIdCache(), id);
		} else {
			return window.localStorage.removeItem(this.getLocalStorageMetaIdCache());
		}
	}

	/**
	 * Whether client is authorized.
	 * @return {Promise}
	 */
	isAuthorized() {
		return Promise.resolve(this.getToken()).then(token => !!token);
	}

	/**
	 * Trigger trello authorization popup.
	 * @return {void}
	 */
	authorizePopup() {
		const key = process.env.TRELLO_API_KEY;
		const authorizeURL = process.env.TRELLO_API_URL + 'authorize';

		const origin = window.location.origin;
		const name = 'Bugbox';

		const urlParams = {
			return_url: origin,
			callback_method: 'postMessage',
			expiration: 'never',
			scope: 'read,write,account',
			name: name,
			key: key,
		};
		const urlParamsString = Object.keys(urlParams)
			.map(key => `${key}=${urlParams[key]}`)
			.join('&');

		const url = `${authorizeURL}?${urlParamsString}`;

		return popupWindow(url, name, {
			width: 500,
			height: 600,
			top: (window.innerHeight - 600) / 2,
			left: (window.innerWidth - 500) / 2,
		});
	}

	/**
	 * Authorize in tracker.
	 * @return {Promise}
	 */
	authorize() {
		return new Promise((resolve, reject) => {
			const token = this.getToken().then(token => {
				if (token) {
					resolve(token);
				}

				let popup = this.authorizePopup();

				const receiveMessage = (event) => {
					if (event && event.origin === 'https://trello.com') {
						window.removeEventListener('message', receiveMessage);
						const token = event.data;

						/**
						 * Create new dummy window that can be closed
						 */
						popup = popupWindow('about:blank', 'Bugbox');
						popup.close();

						if (token) {
							this.setToken(token);
							resolve(token);
						}

					}
				};

				window.addEventListener('message', receiveMessage);
			})
		});
	}

	/**
	 * Destroy previous authorization in tracker.
	 * @return {Promise}
	 */
	unauthorize() {
		return Promise.resolve(this.setToken(null));
	}

	/**
	 * Get user object.
	 * @param  {String} id
	 * @return {Promise}
	 */
	getUser(id = 'me') {
		return new Promise((resolve, reject) => {
			const request = this.client.get(`/members/${id}`);

			return request
				.then(({ data }) => resolve(data))
				.catch(error => reject(error));
		});
	}

	/**
	 * Find a project matching query criteria.
	 * @param  {String} project
	 * @return {Promise}
	 */
	findProject(project) {
		const query = `"${META_URL_TITLE}" ${project}`;

		const request = this.client.get('/search', {
			params: {
				query,
				card_fields: 'name,desc',
				card_board: true,
				card_list: true,
				partial: false,
			}
		});

		return request
			.then(({ data }) => {
				const cards = data.cards && data.cards.filter(card => {
					return card.name === META_URL_TITLE;
				});

				if (cards) {
					this.setMetaIdCache(null);
					return cards;
				}

				const metaIdCache = this.getMetaIdCache();

				if (metaIdCache) {
					const request = this.client.get(`/cards/${metaIdCache}`, {
						params: {
							fields: 'name,desc',
							board: true,
							list: true
						}
					});

					return request
						.then(({ data }) => [data])
						.catch((err) => null);
				}
			})
			.then((cards) => {
				if (!cards || !cards.length) {
					return [];
				}

				const location = window.location.href;
				const selectedProjectIndex = cards.findIndex(card => card.board.id === this.getSelectedProject());
				const hasSelectedProject = selectedProjectIndex >= 0;

				const result = {
					matches: [],
					selected: null
				};

				result['matches'] = cards
					.filter(card => location.indexOf(card.desc) >= 0)
					.map(card => card.board);

				if (hasSelectedProject) {
					result['selected'] = cards
						.filter(card => card.board.id === this.getSelectedProject())
						.map(card => card.board)[0];
				} else if (result['matches'].length === 1) {
					result['selected'] = result['matches'][0];
				}

				return result;
			});
	}

	/**
	 * Get a project.
	 * @param  {mixed} query
	 * @return {Promise}
	 */
	getProject(id) {
		const urls = [
			`/boards/${id}`,
			`/boards/${id}/lists`,
			`/boards/${id}/cards?attachments=true`,
			`/boards/${id}/members?fields=${encodeURIComponent('username,fullName,initials,avatarHash')}`
		];

		return new Promise((resolve, reject) => {
			const request = this.client.get('/batch', {
				params: {
					urls
				}
			});

			request
				.then(({ data }) => {
					const meta = data[0] && data[0]['200'];
					const groups = data[1] && data[1]['200'];
					const issues = ((data[2] && data[2]['200']) || []).map(this.mapCardsMeta);
					const members = data[3] && data[3]['200'];

					const project = {
						meta,
						groups,
						issues,
						members
					};

					this.setSelectedProject(id);
					resolve(project);
				})
				.catch(error => reject(error));
		})
	}

	/**
	 * Map cards meta object.
	 * @param  {Object} card
	 * @return {Object}
	 */
	mapCardsMeta(card) {
		const metaAttachment = (card.attachments || []).find(attachment => attachment.name === 'Issue URL');
		let meta;

		try {
			const metaData = metaAttachment.url.match(/\#issue\-(.+)$/)[1];
			meta = JSON.parse(decodeURIComponent(atob(metaData)));
		} catch (error) {
			meta = {};
		}

		card.meta = meta;

		return card;
	}

	/**
	 * Initialize new project.
	 * @return {Promise}
	 */
	initProject(payload) {
		const request = this.client.post('boards/', {
			name: `Bugbox: ${payload.name}`,
			defaultLists: true,
			defaultLabels: true,
		});

		return request
			.then((response) => this.initMetaList(response, payload))
			.then((response) => this.closeMetaList(response, payload))
			.then((response) => this.initMetaCard(response, payload));
	}

	/**
	 * Initialize list to store meta cards in trello.
	 * @param  {Object} response
	 * @param  {String} name
	 * @return {Promise}
	 */
	initMetaList(response, payload) {
		const board = response.data;
		const boardId = board.id;
		const request = this.client.post(`boards/${boardId}/lists`, {
			name: META_LIST_TITLE,
			closed: true,
		});

		return request;
	}

	/**
	 * Close newly created list for meta cards.
	 * @param  {Object} response
	 * @param  {String} name
	 * @return {Promise}
	 */
	closeMetaList(response, payload) {
		const list = response.data;
		const listId = list.id;

		const request = this.client.put(`lists/${listId}/closed`, {
			value: true
		});

		return request;
	}

	/**
	 * Initialize card that contains meta data for the project.
	 * @param  {Object} response
	 * @param  {String} name
	 * @return {Promise}
	 */
	initMetaCard(response, payload) {
		const list = response.data;
		const listId = list.id;
		const request = this.client.post(`lists/${listId}/cards`, {
			name: META_URL_TITLE,
			desc: payload.baseUrl,
		});

		return request.then((response) => {
			if (response && response.data && response.data.id) {
				this.setMetaIdCache(response.data.id);
			}

			return response;
		});
	}

	/**
	 * Add issue as card in trello.
	 * @param  {Object} issue
	 * @return {Promise}
	 */
	addIssue(issue) {
		const cardPayload = {
			name: issue.title,
			desc: issue.description,
			idList: issue.group,
		};

		const options = {
			params: {
				attachments: true
			}
		};

		const request = this.client.post('/cards', cardPayload, options);

		if (issue.meta && issue.meta.screenshot) {
			issue.screenshot = issue.meta.screenshot;

			delete issue.meta.screenshot;
		}

		return request
			.then(({data}) => this.addIssueMeta(data, issue.meta))
			.then((card) => this.addIssueScreenshot(card, issue.screenshot));
	}

	/**
	 * Add issue card meta data as attachment.
	 * @param  {Object} card
	 * @param  {Object} meta
	 * @return {Promise}
	 */
	addIssueMeta(card, meta) {
		const encodedMeta = btoa(encodeURIComponent(JSON.stringify(meta)));
		const url = `${meta.url}#issue-${encodedMeta}`;
		const data = {
			name: 'Issue URL',
			url
		};

		const request = this.client.post(`/cards/${card.id}/attachments`, data);

		return request.then(({data}) => {
			card.attachments = (card.attachments || []).concat(data);
			card = this.mapCardsMeta(card);

			return card;
		});
	}

	/**
	 * Add issue screenshot as attachment.
	 * @param  {Object} card
	 * @param  {String} screenshot
	 * @return {Promise}
	 */
	addIssueScreenshot(card, screenshot) {
		if (!screenshot) {
			return Promise.resolve(card);
		}

		const data = new FormData();
		data.append('name', 'Screenshot');
		data.append('file', dataURItoFile(screenshot, 'screenshot.png'));

		const request = this.client.post(`/cards/${card.id}/attachments`, data);

		return request.then(({data}) => {
			card.attachments = (card.attachments || []).concat(data);

			return card;
		});
	}

	/**
	 * Change issue group.
	 * @param  {String} options.cardId
	 * @param  {String} options.listId
	 * @return {Promise}
	 */
	changeIssueGroup({ cardId, groupId }) {
		const data = {
			idList: groupId
		};
		const request = this.client.put(`cards/${cardId}`, data);

		return request.then(({ data }) => data);
	}

	/**
	 * Get issue actions.
	 * @param  {String} options.cardId
	 * @param  {String} options.listId
	 * @return {Promise}
	 */
	getIssueActions(cardId) {
		const request = this.client.get(`cards/${cardId}/actions`);

		return request.then(({ data }) => data);
	}
}
