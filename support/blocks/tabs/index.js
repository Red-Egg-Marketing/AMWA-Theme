const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'amwa-theme-block/tabs', {
	apiVersion: 2,
	title: __( 'Tabs', 'amwa-theme-block' ),
	description: __( 'Block for a tabs', 'amwa-theme-block' ),
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