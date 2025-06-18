const { RichText, InnerBlocks, InspectorControls, BlockControls, URLInput, MediaUpload } = wp.blockEditor;
const { render, Fragment, useState } = wp.element;
const { RangeControl, PanelBody, TextControl, SelectControl, Button, Toolbar, ToolbarButton, Popover, withFocusOutside, Dashicon } = wp.components;
const { useDispatch, useSelect, replaceInnerBlocks } = wp.data;
const { __ } = wp.i18n;
import Swiper from 'swiper/bundle';

let ResourcesRoot = document.querySelectorAll('.timeline');

const SaveTimeline = ({dates, parent}) => {

	  	const [times, setTimes] = useState(false);
	  	const [minYear, setMinYear] = useState(false);
	  	const [maxYear, setMaxYear] = useState(false);
	  	const [navLoaded, setNavLoaded] = useState(false);
	  	const [swiper, setSwiper] = useState(false);

	  	const createObserver = (boxElement) => {
  			let observer;
  			let options = {
  			  root: null,
  			  rootMargin: "0px 0px -50% 0px",
  			  threshold: 0
  			};

  			observer = new IntersectionObserver(handleIntersect, options);

  			observer.observe(boxElement);

		}

		const handleIntersect = (entries, observer) => {
			entries.forEach((entry, index) => {
				let target = entry.target;
  				let inView = entry.isIntersecting;

  				if (inView && target != undefined) {
  					let dateAttr = target.getAttribute('data-period');
  					let slides = swiper.slides;
  					target.classList.add('active-period');
	  				slides.forEach((slide) => {
	  					let slideAttr = slide.getAttribute('data-time');
	  					if (dateAttr == slideAttr) {
	  						slide.classList.add('active-slide');
	  					} else {
	  						slide.classList.remove('active-slide')
	  					}
	  				});

  				}
			});
		}

	  	const orderDates = (dates) => {
	  		let unique = [...new Set(dates)];

	  		return unique;
	  	}

	  	const changeSlide = (swiper) => {

	  		let index = swiper.clickedIndex;
	  		let clickedSlide = swiper.clickedSlide;
	  		if (clickedSlide) {
	  			let slides = swiper.slides;
	  			slides.forEach((slide) => {
	  				slide.classList.remove('active-slide');
	  			});
	  			clickedSlide.classList.add('active-slide');
	  		}	
	  	}

	  	const detectScroll = () => {
	  		if (swiper) {
	  			let periods = parent.querySelectorAll('.period');

	  			periods.forEach((period) => {
	  				let test = createObserver(period);
	  			})

	  		}
	  	}

	  	const initiateSwiper = () => {
	  		if (navLoaded == true) {
	  			let tempSwiper = new Swiper('.navigation.swiper', 
					{
						loop: false,
						slidesPerView: times.length,
						autoplay: false,
						effect: 'slide',
						speed: 300,
						direction: 'vertical',
						
  						on: {
  							click: changeSlide
  						}
					}
				);
				setSwiper(tempSwiper);
	  		}
	  	}
	  	if (times == false) {
			let tempDates = [];
			dates.forEach((date) => {
				let dateAttr = date.getAttribute('data-period');
				tempDates.push(dateAttr);
			});
			tempDates = orderDates(tempDates);
			setTimes(tempDates);
			setNavLoaded(true);
		}

		React.useEffect( () => {
			initiateSwiper();

  		}, [] );

		window.addEventListener('load', detectScroll);

		return (
			<Fragment>
				<div className="navigation swiper">
					<div className="swiper-wrapper" direction="vertical">
						{ (times.length > 0) && times.map((time, index) => {
								return (
									<Fragment>
										<a 
											className="swiper-slide"
											data-time={ time }
											data-index={ index }
										>{time}</a>
									</Fragment>
								);
						})}
						
					</div>
					<div className="arrow-navigation">
						<div class="fa swiper-button-prev"></div>
  						<div class="fa swiper-button-next"></div>
					</div>
				</div>
			</Fragment>
		);

}


if (ResourcesRoot) {
	ResourcesRoot.forEach((resource) => {
		let wrapper = resource.querySelector('.time-navigation');
		let dates = resource.querySelectorAll('[data-period]'); 
		render(
			<SaveTimeline dates={ dates } parent={ resource } />,
			wrapper
		)
	});
}
