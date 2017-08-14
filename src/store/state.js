const state = {
	panelCollapsed : window.localStorage && JSON.parse(window.localStorage.getItem('BugboxCollapsed')),
	status         : 'initilized',
	user           : null,
	project        : null,
	projectsList   : null,
	tagManager     : null,
	tagged         : null,
	selectedIssueId: null,
};

export default state;
