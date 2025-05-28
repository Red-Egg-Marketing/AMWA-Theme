const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'AMWA-theme-blocks/testimonials', {
	apiVersion: 2,
	title: __( 'Testimonials', 'AMWA-theme-blocks' ),
	description: __( 'For testimonials with Slider functionality.', 'AMWA-theme-blocks' ),
	icon: 'welcome-write-blog',
	category: 'layout',
	attributes: {
		testimonials: {
			type: 'array',
			default: []
		},
		anchor: {
			type: 'string',
			default: ''
		},
		totalNotes: {
			type: 'string',
			default: '0',
			selector: '.testimonials',
			source: 'attribute',
			attribute: 'data-total'
		},
	},
	edit: edit,
	save: save
} );