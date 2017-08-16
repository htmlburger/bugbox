<template>
	<ul class="list-urls">
		<li v-for="url in urls">
			<label class="radio">
				<input v-model="innerValue" :value="url" class="radio__input" type="radio" name="url">

				<span class="radio__label">{{url}}</span>
			</label>
		</li>

		<li class="list-urls__custom">
			<label class="radio">
				<input class="radio__input" type="radio" name="url" >

				<span class="radio__label">Custom</span>

				<input v-model="innerValue" class="field" type="text" name="url">
			</label>
		</li>
	</ul>
</template>

<script>
import ListUrls from './ListUrls.vue';

export default {
	name: 'list-urls',

	prop: ['value'],

	data() {
		return {
			innerValue: this.value
		};
	},

	computed: {
		urls() {
			const origin = window.location.origin;
			const paths = window.location.pathname.replace(/\/$/, '').split('/');
			const urls = [];

			paths.forEach((path, index, arr) => {
				const url = origin + paths.slice(0, arr.length - index).join('/');
				urls.push(url);
			});

			return urls;
		},
	},

	mounted() {
		if (!this.value && this.urls.length) {
			this.innerValue = this.urls[0];
		}
	},

	watch: {
		innerValue() {
			this.$emit('input', this.innerValue);
		}
	}
}
</script>
