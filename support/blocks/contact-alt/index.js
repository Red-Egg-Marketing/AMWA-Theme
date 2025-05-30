const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'amwa-theme-block/contact-alt', {
	title: __( 'Contact Section with text column .', 'amwa-theme-block' ),
	description: __( 'Section for displaying contact info, and contact form (Gravity Form)', 'amwa-theme-block' ),
	apiVersion: 2,
	icon: 'forms',
	category: 'layout',
	supports: {
		anchor: true
	},
	edit: edit,
	save: save,
} );