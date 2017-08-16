<template>
	<div v-if="issue" class="issue-details">
		<a @click.prevent="resetSelectedIssue" href="#" class="issue__back">&laquo; Back</a>

		<div class="issue__inner">
			<h4 class="issue__title">
				<badge :value="group.name" class="issue__badge" /> {{issue.name}}
			</h4>

			<div v-if="issue.badges" class="issue__comments">
				<img src="../assets/images/comment.svg" />
				<span>{{issue.badges.comments || 0}}</span>
			</div>

			<div class="issue__description">
				<p>{{issue.desc}}</p>
			</div>

			<div v-if="issue.meta && issue.meta.browser" class="table issue__meta">
				<table>
					<tr>
						<th>Resolution</th>
						<td>{{issue.meta.browser.width}} x {{issue.meta.browser.height}}</td>
					</tr>

					<tr>
						<th>Browser</th>
						<td>{{issue.meta.browser.vendor}} {{issue.meta.browser.version}}</td>
					</tr>

					<tr>
						<th>OS</th>
						<td>{{issue.meta.browser.os}}</td>
					</tr>
				</table>
			</div>

			<div v-if="screenshots.length" class="issue__screenshots">
				<strong>Screenshot:</strong>

				<ul>
					<li v-for="screenshot in screenshots">
						<a :href="screenshot.url" target="_blank">
							<img v-if="screenshot.previews.length" :src="screenshot.previews[0].url">
							<img v-else :src="screenshot.url">
						</a>
					</li>
				</ul>
			</div>

			<a :href="issue.url" @click.stop class="issue__link" target="_blank">
				<img src="../assets/images/external.svg" />Open in Trello
			</a>
		</div>
	</div>
</template>

<script>
import { mapActions } from 'vuex';
import Badge from './Badge.vue';

export default {
	name: 'issue-details',

	components: {
		Badge
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
		group() {
			if (this.groups) {
				return this.groups.find(group => group.id === this.issue.idList);
			}
		},

		screenshots() {
			if (this.issue && !this.issue.attachments) {
				return [];
			}

			return this.issue.attachments.filter(attachment => {
				return attachment.name === 'Screenshot';
			});
		}
	},

	methods: {
		...mapActions([
			'resetSelectedIssue'
		]),
	}
}
</script>
