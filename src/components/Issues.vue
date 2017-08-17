<template>
	<div v-if="issues" class="issues">
		<transition name="fade-left" mode="out-in">
			<issue-details v-if="selectedIssue" :issue="selectedIssue" :groups="groups" :key="selectedIssue.id" />

			<div v-else class="issues__list">
				<div class="filters">
					<div class="filters__section">
						<h5 class="filters__section-title">Visible Issues:</h5>

						<ul class="list-options">
							<li>
								<label class="radio">
									<input :value="true" v-model="filters.currentPageOnly" type="radio" class="radio__input" name="currentPageOnly">
									<span class="radio__label">Current Page Issues</span>
								</label>
							</li>

							<li>
								<label class="radio">
									<input :value="false" v-model="filters.currentPageOnly" type="radio" class="radio__input" name="currentPageOnly">
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
									<input :value="null" v-model="filters.group" type="radio" class="radio__input" name="group">
									<span class="radio__label">All</span>
								</label>
							</li>

							<li v-for="group in groups">
								<label class="radio">
									<input :value="group.id" v-model="filters.group" type="radio" class="radio__input" name="group">
									<span class="radio__label">{{group.name}}</span>
								</label>
							</li>
						</ul>
					</div>

					<div class="filters__section">
						<div class="filters__count">
							<em>Showing {{visibleIssues.length}} of  {{issues.length}} {{issues.length !== 1 ? 'issues' : 'issue' }}</em>
						</div>
					</div>
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
import Issue from './Issue.vue';
import IssueDetails from './IssueDetails.vue';

export default {
	name: 'issues',

	components: {
		Issue,
		IssueDetails
	},

	data() {
		return {
			filters: {
				currentPageOnly: true,
				group: null
			}
		};
	},

	computed: {
		...mapGetters([
			'issues',
			'groups',
			'selectedIssueId'
		]),

		visibleIssues() {
			let issues = this.issues;

			if (this.filters.currentPageOnly) {
				issues = issues.filter(issue => {
					if (!issue.meta) {
						return false;
					}

					const currentPageUrl = window.location.href.replace(/\#issue\-(.+)$/, '');

					return currentPageUrl === issue.meta.url;
				});
			}

			if (this.filters.group) {
				issues = issues.filter(issue => issue.idList === this.filters.group);
			}

			return issues;
		},

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
