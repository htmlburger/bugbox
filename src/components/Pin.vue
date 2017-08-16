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
				'bugbox__pin',
				{ 'bugbox__pin--active': this.selected }
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
			if (this.issue.meta) {
				this.element = getMatchedElement(this.issue.meta);
			}
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

	created() {
		this.updateMatchedElement();
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
