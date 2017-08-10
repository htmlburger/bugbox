/**
 * Open popup window
 * @param  {String} url
 * @param  {String} name
 * @param  {Object} options
 * @return {Window}
 */
export const popupWindow = (url, name, opts) => {
	const options = Object.keys(opts)
		.map(key => `${key}=${opts[key]}`)
		.join(',');

	return window.open(url, name, options);
};

/**
 * Bind custom event
 * @param  {String} eventName
 * @param  {Function} eventHandler
 * @param  {Boolean} once
 * @return {Void}
 */
export const onEvent = (eventName, eventHandler, once) => {
	const handler = function(event) {
		let details = (event || {}).detail || {};

		if ( typeof details === 'string' ) {
			details = JSON.parse(details);
		}

		eventHandler.call(this,details);

		if (once) {
			document.removeEventListener(eventName, handler);
		}
	}

	document.addEventListener(eventName, handler);
};

/**
 * Emit custom event
 * @param  {String} eventName
 * @param  {Any} eventData
 * @return {Void}
 */
export const emitEvent = (eventName, eventData) => {
	// Create Event
	const event = document.createEvent('CustomEvent');

	// Fire Event
	event.initCustomEvent(eventName, true, true, JSON.stringify(eventData));
	document.dispatchEvent(event);
};


/**
 * Get element's index in parent container
 * @param  {Element} element
 * @return {Number}
 */
export const getElementIndex = (element) => {
	const elements = Array.prototype.slice.call(element.parentNode.children, 0);

	return elements.indexOf(element);
}

/**
 * Get element's selector
 * @param  {Element} element
 * @param  {String} selector
 * @return {String}
 */
export const getElementSelector = (element, selector) => {
	const id = element.id;
	const classes = element.className
		.trim()
		.replace(/\s\s+/g, ' ')
		.split(' ')
		.join('.');

	let nodeSelector = element.nodeName.toLowerCase();
	selector = selector || ':nth-child(' + (getElementIndex(element) + 1) + ')';

	if (nodeSelector === 'html') {
		return 'html' + selector;
	}

	if (id) {
		nodeSelector += '#' + id;
	}

	if (classes && nodeSelector != 'body') {
		nodeSelector += '.' + classes;
	}

	return getElementSelector(element.parentNode, ' > ' + nodeSelector + selector);
};

/**
 * Get element offset in page
 * @param  {Element} element
 * @return {Object}
 */
export const getElementOffset = (element) => {
	const rect = element.getBoundingClientRect();

	let x = rect.left;
	let y = rect.top;

	x += window.scrollX;
	y += window.scrollY;

	// Set negative offset if element is not visible or not in a visible container
	if (
		rect.top === 0 &&
		rect.right === 0 &&
		rect.bottom === 0 &&
		rect.left === 0 &&
		rect.width === 0 &&
		rect.height === 0
	) {
		x = -10000;
		y = -10000;
	}

	return {
		top: y,
		left: x,
		width: rect.width,
		height: rect.height,
		topRel: rect.top,
		leftRel: rect.left
	};
}


/**
 * Get outer html of element
 * @param  {Element} element
 * @return {String}
 */
export const getElementOuterHtml = (element) => {
	let container;
	let html;

	if (element.getAttribute('style') === '') {
		element.removeAttribute('style');
	}

	if (!element) {
		return '';
	} else if (typeof element['outerHTML'] !== 'undefined') {
		return element.outerHTML;
	}

	container = document.createElement('div');
	container.appendChild(element.cloneNode(true));

	html = container.innerHTML;
	container = null;

	return html;
}

