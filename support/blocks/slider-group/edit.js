const { registerBlockType } = wp.blocks;
const { Fragment, useState } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps, URLInputButton } = wp.blockEditor;
const { Button, PanelBody, SelectControl, ColorPalette, ToggleControl, RangeControl, Flex, TextareaControl, TextControl } = wp.components;
const { __ } = wp.i18n;
import BackgroundColor from '../../components/BackgroundColor.js';
import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const template = [
	['amwa-theme-block/header-intro', {}],
	['amwa-theme-block/slider', {}],
];


const EditSliderGroup = ( { attributes, setAttributes, clientId } ) => {

		const {
			bgColor, bgSlug, padding, blockId, margin
		} = attributes;

		const blockProps = useBlockProps({
			className: 'slider-group' + (bgSlug != '' ? ' ' + bgSlug + ' with-bg' : '')
		});	
		
		React.useEffect( () => {
        	if ( ! blockId ) {
        	    setAttributes( { blockId: 'block-' + clientId } );
        	}
    	}, [] );

		return (
			<Fragment>
				<InspectorControls>
					<PaddingSelector
						setAttributes={ setAttributes }
						padding={ padding }
						id={ 'block-' + clientId }
					/>
					<MarginSelector
						setAttributes={ setAttributes }
						margin={ margin }
						id={ 'block-' + clientId }
					/>
					<BackgroundColor
						bgColor={ bgColor }
						bgSlug={ bgSlug }
						setAttributes={ setAttributes }
					/>
				</InspectorControls>
				<div 
					{...blockProps}
				>
					<div className="block-wrapper">
						<InnerBlocks
							template={ template }
							allowedBlocks={ ['amwa-theme-block/slider', 'amwa-theme-block/header-intro'] }
						/>
					</div>
				</div>
			</Fragment>
		);
}

export default EditSliderGroup;