import React from 'react';
const { Fragment } = wp.element;
const { RichText, InnerBlocks, useBlockProps, InspectorControls } = wp.blockEditor;
const { Button, PanelBody, ColorPalette } = wp.components;
const { __ } = wp.i18n;

const defcolors = [
    { name: 'Light Orange', color: 'rgba(236, 171, 49)', slug: 'light-orange' },
    { name: 'Blue', color: 'rgba(45, 158, 198)', slug: 'teal' },
    { name: 'Purple', color: 'rgba(117, 86, 125)', slug: 'purple' },
    { name: 'Orange', color: 'rgba(203, 94, 65)', slug: 'orange' },
    { name: 'Bright Orange', color: 'rgba(244, 128, 116)', slug: 'bright-orange' },
    { name: 'White', color: 'rgba(255, 255, 255)', slug: 'white' },
    { name: 'Green', color: 'rgba(59, 126, 85)', slug: 'green' },
];

const BackgroundColor = (props) => {

	const { bgColor, bgSlug, colors, title } = props;

	const customColors = colors == null ? defcolors : colors;

	const settitle = title == null ? 'Background Color' : title;

	const setBackgroundColor = (value) => {

		var bgColor = customColors.find(obj => {
			if (obj.color == value) {
				return obj;
			}
		});

		props.setAttributes( {
			bgColor: value
		});

		props.setAttributes({
			bgSlug: bgColor != undefined ? bgColor.slug : ''
		});
	}

	
	return (
		<Fragment>
			<PanelBody
				title={__( settitle )}
				initialOpen={ false }
			>
				<ColorPalette
            		colors={ customColors }
            		value={ bgColor }
            		onChange={ setBackgroundColor }
            		disableCustomColors={ true }
        		/>
			</PanelBody>
		</Fragment>
	)
}

BackgroundColor.View = (props) => {
	return null;
}

export default BackgroundColor;