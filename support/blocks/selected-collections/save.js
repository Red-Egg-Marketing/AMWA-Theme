const { useBlockProps } = wp.blockEditor;
const { Fragment } = wp.element;
const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const SaveSelectedCollections = ( { attributes } ) => {

		const { bgSlug, bgColor, padding, blockId, margin } = attributes;
		
		const blockProps = useBlockProps.save({
			id: blockId,
			className: 'selected-lessons' + (bgSlug != '' ? ' ' + bgSlug + ' with-bg' : '')
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
					<InnerBlocks.Content />
				</div>
			</Fragment>
		);
}

export default SaveSelectedCollections;