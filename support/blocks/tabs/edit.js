const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { useSelect } = wp.data;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { Button, PanelBody, SelectControl, ColorPalette, ToggleControl, RangeControl } = wp.components;
const { __ } = wp.i18n;
import Anchor from '../../components/Anchor.js';

const template = [
	['amwa-theme-block/header-intro', {}],
	['amwa-theme-block/tab-group', {}]
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
							allowedBlocks={ ['amwa-theme-block/tab-group', 'amwa-theme-block/header-intro'] }
						/>
					</div>
				</div>
			</Fragment>
		);
}

export default EditTabs;