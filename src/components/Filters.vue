<template>
	<div :class="classes">
		<button class="filters__toggle" @click.prevent="expanded = !expanded">
			<i class="ico-filter"></i> Filter Issues <i class="ico-chevron-down"></i>
		</button>

		<transition name="slide-down">
			<div v-if="expanded" class="filters__inner">
				<div class="filters__body">
					<div class="filters__section filters__section--large">
						<h5 class="filters__section-title">Filter Issues</h5>

						<custom-select v-model="innerValue.currentPageOnly" :options="visibilityOptions" name="currentPageOnly" />
					</div>

					<div class="filters__section filters__section--small">
						<h5 class="filters__section-title">Issues Group</h5>

						<custom-select v-model="innerValue.group" :options="groupsOptions" name="group" />
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
import { mapActions } from 'vuex';
import CustomSelect from 'components/CustomSelect.vue';

export default {
	name: 'filters',

	components: {
		CustomSelect
	},

	props: {
		filters: {
			requred: true
		},

		groups: {
			requred: true
		}
	},

	data() {
		return {
			expanded: false,
			innerValue: { ...this.filters }
		};
	},

	computed: {
		/**
		 * Get classes object.
		 * @return {Object}
		 */
		classes() {
			return [
				'filters',
				{ 'filters--expanded': this.expanded }
			];
		},

		/**
		 * Get visibility options object.
		 * @return {Object}
		 */
		visibilityOptions() {
			return [
				{ value: true, label: 'Current Page Issues' },
				{ value: false, label: 'All Issues' }
			];
		},

		/**
		 * Get groups options object.
		 * @return {Object}
		 */
		groupsOptions() {
			const groups = this.groups.map(group => ({
				value: group.id,
				label: group.name
			}));

			return [
				{ value: null, label: 'All' },
				...groups
			];
		}
	},

	methods: {
		...mapActions([
			'setFilters'
		])
	},

	watch: {
		innerValue: {
			handler(val) {
				this.setFilters(val);
			},

			deep: true
		},

		filters(val, oldVal) {
			const isDifferent = Object.keys(val).some(key => {
				return val[key] !== oldVal[key];
			});

			if (isDifferent) {
				this.innerValue = { ...this.filters };
			}
		}
	}
}
</script>
