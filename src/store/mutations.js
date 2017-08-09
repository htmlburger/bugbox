/**
 * Store mutations
 * @type {Object}
 */
const mutations = {
	SET_STATUS(state, payload) {
		state.status = payload;
	},

	SET_USER(state, payload) {
		state.user = payload;
	},

	SET_PROJECT(state, payload) {
		state.project = payload;
	},

	SET_TAG_MANAGER(state, payload) {
		state.tagManager = payload;
	},

	SET_TAGGED(state, payload) {
		state.tagged = payload;
	},

	SET_SELECTED_ISSUE(state, payload) {
		state.selectedIssueId = payload;
	},

	ADD_ISSUE(state, payload) {
		if (state.project && Array.isArray(state.project.issues)) {
			state.project.issues = state.project.issues.concat(payload);
		}
	},
};

export default mutations;
