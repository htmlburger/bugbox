/**
 * Migrate local storage entries
 */

if (window.localStorage) {
	const localStorageEntries = {
		'BugBoxTrelloToken': 'BugboxTrelloToken',
		'BugBoxEnabled': 'BugboxEnabled',
		'BugBoxCollapsed': 'BugboxCollapsed',
		'BugBoxTrelloMetaIdCache': 'BugboxTrelloMetaIdCache',
	};

	for (key in localStorageEntries) {
		const newVal = window.localStorage.getItem(key);
		const oldKey = localStorageEntries[key];
		const oldVal = window.localStorage.getItem(oldKey);

		if (newVal === null && oldVal !== null) {
			window.localStorage.setItem(key, oldVal);
			console.log(oldKey)
			window.localStorage.removeItem(oldKey);
		}
	}
}

/**
 * Migrate session storage entries
 */

if (window.sessionStorage) {
	const sessionStorageEntries = {
		'BugBoxTrelloProject': 'BugboxTrelloProject',
	};

	for (key in sessionStorageEntries) {
		const newVal = window.sessionStorage.getItem(key);
		const oldKey = sessionStorageEntries[key];
		const oldVal = window.sessionStorage.getItem(oldKey);

		if (newVal === null && oldVal !== null) {
			window.sessionStorage.setItem(key, oldVal);
			window.sessionStorage.removeItem(oldKey);
		}
	}
}

