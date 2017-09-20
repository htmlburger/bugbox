export default class Storage {
	/**
	 * Create a Storage.
	 */
	constructor(key) {
		if (this.constructor === Storage) {
			throw new Error(`Can't instantiate abstract class!`);
		}

		this.key = `BugBox${key}`;
	}

	/**
	 * Get item value.
	 * @return {Promise<String>}
	 */
	get() {
		throw new Error('Please implement me.');
	}

	/**
	 * Whether item has value.
	 * @return {Promise<Boolean>}
	 */
	has() {
		throw new Error('Please implement me.');
	}

	/**
	 * Set item value.
	 * @param {String} value
	 * @return {Promise<String>}
	 */
	set(value) {
		throw new Error('Please implement me.');
	}
}
