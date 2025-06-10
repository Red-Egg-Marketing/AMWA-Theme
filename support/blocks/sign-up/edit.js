const { registerBlockType } = wp.blocks;
const { Fragment, useState } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { Button, PanelBody, SelectControl, TextControl, ColorPalette, ToggleControl, RangeControl, Popover, withFocusOutside } = wp.components;
const { __ } = wp.i18n;
import Header from '../../components/Header.js';
import Content from '../../components/Content.js';
import Icons from '../../components/Icons.js';
import BackgroundColor from '../../components/BackgroundColor.js';
import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const template = [
	['amwa-theme-block/contact-content'],
	['gravityforms/form']
];

const EditSignUp = ( { attributes, setAttributes, clientId } ) => {

		const {
			padding, blockId, margin
		} = attributes;
	
		const blockProps = useBlockProps({
			className: 'sign-up column'
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
				</InspectorControls>
				<div {...blockProps}>
					<div className="wrapper">
						<div className="block-wrapper">
							<InnerBlocks 
								allowedBlocks={ ['amwa-theme-block/contact-content', 'amwa-theme-block/contact-forms'] }
								template={ template }
							/>
						</div>
					</div>
				</div>
			</Fragment>
		);
}

export default EditSignUp;