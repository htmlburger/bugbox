<template>
	<div v-if="issue" class="issue-details">
		<a @click.prevent="resetSelectedIssue" href="#" class="issue__back">&laquo; Back</a>

		<div class="issue__inner">
			<h4 class="issue__title">
				<badge :value="group.name" class="issue__badge" />

				<span v-if="issue.badges" class="issue__comments">
					<img src="../assets/images/comment.svg" />

					<span>{{issue.badges.comments || 0}}</span>
				</span>

				{{issue.name}}
			</h4>

			<div v-if="issue.desc" class="issue__section">
				<h5 class="issue__section-title">Description:</h5>

				<div class="issue__description">
					{{issue.desc}}
				</div>
			</div>

			<div class="issue__section">
				<h5 class="issue__section-title">Change group:</h5>

				<div class="select">
					<loader v-if="isChangingGroup" />

					<select v-model="groupId" :disabled="isChangingGroup" @change="handleChangeGroup">
						<option v-for="group in groups" :value="group.id">{{group.name}}</option>
					</select>
				</div>
			</div>

			<div v-if="issue.meta && issue.meta.browser" class="issue__section">
				<h5 class="issue__section-title">Meta:</h5>

				<div class="table issue__meta">
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
			</div>

			<div v-if="screenshots.length" class="issue__section">
				<h5 class="issue__section-title">Screenshot:</h5>

				<div class="issue__screenshots">
					<ul>
						<li v-for="screenshot in screenshots">
							<a :href="screenshot.url" target="_blank">
								<img v-if="screenshot.previews.length" :src="screenshot.previews[0].url">
								<img v-else :src="screenshot.url">
							</a>
						</li>
					</ul>
				</div>
			</div>

			<div v-if="screenshots.length" class="issue__section">
				<h5 class="issue__section-title">Log:</h5>

				<div class="issue__log">
					<loader v-if="!this.actions" />

					<ul>
						<li v-for="action in actions">
							<strong>{{action.memberCreator.fullName}}</strong>
							<em>{{action.type}}</em>
							<span :title="action.date">{{action.date | fromNow}}</span>
						</li>
					</ul>
				</div>

				<a :href="issue.url" @click.stop class="issue__link" target="_blank">
					<img src="../assets/images/external.svg" />Open in Trello
				</a>
			</div>

		</div>
	</div>
</template>

<script>
import { mapActions } from 'vuex';
import { fromNow } from '../helpers/filters';
import Loader from './Loader.vue';
import Badge from './Badge.vue';

export default {
	name: 'issue-details',

	components: {
		Loader,
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

	data() {
		return {
			status: '',
			groupId: this.issue && this.issue.idList,
			actions: null,
		};
	},

	computed: {
		group() {
			if (this.groups) {
				return this.groups.find(group => group.id === this.groupId);
			}
		},

		screenshots() {
			if (this.issue && !this.issue.attachments) {
				return [];
			}

			return this.issue.attachments.filter(attachment => {
				return attachment.name === 'Screenshot';
			});
		},

		isChangingGroup() {
			return this.status === 'changing_group';
		}
	},

	methods: {
		...mapActions([
			'resetSelectedIssue',
			'changeIssueGroup',
			'getIssueActions'
		]),

		updateIssueActions() {
			return this.getIssueActions(this.issue.id)
				.then((actions) => {
					this.actions = actions
				});
		},

		handleChangeGroup(event) {
			this.status = 'changing_group';

			const payload = {
				cardId: this.issue.id,
				groupId: this.groupId
			};

			return this.changeIssueGroup(payload)
				.then((response) => {
					this.status = '';
					this.updateIssueActions();
				});
		}
	},

	created() {
		this.updateIssueActions();
	},

	filters: {
		fromNow
	},

	watch: {
		issue: {
			handler() {
				this.groupId = this.issue.idList;
			},
			deep: true
		}
	}
}
</script>
