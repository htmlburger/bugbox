<template>
	<div class="issue" @click.prevent="selectIssue(issue.id)">
		<div class="issue__inner">
			<a :href="issue.url" @click.stop class="issue__link" target="_blank" title="Open in Trello">
				<i class="ico-link"></i>
			</a>

			<h5 class="issue__title">
				<badge :value="group.name" class="issue__badge" /> {{issue.name}}
			</h5>

			<ul class="issue__meta">
				<li :title="issue.dateLastActivity">{{issue.dateLastActivity | fromNow}}</li>

				<template v-if="issue.badges">
					<li>
						{{issue.badges.comments || 0}} {{issue.badges.comments !== 1 ? 'comments' : 'comment'}}
					</li>
				</template>
			</ul>
		</div>
	</div>
</template>

<script>
import { mapActions } from 'vuex';
import { fromNow } from 'helpers/filters';
import Badge from 'components/Badge.vue';

export default {
	name: 'issue',

	components: {
		Badge,
	},

	props: {
		issue: {
			required: true
		},

		groups: {
			required: true
		}
	},

	computed: {
		/**
		 * Get issue group object.
		 * @return {Object}
		 */
		group() {
			if (this.groups) {
				return this.groups.find(group => group.id === this.issue.idList);
			}
		}
	},

	methods: {
		...mapActions([
			'selectIssue'
		])
	},

	filters: {
		fromNow
	}
}
</script>
