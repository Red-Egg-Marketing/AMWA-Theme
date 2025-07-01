const { useBlockProps } = wp.blockEditor;
const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;

const SaveSlide = ( { attributes } ) => {

		const blockProps = useBlockProps.save({
			className: 'slide swiper-slide'
		});
	
		return (
			<Fragment>
				<div
					{...blockProps}
				>
					<InnerBlocks.Content />
				</div>
			</Fragment>
		);
}

export default SaveSlide;