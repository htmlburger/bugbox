<template>
	<div class="panel__head">
		<template v-if="user">
			<template v-if="project">
				<button @click.prevent="initTagging" class="btn">Add Issue</button>

				<a :href="project.meta.shortUrl || project.meta.url" target="_blank" class="panel__project-link">
					<img src="../assets/images/external.svg" />Open Project
				</a>

				<div class="panel__dropdown">
					<a @click.prevent href="#" class="panel__dropdown-icon" title="Project Members">
						<img src="../assets/images/users.svg">
					</a>

					<div class="panel__dropdown-menu panel__dropdown-menu--small">
						<ul>
							<li v-for="member in members">{{member.fullName}}</li>

							<li>
								<a :href="project.meta.shortUrl || project.meta.url" target="_blank">+ Add more from Trello</a>
							</li>
						</ul>
					</div>
				</div>
			</template>

			<div class="panel__dropdown">
				<div class="panel__dropdown-trigger">
					<a @click.prevent href="#" class="panel__dropdown-dots">
						<i>Show menu</i>
					</a>
				</div>

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
			'project',
			'members'
		]),
	},

	methods: {
		...mapActions([
			'initTagging',
			'authorize',
			'unauthorize',
			'changeProject'
		])
	}
}
</script>
