const { RichText, InnerBlocks, InspectorControls, BlockControls, URLInput, MediaUpload } = wp.blockEditor;
const { render, Fragment, useState } = wp.element;
const { RangeControl, PanelBody, TextControl, SelectControl, Button, Toolbar, ToolbarButton, Popover, withFocusOutside, Dashicon } = wp.components;
const { useDispatch, useSelect, replaceInnerBlocks } = wp.data;
const { __ } = wp.i18n;
const apiUrl  = '/wp-json/AMWA/v2/hours';

const ResourcesRootNew = document.querySelectorAll('.time-wrapper');

const SaveTime = ( { attributes, reference } ) => {
	  	
	  	const [hours, selectHours] = useState(false);
  		const [currentDay, setCurrentDay] = useState('loading...');

  		const activateHours = ( event ) => {
			reference.classList.toggle('time-active');
  		}


  		const handleClickOutside = (event) => {
  			let target = event.target;
  			if (!reference.contains(event.target)) {
  				reference.classList.remove('time-active');
  			}
  
  		}

  		React.useEffect( () => {
  			
  			document.addEventListener("click", handleClickOutside);

			if (hours === false) {
    			wp.apiRequest({
        			url: apiUrl,
    			    method: 'POST',
    			}).then(resourcelist => {
    				let c = resourcelist[0];
    			    let days = resourcelist[1];
    			    selectHours(days);
    			    setCurrentDay(c);
    			});
  			}
  		}, [] );

		return (
			<Fragment>
				<div className="shortcode-wrap">
					<div className="inner-wrap">
						<h3 className="hours-header"><span>Hours</span></h3>
						<ul className="hours">
						{
							hours.length > 0 && hours.map((hour, hourIndex) => {
								let day = hour[0];
								let dayHour = hour[1];
								let closed = hour[2];
								return (
									<Fragment>
										<li>
											<span className="day">{day}</span>
											{(closed == true && !dayHour.includes('Closed')) && (
												<time className="hour closed"><s>{dayHour}</s></time>
											)}
											{(closed == true && dayHour.includes('Closed')) && (
												<time className="hour">{dayHour}</time>
											)}
											{closed != true && (
												<time className="hour">{dayHour}</time>
											)}
											
										</li>
									</Fragment>
								);
							})
						}
						</ul>
					</div>
				</div>
				<button 
					className="time-toggle"
					onClick={ activateHours }
					data-parent="time-navigation"
				>
						<span class="time-append">{ currentDay }</span>
						<svg xmlns="http://www.w3.org/2000/svg" width="14.002" height="8" viewBox="0 0 14.002 8">
  							<path className="color-change" id="chevron-down-solid" d="M38.22,167.632a1,1,0,0,0,1.415,0l6-6a1,1,0,0,0-1.415-1.415l-5.293,5.293-5.293-5.29a1,1,0,0,0-1.415,1.415l6,6Z" transform="translate(-31.925 -159.925)" fill="#fff"/>
						</svg>
				</button>
			</Fragment>
		);
}


if (ResourcesRootNew) {
	Array.from(ResourcesRootNew).forEach(function(value, key) {
		let wrapperRef = value;
		render(
			<SaveTime
				reference={ wrapperRef }
			/>,
			value,
		);
	});
}
