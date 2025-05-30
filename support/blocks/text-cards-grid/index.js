const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'amwa-theme-block/cards-grid', {
	title: __( 'Text Cards Grid', 'amwa-theme-block' ),
	description: __( 'Grid of Text Cards with Icon', 'amwa-theme-block' ),
	apiVersion: 2,
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