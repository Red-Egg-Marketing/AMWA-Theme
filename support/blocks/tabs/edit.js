const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { useSelect } = wp.data;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { Button, PanelBody, SelectControl, ColorPalette, ToggleControl, RangeControl } = wp.components;
const { __ } = wp.i18n;
import Anchor from '../../components/Anchor.js';

const template = [
	['AMWA-theme-blocks/header-intro', {}],
	['AMWA-theme-blocks/tab-group', {}]
];

const EditTabs = ( { attributes, setAttributes, clientId } ) => {

		const { anchor } = attributes;

		const blockProps = useBlockProps({
			className: 'tabs'
		});	
		
		return (


			<Fragment>
				<InspectorControls>
					<Anchor
						setAttributes={ setAttributes }
						anchor={ anchor }
					/>
				</InspectorControls>
				<div {...blockProps} id={anchor}>
					<div className="block-wrapper">
						<InnerBlocks
							template={ template }
							allowedBlocks={ ['AMWA-theme-blocks/tab-group', 'AMWA-theme-blocks/header-intro'] }
						/>
					</div>
				</div>
			</Fragment>
		);
}

export default EditTabs;