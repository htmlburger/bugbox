import {
	onEvent,
	emitEvent,
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
			onTaggingInit    : void 0,
			onTagged         : void 0,
		}, options);

		this.cover             = opts.cover;
		this.screenshotArea    = opts.screenshotArea;
		this.screenshotPadding = 100;
		this.onTaggingInit     = opts.onTaggingInit;
		this.onTagged          = opts.onTagged;
		this.currentElement    = null;

		/**
		 * Bind Handlers
		 */
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

	bind() {
		document.addEventListener('mousemove', this.highlightTargetElement);
		document.addEventListener('click', this.tagTargetElement);
		document.addEventListener('mousewheel', this.resizeScreenshotPadding);
		document.addEventListener('resize', this.updateScreenshotArea);
		document.addEventListener('scroll', this.updateScreenshotArea);
	}

	unbind() {
		document.removeEventListener('mousemove', this.highlightTargetElement);
		document.removeEventListener('mousewheel', this.resizeScreenshotPadding);
		document.removeEventListener('click', this.tagTargetElement);
		document.removeEventListener('resize', this.updateScreenshotArea);
		document.removeEventListener('scroll', this.updateScreenshotArea);
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
			this.toggleElementHighlight(this.currentElement);
			this.toggleElementHighlight(targetElement);

			this.currentElement = targetElement;

			this.updateScreenshotArea();
		}
	}

	/**
	 * Toggle element highlight styles
	 * @param  {Element} element
	 * @return {Void}
	 */
	toggleElementHighlight(element) {
		if (element) {
			const boxShadowHighlight = 'inset 0 0 0 10000px rgba(0,150,255,.2)';
			const boxShadowComputed = window.getComputedStyle(element).boxShadow;
			const hasBoxShadowComputed = boxShadowComputed && boxShadowComputed !== 'none';

			let boxShadow = boxShadowHighlight;

			if (hasBoxShadowComputed) {
				boxShadow = `${boxShadow}, ${boxShadowComputed}`;
			}

			element.style.boxShadow = !element.style.boxShadow ? boxShadow : '';
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

			left   = Math.max(0, boundingRect.left - screenshotPadding);
			top    = Math.max(0, boundingRect.top - screenshotPadding);
			width  = Math.min(window.innerWidth - left, boundingRect.width + screenshotPadding * 2 + rightPaddingCorrection);
			height = Math.min(window.innerHeight - top, boundingRect.height + screenshotPadding * 2 + bottomPaddingCorrection);
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

			const shouldIncrease = event.deltaY > 0 ? -1 : 1;
			const step = 50 * shouldIncrease;

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
		const payload = {
			action: 'screenshot',
			dimensions
		};

		return new Promise((resolve, reject) => {
			/**
			 * Set screenshot taking timeout
			 */
			let screenshotTimeout = setTimeout(resolve, screenshotTimeoutTime);

			onEvent('orbit:responseScreenshot', resolve, true);
			emitEvent('orbit:requestScreenshot', payload);
		});
	}

	/**
	 * Tag element
	 * @param  {Event} event
	 * @return {Void}
	 */
	tagTargetElement(event) {
		this.unbind();

		return this.requestScreenshot()
			.then((response) => {
				const payload = this.getTargetElementData(event);

				if (response.status === 'success') {
					payload['screenshot'] = response.data;
				}

		this.toggleElementHighlight(this.currentElement);
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
