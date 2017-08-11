import Trello from '../services/Trello';
import TagManager from '../helpers/TagManager';

const tracker = new Trello();

/**
 * Store actions
 * @type {Object}
 */
const actions = {
	/**
	 * Toggle panel expanded
	 * @param  {Function} options.commit
	 * @return {Promise}
	 */
	togglePanel({ commit }, payload) {
		return commit('TOGGLE_PANEL_COLLAPSED', payload);
	},

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
		const location = window.location.origin;

		return dispatch('getUser')
			.then(() => dispatch('findProject', location));
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
	 * Find project related project
	 * @param  {Function} options.commit
	 * @param  {Any} payload
	 * @return {Promise}
	 */
	findProject({ commit, dispatch }, payload) {
		commit('SET_STATUS', 'fetching_project');

		return tracker.findProject(payload)
			.then((projects) => {
				if (projects.length && projects.length > 1) {
					commit('SET_STATUS', 'await_project_selection');
					return commit('SET_PROJECTS_LIST', projects);
				} else if (projects.length) {
					return dispatch('getProject', projects[0].id);
				}
			});
	},

	/**
	 * Get a project project
	 * @param  {Function} options.commit
	 * @param  {Any} payload
	 * @return {Promise}
	 */
	getProject({ commit }, payload) {
		return tracker.getProject(payload)
			.then((project) => {
				commit('SET_STATUS', 'fetched_project');
				commit('SET_PROJECT', project);
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
				commit('SET_STATUS', 'authorized');

				return dispatch('getInitialData');
			});
	},

	/**
	 * Unauthorize in tracker action
	 * @param  {Function} options.commit
	 * @param  {Function} options.dispatch
	 * @return {Promise}
	 */
	unauthorize({ commit, dispatch }) {
		return tracker.unauthorize()
			.then((token) => {
				commit('SET_USER', null);
				return commit('SET_STATUS', 'unauthorized');
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
		return tracker.initProject(payload)
			.then((response) => {
				if (response.data && response.data.idBoard) {
					return dispatch('getProject', response.data.idBoard)
				}
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
		if (payload) {
			commit('TOGGLE_PANEL_COLLAPSED', false);
		}

		return commit('SET_SELECTED_ISSUE', payload);
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
