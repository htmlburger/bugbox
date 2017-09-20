import Storage from 'services/Storage';

export default class LocalStorage extends Storage {
	/**
	 * Create a LocalStorage.
	 */
	constructor(key) {
		super(key);
	}

	/**
	 * Get item value.
	 * @return {Promise<String>}
	 */
	get() {
		const value = window.localStorage.getItem(this.key);

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
			window.localStorage.setItem(this.key, value);
		} else {
			window.localStorage.removeItem(this.key);
		}

		return Promise.resolve(value);
	}
}
