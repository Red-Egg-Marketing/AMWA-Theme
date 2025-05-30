const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'amwa-theme-block/event', {
	apiVersion: 2,
	title: __( 'Event', 'amwa-theme-block' ),
	description: __( 'Event Block.', 'amwa-theme-block' ),
	parent: ['amwa-theme-block/selected-events-blog'],
	icon: 'welcome-write-blog',
	category: 'layout',
	attributes: {
		resource: {
			type: 'array',
			default: []
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
		postID: {
			type: 'string',
			source: 'attribute',
			selector: '.project',
			attribute: 'data-resource'
		}
	},
	supports: {
		anchor: true
	},
	edit: edit,
	save: save
} );