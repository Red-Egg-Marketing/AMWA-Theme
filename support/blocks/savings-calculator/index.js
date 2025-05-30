const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'amwa-theme-block/savings-calculator', {
	title: __( 'Savings Calculator', 'amwa-theme-block' ),
	description: __( 'Block for displaying Savings Calculator.', 'amwa-theme-block' ),
	apiVersion: 2,
	icon: 'calculator',
	category: 'layout',
	edit: edit,
	save: save,
} );