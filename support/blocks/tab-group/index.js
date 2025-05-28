const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'AMWA-theme-blocks/tab-group', {
	title: __( 'Tab Group', 'AMWA-theme-blocks' ),
	description: __( 'Group of tabs.', 'AMWA-theme-blocks' ),
	apiVersion: 2,
	icon: 'button',
	parent: ['AMWA-theme-blocks/tabs'],
	attributes: {
		height : {
			type: 'string',
		}
	},
	category: 'layout',
	edit: edit,
	save: save,
} );