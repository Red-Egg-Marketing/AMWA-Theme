const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps, URLInputButton } = wp.blockEditor;
const { Button, PanelBody, SelectControl, ColorPalette, ToggleControl, RangeControl, Flex } = wp.components;
const { __ } = wp.i18n;


const SaveAnchorLinks = ( { attributes, setAttributes } ) => {

		const blockProps = useBlockProps.save({
			className: 'anchor-links'
		});	
		
		return (
			<Fragment>
				<div {...blockProps}>
					<div className="wrap">
						<InnerBlocks.Content />
					</div>
				</div>
			</Fragment>
		);
}

export default SaveAnchorLinks;