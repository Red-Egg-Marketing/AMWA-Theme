const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps, URLInputButton } = wp.blockEditor;
const { Button, PanelBody, SelectControl, ColorPalette, ToggleControl, RangeControl, Flex } = wp.components;
const { __ } = wp.i18n;
import ImageComp from '../../components/ImageComp.js';

const SaveImage = ( { attributes, setAttributes } ) => {

		const {
			 media, title, vidOrImg, videoID, videoURL, videothumb
		} = attributes;


		const blockProps = useBlockProps.save({
			className: 'image-col column'
		});

		let sizes = "(min-width: 880px) 100vw, 400px";

		let srcSet = ``;
		
		return (
			<Fragment>
				<div {...blockProps}>
					{ vidOrImg == 'image'  && (
							<ImageComp.View
								source={ media.srcSet.large }
								alt={ __( media.alt ) }
								srcSet={ srcSet }
								sizes={ sizes }
							/>
						)}
					{ (videoID && vidOrImg == 'video' ) && (
						<Fragment>
							<button className="custom-video-button">Play</button>
							<video className="hero-asset"
								poster={ videothumb.url }
								playsinline
							>
								<source src={videoURL} className="source" type="video/mp4" />
							</video>
						</Fragment>
					)}
					
				</div>
			</Fragment>
		);
}

export default SaveImage;