const { registerBlockType } = wp.blocks;
const { Fragment, useState } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { Button, PanelBody, SelectControl, TextControl, ColorPalette, ToggleControl, RangeControl, Popover, withFocusOutside } = wp.components;
const { __ } = wp.i18n;
import BackgroundColor from '../../components/BackgroundColor.js';

const temp = [
	['core/image', {},],
	['core/details', {},],
];

const columnsArray = [
	{
		label: __('-'),
	},
	{
		label: __('33%'),
		value: 'width-33'
	},
	{
		label: __('50%'),
		value: 'width-50'
	},
	{
		label: __('66%'),
		value: 'width-66'
	},
	{
		label: __('100%'),
		value: 'width-100'
	}
];



const EditImages = ( { attributes, setAttributes } ) => {

	
		const {
			 allowBlocks, width
		} = attributes;


		const setColumnWidths = (value) => {
			setAttributes({width : value});
		}

		const blockProps = useBlockProps({
			className: 'image-column column ' + width
		});

		
		return (
			<Fragment>
				<InspectorControls>
					<SelectControl
						label={ __('Width')}
						value={ width }
						options={
							columnsArray
						}
						onChange={ setColumnWidths }
					/>
				</InspectorControls>
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