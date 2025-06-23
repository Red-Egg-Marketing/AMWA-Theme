const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps, URLInputButton } = wp.blockEditor;
const { Button, PanelBody, SelectControl, ColorPalette, ToggleControl, RangeControl, Flex } = wp.components;
const { __ } = wp.i18n;


const allowBlocks = ['core/list'];

const template = [
	['core/list', {},
		[
			['core/list-item'],
			['core/list-item'],
			['core/list-item']
		]
	]
];

const EditAnchorLinks = ( { attributes, setAttributes } ) => {
		
		const blockProps = useBlockProps({
			className: 'anchor-links'
		});	
		
		return (
			<Fragment>
				<div {...blockProps}>
					<div className="wrap">
						<InnerBlocks 
							template={ template }
							allowedBlocks={ allowBlocks }
						/>
					</div>
				</div>
			</Fragment>
		);
}

export default EditAnchorLinks;