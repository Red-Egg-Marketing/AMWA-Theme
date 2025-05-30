const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'amwa-theme-block/image-swiper', {
	title: __( 'Image Swiper', 'amwa-theme-block' ),
	apiVersion: 2,
	icon: 'schedule',
	category: 'layout',
	parent: ['amwa-theme-block/image-links'],
	edit: edit,
	save: save,
} );