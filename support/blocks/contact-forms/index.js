const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'AMWA-theme-blocks/contact-forms', {
	title: __( 'Contact Form Selector', 'AMWA-theme-blocks' ),
	description: __( ' Can contain blocks for header and description in column format. Useful for introduction to section.', 'AMWA-theme-blocks' ),
	apiVersion: 2,
	icon: 'align-center',
	parent: ['AMWA-theme-blocks/contact', 'AMWA-theme-blocks/sign-up'],
	category: 'layout',
	edit: edit,
	save: save,
} );