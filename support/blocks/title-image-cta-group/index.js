const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'AMWA-theme-blocks/title-image-cta-group', {
	title: __( 'CTA Group - Title/Image/Button', 'AMWA-theme-blocks' ),
	description: __( 'Group of CTAs featuring image, title, description and button.', 'AMWA-theme-blocks' ),
	apiVersion: 2,
	icon: 'schedule',
	category: 'layout',
	attributes: {
		columns: {
			type: 'string',
			default: '2'
		},
		image : {
			type: 'object',
			default : {
				url : '',
				width : '',
				height : '',
				repeat: 'no-repeat',
				position: 'top left',
				size: '100',
				sizekey: '',
				attachment: 'scroll',
				bgkeyword: 'keyword'
			}
		},
		padding: {
			type: 'object',
			default: {
			}
		},
		margin: {
			type: 'object',
			default: {
			}
		},
		blockId: {
			type: 'string'
		}
	},
	edit: edit,
	save: save,
} );