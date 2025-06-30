const { useBlockProps } = wp.blockEditor;
const { Fragment } = wp.element;
const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import Content from '../../components/Content.js';
import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const SaveTimeline = ( { attributes } ) => {

		const { bgSlug, bgColor, padding, blockId, margin, content } = attributes;
		
		const blockProps = useBlockProps.save({
			id: blockId,
			className: 'timeline' + (bgSlug != '' ? ' ' + bgSlug + ' with-bg' : '')
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
						{ content && (
						<div className="description-container">
							<Content.View
								tag="div"
								classProp="description"
								content={ content }
								multiline="p"
							/>
						</div>
						)}
						<div className="time-navigation"></div>
						<div className="block-content">
							<InnerBlocks.Content />
						</div>
					</div>
				</div>
			</Fragment>
		);
}

export default SaveTimeline;