const { useBlockProps } = wp.blockEditor;
const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const SaveSlider = ( { attributes } ) => {


		const blockProps = useBlockProps.save({
			className: 'slider'
		});
	
		return (
			<Fragment>
				<div
					{...blockProps}
				>
					<div className="swiper">
						<div className="swiper-wrapper">
							<InnerBlocks.Content />
						</div>
						<div className="controls-wrapper">
							<div className="swiper-controls">
								<div class="swiper-button-prev"></div>
  								<div class="swiper-button-next"></div>
  							</div>
  						</div>
					</div>
				</div>
			</Fragment>
		);
}

export default SaveSlider;