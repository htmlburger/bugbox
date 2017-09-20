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

	isSubmittingIssue(state, getters) {
		return getters.status === 'submitting_issue';
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

		return project ? project.issues : [];
	},

	filters(state, getters) {
		return state.filters;
	},

	visibleIssues(state, getters) {
		let issues = getters.issues;

		if (state.filters.currentPageOnly) {
			issues = issues.filter(issue => {
				if (!issue.meta) {
					return false;
				}

				const currentPageUrl = window.location.href.replace(/\#issue\-(.+)$/, '');

				return currentPageUrl === issue.meta.url;
			});
		}

		if (state.filters.group) {
			issues = issues.filter(issue => issue.idList === state.filters.group);
		}

		return issues;
	},

	groups(state, getters) {
		const project = getters.project;

		return project ? project.groups : null;
	},

	members(state, getters) {
		const project = getters.project;

		return project ? project.members : null;
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

	tempPin(state, getters) {
		return state.tempPin;
	},
};

export default getters;
