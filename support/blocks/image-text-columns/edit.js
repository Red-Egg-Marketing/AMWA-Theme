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
const alignOptions = [
	{
        label: __( 'Image Right' ),
        value: 'img-right',
    },
    {
        label: __( 'Image Left' ),
        value: 'img-left',
    },
];

const widthOptions = [
	{
        label: __( 'Full Width' ),
        value: 'full-width',
    },
    {
        label: __( '-' ),
        value: '',
    	default: true
    },
];


const colors = [
    { name: 'White', color: 'rgba(255, 255, 255, 1)', slug: 'white' },
    { name: 'Light Brown', color: 'rgba(240, 232, 215, 1)', slug: 'light-brown' },
];

const VidImg = [
    {
        label: __( 'Image' ),
        value: 'image',
    },
    {
        label: __( 'Video' ),
        value: 'video',
    } 
];


const allowBlocks = ['amwa-theme-block/image-columm', 'amwa-theme-block/content-column'];

const template = [
	['amwa-theme-block/image-columm'],
	['amwa-theme-block/content-column'],
]

const EditImageColumns = ( { attributes, setAttributes, clientId } ) => {
		const {
			contentAlign, image, bgColor, bgSlug, color, vidOrImg, videoID, videoURL, withDrop, fullWidth, padding, blockId, margin
		} = attributes;
		
        const imageSize = image.size != '' ? image.size + image.unit : image.sizekey;

		let imagePos = '';

        if (image.bgkeyword == 'keyword') {
        	imagePos = image.position != '' ? image.position : '';
        } else if(image.bgkeyword == 'values') {
        	let unit = image.bgunit;
        	imagePos = image.positionX + unit + ' ' + image.positionY + unit;
        }

    	const backgroundSettings = {
    		"background-image" : image.url != '' ? 'url(' + image.url + ')' : '',
    		"background-repeat" : image.repeat != '' ? image.repeat : '',
    		"background-attachment" : image.attachment != '' ? image.attachment : '',
    		"background-position" : imagePos,
    		"background-size" : imageSize
    	}


		const blockProps = useBlockProps({
			className: 'image-columns' + ' ' + contentAlign + ' ' + fullWidth + (bgSlug != '' ? ' ' + bgSlug + ' with-bg' : '') + (withDrop == false ? ' no-ds' : ' with-ds'),
			style: image.url != '' ? backgroundSettings : ''
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
					<PanelBody 
						title={ __( 'Align Content' ) }
						initialOpen={ false }
					>
						<SelectControl
							label={ __( 'Align Content' ) }
							value={ contentAlign }
							options={ alignOptions}
							onChange={ ( selectedAlign ) => {
								setAttributes( {
									contentAlign: selectedAlign,
								} );
							} }
						/>
					</PanelBody>
					<PanelBody 
						title={ __( 'Full Width Image' ) }
						initialOpen={ false }
					>
						<SelectControl
							label={ __( 'Full Width Image' ) }
							value={ fullWidth }
							options={ widthOptions}
							onChange={ ( selectedWidth ) => {
								setAttributes( {
									fullWidth: selectedWidth,
								} );
							} }
						/>
					</PanelBody>
					<BackgroundColor
						bgColor={ bgColor }
						bgSlug={ bgSlug }
						setAttributes={ setAttributes }
						colors={ colors }
					/>
				</InspectorControls>
				<div {...blockProps}>
					<div className="block-wrapper">
						<div className={`block-content ${ contentAlign }`}>
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