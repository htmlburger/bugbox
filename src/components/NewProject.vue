<template>
	<div v-if="!project" class="cta">
		<p>There is no project associated with this URL</p>

		<div class="form">
			<div class="form__row">
				<label class="form__label">Project Name:</label>

				<input v-model="projectName" class="field" type="text">
			</div>

			<div class="form__row">
				<label class="form__label">Site Base URL:</label>

				<list-urls v-model="baseUrl" />
			</div>

			<div class="form__actions">
				<button class="btn btn--success" @click.prevent="initProject(payload)">Create New Project</button>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ListUrls from './ListUrls.vue';

export default {
	name: 'new-project',

	components: {
		ListUrls
	},

	data() {
		return {
			projectName: document.title,
			baseUrl: null
		};
	},

	computed: {
		...mapGetters([
			'project'
		]),

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
	}
}
</script>
