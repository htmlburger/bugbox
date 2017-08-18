<template>
	<div class="authorize">
		<div class="authorize__inner">
			<img src="../assets/images/bb-logo-vertical.svg" width="64" alt="BugBox">

			<p>You are not authorized.</p>

			<a @click.prevent="authorize" href="#" class="btn">Authorize</a>
		</div>
	</div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
	name: 'authorize',

	methods: {
		...mapActions([
			'authorize'
		])
	}
}
</script>
