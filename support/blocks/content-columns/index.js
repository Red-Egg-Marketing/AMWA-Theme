const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'amwa-theme-block/content-column', {
	title: __( 'Content Column', 'amwa-theme-block' ),
	apiVersion: 2,
	icon: 'columns',
	category: 'layout',
	parent: ['amwa-theme-block/image-text', 'amwa-theme-block/feature-section', 'amwa-theme-block/portraits'],
	attributes: {
		padding: {
			type: 'object',
			default: {
			}
		},
		margin: {
			type: 'object',
			default: {
			}
		},
		blockId: {
			type: 'string'
		},
	},
	edit: edit,
	save: save,
} );