const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'amwa-theme-block/buttons-grid', {
	title: __( 'Grid of Buttons', 'amwa-theme-block' ),
	attributes: {
		columns: {
			type: 'string',
			default: '3'
		},
		imgSize: {
			type: 'string',
			default: 'large'
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
		bg: {
			type: 'string',
			default: ''
		}
	},
	icon: 'grid-view',
	category: 'layout',
	edit: edit,
	save: save,
} );