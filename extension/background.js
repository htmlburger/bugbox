/**
 * Migrate to new storage keys
 */
(() => {
	chrome.storage.sync.get(['BugBoxTrelloToken', 'BugboxTrelloToken'], (items) => {
		if (!items['BugBoxTrelloToken'] && !!items['BugboxTrelloToken']) {
			const setPayload = {};
			setPayload['BugBoxTrelloToken'] = items['BugboxTrelloToken'];

			chrome.storage.sync.set(setPayload);
		}
	});
})();

/**
 * Normalize screenshot dimension.
 * @param  {Object} dimensions
 * @return {Object}
 */
const normalizeDimensions = (dimensions) => {
	const scale = dimensions.devicePixelRatio && dimensions.devicePixelRatio !== 1 ? 1 / dimensions.devicePixelRatio : 1;

	if (scale !== 1) {
		dimensions.top = dimensions.top / scale;
		dimensions.left = dimensions.left / scale;
		dimensions.width = dimensions.width / scale;
		dimensions.height = dimensions.height / scale;
	}

	return dimensions;
};

/**
 * Capture Tab.
 * @param  {String}   tabId
 * @param  {Object}   dimensions
 * @param  {Function} callback   [description]
 * @return {void}
 */
const capture = (tabId, dimensions, callback) => {
	chrome.tabs.captureVisibleTab({ format: 'png' }, function(dataUrl) {
		proccessScreenshot(dataUrl, dimensions, callback);
	});
};

/**
 * Process screenshot area.
 * @param  {String}   dataUrl
 * @param  {Object}   dimensions
 * @param  {Function} callback
 * @return {void}
 */
const proccessScreenshot = (dataUrl, dimensions, callback) => {
	var image = new Image();
	var context = null;

	if (!('canvas' in window)) {
		window.canvas = document.createElement('canvas');

		document.body.appendChild(canvas);
	}

	image.onload = function() {
		canvas.width = dimensions.width;
		canvas.height = dimensions.height;

		context = canvas.getContext('2d');

		context.drawImage(image,
			dimensions.left, dimensions.top,
			dimensions.width, dimensions.height,
			0, 0,
			dimensions.width, dimensions.height
		);

		callback(canvas.toDataURL('image/png'));
	}

	image.src = dataUrl;
};

/**
 * Handle screenshot request.
 * @param  {String} options.action
 * @param  {Object} options.payload
 * @param  {Object} sender
 * @param  {Object} sendResponse
 * @return {void}
 */
const handleScreenshotRequest = ({ action, payload }, sender, sendResponse) => {
	if (!payload) {
		sendResponse({
			action,
			status: 'error',
			payload: 'Please set dimensions property.'
		});
	} else {
		capture(sender.tab.id, normalizeDimensions(payload), (screenshotBase64) => {
			sendResponse({
				action,
				status: 'success',
				payload: screenshotBase64
			});
		});
	}
};

/**
 * Handle version request.
 * @param  {String} options.action
 * @param  {Object} options.payload
 * @param  {Object} sender
 * @param  {Object} sendResponse
 * @return {void}
 */
const handleVersionRequest = ({ action, payload }, sender, sendResponse) => {
	sendResponse({
		action,
		status: 'success',
		payload: chrome.runtime.getManifest().version
	});
}

/**
 * Handle get item request.
 * @param  {String} options.action
 * @param  {Any} options.payload
 * @param  {Object} sender
 * @param  {Object} sendResponse
 * @return {void}
 */
const handleGetItemRequest = ({ action, payload }, sender, sendResponse) => {
	const { key } = payload;

	chrome.storage.sync.get(key, (items) => {
		sendResponse({
			action,
			status: 'success',
			payload: items[key]
		});
	});
}

/**
 * Handle set item request.
 * @param  {String} options.action
 * @param  {Any} options.payload
 * @param  {Object} sender
 * @param  {Object} sendResponse
 * @return {void}
 */
const handleSetItemRequest = ({ action, payload }, sender, sendResponse) => {
	const setPayload = {};
	const { key, value } = payload;

	setPayload[key] = value;

	chrome.storage.sync.set(setPayload, () => {
		sendResponse({
			action,
			payload,
			status: 'success'
		});
	});
}

/**
 * Handle get token request.
 * @param  {String} options.action
 * @param  {Any} options.payload
 * @param  {Object} sender
 * @param  {Object} sendResponse
 * @return {void}
 */
const handleBadgeStatusRequest = ({ payload }, sender, sendResponse) => {
	const tabId = sender.tab.id;

	chrome.browserAction.setBadgeText({
		tabId,
		text: payload ? 'on' : ''
	});
}


/**
 * Message handler.
 * @param  {Object} request
 * @param  {Object} sender
 * @param  {Object} sendResponse
 * @return {void}
 */
const handleMessage = (request, sender, sendResponse) => {
	const { action , payload } = request;

	switch (action) {
		case 'version':
			handleVersionRequest(request, sender, sendResponse);
			break;
		case 'screenshot':
			handleScreenshotRequest(request, sender, sendResponse);
			break;
		case 'getItem':
			handleGetItemRequest(request, sender, sendResponse);
			break;
		case 'setItem':
			handleSetItemRequest(request, sender, sendResponse);
			break;
		case 'setBadgeStatus':
			handleBadgeStatusRequest(request, sender, sendResponse);
			break;
		default:
			break;
	}

	return true;
};

/**
 * Bind message listeners.
 */
chrome.extension.onMessage.addListener(handleMessage);

/**
 * Toggle extension for current tab.
 * @param  {Object}
 * @return {void}
 */
chrome.browserAction.onClicked.addListener((tab) => {
	const message = {
		action: 'toggleEnabled'
	};

	chrome.tabs.sendMessage(tab.id, message, ({ payload }) => {
		chrome.browserAction.setBadgeText({
			tabId: tab.id,
			text: payload ? 'on' : ''
		});
	});

});


let port;

/**
 * Attempt to reconnect.
 * @return {void}
 */
const reconnectToExtension = () => {
	// Reset port
	port = null;
	// Attempt to reconnect after 1 second
	setTimeout(connectToExtension, 1000 * 1);
};

/**
 * Attempt to connect.
 * @return {void}
 */
const connectToExtension = () => {
	// Make the connection
	port = chrome.extension.connect({ name: 'bugbox-port' });

	/**
	 * When extension is upgraded or disabled and renabled, the content scripts
	 * will still be injected, so we have to reconnect them.
	 * We listen for an onDisconnect event, and then wait for a second before
	 * trying to connect again. Becuase chrome.extension.connect fires an onDisconnect
	 * event if it does not connect, an unsuccessful connection should trigger
	 * another attempt, 1 second later.
	 */
	port.onDisconnect.addListener(reconnectToExtension);
};

/**
 * Connect for the first time.
 */
connectToExtension();
