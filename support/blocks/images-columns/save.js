const { useBlockProps } = wp.blockEditor;
const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import ImageComp from '../../components/ImageComp.js';
import Header from '../../components/Header.js';
import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const SaveImageColumns = ( { attributes } ) => {
		const {
			contentAlign, media, title, image,  bgColor, bgSlug, color, vidOrImg, videoID, videoURL, withDrop, videothumb, animateScroll, fullWidth, padding, blockId, margin, border
		} = attributes;

		const blockProps = useBlockProps.save({
			id: blockId,
			className: 'images-columns' + (bgSlug != '' ? ' ' + bgSlug + ' with-bg' : '') + (withDrop == false ? ' no-ds' : ' with-ds') + (animateScroll == true ? ' scroll-activate' : ''),
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
						<div className={`block-content`}>
							<InnerBlocks.Content />							
						</div>
					</div>
				</div>
			</Fragment>
		);
}

export default SaveImageColumns;