<template>
	<div :class="classes">
		<button class="custom-select__selected" @click.prevent="toggleExpanded">{{selected ? selected.label : ''}}</button>

		<div class="custom-select__options">
			<ul v-if="expanded">
				<li v-for="option in visibleOptions">
					<label>
						<input v-model="innerValue" :value="option.value" :name="name" type="radio">

						{{option.label}}
					</label>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>

export default {
	name: 'custom-select',

	props: {
		value: {
			default: null
		},

		options: {
			requred: true
		},

		name: {
			required: true
		},
	},

	data() {
		return {
			expanded: false,
			innerValue: this.value
		};
	},

	computed: {
		classes() {
			return [
				'custom-select',
				{ 'custom-select--expanded': this.expanded }
			];
		},

		selected() {
			return this.options.find(option => option.value === this.value);
		},

		visibleOptions() {
			return this.options.filter(option => option.value !== this.value);
		},

		iframe() {
			let iframe = null
			let parent = this.$parent;

			while (parent && !iframe) {
				if (parent.$refs && parent.$refs.panelFrame) {
					iframe = parent.$refs.panelFrame;
				}

				parent = parent.$parent;
			}

			return iframe;
		}
	},

	methods: {
		toggleExpanded(event, toggle = !this.expanded) {
			this.expanded = toggle;
		},

		expand() {
			this.toggleExpanded(null, true);
		},

		collapse() {
			this.toggleExpanded(null, false);
		}
	},

	watch: {
		expanded() {
			setTimeout(() => {
				if (this.expanded) {
					window.addEventListener('click', this.collapse);
					this.iframe && this.iframe.contentWindow.addEventListener('click', this.collapse);
				} else {
					window.removeEventListener('click', this.collapse);
					this.iframe && this.iframe.contentWindow.removeEventListener('click', this.collapse);
				}
			}, 10);
		},

		innerValue() {
			this.$emit('input', this.innerValue);
		}
	}
}
</script>
