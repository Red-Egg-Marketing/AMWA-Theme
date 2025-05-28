const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps, URLInputButton } = wp.blockEditor;
const { Button, PanelBody, SelectControl, ColorPalette, ToggleControl, RangeControl, Flex } = wp.components;
const { __ } = wp.i18n;
import ImageComp from '../../components/ImageComp.js';

const allowBlocks = ['core/heading', 'core/paragraph', 'core/list', 'core/buttons'];

const template = [
	['core/heading', {'level' : 1, 'className' : 'header-title', 'placeholder' : 'Section Header...'}],
	['core/paragraph', {'placeholder' : 'Section paragraph...'}],
	['core/buttons', {},
		[
			['core/button', {'placeholder' : 'CTA...'}]
		]
	]
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


const EditImage = ( { attributes, setAttributes } ) => {
		const {
			 media, image, vidOrImg, videoID, videoURL, videothumb
		} = attributes;


		const blockProps = useBlockProps({
			className: 'image-col column'
		});

		const updateImageAttr = (media) => {
			let large   = media.url,
			    medium  = media.sizes['medium-small'] ? media.sizes['medium-small'].url : media.url;

            	setAttributes({
            	    media : {
						srcSet: {
							large : large,
							medium : medium
						},
						id: media.id,
						alt: media.alt
					}
            	});
            	
        }

		const updateVideoAttr = (media) => {
            setAttributes({
                videoURL : media.url,
                videoID : media.id
            });
        }

        const removeBackgroundImage = () => {

    		let newBody = JSON.parse(JSON.stringify(videothumb));
    		newBody.url = '';
    		newBody.width = '';
    		newBody.height = '';

    		setAttributes({
    			videothumb: newBody
    		});
    	}

		const setBackgroundImage = (media) => {

    		let newBody = JSON.parse(JSON.stringify(videothumb));
    		let type = media.mime;
    		newBody.url = media.url;
    		if (type == "image/svg+xml") {
    			var xmlhttp = new XMLHttpRequest();
				xmlhttp.open("GET", media.url, true);  
				xmlhttp.onreadystatechange = function(){
					if(xmlhttp.readyState==4 && xmlhttp.status==200){
						let myresponse = xmlhttp.responseText;
						let parser = new DOMParser();
    					let doc = parser.parseFromString(myresponse, "image/svg+xml");
    					let viewBox = doc.documentElement.viewBox.baseVal;
    					let width = viewBox.width;
    					let height = viewBox.height;
    					newBody.width = width;
    					newBody.height = height;
					}
				}
				xmlhttp.send();
    		} else {
    			newBody.width = media.width;
    			newBody.height = media.height;
    		}

    		setAttributes({
    			videothumb: newBody
    		});
    	}
		
		return (
			<Fragment>
				<InspectorControls>
					<PanelBody
							title={ __( 'With Video or Image' ) }
							initialOpen={ false }
						>
							<SelectControl
								label={ __( 'Video or Image' ) }
								value={ vidOrImg }
								options={ VidImg }
								onChange={ ( selectedVidImg ) => {
									setAttributes( {
										vidOrImg: selectedVidImg,
									} );
								} }
							/>
					</PanelBody>
					{ vidOrImg == 'video' && (
							<PanelBody
								title={ __('Video Thumbnail')}
								initialOpen={ false }
							>
								<MediaUpload
									allowedTypes={ ['image'] }
									onSelect={ setBackgroundImage }
									value={ videothumb.url }
									render={ ( {open} ) =>(
										<Fragment>
											<Button
												isSecondary
												onClick={ open }
												style={
													{
														'margin-bottom' : '15px',
														'height' : 'auto',
														'display' : 'block',
														'width' : '100%'
													}
												}
											> 
												{ videothumb.url == '' && ( __('Add Video Thumbnail') )}
												{ videothumb.url != '' && (
													<ResponsiveWrapper
														naturalWidth={ videothumb.width }
														naturalHeight={ videothumb.height }
													>
														<img 
															src={ videothumb.url }
															style={
																{
																	'max-height' : 'auto',
																	'width' : 'auto',
																}
															}
														/>
													</ResponsiveWrapper>
												)}
											</Button>
								
												{ videothumb.url != '' && (
													<Fragment>
														<Button
															isDestructive
															isSmall
															onClick={
																removeBackgroundImage
															}
														>
															Remove Image
														</Button>
													</Fragment>
												)}
										</Fragment>
									)}
								/>
							</PanelBody>
						)
					}
				</InspectorControls>
				<div {...blockProps}>
					{ vidOrImg == 'image' && (
						<Fragment>
							<ImageComp
								id={ media.id }
								source={ media.srcSet.large }
								updateImageAttr={ updateImageAttr }
								alt={ __( media.alt ) }
							/>
						</Fragment>
					)}
					{ vidOrImg == 'video' && (
						<Fragment>
							<MediaUpload
								onSelect={ updateVideoAttr }
								allowedTypes="video/mp4"
								value={ videoID }
								render={ ( { open } ) => (
									<Button
										className="button"
										onClick={ open }
									>
										Upload/Change Video
									</Button>
								) }
							/>
							{ videoID && (
								<video className="hero-asset" 
									playsinline
									poster={ videothumb.url }
								>
									<source src={videoURL} className="source" type="video/mp4" />
								</video>
							)}
						</Fragment>
					)}
					<InnerBlocks 
						allowedBlocks={ allowBlocks }
					/>
				</div>
			</Fragment>
		);
}

export default EditImage;