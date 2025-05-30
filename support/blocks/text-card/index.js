const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'amwa-theme-block/text-card', {
	title: __( 'Text Card', 'amwa-theme-block' ),
	description: __( 'Card with title short blurb.', 'amwa-theme-block' ),
	apiVersion: 2,
	icon: 'button',
	category: 'layout',
	parent: ['amwa-theme-block/cards-grid'],
	attributes: {
		cardBG: {
			type: 'string',
			default: 'light-grey'
		},
		bgColor: {
			type: 'string',
			default: ''
		},
		bgSlug: {
			type: 'string',
			default: ''
		},
		iconColor: {
			type: 'string',
			default: '#ffffff'
		},
		iconSlug: {
			type: 'string',
			default: ''
		},
		width: {
			type: 'string',
			default: ''
		},
		withImage: {
			type: 'string',
			default: 'with-image'
		}
	},
	edit: edit,
	save: save,
} );