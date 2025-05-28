const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'AMWA-theme-blocks/text-card', {
	title: __( 'Text Card', 'AMWA-theme-blocks' ),
	description: __( 'Card with title short blurb.', 'AMWA-theme-blocks' ),
	apiVersion: 2,
	icon: 'button',
	category: 'layout',
	parent: ['AMWA-theme-blocks/cards-grid'],
	attributes: {
		cardBG: {
			type: 'string',
			default: 'light-grey'
		},
		bgColor: {
			type: 'string',
			default: ''
		},
		bgSlug: {
			type: 'string',
			default: ''
		},
		iconColor: {
			type: 'string',
			default: '#ffffff'
		},
		iconSlug: {
			type: 'string',
			default: ''
		},
		width: {
			type: 'string',
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
      			},
      			prefix: {
      				type: 'string',
      				source: 'attribute',
      				selector: '.icon-wrap',
      				attribute: 'data-prefix',
      				default: 'far'
      			},
      			upload: {
      				type: 'string',
      				source: 'html',
      				selector: '.upload-icon',
      				default: ''
      			}
			}
		}
	},
	edit: edit,
	save: save,
} );