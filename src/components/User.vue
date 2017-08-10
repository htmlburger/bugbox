<template>
	<div class="user">
		<div class="user__name">
			<img :src="`https://www.gravatar.com/avatar/${user.gravatarHash}`" :alt="user.fullName">

			<span>{{user.fullName}}</span>
		</div><!-- /.user__name -->
	</div>
</template>

<script>
export default {
	name: 'user',

	props: {
		user: {
			required: true
		}
	}
}
</script>
