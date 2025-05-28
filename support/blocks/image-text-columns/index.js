const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'amwa-theme-block/image-text', {
	title: __( 'Left-Right Block', 'amwa-theme-block' ),
	description: __( 'Contains Image, Title, Description and Buttons. Has offset display.', 'amwa-theme-block' ),
	apiVersion: 2,
	icon: 'columns',
	category: 'layout',
	attributes: {
		bgColor: {
			type: 'string',
			default: ''
		},
		bgSlug: {
			type: 'string',
			default: ''
		},
		color: {
			type: 'string',
			default: ''
		},
		contentAlign: {
			type: 'string',
			default: 'img-left',
			selector: '.block-content'
		},
		fullWidth: {
			type: 'string',
			default: '',
			selector: '.block-content'
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
		videoID: {
			type: 'number',
		},
		vidOrImg: {
			type: 'string',
			default: 'image'
		},
		videoURL: {
			type: 'string',
			source: 'attribute',
			selector: '.source',
			attribute: 'src',
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