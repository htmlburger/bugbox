<template>
	<div :class="classes">
		<loader v-if="isLoading" />

		<template v-else>
			<panel-head />

			<panel-body v-if="isAuthorized" />
		</template>

		<template v-if="project">
			<button @click.prevent="initTagging" class="panel__quick-add" title="Add Issue (Ctrl + Shift + A)">
				<img src="../assets/images/bug.svg" />
			</button>
		</template>

		<button @click.prevent="togglePanel" class="panel__toggle" title="Toggle Panel">
			<img src="../assets/images/arrow-right.svg" />
		</button>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { appendInIframe } from '../helpers/mixins';
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

	mixins: [appendInIframe],

	computed: {
		...mapGetters([
			'panelCollapsed',
			'project',
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
			'initTagging',
			'togglePanel'
		])
	}
}
</script>
