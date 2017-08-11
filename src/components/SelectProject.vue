<template>
	<div class="form">
		<form @submit.prevent="handleSubmit">
			<div class="form__row">
				<label class="form__label">Select a project:</label>

				<div class="select">
					<select v-model="selected" required>
						<option v-for="project in projectsList" :value="project.id">{{project.name}}</option>
					</select>
				</div>
			</div>

			<div class="form__actions">
				<button type="submit" class="btn">Select</button>
			</div>
		</form>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
	name: 'select-project',

	data() {
		return {
			selected: null,
		};
	},

	computed: {
		...mapGetters([
			'projectsList'
		])
	},

	methods: {
		...mapActions([
			'getProject'
		]),

		handleSubmit(event) {
			this.getProject(this.selected);
		}
	}
}
</script>
