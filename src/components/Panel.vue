<template>
	<div :class="classes">
		<div class="panel__inner">
			<loader v-if="isLoading" />

			<template v-else>
				<template v-if="isAuthorized">
					<panel-head />

					<panel-body />

					<panel-foot />
				</template>

				<authorize v-else />
			</template>
		</div>

		<div class="panel__actions">
			<button v-if="project" @click.prevent="initTagging" class="panel__quick-add" title="Add Issue (Ctrl + Shift + A)">
				<span>
					<i class="ico-pin"></i>
					<i class="ico-pin-highlighted"></i>
				</span>
			</button>

			<button @click.prevent="togglePanel" class="panel__toggle" title="Toggle Panel">
				<i class="ico-chevron-right"></i>
			</button>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { appendInIframe } from 'helpers/mixins';
import Loader from 'components/Loader.vue';

import Authorize from 'components/Authorize.vue';
import PanelHead from 'components/PanelHead.vue';
import PanelBody from 'components/PanelBody.vue';
import PanelFoot from 'components/PanelFoot.vue';

export default {
	name: 'panel',

	components: {
		Loader,
		Authorize,
		PanelHead,
		PanelBody,
		PanelFoot
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
