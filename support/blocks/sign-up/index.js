const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'amwa-theme-block/sign-up', {
	title: __( 'Sign Up Block (Newsletter)', 'amwa-theme-block' ),
	apiVersion: 2,
	icon: 'align-center',
	category: 'layout',
	edit: edit,
	save: save,
} );