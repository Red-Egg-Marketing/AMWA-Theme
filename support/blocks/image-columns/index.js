const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'amwa-theme-block/image-columm', {
	title: __( 'Image Column', 'amwa-theme-block' ),
	apiVersion: 2,
	icon: 'columns',
	category: 'layout',
	parent: ['amwa-theme-block/image-text'],
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
		border: {
			type: 'string',
			default: '',
			selector: '.block-content'
		},
		withDrop: {
			type: 'boolean',
			default: true
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
		videothumb : {
			type: 'object',
			default : {
				url: '',
				width: '',
				height: '',
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
		animateScroll: {
			type: 'boolean',
			default: false
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
	supports: {
		anchor: true
	},
	edit: edit,
	save: save,
} );