<template>
	<div class="panel__body">
		<transition name="fade-left" mode="out-in">
			<issue-form v-if="issueFormVisible" />

			<issues v-else-if="issuesVisible" />

			<new-project v-else-if="newProjectVisible" />
		</transition>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import Issues from './Issues.vue';
import IssueForm from './IssueForm.vue';
import NewProject from './NewProject.vue';

export default {
	name: 'panel-body',

	components: {
		Issues,
		IssueForm,
		NewProject,
	},

	computed: {
		...mapGetters([
			'project',
			'tagged'
		]),

		issuesVisible() {
			return this.project;
		},

		newProjectVisible() {
			return !this.project;
		},

		issueFormVisible() {
			return this.tagged;
		}
	}
}
</script>
