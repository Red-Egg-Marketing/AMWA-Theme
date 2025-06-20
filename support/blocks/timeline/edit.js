const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { Button, PanelBody, SelectControl, ColorPalette, ToggleControl, RangeControl } = wp.components;
const { __ } = wp.i18n;
import Content from '../../components/Content.js';
import BackgroundColor from '../../components/BackgroundColor.js';
import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const template = [
	['amwa-theme-block/period', {}],
];

const EditTimeline = ( { attributes, setAttributes, clientId } ) => {

		const { bgSlug, bgColor, padding, blockId, margin, content } = attributes;

		const blockProps = useBlockProps({
			className: 'timeline' + (bgSlug != '' ? ' ' + bgSlug + ' with-bg' : '')
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
						<div className="description-container">
							<Content
								tag="div"
								classProp="description"
								content={ content }
								multiline="p"
								setAttributes={ setAttributes }
								placeholder="Timeline description..."
							/>
						</div>
						<div className="time-navigation"></div>
						<div className="block-content">							
							<InnerBlocks
								template={ template }
								allowedBlocks={ ['amwa-theme-block/period'] }
							/>
						</div>
					</div>
				</div>
			</Fragment>
		);
}

export default EditTimeline;