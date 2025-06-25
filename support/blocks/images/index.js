const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'amwa-theme-block/images', {
	title: __( 'Image Block', 'amwa-theme-block' ),
	description: __( ' Can contain blocks for header and description in column format. Useful for introduction to section.', 'amwa-theme-block' ),
	apiVersion: 2,
	icon: 'align-center',
	parent: ['amwa-theme-block/contact', 'amwa-theme-block/sign-up', 'amwa-theme-block/period', 'amwa-theme-block/images-columns', 'amwa-theme-block/feature-section'],
	category: 'layout',
	attributes: {
		template : {
			type: 'array',
			default: []
		},
		allowBlock: {
			type: 'array',
			default: ['core/image', 'core/paragraph']
		},
		width: {
			type: 'string',
			default: ''
		}
	},
	edit: edit,
	save: save,
} );