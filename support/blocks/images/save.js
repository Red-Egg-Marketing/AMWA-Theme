const { useBlockProps } = wp.blockEditor;
const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import Header from '../../components/Header.js';
import Content from '../../components/Content.js';
import Icons from '../../components/Icons.js';

const SaveContactColumn = ( { attributes } ) => {
	
		const blockProps = useBlockProps.save({
			className: 'image-column column'
		});
	
		return (
			<div {...blockProps}>
				<InnerBlocks.Content />
			</div>
		);
}

export default SaveContactColumn;