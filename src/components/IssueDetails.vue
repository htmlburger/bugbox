<template>
	<div v-if="issue" class="issue-details">
		<div class="issue__actions">
			<a @click.prevent="resetSelectedIssue" href="#" class="issue__back">
				<i class="ico-chevron-left"></i> Back
			</a>

			<a :href="issue.url" @click.stop class="issue__link" target="_blank">
				<i class="ico-link-white"></i> Open Issue In Trello
			</a>
		</div>

		<div class="issue__inner">
			<h4 class="issue__title">
				<badge :value="group.name" class="issue__badge" />

				<span v-if="issue.badges" class="issue__comments">
					<i class="ico-comment"></i>

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

			<div v-if="!issue.hasMatched" class="issue__section">
				<div class="issue__error">* Can't match with element in the current page context.</div>
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
				<h5 class="issue__section-title">Meta</h5>

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
				<h5 class="issue__section-title">Screenshot</h5>

				<div class="issue__screenshots">
					<ul>
						<li v-for="screenshot in screenshots">
							<a :href="screenshot.url" target="_blank">
								<img v-if="screenshot.previews.length > 1" :src="screenshot.previews[1].url">
								<img v-else :src="screenshot.url">
							</a>
						</li>
					</ul>
				</div>
			</div>

			<div v-if="!isOnCurrentPage" class="issue__section">
				<h5 class="issue__section-title">Issue Origin</h5>

				<a :href="issue.meta.url" class="issue__origin" target="_top">
					<i class="ico-link"></i>Issue Origin URL
				</a>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { fromNow } from 'helpers/filters';
import Loader from 'components/Loader.vue';
import Badge from 'components/Badge.vue';

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
			groupId: this.issue && this.issue.idList
		};
	},

	computed: {
		...mapGetters([
			'currentUrl'
		]),

		/**
		 * Get issue group object.
		 * @return {Object}
		 */
		group() {
			if (this.groups) {
				return this.groups.find(group => group.id === this.groupId);
			}
		},

		/**
		 * Get issue screenshots array.
		 * @return {Array}
		 */
		screenshots() {
			if (this.issue && !this.issue.attachments) {
				return [];
			}

			return this.issue.attachments.filter(attachment => {
				return attachment.name === 'Screenshot';
			});
		},

		/**
		 * Whether state is changing group.
		 * @return {Boolean} [description]
		 */
		isChangingGroup() {
			return this.status === 'changing_group';
		},

		/**
		 * Whether issue was tagged on the current active page
		 * @return {Boolean}
		 */
		isOnCurrentPage() {
			if (!this.issue.meta || !this.issue.meta.url) {
				return true;
			}

			const issueUrl = this.issue.meta.url.replace(/\/$/, '');
			const currentUrl = this.currentUrl.replace(/\/?\#issue\-\w+$/, '');

			return issueUrl === currentUrl;
		}
	},

	methods: {
		...mapActions([
			'resetSelectedIssue',
			'changeIssueGroup'
		]),

		/**
		 * Handle change group.
		 * @param  {[type]} event [description]
		 * @return {[type]}       [description]
		 */
		handleChangeGroup(event) {
			this.status = 'changing_group';

			const payload = {
				cardId: this.issue.id,
				groupId: this.groupId
			};

			return this.changeIssueGroup(payload)
				.then((response) => {
					this.status = '';
				});
		}
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
