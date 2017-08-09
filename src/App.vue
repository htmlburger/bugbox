<template>
	<div id="app" :class="classes">
		<div ref="cover" class="beatle__cover">
			<div ref="screenshotArea" class="beatle__screenshot-area"></div>

			<pins />
		</div>

		<div class="beatle__panel">
			<iframe ref="panelFrame"></iframe>

			<panel :frame="panelFrame" />
		</div>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { getDocumentHeight } from './helpers/utils';
import Pins from './components/Pins.vue';
import Panel from './components/Panel.vue';

export default {
	name: 'beatle',

	components: {
		Panel,
		Pins,
	},

	data () {
		return {
			panelFrame: null,
		};
	},

	computed: {
		...mapGetters([
			'status'
		]),

		classes() {
			return [
				'beatle',
				{ 'beatle--tagging': this.status === 'tagging' }
			];
		},

		issueFromUrl() {
			return (window.location.href.match(/\#issue\-(.+)$/) || [])[1];
		},
	},

	methods: {
		...mapActions([
			'init',
			'initTagManager',
			'initTagging',
			'setTagged',
			'selectIssue'
		]),

		highlightIssueFromUrl(project) {
			if (this.issueFromUrl && project && project.issues) {
				const issue = project.issues.find(issue => {
					if (!issue.attachments || !issue.attachments.length) {
						return false;
					}

					return issue.attachments.some(attachment => attachment.url.indexOf(this.issueFromUrl) >= 0);
				});

				if (issue) {
					return this.selectIssue(issue.id);
				}
			}
		},

		setupTagManager() {
			this.initTagManager({
				cover         : this.$refs.cover,
				screenshotArea: this.$refs.screenshotArea,
				onInitTagging : this.initTagging,
				onTagged      : this.setTagged
			});
		},

		autoResizeCover() {
			setInterval(() => {
				this.$refs.cover.style.height = '';
				this.$refs.cover.style.height = getDocumentHeight() + 'px';
			}, 100)
		},
	},

	created() {
		this.init()
			.then(this.highlightIssueFromUrl);
	},

	mounted() {
		this.panelFrame = this.$refs.panelFrame;

		this.setupTagManager();
		this.autoResizeCover();
	},
}
</script>

<style scoped>
	.beatle,
	.beatle * { all: initial; padding: 0; margin: 0; outline: 0; box-sizing: border-box; }

	.beatle .beatle__cover { position: absolute; z-index: 2147483647; left: 0; top: 0; width: 100%; min-height: 100%; background: rgba(255,255,255,0); pointer-events: none; overflow: hidden; }
	.beatle .beatle__screenshot-area { position: fixed; z-index: 2147483647; left: 0; top: 0; width: 100%; height: 100%; background: transparent; border-style: solid; border-color: rgba(0,0,0,.5); border-width: 0; visibility: hidden; pointer-events: none; will-change: border-width; transition: all .2s; }

	.beatle .beatle__panel { position: fixed; z-index: 2147483647; right: 0; top: 0; width: 300px; height: 100%; box-shadow: 0 10px 40px 0 rgba(0,0,0,.15); background: #fff; transition: all .2s; }
	.beatle .beatle__panel iframe { border: 0; padding: 0; margin: 0; width: 100%; height: 100%; }

	.beatle .beatle__pins { transition: all .2s; }

	/*  Beatle Tagging State  */
	.beatle--tagging .beatle__cover { pointer-events: all; }
	.beatle--tagging .beatle__screenshot-area { visibility: visible; }
	.beatle--tagging .beatle__panel { box-shadow: none; transform: translateX(100%); }
	.beatle--tagging .beatle__pins { visibility: hidden; opacity: 0; }
</style>
