import Vue from 'vue';
import App from './App.vue';
import store from './store';

let app;

/**
 * Initialize application
 * @return {Void}
 */
const init = () => {
	mount();
	bind();
};

/**
 * Whether application is enabled
 * @return {Boolean}
 */
const isEnabled = () => {
	const bugboxEnabled = window.localStorage.getItem('BugboxEnabled');

	return bugboxEnabled && JSON.parse(bugboxEnabled);
}

/**
 * Toggle enabled
 * @return {Void}
 */
const toggleEnabled = () => {
	const enabled = isEnabled();
	window.localStorage.setItem('BugboxEnabled', !enabled);

	if (!enabled) {
		mount();
	} else {
		unmount();
	}
}

/**
 * Mount Bugbox application
 * @return {Void}
 */
const mount = () => {
	let el = document.querySelector('#bugbox-app');

	if (isEnabled() && !el) {
		el = document.createElement('div');
		el.id = 'bugbox-app';

		document.body.appendChild(el);

		app = new Vue({
			el,
			store,
			render: h => h(App)
		});
	}
};

/**
 * Unmount Bugbox application
 * @return {Void}
 */
const unmount = () => {
	let el = document.querySelector('#bugbox-app');

	if (app) {
		app.$destroy();
	}

	if (el) {
		el.parentNode.removeChild(el);
	}
}

/**
 * Bind message listeners
 * @return {Void}
 */
const bind = () => {
	if ('chrome' in window && 'extension' in window.chrome) {
		chrome.extension.onMessage.addListener((request) => {
			const action = request.action;
			const payload = request.payload;

			switch (action) {
				case 'toggleEnabled':
					toggleEnabled();
					break;
				default:
					break;
			}
		});
	}
}

/**
 * Call init
 */
init();
