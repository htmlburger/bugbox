<template>
	<div class="panel__head">
		<template v-if="user">
			<template v-if="project">
				<button @click.prevent="initTagging" class="btn">Add Issue</button>

				<a href="http://abv.bg" target="_blank" class="panel__project-link">
					<img src="../assets/images/external.svg" />Open Project
				</a>
			</template>

			<div class="panel__dropdown">
				<a @click.prevent href="#" class="panel__dropdown-trigger">
					<i>Show menu</i>
				</a>

				<ul class="panel__dropdown-menu">
					<li>
						<user :user="user" />
					</li>

					<li v-if="project && projectsList && projectsList.length > 1">
						<a @click.prevent="changeProject" href="#">Change project ({{projectsList.length}} matches)</a>
					</li>

					<li>
						<a @click.prevent="unauthorize" href="#">Logout</a>
					</li>
				</ul>
			</div>
		</template>

		<template v-else>
			<a @click.prevent="authorize" href="#" class="btn">Authorize</a> &nbsp; <span>You are not authorized</span>
		</template>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { panelStyles } from '../assets/styles';
import User from './User.vue';

export default {
	name: 'panel-head',

	components: {
		User
	},

	computed: {
		...mapGetters([
			'user',
			'projectsList',
			'project'
		]),
	},

	methods: {
		...mapActions([
			'initTagging',
			'authorize',
			'unauthorize',
			'changeProject'
		])
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
