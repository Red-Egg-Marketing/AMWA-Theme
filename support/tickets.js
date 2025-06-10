const { RichText, InnerBlocks, InspectorControls, BlockControls, URLInput, MediaUpload } = wp.blockEditor;
const { render, Fragment, useState } = wp.element;
const { RangeControl, PanelBody, TextControl, SelectControl, Button, Toolbar, ToolbarButton, Popover, withFocusOutside, Dashicon, DatePicker } = wp.components;
const { useDispatch, useSelect, replaceInnerBlocks } = wp.data;
const { __ } = wp.i18n;

const apiUrl  = '/wp-json/AMWA/v2/tours';
const ResourcesRootNew = document.querySelectorAll('#guided-tours');

const SaveTickets = ( { attributes, reference } ) => {
	  	
	  	const [date, setDate] = useState(new Date());
	  	const [events, setEvents] = useState(false);
	  	const [time, setTime] = useState(false);
	  	const [type, setType] = useState(false);
	  	const [currentTimes, setCurrentTimes] = useState([
	  		{
	  			label: __('Select Time'),
	  			// value: '',
	  		}
	  	]);

	  	const handleClickOutside = (event) => {
  			let target = event.target;
  			let parent = reference.querySelector('.select-field').parentElement;
  			if (!parent.contains(target)) {
  				parent.classList.remove('toggled');
  			}
  
  		}

	  	const [currentTypes, setCurrentTypes] = useState([
	  		{
	  			label: __('Choose Ticket Type'),
	  			// value: '',
	  		}
	  	]);

  		React.useEffect( () => {
  			
  			document.addEventListener("click", handleClickOutside);

    		wp.apiRequest({
        			url: apiUrl,
    			    method: 'POST',
    		}).then(resourcelist => {
    			let tempEvent = [];
    			resourcelist.forEach(resource => {
    				tempEvent.push(
    					{
    						date : resource.date,
    						id: resource.ID,
    						time: resource.time,
    						quantity: resource.tickets
    					}
    				);
    			});
    			setEvents(tempEvent);
    		});


  		}, [] );

  		const setTimeTicket = () => {

  		}

  		const setTypeTicket = () => {

  		}

  		const setTicketDate = (newDate) => {
  			console.log(newDate);
  			console.log(events);
  		}


		return (
			<Fragment>
				<form id="TicketForm" className="ticket-form">
					{events !== false && (	
						<Fragment>
							<div className="row date-picker">
								<input
									label={__('Select Date')}
									type="date"
									className="select-field"
									onClick={ (event) => {
											let parent = event.currentTarget.parentElement;
											parent.classList.toggle('toggled');
											event.preventDefault();
										}
									}
								/>
								<DatePicker 
									currentDate={ date }
            						onChange={ setTicketDate }
            						events={ events }
								/>
							</div>
							<div className="row">
								<SelectControl
									 value={ time }
									 options={
									 	currentTimes
									 }
									 onChange={ setTimeTicket }
									 disabled={ true }

								/>
							</div>
							<div className="row">
								<SelectControl
									 value={ type }
									 options={
									 	currentTypes
									 }
									 onChange={ setTypeTicket }
									 disabled={ true }

								/>
							</div>

							<div className="row">
								<button disabled className="single_add_to_cart_button button" type="submit">Book Tickets</button>
							</div>
						</Fragment>
					)}
					{events == false && (
						<div className="loading"></div>
					)}
				</form>
			</Fragment>
		);
}


if (ResourcesRootNew) {
	Array.from(ResourcesRootNew).forEach(function(value, key) {
		let wrapperRef = value;
		render(
			<SaveTickets
				reference={ wrapperRef }
			/>,
			value,
		);
	});
}
