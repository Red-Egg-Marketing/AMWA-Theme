const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'amwa-theme-block/slide', {
	title: __( 'Slide', 'cls-blocks' ),
	apiVersion: 2,
	icon: 'admin-site',
	parent: ['amwa-theme-block/slider'],
	category: 'layout',
	edit: edit,
	save: save,
} );