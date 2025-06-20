const { useBlockProps } = wp.blockEditor;
const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;

const SaveImageColumns = ( { attributes } ) => {
		const {
			 bgColor, bgSlug, color, withDrop, animateScroll, columnwidth
		} = attributes;

		const blockProps = useBlockProps.save({
			className: 'feature-section' + ' ' +  (bgSlug != '' ? ' ' + bgSlug + ' with-bg' : '') + (withDrop == false ? ' no-ds' : ' with-ds') + (animateScroll == true ? ' scroll-activate' : '') + (' ' + columnwidth),
		});

		return (
			<div {...blockProps}>
				<div className="block-wrapper">
					<div className={`block-content`}>
						<InnerBlocks.Content />							
					</div>
				</div>
			</div>
		);
}

export default SaveImageColumns;