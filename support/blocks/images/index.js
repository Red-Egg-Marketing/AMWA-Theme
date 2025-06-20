const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'amwa-theme-block/images', {
	title: __( 'Header Intro in Columns', 'amwa-theme-block' ),
	description: __( ' Can contain blocks for header and description in column format. Useful for introduction to section.', 'amwa-theme-block' ),
	apiVersion: 2,
	icon: 'align-center',
	parent: ['amwa-theme-block/contact', 'amwa-theme-block/sign-up', 'amwa-theme-block/period', 'amwa-theme-block/feature-section'],
	category: 'layout',
	attributes: {
		template : {
			type: 'array',
			default: []
		},
	},
	edit: edit,
	save: save,
} );