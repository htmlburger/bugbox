<template>
	<div v-if="issues" class="issues">
		<transition name="fade-left" mode="out-in">
			<issue-details v-if="selectedIssue" :issue="selectedIssue" :groups="groups" :key="selectedIssue.id" />

			<div v-else class="issues__list">
				<filters :filters="filters" :groups="groups" />

				<div class="issues__count">
					Showing {{visibleIssues.length}} of  {{issues.length}} {{issues.length !== 1 ? 'issues' : 'issue' }}
				</div>

				<transition name="fade-left" mode="out-in">
					<div :key="filters.currentPageOnly + filters.group" class="issues__holder">
						<issue v-for="issue in visibleIssues" :key="issue.id" :issue="issue" :groups="groups" :is-selected="issue.id === selectedIssueId" />
					</div>
				</transition>
			</div>
		</transition>

		<div v-if="!issues.length" class="issues__message">No issues found!</div>
	</div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex';
import Filters from 'components/Filters.vue';
import Issue from 'components/Issue.vue';
import IssueDetails from 'components/IssueDetails.vue';

export default {
	name: 'issues',

	components: {
		Filters,
		Issue,
		IssueDetails
	},

	computed: {
		...mapGetters([
			'issues',
			'groups',
			'filters',
			'visibleIssues',
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
