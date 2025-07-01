const { registerBlockType } = wp.blocks;
const { Fragment, useState } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps, URLInputButton } = wp.blockEditor;
const { Button, PanelBody, SelectControl, ColorPalette, ToggleControl, RangeControl, Flex, TextareaControl, TextControl } = wp.components;
const { __ } = wp.i18n;

const template = [
	['core/image', {}],
	['amwa-theme-block/content-column', {}],
];


const EditSlide = ( { attributes, setAttributes, clientId } ) => {

		const blockProps = useBlockProps({
			className: 'slide swiper-slide'
		});	

		return (
			<Fragment>
				<div 
					{...blockProps}
				>
					<InnerBlocks
						template={ template }
						allowedBlocks={ ['amwa-theme-block/content-column', 'core/image'] }
					/>	
				</div>
			</Fragment>
		);
}

export default EditSlide;