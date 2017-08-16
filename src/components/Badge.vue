<template>
	<span class="badge" :style="style">{{value}}</span>
</template>

<script>
import { stringToColour } from '../helpers/utils';

export default {
	name: 'badge',

	props: {
		value: {
			requred: true
		}
	},

	computed: {
		style() {
			return {
				backgroundColor: this.backgroundColor
			};
		},

		backgroundColor() {
			switch (this.value) {
				case 'To Do':
					return '#88a8bb';
				case 'Doing':
					return '#72aa67';
				case 'Done':
					return '#b1b1b1';
				default:
					return stringToColour(this.value);
			}
		}
	}
}
</script>
