import React from 'react';
const { Fragment } = wp.element;
const { RichText, InnerBlocks, useBlockProps, InspectorControls } = wp.blockEditor;
const { Button, PanelBody, ColorPalette } = wp.components;
const { __ } = wp.i18n;

const defcolors = [
    { name: 'White', color: 'rgba(255, 255, 255, 1)', slug: 'white' },
    { name: 'Light Yellow', color: 'rgba(251, 242, 232, 1)', slug: 'light-yellow' },
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