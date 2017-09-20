/**
 * Store initial state.
 * @type {Object}
 */
const state = {
	panelCollapsed : window.localStorage && JSON.parse(window.localStorage.getItem('BugboxCollapsed')),
	status         : 'initilized',
	user           : null,
	project        : null,
	projectsList   : null,
	tagManager     : null,
	tagged         : null,
	tempPin        : null,
	selectedIssueId: null,
	filters        : {
		currentPageOnly: true,
		group: null
	}
};

export default state;
