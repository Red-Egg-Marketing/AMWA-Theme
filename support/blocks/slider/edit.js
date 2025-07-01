const { registerBlockType } = wp.blocks;
const { Fragment, useState } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps, URLInputButton } = wp.blockEditor;
const { Button, PanelBody, SelectControl, ColorPalette, ToggleControl, RangeControl, Flex, TextareaControl, TextControl } = wp.components;
const { __ } = wp.i18n;
import BackgroundColor from '../../components/BackgroundColor.js';
import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const template = [
	['amwa-theme-block/slide', {}],
];


const EditSlider = ( { attributes, setAttributes, clientId } ) => {

		const blockProps = useBlockProps({
			className: 'slider'
		});	
		

		return (
			<Fragment>
				<div 
					{...blockProps}
				>
					<div className="swiper">
						<div className="swiper-wrapper">
							<InnerBlocks
								template={ template }
								allowedBlocks={ ['amwa-theme-block/slide'] }
							/>
						</div>
						<div className="controls-wrapper">
							<div className="swiper-controls">
								<div class="swiper-button-prev"></div>
  								<div class="swiper-button-next"></div>
  							</div>
  						</div>
  					</div>
				</div>
			</Fragment>
		);
}

export default EditSlider;