<template>
	<div id="app" :class="classes">
		<div ref="cover" class="bugbox__cover">
			<div ref="screenshotArea" class="bugbox__screenshot-area">
				<span>Hold Ctrl and use MouseWheel to resize screenshot area</span>
			</div>

			<pins />
		</div>

		<div class="bugbox__panel">
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
	name: 'bugbox',

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
				'bugbox',
				{ 'bugbox--tagging': this.status === 'tagging' }
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
	.bugbox,
	.bugbox * { all: initial; padding: 0; margin: 0; outline: 0; box-sizing: border-box; }

	.bugbox .bugbox__cover { position: absolute; z-index: 2147483647; left: 0; top: 0; width: 100%; min-height: 100%; background: rgba(255,255,255,0); pointer-events: none; overflow: hidden; }
	.bugbox .bugbox__cover { cursor: url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDUyIDUyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MiA1MjsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSIzMnB4IiBoZWlnaHQ9IjMycHgiPgo8cGF0aCBzdHlsZT0iZmlsbDojMTA4MUUwOyIgZD0iTTM4Ljg1Myw1LjMyNEwzOC44NTMsNS4zMjRjLTcuMDk4LTcuMDk4LTE4LjYwNy03LjA5OC0yNS43MDYsMGgwICBDNi43NTEsMTEuNzIsNi4wMzEsMjMuNzYzLDExLjQ1OSwzMUwyNiw1MmwxNC41NDEtMjFDNDUuOTY5LDIzLjc2Myw0NS4yNDksMTEuNzIsMzguODUzLDUuMzI0eiBNMjYuMTc3LDI0Yy0zLjMxNCwwLTYtMi42ODYtNi02ICBzMi42ODYtNiw2LTZzNiwyLjY4Niw2LDZTMjkuNDkxLDI0LDI2LjE3NywyNHoiLz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==) 16 32, pointer; }

	.bugbox .bugbox__screenshot-area { position: fixed; z-index: 2147483647; left: 0; top: 0; width: 100%; height: 100%; background: transparent; border-style: solid; border-color: rgba(0,0,0,.5); border-width: 0; visibility: hidden; pointer-events: none; transition: border-width .2s; }
	.bugbox .bugbox__screenshot-area span { position: absolute; left: 0; top: 100%; max-width: 100%; padding: 2px 0; color: #fff; font-family: sans-serif; font-size: 10px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

	.bugbox .bugbox__panel { position: fixed; z-index: 2147483647; right: 0; top: 0; width: 300px; height: 100%; box-shadow: 0 10px 40px 0 rgba(0,0,0,.15); transition: all .2s; }
	.bugbox .bugbox__panel iframe { border: 0; padding: 0; margin: 0; width: 100%; height: 100%; }

	.bugbox .bugbox__pins { transition: all .2s; }

	/*  bugbox Tagging State  */
	.bugbox--tagging .bugbox__cover { pointer-events: all; }
	.bugbox--tagging .bugbox__screenshot-area { visibility: visible; }
	.bugbox--tagging .bugbox__panel { box-shadow: none; transform: translateX(100%); }
	.bugbox--tagging .bugbox__pins { visibility: hidden; opacity: 0; }
</style>
