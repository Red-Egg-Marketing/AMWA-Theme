const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { RichText, InnerBlocks, useBlockProps } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';
import Header from '../../components/Header.js';

const SaveHero = ( { attributes } ) => {
		const { image, anchor, vidOrImg, videoID, videoURL, videothumb, padding, blockId, margin, fullHeight, withBranding, title } = attributes;

		const blockProps = useBlockProps.save({
			id: blockId,
			className: 'hero' + (fullHeight == 'yes' ? ' full-height' : '')
		});

		const imageSize = image.size != '' ? image.size + '%' : image.sizekey;

		const backgroundSettings = {
    		"background-image" : image.url != '' ? 'url(' + image.url + ')' : '',
    		"background-repeat" : image.repeat != '' ? image.repeat : '',
    		"background-attachment" : image.attachment != '' ? image.attachment : '',
    		"background-position" : image.position != '' ? image.position : '',
    		"background-size" : imageSize,
    	}
		
		return (
			<Fragment>
				<PaddingSelector.View 
					padding={ padding }
					id={ blockId }
				/>
				<MarginSelector.View 
					margin={ margin }
					id={ blockId }
				/>
				<div {...blockProps}>
					<div className="block-wrapper">
						<div className="hero__inner">
							<div className="content-wrap">
								<div className="hero-block-content">
									<div className="hero-block-wrap">
										<InnerBlocks.Content />
									</div>
									
								</div>
								{ title != '' && (
									<div className="featured-link">
										<Header.View
											tag="h4"
											title={ title }
										/>
									</div>
								)}
							</div>
							<div className="hero-block-image">
								{ (image && vidOrImg == 'image' ) && (
									<div className="hero-block-image-wrap" style={ backgroundSettings }>
									</div>
								)}
								{ (videoID && vidOrImg == 'video' ) && (
									<video className="hero-asset"
											poster={ videothumb.url }
											autoplay playsinline muted loop>
										<source src={videoURL} className="hero-source" type="video/mp4" />
									</video>
								)}
							</div>	
						</div>
					</div>
				</div>
			</Fragment>
		);
}

export default SaveHero;