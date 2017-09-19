<template>
	<div :class="classes">
		<loader v-if="isLoading" />

		<form @submit.prevent="handleFromSubmit">
			<div class="form__row">
				<label class="form__label">Project Name:</label>

				<input v-model="projectName" class="field" type="text">
			</div>

			<div class="form__row">
				<label class="form__label">Site Base URL:</label>

				<template v-if="!canChange" >
					<input :value="baseUrl" class="field" type="text" readonly>

					<small>
						<a @click.prevent="canChange = true" href="#">Change</a>
					</small>
				</template>

				<list-urls v-else v-model="baseUrl" />
			</div>

			<div class="form__actions">
				<button type="submit" class="btn">Create New Project</button>
			</div>
		</form>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Loader from 'components/Loader.vue';
import ListUrls from 'components/ListUrls.vue';

export default {
	name: 'new-project',

	components: {
		Loader,
		ListUrls
	},

	data() {
		return {
			status: '',
			canChange: false,
			projectName: document.title,
			baseUrl: window.location.origin
		};
	},

	computed: {
		...mapGetters([
			'project'
		]),

		classes() {
			return [
				'form',
				{ 'form--loading': this.isLoading }
			];
		},

		isLoading() {
			return this.status === 'loading';
		},

		payload() {
			return {
				name: this.projectName,
				baseUrl: this.baseUrl
			};
		}
	},

	methods: {
		...mapActions([
			'initProject'
		]),

		handleFromSubmit() {
			if (this.isLoading) {
				return;
			}

			this.status = 'loading';
			this.initProject(this.payload)
				.then((response) => {
					this.status = '';
				});
		}
	}
}
</script>
