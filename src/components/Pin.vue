<template>
	<div :class="classes" :style="style" @click.prevent.stop="selectIssue(issue.id)"></div>
</template>

<script>
import { mapActions } from 'vuex';
import { getMatchedElement, getElementOffset } from '../helpers/utils';
import scroll from 'scroll';

export default {
	name: 'pin',

	props: {
		issue: {
			required: true
		},

		selected: {
			default: false
		}
	},

	data() {
		const pin = this.issue.meta.pin || {};
		const left = -10000;
		const top = -10000;

		return {
			element: getMatchedElement(this.issue),
			position: {
				left,
				top
			},
		};
	},

	computed: {
		pin() {
			return this.issue.meta.pin;
		},

		classes() {
			return [
				'beatle__pin',
				{ 'beatle__pin--selected': this.selected }
			];
		},

		style() {
			return {
				left: `${this.position.left}px`,
				top: `${this.position.top}px`
			};
		},
	},

	methods: {
		...mapActions([
			'selectIssue'
		]),

		/**
		 * Set pin update interval
		 */
		setUpdateInterval() {
			this.update = setInterval(() => {
				if (this.element) {
					this.updatePosition();
				} else {
					this.updateMatchedElement();
				}
			}, 100);
		},

		/**
		 * Update position data
		 * @return {Void}
		 */
		updatePosition() {
			const offset = getElementOffset(this.element);
			const left = offset.left + this.pin.offsetX;
			const top = offset.top + this.pin.offsetY;

			if (this.position.left !== left || this.position.top !== top) {
				this.position = {
					left,
					top
				};
			}
		},

		/**
		 * Update matched element reference data
		 * @return {Void}
		 */
		updateMatchedElement() {
			this.element = getMatchedElement(this.issue.meta);
		},

		/**
		 * Scroll page to pin position
		 * @return {Void}
		 */
		scrollInView() {
			const scrollOffset = 40;

			scroll.top(document.body, this.position.top - scrollOffset);
		},

		/**
		 * Handle selected pin action
		 * @return {Void}
		 */
		handleSelected() {
			if (this.selected) {
				setTimeout(() => {
					this.scrollInView();
				}, 100);
			}
		}
	},

	mounted() {
		this.setUpdateInterval();
	},

	watch: {
		selected() {
			this.handleSelected();
		},

		element() {
			this.handleSelected();
		},
	}
}
</script>

<style scoped>
	.beatle .beatle__pin { position: absolute; left: -10000px; top: -10000px; width: 32px; height: 32px; margin: -32px 0 0 -16px; background-image: url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDUyIDUyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MiA1MjsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSIzMnB4IiBoZWlnaHQ9IjMycHgiPgo8cGF0aCBzdHlsZT0iZmlsbDojMTA4MUUwOyIgZD0iTTM4Ljg1Myw1LjMyNEwzOC44NTMsNS4zMjRjLTcuMDk4LTcuMDk4LTE4LjYwNy03LjA5OC0yNS43MDYsMGgwICBDNi43NTEsMTEuNzIsNi4wMzEsMjMuNzYzLDExLjQ1OSwzMUwyNiw1MmwxNC41NDEtMjFDNDUuOTY5LDIzLjc2Myw0NS4yNDksMTEuNzIsMzguODUzLDUuMzI0eiBNMjYuMTc3LDI0Yy0zLjMxNCwwLTYtMi42ODYtNi02ICBzMi42ODYtNiw2LTZzNiwyLjY4Niw2LDZTMjkuNDkxLDI0LDI2LjE3NywyNHoiLz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==); background-size: 100% 100%; cursor: pointer; transition: transform .2s; }
	.beatle .beatle__pin:hover { transform: translateY(-5px); }

	.beatle .beatle__pin--selected { filter: hue-rotate(135deg); }
</style>
