<template>
	<transition name="fade-top">
		<div v-if="!!tagged && !!project && !isLoading" :class="classes" @keydown.stop="handleIssueFormKeydown">
			<loader v-if="isLoading" />

			<div class="form__inner">
				<form @submit.prevent="handleSubmit">
					<div class="form__head" @mousedown.prevent.stop="handleDragStart">
						<h3 class="form__title">Submit issue</h3>

						<a @click.prevent.stop="reset" href="#" class="form__close">&times;</a>
					</div>

					<div class="form__body">
						<div class="form__row">
							<input v-model="title" ref="title" type="text" class="field" placeholder="Title" required>
						</div>

						<div class="form__row">
							<textarea v-model="description" @paste="handleDescriptionPaste" rows="5" class="textarea" placeholder="Description"></textarea>
						</div>

						<div class="form__row">
							<div class="cols">
								<div class="col col--1of2">
									<div class="table">
										<table>
											<tr>
												<th>Browser</th>
												<td>{{tagged.browser.vendor}} {{tagged.browser.version}}</td>
											</tr>

											<tr>
												<th>OS</th>
												<td>{{tagged.browser.os}}</td>
											</tr>

											<tr>
												<th>Resolution</th>
												<td>{{tagged.browser.width}} x {{tagged.browser.height}}</td>
											</tr>
										</table>
									</div><!-- /.table -->
								</div>

								<div class="col col--1of2">
									<div class="form__screenshot">
										<div class="form__preview">
											<template v-if="screenshot">
												<a @click.prevent="removeScreenshot" href="#" class="form__preview-remove">&times;</a>

												<a :href="screenshot" class="form__preview-image" target="_blank">
													<img :src="screenshot" alt="Screenshot">
												</a>
											</template>
										</div>

										<div class="file form__file">
											<input type="file" @change="handleScreenshotInputChange">

											<span class="file__btn">
												<i class="ico-image"></i>

												<span>Or Select file</span>
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div class="form__actions">
						<button type="submit" class="btn form__btn">Submit Issue</button>

						<button type="reset" class="btn btn--cancel form__btn" @click.prevent="reset">Cancel</button>
					</div>
				</form>
			</div>
		</div>
	</transition>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { appendInIframe } from 'helpers/mixins';
import { getImageFromInputEvent, getImageFromPasteEvent } from 'helpers/utils';
import Loader from 'components/Loader.vue';

