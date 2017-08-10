<template>
	<div v-if="!!tagged && !!project" class="form">
		<form @submit.prevent="handleSubmit">
			<div class="form__row">
				<input v-model="title" type="text" class="field" placeholder="Title" required>
			</div>

			<div class="form__row">
				<textarea v-model="description" rows="5" class="textarea" placeholder="Description"></textarea>
			</div>


			<div class="form__row">
				<div class="select">
					<select v-model="group" required>
						<option v-for="group in project.groups" :value="group.id">{{group.name}}</option>
					</select>
				</div>
			</div>

			<div class="form__row">
				<div v-if="tagged.screenshot" class="form__preview">
					<a :href="tagged.screenshot" target="_blank">
						<img :src="tagged.screenshot" alt="Screenshot">
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

export default {
	name: 'issue-form',

	data() {
		return {
			title: null,
			description: null,
			group: null,
		};
	},

	computed: {
		...mapGetters([
			'project',
			'tagged'
		]),

		meta() {
			return this.tagged;
		}
	},

	methods: {
		...mapActions([
			'addIssue',
			'resetTagged'
		]),

		reset() {
			this.resetTagged();

			this.title = null;
			this.description = null;
			this.group = null;
		},

		handleSubmit() {
			const { title, description, group, meta } = this;

			this.addIssue({ title, description, group, meta });
		},
	}
}
</script>
