import {
	getElementSelector,
	getElementOffset,
	getElementOuterHtml,
	getBrowserInfo,
	getOSName
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
		this.tagTargetElement = this.tagTargetElement.bind(this);
		this.highlightTargetElement = this.highlightTargetElement.bind(this);
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
	}

	unbind() {
		document.removeEventListener('mousemove', this.highlightTargetElement);
		document.removeEventListener('click', this.tagTargetElement);
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

			this.resizeScreenshotArea();
		}
	}

	/**
	 * Toggle element highlight styles
	 * @param  {Element} element
	 * @return {Void}
	 */
	toggleElementHighlight(element) {
		if (element) {
			// const boxShadowHighlight = 'inset 0 0 0 10000px rgba(0,150,255,.2)';
			const boxShadowHighlight = '';
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


			left   = Math.max(0, boundingRect.left - screenshotPadding);
			top    = Math.max(0, boundingRect.top - screenshotPadding);
			width  = Math.min(window.innerWidth - left, boundingRect.width + screenshotPadding * 2);
			height = Math.min(window.innerHeight - top, boundingRect.height + screenshotPadding * 2);

			console.log(width, height, left, top);
		}

		return {
			left,
			top,
			width,
			height
		};
	}

	/**
	 * Resize screenshot area DOM element
	 * @return {Void}
	 */
	resizeScreenshotArea() {
		if (!this.screenshotArea) {
			return;
		}

		const { left, top, width, height } = this.getScreenshotCoords();
		const borderLeftWidth = left + 'px';
		const borderTopWidth = top + 'px';
		const borderRightWidth = (window.innerWidth - (width + left)) + 'px';
		const borderBottomWidth = (window.innerHeight - (height + top)) + 'px';

		this.screenshotArea.style.borderWidth = `${borderTopWidth} ${borderRightWidth} ${borderBottomWidth} ${borderLeftWidth}`;
	}

	/**
	 * Tag element
	 * @param  {Event} event
	 * @return {Void}
	 */
	tagTargetElement(event) {
		this.unbind();
		this.toggleElementHighlight(this.currentElement);

		this.onTagged(this.getTargetElementData());

		this.currentElement = null;
	}

	/**
	 * Get tagged element meta data
	 * @param  {Element} element
	 * @return {Object}
	 */
	getTargetElementData(element = this.currentElement) {
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
