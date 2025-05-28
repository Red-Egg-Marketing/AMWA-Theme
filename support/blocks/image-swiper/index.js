const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'AMWA-theme-blocks/image-swiper', {
	title: __( 'Image Swiper', 'AMWA-theme-blocks' ),
	apiVersion: 2,
	icon: 'schedule',
	category: 'layout',
	parent: ['AMWA-theme-blocks/image-links'],
	edit: edit,
	save: save,
} );