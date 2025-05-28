const { compose, ifCondition } = wp.compose;
const { registerFormatType, toggleFormat } = wp.richText;
const { RichTextToolbarButton } = wp.blockEditor;
const { Fragment, Component } = wp.element;
const { withSelect } = wp.data;
const { Button } = wp.components;
const { __ } = wp.i18n;

class ItalicButton extends Component {

    constructor() {
        super( ...arguments );
        this.render = this.render.bind(this);
        this.saveItalic = this.saveItalic.bind( this );    
    }

   saveItalic() {

        this.props.onChange( toggleFormat(
            this.props.value,
            { type: 'extend-gutenberg-format/italic' }
        ));
    }

    render(){

        const {
            isActive,
            activeAttributes,
            value,
            onChange,
            setAttributes,
        } = this.props;

        if (this.props.selectedBlock.name != 'core/button') return;

        return (
            <Fragment>
                 <RichTextToolbarButton
                    icon='admin-customizer'
                    title='Italicize Button Words'
                    onClick={ this.saveItalic }
                    isActive={ isActive }
                />
            </Fragment>
        );
    }
}

 
const ConditionItalicButton = compose(
    withSelect( function( select ) {
        return {
            selectedBlock: select( 'core/editor' ).getSelectedBlock()
        }
    } ),
    ifCondition( function( props ) {

        return (
            props.selectedBlock
        );
    } )
)( ItalicButton );
 
registerFormatType(
    'extend-gutenberg-format/italic', {
        title: 'Italicize',
        tagName: 'italic',
        className: 'italic',
        edit: ConditionItalicButton
    }
);