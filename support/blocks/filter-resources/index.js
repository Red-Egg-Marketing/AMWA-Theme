const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'amwa-theme-block/resources', {
	apiVersion: 2,
	title: __( 'Filterable Resources', 'amwa-theme-block' ),
	description: __( 'Block with filterable list of Resourcess', 'amwa-theme-block' ),
	icon: 'megaphone',
	category: 'layout',
	supports: {
		anchor: true
	},
	attributes: {
		resources: {
			type: 'array',
			default: []
		},
		taxonomies : {
			type: 'object'
		},
		mainTitle : {
			type: 'string',
		},
		padding: {
			type: 'object',
			default: {
			}
		},
		blockId: {
			type: 'string'
		},
		postType: {
			type: 'string',
			default: 'post',
			source: 'attribute',
			selector: '.resources-grid',
			attribute: 'data-posttype'
		}
	},
	edit: edit,
	save: save
} );