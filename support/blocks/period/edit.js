const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { Button, PanelBody, SelectControl, ColorPalette, ToggleControl, RangeControl, TextControl } = wp.components;
const { __ } = wp.i18n;
import BackgroundColor from '../../components/BackgroundColor.js';
import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const template = [
	['amwa-theme-block/images'],
	['amwa-theme-block/contact-content', 
		{
			allowBlocks : ['core/heading', 'core/paragraph', 'core/buttons'],
			template : [
				['core/heading', {'placeholder' : 'Year Heading', 'level' : 2}], 
				['core/heading', {'placeholder' : 'Year Subheading', 'level' : 3}], 
				['core/paragraph', {'placeholder' : 'Year Description'}]
			]
		}
	],
];

const EditPeriod = ( { attributes, setAttributes, clientId } ) => {

		const { bgSlug, bgColor, padding, blockId, margin, period } = attributes;

		const blockProps = useBlockProps({
			className: 'period' + (bgSlug != '' ? ' ' + bgSlug + ' with-bg' : ''),
		});

		const updatePeriod = (value) => {
			setAttributes({
				period: value
			});
		}

		React.useEffect( () => {
        	if ( ! blockId ) {
        	    setAttributes( { blockId: 'block-' + clientId } );
        	}
    	}, [] );
		
		return (
			<Fragment>
				<InspectorControls>
					<PanelBody
						title={ __( 'Period Years' ) }
						initialOpen={ false }
					>
						<TextControl
							label={ __( 'Year(s)' ) }
							value={ period }
							onChange={ updatePeriod }
							help={__('Enter the year or range of years separated by a -')}
						/>
					</PanelBody>
					<PaddingSelector
						setAttributes={ setAttributes }
						padding={ padding }
						id={ 'block-' + clientId }
					/>
					<MarginSelector
						setAttributes={ setAttributes }
						margin={ margin }
						id={ 'block-' + clientId }
					/>
					<BackgroundColor
						bgColor={ bgColor }
						bgSlug={ bgSlug }
						setAttributes={ setAttributes }
					/>
				</InspectorControls>
				<div {...blockProps}>
					<div className="block-wrapper" data-period={ period }>
						<div className="block-content">							
							<InnerBlocks
								template={ template }
								allowedBlocks={ ['amwa-theme-block/images', 'amwa-theme-block/contact-content'] }
							/>
						</div>
					</div>
				</div>
			</Fragment>
		);
}

export default EditPeriod;