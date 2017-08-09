import Trello from '../services/Trello';
import TagManager from '../helpers/TagManager';

const tracker = new Trello();

/**
 * Store actions
 * @type {Object}
 */
const actions = {
	/**
	 * Store initialize action
	 * @param  {Function} options.commit
	 * @param  {Function} options.dispatch
	 * @return {Promise}
	 */
	init({ commit, dispatch }) {
		return tracker.isAuthorized()
			.then((isAuthorized) => {
				if (isAuthorized) {
					return dispatch('getInitialData');
				}

				commit('SET_STATUS', 'unauthorized');
			});
	},

	/**
	 * Get initial data
	 * @param  {Function} options.dispatch
	 * @return {Promise}
	 */
	getInitialData({ dispatch }) {
		const location = window.location.host;

		return dispatch('getUser')
			.then(() => dispatch('getProject', location));
	},

	/**
	 * Get authorized user data
	 * @param  {Function} options.commit
	 * @return {Promise}
	 */
	getUser({ commit }) {
		commit('SET_STATUS', 'fetching_user');

		return tracker.getUser()
			.then((user) => {
				commit('SET_STATUS', 'fetched_user');
				commit('SET_USER', user);
			});
	},

	/**
	 * Get project data
	 * @param  {Function} options.commit
	 * @param  {Any} payload
	 * @return {Promise}
	 */
	getProject({ commit }, payload) {
		commit('SET_STATUS', 'fetching_project');

		return tracker.findProject(payload)
			.then((project) => {
				commit('SET_STATUS', 'fetched_project');
				commit('SET_PROJECT', project);

				return project;
			});
	},

	/**
	 * Authorize in tracker action
	 * @param  {Function} options.commit
	 * @param  {Function} options.dispatch
	 * @return {Promise}
	 */
	authorize({ commit, dispatch }) {
		return tracker.authorize()
			.then((token) => {
				commit('SET_STATUS', 'unauthorized');

				return dispatch('getInitialData');
			});
	},

	/**
	 * Initialize new project in tracker
	 * @param  {Function} options.commit
	 * @param  {Function} options.dispatch
	 * @param  {String} payload
	 * @return {Promise}
	 */
	initProject({ commit, dispatch }, payload) {
		const projectName = payload;

		return tracker.initProject(projectName)
			.then((response) => {
				if (response.data && response.data.idBoard) {
					return tracker.getProject(response.data.idBoard)
				}
			})
			.then((project) => {
				commit('SET_STATUS', 'fetched_project');
				commit('SET_PROJECT', project);
			});
	},

	/**
	 * Initialize TagManager instance
	 * @param  {Function} options.commit
	 * @param  {Object} payload
	 * @return {Promise}
	 */
	initTagManager({ commit }, payload) {
		const tagManager = new TagManager(payload);

		return commit('SET_TAG_MANAGER', tagManager);
	},

	/**
	 * Initialize tagging
	 * @param {Function} options.commit
	 * @return {Promise}
	 */
	initTagging({ state, commit }) {
		const { tagManager } = state;

		tagManager.init();
		return commit('SET_STATUS', 'tagging');
	},

	/**
	 * Set tagged element meta data
	 * @param {Function} options.commit
	 * @param {Object} payload
	 * @return {Promise}
	 */
	setTagged({ commit }, payload) {
		commit('SET_STATUS', 'tagged');
		return commit('SET_TAGGED', payload);
	},

	/**
	 * Reset tagged element
	 * @param {Function} options.commit
	 * @return {Promise}
	 */
	resetTagged({ commit }) {
		commit('SET_STATUS', '');
		return commit('SET_TAGGED', null);
	},

	/**
	 * Set tagged element meta data
	 * @param {Function} options.commit
	 * @param {Object} payload
	 * @return {Promise}
	 */
	addIssue({ commit, dispatch }, payload) {
		commit('SET_STATUS', 'submitting_issue');

		return tracker
			.addIssue(payload)
			.then(issue => {
				dispatch('resetTagged');
				return commit('ADD_ISSUE', issue);
			});
	},

	/**
	 * Select issue
	 * @param {Function} options.commit
	 * @param {String} payload
	 * @return {Promise}
	 */
	selectIssue({ commit }, payload) {
		return commit('SET_SELECTED_ISSUE', payload);;
	},

	/**
	 * Reset selected issue
	 * @param {Function} options.commit
	 * @return {Promise}
	 */
	resetSelectedIssue({ commit }, payload) {
		return commit('SET_SELECTED_ISSUE', null);;
	},

};

export default actions;
