const { useBlockProps } = wp.blockEditor;
const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const SaveSliderGroup = ( { attributes } ) => {

		const {
			bgColor, bgSlug, padding, blockId, margin
		} = attributes;
	
		const blockProps = useBlockProps.save({
			id: blockId,
			className: 'slider-group' + (bgSlug != '' ? ' ' + bgSlug + ' with-bg' : '')
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
				<div
					{...blockProps}
				>
					<div className="block-wrapper">
						<InnerBlocks.Content />							
					</div>
				</div>
			</Fragment>
		);
}

export default SaveSliderGroup;