const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'AMWA-theme-blocks/image-link', {
	title: __( 'Image & Text Link', 'AMWA-theme-blocks' ),
	description: __( 'Useful for displaying a group of links to various services, or posts and pages.', 'AMWA-theme-blocks' ),
	apiVersion: 2,
	icon: 'format-image',
	category: 'layout',
	parent: ['AMWA-theme-blocks/image-swiper'],
	attributes: {
		link : {
			type: 'string',
			source: 'attribute',
			selector: '.text-card',
			attribute: 'href',
			default: '',
		},
		title: {
			type: 'string',
			source: 'html',
			selector: '.header-title',
			default: ''
		},
		button: {
			type: 'boolean',
			default: false
		},
		media: {
			type: 'object',
			default: {
				id: '',
				alt: '',
				srcSet: {
					large: '',
					medium: '',
					small: '',
				}
			}
		},
	},
	edit: edit,
	save: save,
} );