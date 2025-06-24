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
	  	const [type, setType] = useState(false);
	  	const [selectedDates, setSelectedDates] = useState(false);
	  	const [finalProduct, setFinalProduct] = useState(false);
	  	const [dateAttr, setDateAttr] = useState(__('Select Date'));
	  	const [eventType, setEventType] = useState(false);

	  	const handleClickOutside = (event) => {
  			let target = event.target;
  			let parent = reference.querySelector('.select-field').parentElement;
  			if (!parent.contains(target)) {
  				parent.classList.remove('toggled');
  			}
  
  		}

  		React.useEffect( () => {
  			
  			document.addEventListener("click", handleClickOutside);

  			document.addEventListener('keyup', handleKeyPress);

  			let slug = reference.getAttribute('data-tax');
  			let object = {'tax-slug' : slug};
  			setEventType(slug);
    		wp.apiRequest({
        			url: apiUrl,
    			    method: 'POST',
    			    data: object
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


  		const handleKeyPress = (e) => {
  			if (e.key === 'Escape') {
  				let parent = reference.querySelector('.select-field').parentElement;
  				parent.classList.remove('toggled');
  			}
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
  				label: 'Select Time',
  				value: ''
  			});
  			matches.map(match => {
  				let time = match.time;
  				let timeObj = {
  					label: time,
  					value: time,
  				};
  				times.push(timeObj);
  			});


  			if (matches.length > 0) {
  				let setDate = new Date(newDate).toLocaleDateString('en-US');
  				setDateAttr(setDate);
  				setSelectedDates(matches);
  				setFinalProduct(matches[0].id);
  				console.log(matches);
  				setTotal(matches[0].quantity);
  				setType(matches);
  			
  			} else {
  				let attr = 'There are no tours on that date';
  				setDateAttr(attr);
  				setSelectedDates(false);
  				setFinalProduct(false);
  				setTotal(false);
  				setType(false);
  			}

  		}

  		const decreaseQuantity = () => {
  			let updateQuan = quantity > 1 ? quantity-1 : quantity;
  			setQuantity(updateQuan);
  		}

  		const increaseQuantity = () => {
  			let updateQuan = quantity < total ? quantity+1 : quantity;
  			setQuantity(updateQuan);
  		}


  		const updateQuantity = (event) => {
  			let value = event.target.value;
  			let updateQuan = 1;

  			if (value <= total && value >= 1) {
  				updateQuan = value;
  			}

  			setQuantity(updateQuan);
  		}

  		const submitTickets = (event) => {
  			// /?add-to-cart=PRODUCT_ID&quantity=QUANTITY
  			let url = '?add-to-cart=' + finalProduct + '&quantity=' + quantity;
  			window.location.href = '/cart' + url;
  			event.preventDefault();
  		}


		return (
			<Fragment>
				<form id="TicketForm" className="ticket-form">
					{events !== false && (	
						<Fragment>
							<div className="row date-picker">
								<input
									label={__('Select Date')}
									type="text"
									className="select-field date-range"
									value={ dateAttr }
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

							<div className="row buttons">
								{ type != false && (
									<Fragment>
										<div className="qty-input">
											<button 
												className="qty-count qty-count--minus" 
												type="button"
												onClick={ decreaseQuantity }
												>-</button>
											<input 
												className="product-qty" 
												type="number" 
												name="product-qty" 
												min="0" 
												max={ total } 
												value={ quantity }
												onChange={ updateQuantity }
											/>
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
									onClick={ submitTickets }
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
