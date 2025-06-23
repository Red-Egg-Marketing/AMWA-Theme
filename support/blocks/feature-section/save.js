const { useBlockProps } = wp.blockEditor;
const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const SaveFeatureSection = ( { attributes } ) => {
		const {
			 bgColor, bgSlug, color, withDrop, animateScroll, columnwidth, padding, margin, blockId
		} = attributes;

		const blockProps = useBlockProps.save({
			className: 'feature-section' + ' ' +  (bgSlug != '' ? ' ' + bgSlug + ' with-bg' : '') + (withDrop == false ? ' no-ds' : ' with-ds') + (animateScroll == true ? ' scroll-activate' : '') + (' ' + columnwidth),
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

export default SaveFeatureSection;