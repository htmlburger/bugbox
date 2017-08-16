/**
 * Store mutations
 * @type {Object}
 */
const mutations = {
	TOGGLE_PANEL_COLLAPSED(state, payload) {
		state.panelCollapsed = payload;
	},

	SET_STATUS(state, payload) {
		state.status = payload;
	},

	SET_USER(state, payload) {
		state.user = payload;
	},

	SET_PROJECT(state, payload) {
		state.project = payload;
	},

	SET_PROJECTS_LIST(state, payload) {
		state.projectsList = payload;
	},

	SET_TAG_MANAGER(state, payload) {
		state.tagManager = payload;
	},

	SET_TAGGED(state, payload) {
		state.tagged = payload;
	},

	SET_TEMP_PIN(state, payload) {
		state.tempPin = payload;
	},

	SET_SELECTED_ISSUE(state, payload) {
		state.selectedIssueId = payload;
	},

	ADD_ISSUE(state, payload) {
		if (state.project && Array.isArray(state.project.issues)) {
			state.project.issues = state.project.issues.concat(payload);
		}
	},

	UPDATE_ISSUE(state, payload) {
		const issueUpdate = payload;

		if (state.project && Array.isArray(state.project.issues)) {
			const issueIndex = state.project.issues.findIndex(issue => issue.id === issueUpdate.id);

			if (issueIndex >= 0) {
				const updatedIssue = Object.assign({}, state.project.issues[issueIndex], issueUpdate);

				state.project.issues[issueIndex] = updatedIssue;
			}
		}
	},
};

export default mutations;
