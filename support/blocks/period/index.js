const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'amwa-theme-block/period', {
	title: __( 'Period', 'amwa-theme-block' ),
	apiVersion: 2,
	icon: 'schedule',
	parent: ['amwa-theme-block/timeline'],
	category: 'layout',
	attributes: {
		bgColor: {
			type: 'string',
			default: ''
		},
		bgSlug: {
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
		period: {
			type: 'string',
			default: ''
		},
		blockId: {
			type: 'string'
		}
	},
	anchor: true,
	edit: edit,
	save: save,
} );