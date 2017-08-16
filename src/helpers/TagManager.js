import {
	getElementSelector,
	getElementOffset,
	getElementOuterHtml,
	getBrowserInfo,
	getOSName,
	getDocumentScrollbar
} from './utils';

export default class TagManager {
	constructor(options) {
		const opts = Object.assign({
			cover            : document,
			screenshotArea   : null,
			taggingInit      : void 0,
			onBeforeTagged   : void 0,
			onTagged         : void 0,
		}, options);

		this.cover             = opts.cover;
		this.screenshotArea    = opts.screenshotArea;
		this.screenshotPadding = 100;
		this.taggingInit       = opts.taggingInit;
		this.onBeforeTagged    = opts.onBeforeTagged;
		this.onTagged          = opts.onTagged;
		this.currentElement    = null;

		/**
		 * Bind Handlers
		 */
		this.cancel                  = this.cancel.bind(this);
		this.tagTargetElement        = this.tagTargetElement.bind(this);
		this.highlightTargetElement  = this.highlightTargetElement.bind(this);
		this.resizeScreenshotPadding = this.resizeScreenshotPadding.bind(this);
		this.updateScreenshotArea    = this.updateScreenshotArea.bind(this);
	}

	/**
	 * Initialize tagging
	 * @return {Void}
	 */
	init() {
		this.bind();
	}

	/**
	 * Bind handlers
	 * @return {Void}
	 */
	bind() {
		document.addEventListener('mousemove', this.highlightTargetElement);
		document.addEventListener('click', this.tagTargetElement);
		document.addEventListener('mousewheel', this.resizeScreenshotPadding);
		document.addEventListener('resize', this.updateScreenshotArea);
		document.addEventListener('scroll', this.updateScreenshotArea);
		document.addEventListener('keydown', this.cancel);

		window.focus();
	}

	/**
	 * Unbind handlers
	 * @return {Void}
	 */
	unbind() {
		document.removeEventListener('mousemove', this.highlightTargetElement);
		document.removeEventListener('mousewheel', this.resizeScreenshotPadding);
		document.removeEventListener('click', this.tagTargetElement);
		document.removeEventListener('resize', this.updateScreenshotArea);
		document.removeEventListener('scroll', this.updateScreenshotArea);
		document.removeEventListener('keydown', this.cancel);
	}

	/**
	 * Cancel tagging
	 * @return {Void}
	 */
	cancel(event) {
		if (event.keyCode === 27) {
			this.unbind();
			this.onTagged(null);
			this.currentElement = null;
		}
	}

	/**
	 * Get DOM element from mouse position captured in event object
	 * @param  {Event} event
	 * @return {Void}
	 */
	getElementFromEvent(event) {
		const x = event.clientX;
		const y = event.clientY;

		this.cover.style.visibility = 'hidden';
		const element = document.elementFromPoint(x, y);
		this.cover.style.visibility = 'visible';

		return element;
	}

	/**
	 * Highlight DOM element
	 * @param  {[type]} event [description]
	 * @return {[type]}       [description]
	 */
	highlightTargetElement(event) {
		const targetElement = this.getElementFromEvent(event);

		if (targetElement !== this.currentElement) {
			this.currentElement = targetElement;
			this.updateScreenshotArea();
		}
	}

	/**
	 * Get screenshot area coords
	 * @return {Object}
	 */
	getScreenshotCoords() {
		const screenshotPadding = this.screenshotPadding || 0;

		let left   = 0;
		let top    = 0;
		let width  = 0;
		let height = 0;

		if (this.currentElement) {
			const boundingRect = this.currentElement.getBoundingClientRect();

			const rightPaddingCorrection = Math.min(0, boundingRect.left - screenshotPadding);
			const bottomPaddingCorrection = Math.min(0, boundingRect.top - screenshotPadding);

			left   = Math.max(0, Math.round(boundingRect.left - screenshotPadding));
			top    = Math.max(0, Math.round(boundingRect.top - screenshotPadding));
			width  = Math.min(window.innerWidth - left, Math.round(boundingRect.width + screenshotPadding * 2 + rightPaddingCorrection));
			height = Math.min(window.innerHeight - top, Math.round(boundingRect.height + screenshotPadding * 2 + bottomPaddingCorrection));
		}

		return {
			left,
			top,
			width,
			height,
			devicePixelRatio: 1
		};
	}

	/**
	 * Update size of screenshot area DOM element
	 * @return {Void}
	 */
	updateScreenshotArea() {
		if (!this.screenshotArea) {
			return;
		}

		const { left, top, width, height } = this.getScreenshotCoords();
		const scrollbarCorrection = getDocumentScrollbar();
		const borderLeftWidth = left + 'px';
		const borderTopWidth = top + 'px';
		const borderRightWidth = Math.max(0, (window.innerWidth - (width + left + scrollbarCorrection))) + 'px';
		const borderBottomWidth = Math.max(0, (window.innerHeight - (height + top))) + 'px';

		this.screenshotArea.style.borderWidth = `${borderTopWidth} ${borderRightWidth} ${borderBottomWidth} ${borderLeftWidth}`;
	}

	/**
	 * Resize screenshot area
	 * @param  {Event} event
	 * @return {Void}
	 */
	resizeScreenshotPadding(event) {
		if (event.ctrlKey) {
			event.preventDefault();

			const maxStep = 25
			const step = Math.max(-maxStep, Math.min(maxStep, event.deltaY * -1));

			this.screenshotPadding += step;
			this.screenshotPadding = Math.max(0, this.screenshotPadding);

			this.updateScreenshotArea();
		}
	}

	/**
	 * Request screenshot
	 * @return {Promise}
	 */
	requestScreenshot() {
		const screenshotTimeoutTime = 1000;
		const dimensions = this.getScreenshotCoords();
		const message = {
			action: 'screenshot',
			payload: dimensions
		};

		return new Promise((resolve, reject) => {
			setTimeout(() => {
				/**
				 * Set screenshot taking timeout
				 */
				let screenshotTimeout = setTimeout(resolve, screenshotTimeoutTime);

				if ('chrome' in window && 'runtime' in window.chrome) {
					chrome.runtime.sendMessage(message, resolve);
				}
			}, 25);
		});
	}

	/**
	 * Tag element
	 * @param  {Event} event
	 * @return {Void}
	 */
	tagTargetElement(event) {
		if (!this.currentElement) {
			return;
		}

		this.unbind();

		const payload = this.getTargetElementData(event);
		const tempPin = {
			x: event.pageX,
			y: event.pageY
		};

		this.onBeforeTagged(tempPin);

		return this.requestScreenshot()
			.then((response) => {
				if (response.status === 'success') {
					payload['screenshot'] = response.payload;
				}

				this.onTagged(payload);
				this.currentElement = null;
			});
	}

	/**
	 * Get tagged element meta data
	 * @param  {Element} element
	 * @return {Object}
	 */
	getTargetElementData(event, element = this.currentElement) {
		const offset = getElementOffset(element);
		const pinOffsetX = event.pageX - offset.left;
		const pinOffsetY = event.pageY - offset.top;
		const address = window.location.href.replace(/\#issue\-(.+)$/, '');

		return {
			selector: getElementSelector( element ),
			outerHtml: getElementOuterHtml( element ).substring(0, 500),
			address: address,
			browser: {
				width: window.innerWidth,
				height: window.innerHeight,
				vendor: getBrowserInfo().name,
				version: getBrowserInfo().version,
				os: getOSName()
			},
			pin: {
				offsetX: pinOffsetX,
				offsetY: pinOffsetY,
				originX: event.pageX,
				originY: event.pageY
			}
		};
	}
}
