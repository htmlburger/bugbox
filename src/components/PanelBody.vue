<template>
	<div class="panel__body">
		<transition name="fade-left" mode="out-in">
			<select-project v-if="selectProjectVisible" />

			<issues v-else-if="issuesVisible" />

			<new-project v-else-if="newProjectVisible" />
		</transition>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import Issues from 'components/Issues.vue';
import NewProject from 'components/NewProject.vue';
import SelectProject from 'components/SelectProject.vue';

export default {
	name: 'panel-body',

	components: {
		Issues,
		NewProject,
		SelectProject
	},

	computed: {
		...mapGetters([
			'status',
			'user',
			'project'
		]),

		issuesVisible() {
			return this.project;
		},

		newProjectVisible() {
			return !this.project && this.user;
		},

		selectProjectVisible() {
			return this.status === 'await_project_selection';
		}
	}
}
</script>
