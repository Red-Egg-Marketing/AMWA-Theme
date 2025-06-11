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
	  	const [quantity, setQuantity] = useState(1);
	  	const [total, setTotal] = useState(false);
	  	const [time, setTime] = useState(false);
	  	const [type, setType] = useState(false);
	  	const [selectedDates, setSelectedDates] = useState(false);
	  	const [currentTimes, setCurrentTimes] = useState(false);
	  	const [currentTypes, setCurrentTypes] = useState(false);

	  	const handleClickOutside = (event) => {
  			let target = event.target;
  			let parent = reference.querySelector('.select-field').parentElement;
  			if (!parent.contains(target)) {
  				parent.classList.remove('toggled');
  			}
  
  		}

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
    						quantity: resource.tickets,
    						variations: resource.variations
    					}
    				);
    			});
    			setEvents(tempEvent);
    		});


  		}, [] );

  		const setTimeTicket = (value) => {
  			setTime(value);
  			let matches = selectedDates.filter(date => {
  				let time = date.time;
  				return time == value;
  			});

  			let types = [];
  			types.push({
  				label: 'Select Ticket Type'
  			});
  			matches.map(match => {
  				let variations = match.variations;
				variations.forEach(variation => {
					let type = variation.attributes['attribute_ticket-type'];
					let id = variation.variation_id;
					let typeObj = {
						label: type,
						value: id
					};
					types.push(typeObj);
				});				
  			});

  			setCurrentTypes(types);
  		}

  		const setTypeTicket = (value) => {

  			setType(value);

  			let matches = selectedDates.filter(date => {
  				let variations = date.variations;
  				let match = variations.find(variation => {
					let id = variation.variation_id;
					return id == value;
				});
				return match;
  			});
  			console.log(matches);
  		}

  		const setTicketDate = (newDate) => {
  			// compare newDate with event date and return matching events
  			let matches = events.filter(event => {
  				let date = new Date(event.date).toDateString();
  				newDate = new Date(newDate).toDateString();
  				return date == newDate;
  			});

  			let times = [];
  			times.push({
  				label: 'Select Time'
  			});
  			matches.map(match => {
  				let time = match.time;
  				let timeObj = {
  					label: time,
  					value: time,
  				};
  				times.push(timeObj);
  			});

  			setCurrentTimes(times);

  			setSelectedDates(matches);

  		}

  		const decreaseQuantity = () => {

  		}


  		const increaseQuantity = () => {

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
									 	currentTimes == false ? [{ label : 'Select Time' }] : currentTimes
									 }
									 onChange={ setTimeTicket }
									 disabled={ currentTimes == false ? true : false }

								/>
							</div>
							<div className="row">
								<SelectControl
									 value={ type }
									 options={
									 	currentTypes == false ? [{ label : 'Select Ticket Type' }] : currentTypes
									 }
									 onChange={ setTypeTicket }
									 disabled={ currentTypes == false ? true : false }
								/>
							</div>

							<div className="row buttons">
								{ type != false && (
									<Fragment>
										<div className="qty-input">
											<button 
												className="qty-count qty-count--minus" 
												type="button"
												onClick={ decreaseQuantity }
												>-</button>
											<input className="product-qty" type="number" name="product-qty" min="0" max={ total } value={ quantity } />
											<button 
												className="qty-count qty-count--add" 
												type="button"
												onClick={ increaseQuantity }
												>+</button>
										</div>
									</Fragment>
								)}
								<button 
									disabled={ type == false ? true : false }
									className="single_add_to_cart_button button" 
									type="submit"
								>Book Tickets</button>
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
