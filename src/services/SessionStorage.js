import Storage from 'services/Storage';

export default class SessionStorage extends Storage {
	/**
	 * Create a SessionStorage.
	 */
	constructor(key) {
		super(key);
	}

	/**
	 * Get item value.
	 * @return {Promise<String>}
	 */
	get() {
		const value = window.sessionStorage.getItem(this.key);

		return Promise.resolve(value);
	}

	/**
	 * Whether item has value.
	 * @return {Promise<Boolean>}
	 */
	has() {
		return this.get().then(value => (value !== undefined && value !== null));
	}

	/**
	 * Set item value.
	 * @param {String} value
	 * @return {Promise<String>}
	 */
	set(value) {
		if (value !== null) {
			window.sessionStorage.setItem(this.key, value);
		} else {
			window.sessionStorage.removeItem(this.key);
		}

		return Promise.resolve(value);
	}
}
