const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'amwa-theme-block/html-embed', {
	title: __( 'HTML Embed', 'cls-blocks' ),
	description: __( 'Can be used for full width Google map', 'amwa-theme-block' ),
	apiVersion: 2,
	parent: ['amwa-theme-block/map'],
	icon: 'admin-site',
	category: 'layout',
	edit: edit,
	save: save,
} );