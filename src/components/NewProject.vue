<template>
	<div :class="classes">
		<loader v-if="isLoading" />

		<p>There is no project associated with this URL</p>

		<form @submit.prevent="handleFromSubmit">
			<div class="form__row">
				<label class="form__label">Project Name:</label>

				<input v-model="projectName" class="field" type="text">
			</div>

			<div class="form__row">
				<label class="form__label">Site Base URL:</label>

				<list-urls v-model="baseUrl" />
			</div>

			<div class="form__actions">
				<button type="submit" class="btn btn--success">Create New Project</button>
			</div>
		</form>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Loader from './Loader.vue';
import ListUrls from './ListUrls.vue';

export default {
	name: 'new-project',

	components: {
		Loader,
		ListUrls
	},

	data() {
		return {
			status: '',
			projectName: document.title,
			baseUrl: null
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
