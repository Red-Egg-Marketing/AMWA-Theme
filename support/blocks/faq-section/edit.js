const { registerBlockType } = wp.blocks;
const { Fragment, useState } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { Button, PanelBody, SelectControl, ColorPalette, ToggleControl, RangeControl } = wp.components;
const { __ } = wp.i18n;
import Header from '../../components/Header.js';
import BackgroundColor from '../../components/BackgroundColor.js';
import Columns from '../../components/Columns.js';
import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const template = [
	['core/heading', {}],
	['amwa-theme-block/faq', {}],
	['amwa-theme-block/faq', {}],
	['amwa-theme-block/faq', {}],
	['amwa-theme-block/faq', {}],
	['amwa-theme-block/faq', {}],
];

const EditFAQSection = ( { attributes, setAttributes, clientId } ) => {

		const { padding, blockId, margin, bgColor, bgSlug } = attributes;


		const blockProps = useBlockProps({
			className: 'faq-section' + (bgSlug != '' ? ' ' + bgSlug + ' with-bg' : '')
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
				<div {...blockProps}>
					<div className="block-wrapper">
						<InnerBlocks
							template={ template }
							allowedBlocks={['amwa-theme-block/faq', 'core/heading', 'core/buttons', 'core/paragraph']}
						/>
					</div>
				</div>
			</Fragment>
		);
}

export default EditFAQSection;