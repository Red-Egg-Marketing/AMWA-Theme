const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'amwa-theme-block/tab-group', {
	title: __( 'Tab Group', 'amwa-theme-block' ),
	description: __( 'Group of tabs.', 'amwa-theme-block' ),
	apiVersion: 2,
	icon: 'button',
	parent: ['amwa-theme-block/tabs'],
	attributes: {
		height : {
			type: 'string',
		}
	},
	category: 'layout',
	edit: edit,
	save: save,
} );