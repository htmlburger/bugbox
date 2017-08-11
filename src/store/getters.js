/**
 * Store getters
 * @type {Object}
 */
const getters = {
	panelCollapsed(state, getters) {
		return state.panelCollapsed;
	},

	status(state, getters) {
		return state.status;
	},

	user(state, getters) {
		return state.user;
	},

	project(state, getters) {
		return state.project;
	},


	projectsList(state, getters) {
		return state.projectsList;
	},

	issues(state, getters) {
		const project = getters.project;

		return project ? project.issues : null;
	},

	selectedIssueId(state, getters) {
		return state.selectedIssueId;
	},

	tagManager(state, getters) {
		return state.tagManager;
	},

	tagged(state, getters) {
		return state.tagged;
	},
};

export default getters;
