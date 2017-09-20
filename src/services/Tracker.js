import axios from 'axios';

export default class Tracker {
	/**
	 * Create a Tracker.
	 */
	constructor() {
		this.client = axios.create();
	}

	/**
	 * Whether client is authorized.
	 * @return {Promise}
	 */
	isAuthorized() {
		return Promise.resolve(false);
	}

	/**
	 * Authorize in tracker.
	 * @return {Promise}
	 */
	authorize() {
		return Promise.resolve(null);
	}

	/**
	 * Destroy previous authorization in tracker.
	 * @return {Promise}
	 */
	unauthorize() {
		return Promise.resolve(null);
	}

	/**
	 * Get user object.
	 * @return {Promise}
	 */
	getUser() {
		return Promise.resolve({});
	}

	/**
	 * Find a project matching query criteria.
	 * @return {Promise}
	 */
	findProject() {
		return Promise.resolve({});
	}

	/**
	 * Get a project.
	 * @return {Promise}
	 */
	getProject() {
		return Promise.resolve({});
	}

	/**
	 * Initialize new project.
	 * @return {Promise}
	 */
	initProject() {
		return Promise.resolve({});
	}

	/**
	 * Add issue item.
	 * @return {Promise}
	 */
	addIssue() {
		return Promise.resolve({});
	}

	/**
	 * Change issue group.
	 * @return {Promise}
	 */
	changeIssueGroup() {
		return Promise.resolve({});
	}

	/**
	 * Get issue actions.
	 * @return {Promise}
	 */
	getIssueActions() {
		return Promise.resolve([]);
	}
}
