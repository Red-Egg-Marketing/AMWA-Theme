const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { Button, PanelBody, SelectControl, ColorPalette, ToggleControl, RangeControl } = wp.components;
const { __ } = wp.i18n;
import BackgroundColor from '../../components/BackgroundColor.js';
import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const template = [
	['amwa-theme-block/header-intro', {}],
	['amwa-theme-block/collections', {}],
];

const EditSelectedCollections = ( { attributes, setAttributes, clientId } ) => {

		const { bgSlug, bgColor, padding, blockId, margin } = attributes;

		const blockProps = useBlockProps({
			className: 'selected-lessons' + (bgSlug != '' ? ' ' + bgSlug + ' with-bg' : '')
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
					<InnerBlocks
						template={ template }
						allowedBlocks={ ['amwa-theme-block/header-intro', 'amwa-theme-block/collections', 'core/buttons'] }
					/>
				</div>
			</Fragment>
		);
}

export default EditSelectedCollections;