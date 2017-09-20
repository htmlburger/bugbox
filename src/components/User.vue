<template>
	<div class="user">
		<div class="user__name">
			<img v-if="avatar" :src="avatar" :alt="user.fullName" class="user__avatar">

			<span v-else class="user__initials">{{user.initials}}</span>

			<span class="user__fullname">{{user.fullName}}</span>
		</div>
	</div>
</template>

<script>
export default {
	name: 'user',

	props: {
		user: {
			required: true
		}
	},

	computed: {
		/**
		 * Get avatar url.
		 * @return {String}
		 */
		avatar() {
			if (this.user && this.user.avatarHash) {
				return `//trello-avatars.s3.amazonaws.com/${this.user.avatarHash}/50.png`;
			}
		}
	}
}
</script>
