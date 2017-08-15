<template>
	<div v-if="!!tagged && !!project" :class="classes">
		<loader v-if="isLoading" />

		<div class="form__inner">
			<form @submit.prevent="handleSubmit">
				<div class="form__head">
					<h3 class="form__title">Submit issue</h3>

					<a @click.prevent="reset" href="#" class="form__close">&times;</a>
				</div>

				<div class="form__body">
					<div class="form__row">
						<input v-model="title" ref="title" type="text" class="field" placeholder="Title" required>
					</div>

					<div class="form__row">
						<textarea v-model="description" rows="5" class="textarea" placeholder="Description"></textarea>
					</div>

					<!-- <div class="form__row">
						<div class="select">
							<select v-model="group" required>
								<option v-for="group in project.groups" :value="group.id">{{group.name}}</option>
							</select>
						</div>
					</div> -->

					<div class="form__row">
						<div class="cols">
							<div class="col col--1of2">
								<div class="table">
									<table>
										<tr>
											<th>Browser</th>
											<td>{{tagged.browser.vendor}} {{tagged.browser.version}}</td>
										</tr>

										<tr>
											<th>OS</th>
											<td>{{tagged.browser.os}}</td>
										</tr>

										<tr>
											<th>Resolution</th>
											<td>{{tagged.browser.width}} x {{tagged.browser.height}}</td>
										</tr>
									</table>
								</div><!-- /.table -->
							</div>

							<div class="col col--1of2">
								<div class="form__screenshot">
									<div class="form__preview">
										<template v-if="screenshot">
											<a @click.prevent="removeScreenshot" href="#" class="form__preview-remove">&times;</a>

											<a :href="screenshot" class="form__preview-image" target="_blank">
												<img :src="screenshot" alt="Screenshot">
											</a>
										</template>
									</div>

									<span>Or</span>

									<div class="file form__file">
										<input type="file" @change="handleScreenshotInputChange">

										<button class="btn">Select file</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="form__actions">
					<button type="submit" class="btn btn--sucecss">Submit Issue</button>

					<button type="reset" class="btn btn--danger" @click.prevent="reset">Cancel</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { appendInIframe } from '../helpers/mixins';
import { getImageFromInputEvent } from '../helpers/utils';
import Loader from './Loader.vue';

export default {
	name: 'issue-form',

	components: {
		Loader
	},

	mixins: [appendInIframe],

	data() {
		return {
			status: '',
			title: null,
			description: null,
			group: null,
			screenshot: null
		};
	},

	computed: {
		...mapGetters([
			'project',
			'tagged'
		]),

		classes() {
			return [
				'form',
				'form-issue',
				{ 'form--loading': this.isLoading }
			];
		},

		isLoading() {
			return this.status === 'loading';
		},

		meta() {
			return this.tagged;
		},

		defaultGroup() {
			if (!this.project.groups.length) {
				return null;
			}

			let defaultGroup = this.project.groups.find(group => {
				return group.name.indexOf('To Do') >= 0;
			});

			if (!defaultGroup) {
				defaultGroup = this.project.groups[0];
			}

			return defaultGroup;
		}
	},

	methods: {
		...mapActions([
			'addIssue',
			'resetTagged'
		]),

		removeScreenshot() {
			this.screenshot = null;
		},

		reset() {
			this.resetTagged();

			this.status = '';
			this.title = null;
			this.description = null;
			this.group = null;
		},

		updateTagged() {
			if (this.tagged && this.tagged.screenshot) {
				this.screenshot = this.tagged.screenshot;
			}

			setTimeout(() => {
				if (this.tagged && this.$refs.title) {
					this.$refs.title.focus();
				}
			}, 100);

		},

		handleScreenshotInputChange(event) {
			getImageFromInputEvent(event).then((result) => {
				if (result.base64string) {
					this.screenshot = result.base64string;
				}
			});
		},

		handleSubmit(event) {
			if (this.isLoading) {
				return;
			}

			const group = this.defaultGroup && this.defaultGroup.id;
			const { title, description } = this;
			const meta = {
				...this.meta,
				screenshot: this.screenshot
			};

			this.status = 'loading';
			this.addIssue({ title, description, group, meta })
				.then(() => this.reset());
		},
	},

	mounted() {
		this.updateTagged();
	},

	watch: {
		tagged() {
			this.updateTagged();
		}
	}
}
</script>
