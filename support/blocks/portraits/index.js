const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'amwa-theme-block/portraits', {
	title: __( 'Portrait Block', 'amwa-theme-block' ),
	description: __( 'Section intended for use with hotspots images', 'amwa-theme-block' ),
	apiVersion: 2,
	icon: 'columns',
	category: 'layout',
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
		bgColor: {
			type: 'string',
			default: ''
		},
		bgSlug: {
			type: 'string',
			default: ''
		},
		color: {
			type: 'string',
			default: ''
		},
	},
	edit: edit,
	save: save,
} );