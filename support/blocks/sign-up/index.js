const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'AMWA-theme-blocks/sign-up', {
	title: __( 'Sign Up Block (Newsletter)', 'AMWA-theme-blocks' ),
	apiVersion: 2,
	icon: 'align-center',
	category: 'layout',
	edit: edit,
	save: save,
} );