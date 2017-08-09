import axios from 'axios';

export default class Tracker {
	constructor() {
		this.client = axios.create();
	}

	/**
	 * Whether client is authorized
	 * @return {Promise}
	 */
	isAuthorized() {
		return Promise.resolve(false);
	}

	/**
	 * Authorize in tracker
	 * @return {Promise}
	 */
	authorize() {
		return Promise.resolve(null);
	}

	/**
	 * Destroy previous authorization in tracker
	 * @return {Promise}
	 */
	unauthorize() {
		return Promise.resolve(null);
	}

	/**
	 * Find a project matching query criteria
	 * @param  {Any} query
	 * @return {Promise}
	 */
	findProject(query) {
		return Promise.resolve({});
	}

	/**
	 * Get a project
	 * @param  {Any} query
	 * @return {Promise}
	 */
	getProject(id) {
		return Promise.resolve({});
	}

	/**
	 * Initialize new project
	 * @return {Promise}
	 */
	initProject() {
		return Promise.resolve({});
	}

	/**
	 * Add issue item
	 * @return {Promise}
	 */
	addIssue() {
		return Promise.resolve({});
	}
}
