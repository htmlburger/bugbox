<template>
	<div :class="classes">
		<div class="panel__inner">
			<loader v-if="isLoading" />

			<template v-else>
				<template v-if="isAuthorized">
					<panel-head />

					<panel-body />
				</template>

				<authorize v-else />
			</template>
		</div>

		<button v-if="project" @click.prevent="initTagging" class="panel__quick-add" title="Add Issue (Ctrl + Shift + A)">
			<img src="../assets/images/bug.svg" />
		</button>

		<button @click.prevent="togglePanel" class="panel__toggle" title="Toggle Panel">
			<img src="../assets/images/arrow-right.svg" />
		</button>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { appendInIframe } from '../helpers/mixins';
import Loader from './Loader.vue';

import Authorize from './Authorize.vue';
import PanelHead from './PanelHead.vue';
import PanelBody from './PanelBody.vue';

export default {
	name: 'panel',

	components: {
		Loader,
		Authorize,
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
				'initilized',
				'fetching_user',
				'fetching_project'
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
