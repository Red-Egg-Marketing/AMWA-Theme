const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from "./edit";
import save from "./save";

registerBlockType("amwa-theme-block/faq", {
	title: __("FAQ", "amwa-theme-block"),
	description: __("Block for displaying FAQ."),
	parent: ['amwa-theme-block/faq-section'],
	apiVersion: 2,
	icon: "info",
	category: "layout",
	attributes: {
		title: {
			type: "string",
			source: "text",
			selector: ".header-title",
			default: "",
		},
		content: {
			type: "string",
			source: "html",
			selector: ".content",
			default: "",
		},
		open: {
			type: "boolean",
			default: false		
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
	edit: edit,
	save: save,
});
