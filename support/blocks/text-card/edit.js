const { registerBlockType } = wp.blocks;
const { Fragment, useState } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps, URLInputButton } = wp.blockEditor;
const { Button, PanelBody, SelectControl, ColorPalette, ToggleControl, RangeControl, Flex, TextareaControl, TextControl } = wp.components;
const { __ } = wp.i18n;
import Content from '../../components/Content.js';
import BackgroundColor from '../../components/BackgroundColor.js';

const template = [
	['core/image', {}],
	['core/heading', {'level' : 3, 'placeholder' : 'Card Title...'}],
	['core/paragraph', {'placeholder' : 'Card Description...'}],
	['core/buttons', {},
		[
			['core/button', {'placeholder' : 'Learn More...', 'className' : 'is-style-solid-green' }]
		]
	],
];

const widthOptions = [
    {
        label: __( '--' ),
        value: '',
    },
    {
        label: __( 'Width 100%' ),
        value: '100',
    },
];

const BGOptions = [
    {
        label: __( '--' ),
        disabled: true
    },
    {
        label: __( 'None' ),
        value: '',
    },
    {
        label: __( 'Light Grey' ),
        value: 'light-grey',
    },
];

const EditCTA = ( { attributes, setAttributes, clientId } ) => {
		const {
			width, bgColor, bgSlug, link, content, buttonText, iconColor, cardBG, withImage
		} = attributes;

		const blockProps = useBlockProps({
			className: 'text-card' + ' width-' + width + ' ' + 'border-' + bgSlug + ' ' + cardBG + ' ' + withImage
		});	

		const blockHasImage = ( clientId ) => {
			let innerBlocks = wp.data.select( 'core/editor' ).getBlock( clientId ).innerBlocks;
			let find = innerBlocks.find((element) => {
				let name = element.name;
				return name == 'core/image' ? true : false;
			});

			if (typeof find != 'undefined') {
				return true;
			}
		}

		if (blockHasImage(clientId)) {
			setAttributes({
				withImage: 'with-image'
			});
		} else {
			setAttributes({
				withImage: 'no-image'
			});
		}
		
		return (
			<Fragment>
				<InspectorControls>
					<PanelBody
						title={__('Card Width')}
						initialOpen={ true }
					>
						<SelectControl
							label={ __( 'Select Card Width' ) }
            				options={ widthOptions }
            				value={ width }
            				onChange={ ( selectedWidth ) => {
            					setAttributes({
            						width: selectedWidth
            					});
            				}}
        				/>
					</PanelBody>
					<PanelBody
						title={__('Card Background')}
						initialOpen={ false }
					>
						<SelectControl
							label={ __( 'Background Color' ) }
            				options={ BGOptions }
            				value={ cardBG }
            				onChange={ ( selectedBG ) => {
            					setAttributes({
            						cardBG: selectedBG
            					});
            				}}
        				/>
					</PanelBody>
					<BackgroundColor
						bgColor={ bgColor }
						bgSlug={ bgSlug }
						setAttributes={ setAttributes }
						title="Image Border & Background Color"
					/>
				</InspectorControls>
				<div 
					{...blockProps}
				>
					<div className="block-wrapper">
						<div className="block-content">	
							<InnerBlocks
								template={ template }
								templateLock={ false }
								allowedBlocks={ ['core/heading', 'core/paragraph', 'core/buttons', 'core/image'] }
							/>
						</div>
					</div>
				</div>
			</Fragment>
		);
}

export default EditCTA;