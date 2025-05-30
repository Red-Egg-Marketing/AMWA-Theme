const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'amwa-theme-block/icon-cta', {
	title: __( 'Icon or CTA', 'amwa-theme-block' ),
	description: __( 'Option for CTA (button) or icon and title.', 'amwa-theme-block' ),
	apiVersion: 2,
	icon: 'button',
	category: 'layout',
	parent: ['amwa-theme-block/grid-icons'],
	attributes: {
		template: {
			type: 'array',
			default: []
		},
		title: {
			type: 'string',
			source: 'text',
			selector: '.header-title',
			default: ''
		},
		icons : {
			type: 'array',
			source: 'query',
			default: [],
			selector: '.icon-row',
			query: {
				icon: {
					type: 'string',
      				source: 'attribute',
      				default: 'address-book',
      				selector: '.icon-icon',
      				attribute: 'data-icon'
      			}
			}
		}
	},
	edit: edit,
	save: save,
} );