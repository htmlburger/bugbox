<template>
	<div class="panel">
		<loader v-if="isLoading" />

		<template v-else>
			<panel-head />

			<panel-body v-if="isAuthorized" />
		</template>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
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
			'status'
		]),

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