export default {
	name: 'issue-form',

	components: {
		Loader
	},

	mixins: [appendInIframe],

	data() {
		return {
			status: '',
			title: null,
			description: null,
			group: null,
			screenshot: null,
			lastPos: {
				x: 0,
				y: 0
			}
		};
	},

	computed: {
		...mapGetters([
			'project',
			'tagged'
		]),

		/**
		 * Get classes object.
		 * @return {Object}
		 */
		classes() {
			return [
				'form',
				'form-issue',
				{ 'form--loading': this.isLoading }
			];
		},

		/**
		 * Get classes object.
		 * @return {Object}
		 */
		isLoading() {
			return this.status === 'loading';
		},

		/**
		 * Get an alias for tagged computed property.
		 * @return {Object}
		 */
		meta() {
			return this.tagged;
		},

		/**
		 * Get issue default group.
		 * @return {Object}
		 */
		defaultGroup() {
			if (!this.project.groups.length) {
				return null;
			}

			let defaultGroup = this.project.groups.find(group => {
				return group.name.indexOf('To Do') >= 0;
			});

			if (!defaultGroup) {
				defaultGroup = this.project.groups[0];
			}

			return defaultGroup;
		}
	},

	methods: {
		...mapActions([
			'addIssue',
			'resetTagged'
		]),

		/**
		 * Remove screenshot data.
		 * @return {void}
		 */
		removeScreenshot() {
			this.screenshot = null;
		},

		/**
		 * Reset tagged data.
		 * @return {void}
		 */
		reset() {
			this.resetTagged();

			this.status = '';
			this.title = null;
			this.description = null;
			this.group = null;

			window.focus();
		},

		/**
		 * Update tagged data.
		 * @return {void}
		 */
		updateTagged() {
			if (this.tagged && this.tagged.screenshot) {
				this.screenshot = this.tagged.screenshot;
			}

			setTimeout(() => {
				if (this.tagged && this.$refs.title) {
					this.$refs.title.focus();
				}
			}, 100);

		},

		/**
		 * Handle issue keydown events.
		 * @param  {Event} event
		 * @return {void}
		 */
		handleIssueFormKeydown(event) {
			/**
			 * Cancel issue adding with Escape key
			 */
			if (event.keyCode === 27) {
				event.preventDefault();
				this.reset();
			}
		},

		/**
		 * Handle drag start.
		 * @param  {Event} event
		 * @return {void}
		 */
		handleDragStart(event) {
			// this.isDragging = true;
			this.lastPos.x = event.screenX;
			this.lastPos.Y = event.screenY;

			window.addEventListener('mousemove', this.handleDragMove);
			window.addEventListener('mouseup', this.handleDragEnd);

			const frameWindow = this.frame.contentWindow;

			if (frameWindow) {
				frameWindow.addEventListener('mousemove', this.handleDragMove);
				frameWindow.addEventListener('mouseup', this.handleDragEnd);
			}

			const el = this.frame.parentNode;

			if (el) {
				el.style.opacity = '.8';
			}
		},

		/**
		 * Handle drag move.
		 * @param  {Event} event
		 * @return {void}
		 */
		handleDragMove(event) {
			const deltaX = event.screenX - this.lastPos.x;
			const deltaY = event.screenY - this.lastPos.Y;

			this.lastPos.x = event.screenX;
			this.lastPos.Y = event.screenY;

			const el = this.frame.parentNode;

			if (el) {
				const currentMarginLeft = parseInt(el.style.marginLeft) || 0;
				const currentMarginTop = parseInt(el.style.marginTop) || 0;

				el.style.marginLeft = (currentMarginLeft + deltaX) + 'px';
				el.style.marginTop = (currentMarginTop + deltaY) + 'px';
			}
		},

		/**
		 * Handle drag end.
		 * @param  {Event} event
		 * @return {void}
		 */
		handleDragEnd(event) {
			window.removeEventListener('mousemove', this.handleDragMove);
			window.removeEventListener('mouseup', this.handleDragEnd);

			const frameWindow = this.frame.contentWindow;

			if (frameWindow) {
				frameWindow.removeEventListener('mousemove', this.handleDragMove);
				frameWindow.removeEventListener('mouseup', this.handleDragEnd);
			}

			const el = this.frame.parentNode;

			if (el) {
				el.style.opacity = '';
			}
		},

		/**
		 * Handle description paste event.
		 * @param  {Event} event
		 * @return {void}
		 */
		handleDescriptionPaste(event) {
			getImageFromPasteEvent(event).then((result) => {
				if (result.base64string) {
					this.screenshot = result.base64string;
				}
			});
		},

		/**
		 * Handle screenshot input change event.
		 * @param  {Event} event
		 * @return {void}
		 */
		handleScreenshotInputChange(event) {
			getImageFromInputEvent(event).then((result) => {
				if (result.base64string) {
					this.screenshot = result.base64string;
				}
			});
		},

		/**
		 * Handle form submit.
		 * @param  {Event} event
		 * @return {void}
		 */
		handleSubmit(event) {
			if (this.isLoading) {
				return;
			}

			const group = this.defaultGroup && this.defaultGroup.id;
			const { title, description } = this;
			const meta = {
				...this.meta,
				screenshot: this.screenshot
			};

			this.status = 'loading';
			this.addIssue({ title, description, group, meta })
				.then(() => this.reset());
		},
	},

	mounted() {
		this.updateTagged();
	},

	watch: {
		tagged() {
			this.updateTagged();
		}
	}
}
</script>
