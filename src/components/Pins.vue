<template>
	<div class="bugbox__pins">
		<pin v-for="issue in visibleIssues" :key="issue.id" :issue="issue" :selected="issue.id === selectedIssueId" />

		<temp-pin v-if="tempPin" :left="tempPin.x" :top="tempPin.y" />
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Pin from './Pin.vue';
import TempPin from './TempPin.vue';

export default {
	name: 'pins',

	components: {
		Pin,
		TempPin
	},

	computed: {
		...mapGetters([
			'visibleIssues',
			'tempPin',
			'selectedIssueId'
		]),
	}
}
</script>

<style scoped>
	@keyframes bugboxBounce {
		0% { transform: translateY(0); }
		50% { transform: translateY(-5px); }
		100% { transform: translateY(0); }
	}

	@keyframes bugboxScale {
		0% { transform: scale(.6); opacity: .5; }
		50% { transform: scale(1); opacity: .2; }
		100% { transform: scale(.6); opacity: .5; }
	}

	.bugbox .bugbox__pin { position: absolute; left: -10000px; top: -10000px; margin: -32px 0 0 -16px; cursor: pointer; transition: opacity .2s; }
	.bugbox .bugbox__pin:before { content: ''; position: absolute; left: 10%; bottom: 0; width: 80%; height: 3px; background: #000; border-radius: 50%; box-shadow: 0 0 5px 1px #000; opacity: .5; transform: scale(.6); transition: opacity .2s, transform .2s; }
	.bugbox .bugbox__pin:after { content: ''; display: block; position: relative; width: 32px; height: 32px; background-image: url(../assets/images/pin.svg); background-size: 100% 100%; transition: transform .2s; }

	.bugbox .bugbox__pin:hover:before { opacity: .2; transform: scale(1); }
	.bugbox .bugbox__pin:hover:after { transform: translateY(-5px); }
	.bugbox .bugbox__pin:active:after { transform: translateY(0); }

	.bugbox .bugbox__pin--active { z-index: 2; pointer-events: none; }
	.bugbox .bugbox__pin--active:before { animation: bugboxScale 1s infinite linear; }
	.bugbox .bugbox__pin--active:after {  background-image: url(../assets/images/pin-active.svg); animation: bugboxBounce 1s infinite linear; }

	.bugbox .bugbox__pin--temp { pointer-events: none; }
	.bugbox .bugbox__pin--temp:after {  background-image: url(../assets/images/pin-active.svg); }

	/*  Tagging State  */
	.bugbox--tagging .bugbox__pin:not(.bugbox__pin--temp) { visibility: hidden; opacity: 0; }
</style>
