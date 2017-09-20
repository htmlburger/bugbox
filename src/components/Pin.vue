<template>
	<div :class="classes" :style="style" @click.prevent.stop="selectIssue(issue.id)"></div>
</template>

<script>
import { mapActions } from 'vuex';
import { getMatchedElement, getElementOffset } from 'helpers/utils';
import scroll from 'scroll';

export default {
	name: 'pin',

	props: {
		issue: {
			required: true
		},

		selected: {
			default: false
		},

		groups: {
			default: []
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
		/**
		 * Get pin object.
		 * @return {Object}
		 */
		pin() {
			return this.issue.meta.pin;
		},

		/**
		 * Get classes object.
		 * @return {Object}
		 */
		classes() {
			return [
				'bugbox__pin',
				{ 'bugbox__pin--active': this.selected },
				{ 'bugbox__pin--done': this.group && this.group.name === 'Done' },
			];
		},

		/**
		 * Get computed style.
		 * @return {Object}
		 */
		style() {
			return {
				left: `${this.position.left}px`,
				top: `${this.position.top}px`
			};
		},

		/**
		 * Get issue group reference.
		 * @return {Object}
		 */
		group() {
			return this.groups.find(group => group.id === this.issue.idList);
		}
	},

	methods: {
		...mapActions([
			'selectIssue'
		]),

		/**
		 * Set pin update interval.
		 * @return {void}
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
		 * Update position data.
		 * @return {void}
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
		 * Update matched element reference data.
		 * @return {void}
		 */
		updateMatchedElement() {
			if (this.issue.meta) {
				this.element = getMatchedElement(this.issue.meta);
			}
		},

		/**
		 * Scroll page to pin position.
		 * @return {void}
		 */
		scrollInView() {
			const scrollOffset = 50;

			scroll.top(document.body, this.position.top - scrollOffset);
		},

		/**
		 * Handle selected pin action.
		 * @return {void}
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
