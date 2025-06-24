const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { Button, PanelBody, SelectControl, ColorPalette, ToggleControl, RangeControl, ResponsiveWrapper } = wp.components;
const { __ } = wp.i18n;
import ImageComp from '../../components/ImageComp.js';
import Header from '../../components/Header.js';
import BackgroundColor from '../../components/BackgroundColor.js';
import BackgroundSelector from '../../components/BackgroundSelector.js';
import ColumnsWidths from '../../components/Columns-Widths.js';
import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';


const colors = [
    { name: 'White', color: 'rgba(255, 255, 255, 1)', slug: 'white' },
    { name: 'Light Yellow', color: 'rgba(251, 243, 232, 1)', slug: 'light-yellow' },
];



const template = [
	['amwa-theme-block/content-column'],
];


const allowBlocks = ['amwa-theme-block/content-column'];

const EditTextSection = ( { attributes, setAttributes, clientId } ) => {
		const {
			media, title, image, bgColor, bgSlug, color, animateScroll, columnwidth, padding, margin, blockId
		} = attributes;

		const blockProps = useBlockProps({
			className: 'text-section' + ' ' + (bgSlug != '' ? ' ' + bgSlug + ' with-bg' : '')  + (animateScroll == true ? ' scroll-activate' : '') + (' ' + columnwidth),
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
						colors={ colors }
					/>
				</InspectorControls>
				<div {...blockProps}>
					<div className="block-wrapper">
						<div className={`block-content`}>
							<InnerBlocks 
								template={ template }
								allowedBlocks={ allowBlocks }
							/>
						</div>
					</div>
				</div>
			</Fragment>
		);
}

export default EditTextSection;