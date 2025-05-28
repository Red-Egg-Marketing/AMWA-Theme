const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'AMWA-theme-blocks/savings-form', {
	title: __( 'Savings Form', 'AMWA-theme-blocks' ),
	description: __( 'Savings Form block.', 'AMWA-theme-blocks' ),
	apiVersion: 2,
	parent: ['AMWA-theme-blocks/savings-calculator'],
	icon: 'button',
	category: 'layout',
	edit: edit,
	save: save,
} );