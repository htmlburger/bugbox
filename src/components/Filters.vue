<template>
	<div class="filters">
		<div class="filters__section">
			<h5 class="filters__section-title">Visible Issues:</h5>

			<ul class="list-options">
				<li>
					<label class="radio">
						<input :value="true" v-model="innerValue.currentPageOnly" type="radio" class="radio__input" name="currentPageOnly">
						<span class="radio__label">Current Page Issues</span>
					</label>
				</li>

				<li>
					<label class="radio">
						<input :value="false" v-model="innerValue.currentPageOnly" type="radio" class="radio__input" name="currentPageOnly">
						<span class="radio__label">All Issues</span>
					</label>
				</li>
			</ul>
		</div>

		<div class="filters__section">
			<h5 class="filters__section-title">Issues Group:</h5>

			<ul class="list-options">
				<li>
					<label class="radio">
						<input :value="null" v-model="innerValue.group" type="radio" class="radio__input" name="group">
						<span class="radio__label">All</span>
					</label>
				</li>

				<li v-for="group in groups">
					<label class="radio">
						<input :value="group.id" v-model="innerValue.group" type="radio" class="radio__input" name="group">
						<span class="radio__label">{{group.name}}</span>
					</label>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
	name: 'filters',

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
			innerValue: { ...this.filters }
		};
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
