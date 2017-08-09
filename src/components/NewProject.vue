<template>
	<div v-if="!project" class="cta">
		<p>There is no project associated with {{host}}</p>

		<a href="#" class="btn btn--success" @click.prevent="initProject(host)">Create new project</a>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
	name: 'new-project',

	computed: {
		host() {
			return window.location.host;
		},

		...mapGetters([
			'project'
		]),
	},

	methods: {
		...mapActions([
			'initProject'
		]),
	}
}
</script>
