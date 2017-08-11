<template>
	<div v-if="!!tagged && !!project" :class="classes">
		<loader v-if="isLoading" />

		<form @submit.prevent="handleSubmit">
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
				<div v-if="screenshot" class="form__preview">
					<a @click.prevent="removeScreenshot" href="#" class="form__preview-remove">
						&times;
					</a>

					<a :href="screenshot" target="_blank">
						<img :src="screenshot" alt="Screenshot">
					</a>
				</div>
			</div>

			<pre>
{{tagged.browser.vendor}} {{tagged.browser.version}}
{{tagged.browser.os}}
{{tagged.browser.width}} x {{tagged.browser.height}}
			</pre>

			<div class="form__actions">
				<button type="submit" class="btn btn--sucecss">Submit Issue</button>

				<button type="reset" class="btn btn--danger" @click.prevent="reset">Cancel</button>
			</div>
		</form>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Loader from './Loader.vue';

export default {
	name: 'issue-form',

	components: {
		Loader
	},

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

			if (this.tagged) {
				this.$refs.title.focus();
			}
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
