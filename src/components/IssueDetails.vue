<template>
	<div v-if="issue" class="issue-details">
		<a @click.prevent="resetSelectedIssue" href="#" class="issue__back">&laquo; Back</a>

		<div class="issue__inner">
			<h4>{{issue.name}}</h4>

			<p>{{issue.desc}}</p>

			<pre v-if="issue.meta">{{issue.meta.browser}}</pre>
		</div>
	</div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
	name: 'issue-details',

	props: {
		issue: {
			required: true
		}
	},

	methods: {
		...mapActions([
			'resetSelectedIssue'
		]),
	}
}
</script>
