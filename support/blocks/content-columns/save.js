const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps, URLInputButton } = wp.blockEditor;
const { Button, PanelBody, SelectControl, ColorPalette, ToggleControl, RangeControl, Flex } = wp.components;
const { __ } = wp.i18n;
import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';


const SaveContentColumns = ( { attributes, setAttributes } ) => {

		const {
			padding, blockId, margin
		} = attributes;

		const blockProps = useBlockProps.save({
			id: blockId,
			className: 'content-columns column'
		});	
		
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
					<div className="wrap">
						<InnerBlocks.Content />
					</div>
				</div>
			</Fragment>
		);
}

export default SaveContentColumns;