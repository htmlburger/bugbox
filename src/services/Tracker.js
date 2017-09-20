export default class Tracker {
	/**
	 * Create a Tracker.
	 */
	constructor() {
		if (this.constructor === Tracker) {
			throw new Error(`Can't instantiate abstract class!`);
		}
	}

	/**
	 * Whether client is authorized.
	 * @return {Promise<Boolean>}
	 */
	isAuthorized() {
		throw new Error('Please implement me.');
	}

	/**
	 * Authorize in tracker.
	 * @return {Promise<void>}
	 */
	authorize() {
		throw new Error('Please implement me.');
	}

	/**
	 * Destroy previous authorization in tracker.
	 * @return {Promise<void>}
	 */
	unauthorize() {
		throw new Error('Please implement me.');
	}

	/**
	 * Get user object.
	 * @return {Promise<Object>}
	 */
	getUser() {
		throw new Error('Please implement me.');
	}

	/**
	 * Find a project matching query criteria.
	 * @return {Promise<Object>}
	 */
	findProject() {
		throw new Error('Please implement me.');
	}

	/**
	 * Get a project.
	 * @return {Promise<Object>}
	 */
	getProject() {
		throw new Error('Please implement me.');
	}

	/**
	 * Initialize new project.
	 * @return {Promise<Object>}
	 */
	initProject() {
		throw new Error('Please implement me.');
	}

	/**
	 * Add issue item.
	 * @return {Promise<Object>}
	 */
	addIssue() {
		throw new Error('Please implement me.');
	}

	/**
	 * Change issue group.
	 * @return {Promise<Object>}
	 */
	changeIssueGroup() {
		throw new Error('Please implement me.');
	}

	/**
	 * Get issue actions.
	 * @return {Promise<Array>}
	 */
	getIssueActions() {
		throw new Error('Please implement me.');
	}
}



