<template>
	<div class="panel">
		<user :user="user" />

		<issues />

		<new-project />

		&nbsp;&nbsp;<button @click.prevent="initTagging" class="btn">+ Add Issue</button>

		<issue-form />
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { panelStyles } from '../assets/styles';
import User from './User.vue';
import Issues from './Issues.vue';
import IssueForm from './IssueForm.vue';
import NewProject from './NewProject.vue';

export default {
	name: 'panel',

	components: {
		User,
		Issues,
		IssueForm,
		NewProject,
	},

	props: ['frame'],

	data () {
		return {
			state: '',
		};
	},

	computed: {
		...mapGetters([
			'user',
			'issues',
			'tagManager'
		]),
	},

	methods: {
		...mapActions([
			'initTagging'
		]),
	},

	watch: {
		frame() {
			const frameDocument = this.frame && this.frame.contentDocument;

			if (frameDocument && frameDocument.body) {
				const panelStylesheet = document.createElement('style');
				panelStylesheet.innerHTML = panelStyles;

				frameDocument.body.appendChild(this.$el);
				frameDocument.head.appendChild(panelStylesheet);
			}
		}
	}
}
</script>
