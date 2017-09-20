<template>
	<div class="bugbox__pin bugbox__pin--temp" :style="style"></div>
</template>

<script>
export default {
	name: 'temp-pin',

	props: {
		left: {
			default: -10000
		},

		top: {
			default: -10000
		}
	},

	computed: {
		/**
		 * Get computed style.
		 * @return {Object}
		 */
		style() {
			return {
				left: `${this.left}px`,
				top: `${this.top}px`
			};
		},
	}
}
</script>
