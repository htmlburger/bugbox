<template>
	<div v-if="issues" class="issues">
		<transition name="fade-left" mode="out-in">
			<issue-details v-if="selectedIssue" :issue="selectedIssue" :groups="groups" :key="selectedIssue.id" />

			<div v-else class="issues__list">
				<issue v-for="issue in issues" :issue="issue" :groups="groups" :is-selected="issue.id === selectedIssueId" />
			</div>
		</transition>

		<div v-if="!issues.length" class="issues__message">No issues found!</div>
	</div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex';
import Issue from './Issue.vue';
import IssueDetails from './IssueDetails.vue';

export default {
	name: 'issues',

	components: {
		Issue,
		IssueDetails
	},

	computed: {
		...mapGetters([
			'issues',
			'groups',
			'selectedIssueId'
		]),

		selectedIssue() {
			return this.issues && this.issues.find(issue => issue.id === this.selectedIssueId);
		},
	},

	methods: {
		...mapActions([
			'resetSelectedIssue'
		]),
	}
}
</script>
