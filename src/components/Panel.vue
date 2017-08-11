<template>
	<div :class="classes">
		<loader v-if="isLoading" />

		<template v-else>
			<panel-head />

			<panel-body v-if="isAuthorized" />
		</template>

		<button @click.prevent="togglePanel" class="panel__toggle">
			<img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMS4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQ3Ny4xNzUgNDc3LjE3NSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDc3LjE3NSA0NzcuMTc1OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCI+CjxnPgoJPHBhdGggZD0iTTE0NS4xODgsMjM4LjU3NWwyMTUuNS0yMTUuNWM1LjMtNS4zLDUuMy0xMy44LDAtMTkuMXMtMTMuOC01LjMtMTkuMSwwbC0yMjUuMSwyMjUuMWMtNS4zLDUuMy01LjMsMTMuOCwwLDE5LjFsMjI1LjEsMjI1ICAgYzIuNiwyLjYsNi4xLDQsOS41LDRzNi45LTEuMyw5LjUtNGM1LjMtNS4zLDUuMy0xMy44LDAtMTkuMUwxNDUuMTg4LDIzOC41NzV6IiBmaWxsPSIjMDAwMDAwIi8+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==" />
		</button>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { panelStyles } from '../assets/styles';
import Loader from './Loader.vue';
import PanelHead from './PanelHead.vue';
import PanelBody from './PanelBody.vue';

export default {
	name: 'panel',

	components: {
		Loader,
		PanelHead,
		PanelBody
	},

	props: ['frame'],

	computed: {
		...mapGetters([
			'panelCollapsed',
			'status'
		]),

		classes() {
			return [
				'panel',
				{ 'panel--collapsed': this.panelCollapsed }
			];
		},

		isAuthorized() {
			return this.status !== 'unauthorized';
		},

		isLoading() {
			const loadingStatuses = [
				'fetching_user',
				'fetching_project',
			];

			return loadingStatuses.indexOf(this.status) >= 0;
		}
	},

	methods: {
		...mapActions([
			'togglePanel'
		])
	},

	watch: {
		frame() {
			const frameDocument = this.frame && this.frame.contentDocument;

			if (frameDocument && frameDocument.body) {
				const panelStylesheet = document.createElement('style');
				panelStylesheet.innerHTML = panelStyles;

				frameDocument.body.appendChild(this.$el);
				frameDocument.head.appendChild(panelStylesheet);
			}
		}
	}
}
</script>
