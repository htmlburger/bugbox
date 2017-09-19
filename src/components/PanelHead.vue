<template>
	<div class="panel__head">
		<template v-if="user">
			<template v-if="project">
				<button @click.prevent="initTagging" class="btn">Add Issue</button>

				<a :href="project.meta.shortUrl || project.meta.url" target="_blank" class="panel__project-link">
					<i class="ico-trello"></i>Open Project
				</a>

				<div class="panel__dropdown">
					<a @click.prevent href="#" class="panel__dropdown-btn" title="Project Members">
						<span class="panel__dropdown-icon">
							<i class="ico-users"></i>

							<i class="ico-users-hover"></i>
						</span>
					</a>

					<div class="panel__dropdown-menu panel__dropdown-menu--small">
						<ul>
							<li v-for="member in members">
								<user :user="member" />
							</li>

							<li>
								<a :href="project.meta.shortUrl || project.meta.url" target="_blank">
									<i class="ico-add"></i> Add more from Trello
								</a>
							</li>
						</ul>
					</div>
				</div>
			</template>

			<div class="panel__dropdown">
				<a @click.prevent href="#" class="panel__dropdown-btn" title="Show Menu">
					<span class="panel__dropdown-icon">
						<i class="ico-dots"></i>

						<i class="ico-dots-hover"></i>
					</span>
				</a>

				<div class="panel__dropdown-menu">
					<ul>
						<li>
							<user :user="user" />
						</li>

						<li v-if="project && projectsList && projectsList.length > 1">
							<a @click.prevent="changeProject" href="#">
								<i class="ico-change"></i> Change Project ({{projectsList.length}})
							</a>
						</li>

						<li>
							<a @click.prevent="unauthorize" href="#">
								<i class="ico-logout"></i> Logout
							</a>
						</li>
					</ul>
				</div>
			</div>
		</template>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import User from 'components/User.vue';

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
			'unauthorize',
			'changeProject'
		])
	}
}
</script>
