const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { Button, PanelBody, SelectControl, ColorPalette, ToggleControl, RangeControl, ResponsiveWrapper } = wp.components;
const { __ } = wp.i18n;
import ImageComp from '../../components/ImageComp.js';
import Header from '../../components/Header.js';
import BackgroundColor from '../../components/BackgroundColor.js';
import BackgroundSelector from '../../components/BackgroundSelector.js';
import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

// Available alignment control options

const colors = [
    { name: 'White', color: 'rgba(255, 255, 255, 1)', slug: 'white' },
    { name: 'Light Yellow', color: 'rgba(251, 243, 232, 1)', slug: 'light-yellow' },
];


const allowBlocks = ['amwa-theme-block/images'];

const template = [
	['amwa-theme-block/images'],
	['amwa-theme-block/images'],
	['amwa-theme-block/images'],
]

const EditImageColumns = ( { attributes, setAttributes, clientId } ) => {
		const {
			contentAlign, image, bgColor, bgSlug, color, vidOrImg, videoID, videoURL, withDrop, fullWidth, padding, blockId, margin
		} = attributes;

		const blockProps = useBlockProps({
			className: 'images-columns' + (bgSlug != '' ? ' ' + bgSlug + ' with-bg' : '') + (withDrop == false ? ' no-ds' : ' with-ds'),
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

export default EditImageColumns;