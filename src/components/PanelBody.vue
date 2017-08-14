<template>
	<div class="panel__body">
		<transition name="fade-left" mode="out-in">
			<issue-form v-if="issueFormVisible" />

			<issues v-else-if="issuesVisible" />

			<select-project v-else-if="selectProjectVisible" />

			<new-project v-else-if="newProjectVisible" />
		</transition>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import Issues from './Issues.vue';
import IssueForm from './IssueForm.vue';
import NewProject from './NewProject.vue';
import SelectProject from './SelectProject.vue';

export default {
	name: 'panel-body',

	components: {
		Issues,
		IssueForm,
		NewProject,
		SelectProject
	},

	computed: {
		...mapGetters([
			'status',
			'user',
			'project',
			'tagged'
		]),

		issuesVisible() {
			return this.project;
		},

		newProjectVisible() {
			return !this.project && this.user;
		},

		selectProjectVisible() {
			return this.status === 'await_project_selection';
		},

		issueFormVisible() {
			return this.tagged;
		}
	}
}
</script>
