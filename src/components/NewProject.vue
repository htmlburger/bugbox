<template>
	<div :class="classes">
		<loader v-if="isLoading" />

		<form @submit.prevent="handleFormSubmit">
			<div class="form__row">
				<label class="form__label">Project Name:</label>

				<input v-model="projectName" class="field" type="text">
			</div>

			<div class="form__row">
				<label class="form__label">Site Base URL:</label>

				<template v-if="!canChange" >
					<input :value="baseUrl" class="field" type="text" readonly>

					<small>
						<a @click.prevent="canChange = true" href="#">Change</a>
					</small>
				</template>

				<list-urls v-else v-model="baseUrl" />
			</div>

			<div class="form__actions">
				<ul class="list-options">
					<li>
						<label class="radio">
							<input v-model="type" value="new" class="radio__input" type="radio" name="type">

							<span class="radio__label">Create New Project</span>
						</label>
					</li>

					<li>
						<label class="radio">
							<input v-model="type" value="existing" class="radio__input" type="radio" name="type">

							<span class="radio__label">Setup Existing Project</span>
						</label>
					</li>
				</ul>

				<div class="form__stack">
					<div v-if="type === 'existing'" class="select form__stack-item">
						<select v-model="boardId">
							<option v-for="board in boards" :value="board.id">{{board.name}}</option>
						</select>
					</div>

					<button type="submit" class="btn form__stack-addon">{{buttonLabel}}</button>
				</div><!-- /.form__stack -->
			</div>
		</form>

	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Loader from 'components/Loader.vue';
import ListUrls from 'components/ListUrls.vue';

export default {
	name: 'new-project',

	components: {
		Loader,
		ListUrls
	},

	data() {
		return {
			status: '',
			canChange: false,
			projectName: document.title,
			baseUrl: window.location.origin,
			type: 'new',
			boardId: null
		};
	},

	computed: {
		...mapGetters([
			'user',
			'project'
		]),

		/**
		 * Get classes object.
		 * @return {Object}
		 */
		classes() {
			return [
				'form',
				{ 'form--loading': this.isLoading }
			];
		},

		/**
		 * Whether component is loading.
		 * @return {Boolean}
		 */
		isLoading() {
			return this.status === 'loading';
		},

		/**
		 * Get button label based on the selected type.
		 * @return {String}
		 */
		buttonLabel() {
			if (this.type === 'new') {
				return 'Create';
			} else if (this.type === 'existing') {
				return 'Setup';
			} else {
				return 'Submit';
			}
		},

		/**
		 * Get form payload object.
		 * @return {Object}
		 */
		payload() {
			return {
				name: this.projectName,
				baseUrl: this.baseUrl
			};
		},

		/**
		 * Get current user boards,
		 * @return {Array}
		 */
		boards() {
			return (this.user && this.user.boards) || [];
		}
	},

	methods: {
		...mapActions([
			'initProject',
			'setupProject',
		]),

		/**
		 * Handle form submit.
		 * @return {void}
		 */
		handleFormSubmit() {
			if (this.isLoading) {
				return;
			}

			this.status = 'loading';

			if (this.type === 'new') {
				this.initProject(this.payload)
					.then((response) => {
						this.status = '';
					});
			} else if (this.type === 'existing') {
				const board = this.boards.find(board => board.id === this.boardId);
				const data = { data: board };
				const payload = this.payload;

				this.setupProject({ data, payload })
					.then((response) => {
						this.status = '';
					});
			}
		}
	}
}
</script>
