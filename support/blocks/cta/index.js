const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'amwa-theme-block/cta', {
	title: __( 'Centered Text Block', 'amwa-theme-block' ),
	description: __( 'Heading & Button with short blurb.', 'amwa-theme-block' ),
	apiVersion: 2,
	icon: 'button',
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
		}
	},
	edit: edit,
	save: save,
} );