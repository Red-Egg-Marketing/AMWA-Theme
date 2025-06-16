const { RichText, InnerBlocks, InspectorControls, BlockControls, URLInput, MediaUpload } = wp.blockEditor;
const { render, Fragment, useState } = wp.element;
const { RangeControl, PanelBody, TextControl, SelectControl, Button, Toolbar, ToolbarButton, Popover, withFocusOutside, Dashicon } = wp.components;
const { useDispatch, useSelect, replaceInnerBlocks } = wp.data;
const { __ } = wp.i18n;
import Swiper from 'swiper/bundle';

let ResourcesRoot = document.querySelectorAll('.timeline');

const SaveTimeline = (dates) => {

	  	const [times, setTimes] = useState(false);
	  	const [minYear, setMinYear] = useState(false);
	  	const [maxYear, setMaxYear] = useState(false);

	  	const orderDates = () => {
	  		let del = 25;
	  		if (times) {
	  			console.log(times);
	  		}
	  	}

		React.useEffect( () => {
			let tempDates = [];
			dates.dates.forEach((date) => {
				let dateAttr = date.getAttribute('data-period');
				tempDates.push(dateAttr);
			});

			setTimes(tempDates);

  		}, [] );

		orderDates();
	
		return (
			<Fragment>
				{times && (
					<ul className="navigation">
						<li>Navigation</li>
					</ul>
				)}
			</Fragment>
		);
}


if (ResourcesRoot) {
	ResourcesRoot.forEach((resource) => {
		let wrapper = resource.querySelector('.time-navigation');
		let dates = resource.querySelectorAll('[data-period]'); 
		render(
			<SaveTimeline dates={ dates } />,
			wrapper
		)
	});
}
