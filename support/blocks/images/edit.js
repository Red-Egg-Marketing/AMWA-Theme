const { registerBlockType } = wp.blocks;
const { Fragment, useState } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { Button, PanelBody, SelectControl, TextControl, ColorPalette, ToggleControl, RangeControl, Popover, withFocusOutside } = wp.components;
const { __ } = wp.i18n;
import BackgroundColor from '../../components/BackgroundColor.js';

const temp = [
	['core/image', {},],
];

const EditImages = ( { attributes, setAttributes } ) => {

	
		const {
			title, content, icons, subtitle, allowBlocks, template
		} = attributes;

		const blockProps = useBlockProps({
			className: 'image-column column'
		});	

		
		return (
			<Fragment>
				<div {...blockProps}>							
					<InnerBlocks 
						allowedBlocks={ allowBlocks }
						template={ temp }
					/>
				</div>
			</Fragment>
		);
}

export default EditImages;