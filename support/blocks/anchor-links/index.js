const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'amwa-theme-block/anchor-links', {
	title: __( 'Anchor Links', 'amwa-theme-block' ),
	apiVersion: 2,
	icon: 'columns',
	category: 'layout',
	edit: edit,
	save: save,
} );