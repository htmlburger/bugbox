<template>
	<div class="beatle__pins">
		<pin v-for="issue in issues" :key="issue.id" :issue="issue" :selected="issue.id === selectedIssueId" />
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Pin from './Pin.vue';

export default {
	name: 'pins',

	components: {
		Pin
	},

	computed: {
		...mapGetters([
			'issues',
			'selectedIssueId'
		]),
	}
}
</script>
