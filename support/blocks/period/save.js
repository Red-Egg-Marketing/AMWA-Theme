const { useBlockProps } = wp.blockEditor;
const { Fragment } = wp.element;
const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const SavePeriod = ( { attributes } ) => {

		const { bgSlug, bgColor, padding, blockId, margin, period } = attributes;
		
		const blockProps = useBlockProps.save({
			id: blockId,
			className: 'period' + (bgSlug != '' ? ' ' + bgSlug + ' with-bg' : ''),
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
				<div {...blockProps} data-period={ period }>
					<div className="block-wrapper">
						<div className="block-content">
							<InnerBlocks.Content />
						</div>
					</div>
				</div>
			</Fragment>
		);
}

export default SavePeriod;