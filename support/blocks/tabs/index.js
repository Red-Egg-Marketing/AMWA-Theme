const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'AMWA-theme-blocks/tabs', {
	apiVersion: 2,
	title: __( 'Tabs', 'AMWA-theme-blocks' ),
	description: __( 'Block for a tabs', 'AMWA-theme-blocks' ),
	icon: 'table-col-after',
	category: 'layout',
	attributes: {
		anchor: {
			type: 'string',
			default: ''
		}
	},
	edit: edit,
	save: save
} );