export const getBrowserInfo = () => {
	let userAgent = navigator.userAgent;
	let temp;
	let matches = userAgent.match(/(opera|chrome|safari|firefox|msie|edge|trident(?=\/))\/?\s*(\d+)/i) || [];

	if(/trident/i.test(matches[1])) {
		temp = /\brv[ :]+(\d+)/g.exec(userAgent) || [];

		return {
			name: 'IE',
			version: (temp[1] || '')
		};
	}

	let edgeMatches = userAgent.match(/(edge)\/(\d+)/i);

	if (edgeMatches) {
		return {
			name: edgeMatches[1],
			version: (edgeMatches[2] || '')
		};
	}

	if(matches[1] === 'Chrome') {
		temp = userAgent.match(/\bOPR\/(\d+)/);

		if(temp !== null) {
			return {
				name:'Opera',
				version: temp[1]
			};
		}
	}

	matches = matches[2] ? [matches[1], matches[2]]: [navigator.appName, navigator.appVersion, '-?'];

	if ((temp = userAgent.match(/version\/(\d+)/i)) !== null) {
		matches.splice(1, 1, temp[1]);
	}

	return {
		name: matches[0],
		version: matches[1]
	};
}

/**
 * Get OS name
 * @return {String}
 */
export const getOSName = () => {
	let osName = 'Unknown';

	if (navigator.appVersion.indexOf('Win') != -1) {
		osName = 'Windows';
	}	else if (navigator.appVersion.indexOf('Mac') != -1) {
		osName = 'MacOS';
	} else if (navigator.appVersion.indexOf('X11') != -1) {
		osName = 'UNIX';
	} else if (navigator.appVersion.indexOf('Linux') != -1) {
		osName = 'Linux';
	}

	return osName;
}

/**
 * Get Document Height
 * @return {Number}
 */
export const getDocumentHeight = () => {
	const body = document.body;
	const html = document.documentElement;

	return Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
}

/**
 * Get Document Scrollbar width
 * @return {Number}
 */
export const getDocumentScrollbar = () => {
	return Math.max(0, window.innerWidth - document.getElementsByTagName('html')[0].offsetWidth)
}

/**
 * Get levenshtein measuring difference between two strings
 * @param {String} s1
 * @param {String} s2
 * @return {Number}
 */
function levenshtein(s1, s2) {
	s1 = s1.toLowerCase();
	s2 = s2.toLowerCase();

	if (s1 == s2) {
		return 1;
	}

	let s1_len = s1.length;
	let s2_len = s2.length;

	if (!s1_len || !s2_len) {
		return 1;
	}

	let split = false;

	try {
		split = !('0')[0];
	} catch (e) {
		split = true;
	}

	if (split) {
		s1 = s1.split('');
		s2 = s2.split('');
	}

	let v0 = new Array(s1_len + 1);
	let v1 = new Array(s1_len + 1);

	let s1_idx = 0;
	let s2_idx = 0;
	let cost   = 0;

	let char_s1 = '';
	let char_s2 = '';

	for (s1_idx = 0; s1_idx < s1_len + 1; s1_idx++) {
		v0[s1_idx] = s1_idx;
	}

	for (s2_idx = 1; s2_idx <= s2_len; s2_idx++) {
		v1[0] = s2_idx;
		char_s2 = s2[s2_idx -1];

		for (s1_idx = 0; s1_idx < s1_len; s1_idx++) {
			char_s1 = s1[s1_idx];
			cost = (char_s1 == char_s2) ? 0 : 1;

			let m_min = v0[s1_idx + 1] + 1;
			let b = v1[s1_idx] + 1;
			let c = v0[s1_idx] + cost;

			if (b < m_min) {
				m_min = b;
			}

			if (c < m_min) {
				m_min = c;
			}

			v1[s1_idx + 1] = m_min;
		}

		let v_tmp = v0;

		v0 = v1;
		v1 = v_tmp;
	}

	return (1 - v0[s1_len] / Math.max(s1_len, s2_len));
}

/**
 * Get matched element by html comparison
 * @param  {Array} matchCandidates
 * @param  {Object} issue
 * @return {Element}
 */
function matchElementByHtml(matchCandidates, outerHtml) {
	let bestMatch;
	let highestRatio = 0;

	for (let i = 0; i < matchCandidates.length; i++) {
		let candidate = matchCandidates[i];
		let candidateHtmlPrefix = getElementOuterHtml(candidate).substring(0, 500);
		let comparisonRatio = levenshtein(candidateHtmlPrefix, outerHtml);

		if (comparisonRatio > highestRatio) {
			bestMatch = candidate;
			highestRatio = comparisonRatio;
		};
	}

	return bestMatch;
}

