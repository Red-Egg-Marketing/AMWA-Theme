const { useBlockProps } = wp.blockEditor;
const { Fragment } = wp.element;
const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import Header from '../../components/Header.js';
import Content from '../../components/Content.js';
import ImageComp from '../../components/ImageComp.js';
import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const SaveCTAGrid = ( { attributes } ) => {

		const {
			columns, bgColor, bgSlug, color, padding, blockId, margin, bg, imgSize
		} = attributes;
		
		const blockProps = useBlockProps.save({
			id: blockId,
			className: 'grid-buttons' + ' columns-' + columns + (bgSlug != '' ? ' ' + bgSlug + ' with-bg' : '') + (bg != '' ? ' ' + bg : '') + (imgSize != '' ? ' ' + imgSize : '')
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
					<div className="block-wrapper">
						<InnerBlocks.Content />
					</div>
				</div>
			</Fragment>
		);
}

export default SaveCTAGrid;