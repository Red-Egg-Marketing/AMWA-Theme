const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'amwa-theme-block/slider', {
	title: __( 'Slider', 'cls-blocks' ),
	apiVersion: 2,
	icon: 'admin-site',
	category: 'layout',
	parent: ['amwa-theme-block/slider-group'],
	edit: edit,
	save: save,
} );