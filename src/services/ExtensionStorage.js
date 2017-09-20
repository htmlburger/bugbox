import Storage from 'services/Storage';

export default class ExtensionStorage extends Storage {
	/**
	 * Create a LocalStorage.
	 */
	constructor(key) {
		super(key);
	}

	/**
	 * Send extension message.
	 * @return {Promise}
	 */
	send(message, timeout = 5000) {
		return new Promise((resolve, reject) => {
			if ('chrome' in window && 'runtime' in window.chrome) {
				chrome.runtime.sendMessage(message, (response) => {
					resolve(response.payload);
				});
			}

			/**
			 * Message reply timeout.
			 */
			setTimeout(() => {
				reject(null);
			}, timeout);
		});
	}

	/**
	 * Get item value.
	 * @return {Promise<String>}
	 */
	get() {
		const key = this.key;
		const message = {
			action: 'getItem',
			payload: { key }
		}

		return this.send(message);
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
		const key = this.key;
		const message = {
			action: 'setItem',
			payload: { key, value }
		}

		return this.send(message);
	}
}
