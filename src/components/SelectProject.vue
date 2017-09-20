<template>
	<div :class="classes">
		<loader v-if="isLoading" />

		<form @submit.prevent="handleSubmit">
			<div class="form__row">
				<label class="form__label">Select a project</label>

				<div class="select">
					<select v-model="selected" required>
						<option v-for="project in projectsList" :value="project.id">{{project.name}}</option>
					</select>
				</div>
			</div>

			<div class="form__actions">
				<button type="submit" class="btn">Select</button>
			</div>
		</form>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Loader from 'components/Loader.vue';

export default {
	name: 'select-project',

	components: {
		Loader
	},

	data() {
		return {
			status: '',
			selected: null
		};
	},

	computed: {
		...mapGetters([
			'projectsList'
		]),

		/**
		 * Get classes object.
		 * @return {Object}
		 */
		classes() {
			return [
				'form',
				{ 'form--loading': this.isLoading }
			];
		},

		/**
		 * Whether component is loading.
		 * @return {Boolean}
		 */
		isLoading() {
			return this.status === 'loading';
		}
	},

	mounted() {
		/**
		 * Set initial value
		 */
		this.selected = this.projectsList && this.projectsList[0].id;
	},

	methods: {
		...mapActions([
			'getProject'
		]),

		/**
		 * Handle form submit.
		 * @param  {Event} event
		 * @return {void}
		 */
		handleSubmit(event) {
			this.status = 'loading';

			this.getProject(this.selected)
				.then((response) => {
					this.status = '';
				});
		}
	}
}
</script>
