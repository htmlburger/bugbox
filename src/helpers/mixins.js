import { styles } from '../assets/styles';

/**
 * Append in iframe mixin
 */
export const appendInIframe = {
	props: ['frame'],

	watch: {
		frame() {
			const frameDocument = this.frame && this.frame.contentDocument;

			if (frameDocument && frameDocument.body) {
				const stylesheet = document.createElement('style');
				stylesheet.innerHTML = styles;

				frameDocument.body.appendChild(this.$el);
				frameDocument.head.appendChild(stylesheet);
			}
		}
	}
};


