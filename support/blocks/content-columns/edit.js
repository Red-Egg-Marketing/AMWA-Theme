const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps, URLInputButton } = wp.blockEditor;
const { Button, PanelBody, SelectControl, ColorPalette, ToggleControl, RangeControl, Flex } = wp.components;
const { __ } = wp.i18n;


const allowBlocks = ['core/heading', 'core/paragraph', 'core/list', 'core/buttons', 'amwa-theme-block/faq-section'];

const template = [
	['core/heading', {'level' : 1, 'className' : 'header-title', 'placeholder' : 'Section Header...'}],
	['core/paragraph', {'placeholder' : 'Section paragraph...'}],
	['core/buttons', {},
		[
			['core/button', {'placeholder' : 'CTA...'}]
		]
	]
];

const EditAnchorLinks = ( { attributes, setAttributes } ) => {
		
		const blockProps = useBlockProps({
			className: 'content-columns column'
		});	
		
		return (
			<Fragment>
				<div {...blockProps}>
					<div className="wrap">
						<InnerBlocks 
							template={ template }
							allowedBlocks={ allowBlocks }
						/>
					</div>
				</div>
			</Fragment>
		);
}

export default EditAnchorLinks;