/**
 * Get matched element for an issue
 * @param  {Object} issue
 * @return {Element}
 */
export const getMatchedElement = (issue) => {
	let stringCompareRatio;
	let issueOuterHtml = issue.outerHtml;

	if (!issueOuterHtml) {
		return null;
	}

	// Path-based element matching
	let fullPath           = issue.selector.replace(/:.*/, '').replace(/([:;?!|$%&@,"'`*^+=(){}[\\\]\/~])/g, '\\\\$1');
	let simplePath         = fullPath.substring(fullPath.lastIndexOf('>') + 1);
	let simplePathElements = document.querySelectorAll(simplePath)
	let simplePathMatches  = [];
	let matchedElements    = null;
	let fullPathElements;
	let matchCandidates;

	// Directly match an element
	let directMatchElement = document.querySelectorAll(issue.selector);

	if (directMatchElement.length == 1) {
		stringCompareRatio = levenshtein(getElementOuterHtml(directMatchElement[0]).substring(0, 500), issue.outerHtml);

		// for shorter strings changes in the style attribute have greater impact,
		// thus we lower the minimum ratio
		if (stringCompareRatio > 0.6 || (issue.outerHtml < 128 && stringCompareRatio > 0.45)) {
			return directMatchElement[0];
		}
	}

	// Find the elements who match the top selector from the path
	// and have markup similarity above 50%
	for (let i = 0; i < simplePathElements.length; i++) {
		let stringCompareRatio = levenshtein(getElementOuterHtml(simplePathElements[i]).substring(0, 500), issueOuterHtml);

		if (stringCompareRatio > .5) {
			simplePathMatches.push(simplePathElements[i]);
		}
	}

	if (simplePathMatches.length > 1) {
		fullPathElements = document.querySelectorAll(fullPath);
		matchCandidates  = [];

		if (fullPathElements.length > 1) {
			for (let i = 0; i < simplePathMatches.length; i++) {
				let tmpSimple = simplePathMatches[i];

				for (let j = 0; j < fullPathElements.length; j++) {
					let tmpFull = fullPathElements[j];

					if (tmpFull === tmpSimple) {
						matchCandidates.push(tmpSimple);
					}
				}
			}

			if (matchCandidates.length > 1) {
				matchedElements = matchElementByHtml(matchCandidates, issue.outerHtml);
			} else if (matchCandidates.length === 1) {
				matchedElements = matchCandidates;
			}

		} else if (fullPathElements.length == 1) {
			for (let i = 0; i < simplePathMatches.length; i++) {
				if (simplePathMatches[i] === fullPathElements[0]) {
					matchedElements = fullPathElements;
				}
			}
		}

		if (!matchedElements) {
			matchedElements = matchElementByHtml(simplePathMatches, issue.outerHtml);
		}

	} else if (simplePathMatches.length === 1) {
		matchedElements = simplePathMatches;
	} else {
		fullPathElements = document.querySelectorAll(fullPath);

		if (fullPathElements.length > 0) {
			matchedElements = fullPathElements;
		}
	}

	if (matchedElements && matchedElements.length) {
		matchedElements = matchedElements[0];
	}

	return matchedElements;
}

/**
 * Get a blob from base64 data string
 * @param  {String} dataURI
 * @return {Blob}
 */
export const dataURItoBlob = (dataURI) => {
	// Convert base64/URLEncoded data component to raw binary data held in a string
	let byteString;
	if (dataURI.split(',')[0].indexOf('base64') >= 0) {
		byteString = atob(dataURI.split(',')[1]);
	} else {
		byteString = unescape(dataURI.split(',')[1]);
	}

	// Separate out the mime component
	let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

	// Write the bytes of the string to a typed array
	let ia = new Uint8Array(byteString.length);

	for (let i = 0; i < byteString.length; i++) {
		ia[i] = byteString.charCodeAt(i);
	}

	return new Blob([ia], { type: mimeString });
}

/**
 * Get a file from base64 data string
 * @param  {String} dataURI
 * @param  {String} filename
 * @return {File}
 */
export const dataURItoFile = (dataURI, filename = 'filename') => {
	const blob = dataURItoBlob(dataURI);

	return new File([blob], filename);
}

