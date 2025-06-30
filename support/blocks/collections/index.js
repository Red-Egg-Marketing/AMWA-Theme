const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'amwa-theme-block/collections', {
	apiVersion: 2,
	title: __( 'Collections', 'amwa-theme-block' ),
	description: __( 'Block for a selecting collections by category.', 'amwa-theme-block' ),
	icon: 'welcome-write-blog',
	parent: ['amwa-theme-block/selected-collections'],
	category: 'layout',
	attributes: {
		resources: {
			type: 'array',
			default: []
		},
		category : {
			type: 'string',
		},
		mainTitle : {
			type: 'string',
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
		}
	},
	supports: {
		anchor: true
	},
	edit: edit,
	save: save
} );