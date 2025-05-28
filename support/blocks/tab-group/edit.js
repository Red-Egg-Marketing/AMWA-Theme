const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { useSelect } = wp.data;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { Button, PanelBody, SelectControl, ColorPalette, ToggleControl, RangeControl } = wp.components;
const { __ } = wp.i18n;
import Content from '../../components/Content.js';
import Columns from '../../components/Columns.js';

const template = [
	['AMWA-theme-blocks/tab', {}],
	['AMWA-theme-blocks/tab', {}],
];

const EditTabGroup = ( { attributes, setAttributes, clientId } ) => {

		const { height } = attributes;

		let style = {
			'height' : height + 'px'
		}

		const blockProps = useBlockProps({
			className: 'tab-group'
		});	
		
		return (

			<Fragment>
				<div {...blockProps}>
					<div className="block-wrapper">
						<div className="tabs-wrap"
							style={ style }
						>
							<InnerBlocks
								template={ template }
								allowedBlocks={ ['AMWA-theme-blocks/tab'] }
							/>
						</div>
					</div>
				</div>
			</Fragment>
		);
}

export default EditTabGroup;