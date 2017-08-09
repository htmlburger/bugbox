<template>
	<div class="user">
		<template v-if="!user">
			<div class="user__authorize">
				<span>You are not authorized</span>

				<a href="#" class="btn" @click.prevent="authorize">Authorize</a>
			</div>
		</template>

		<template v-else>
			<div class="user__name">
				<img :src="`https://www.gravatar.com/avatar/${user.gravatarHash}`" :alt="user.fullName">

				<span>{{user.fullName}}</span>
			</div><!-- /.user__name -->
		</template>
	</div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
	name: 'user',

	props: {
		user: {
			required: true
		}
	},

	methods: {
		...mapActions([
			'authorize'
		]),
	}
}
</script>
