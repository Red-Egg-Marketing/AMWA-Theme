const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'amwa-theme-block/savings-form', {
	title: __( 'Savings Form', 'amwa-theme-block' ),
	description: __( 'Savings Form block.', 'amwa-theme-block' ),
	apiVersion: 2,
	parent: ['amwa-theme-block/savings-calculator'],
	icon: 'button',
	category: 'layout',
	edit: edit,
	save: save,
} );