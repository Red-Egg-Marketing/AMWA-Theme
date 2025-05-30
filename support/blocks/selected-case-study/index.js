const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'amwa-theme-block/selected-case-study', {
	apiVersion: 2,
	title: __( 'Selected Spotlight Stories', 'amwa-theme-block' ),
	description: __( 'Block for a selecting Spotlight Stories by category. Displays statistics block associated with Case Study.', 'amwa-theme-block' ),
	icon: 'welcome-write-blog',
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