const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'amwa-theme-block/feature-section', {
	title: __( 'Feature Section', 'amwa-theme-block' ),
	description: __( 'Feature Section with animation features', 'amwa-theme-block' ),
	apiVersion: 2,
	icon: 'columns',
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
		color: {
			type: 'string',
			default: ''
		},
		columnwidth: {
			type: 'string',
			default: 'col-66'
		},
		animateScroll: {
			type: 'boolean',
			default: false
		}
	},
	edit: edit,
	save: save,
} );