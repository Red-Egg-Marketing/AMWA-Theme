const { registerBlockType } = wp.blocks;
const { Fragment, useState } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps, URLInputButton } = wp.blockEditor;
const { Button, PanelBody, SelectControl, ColorPalette, ToggleControl, RangeControl, Flex, TextareaControl, TextControl } = wp.components;
const { __ } = wp.i18n;
import Content from '../../components/Content.js';
import BackgroundColor from '../../components/BackgroundColor.js';

const template = [
	['core/image', {}],
	['core/heading', {'level' : 4, 'placeholder' : 'Card Title...'}],
	['core/paragraph', {'placeholder' : 'Card Description...'}],
	['core/buttons', {},
		[
			['core/button', {'placeholder' : 'Learn More...', 'className' : 'is-style-solid-green' }]
		]
	],
];

const defcolors = [
    { name: 'Light Orange', color: 'rgba(236, 171, 49)', slug: 'light-orange' },
    { name: 'Blue', color: 'rgba(45, 158, 198)', slug: 'teal' },
    { name: 'Purple', color: 'rgba(117, 86, 125)', slug: 'purple' },
    { name: 'Orange', color: 'rgba(203, 94, 65)', slug: 'orange' },
    { name: 'Bright Orange', color: 'rgba(244, 128, 116)', slug: 'bright-orange' },
    { name: 'White', color: 'rgba(255, 255, 255)', slug: 'white' },
    { name: 'Green', color: 'rgba(59, 126, 85)', slug: 'green' }
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
        label: __( 'White' ),
        value: 'white',
    },
    {
        label: __( 'Light Yellow' ),
        value: 'light-yellow',
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
						colors={ defcolors }
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