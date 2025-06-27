const { RichText, InnerBlocks, InspectorControls, BlockControls, URLInput, MediaUpload } = wp.blockEditor;
const { render, Fragment, useState } = wp.element;
const { RangeControl, PanelBody, TextControl, SelectControl, Button, Toolbar, ToolbarButton, Popover, withFocusOutside, Dashicon } = wp.components;
const { useDispatch, useSelect, replaceInnerBlocks } = wp.data;
const { __ } = wp.i18n;

let ResourcesRoot = document.querySelectorAll('.timeline');

const SaveTimeline = ({dates, parent}) => {

	  	const [times, setTimes] = useState(false);
	  	const [minYear, setMinYear] = useState(false);
	  	const [maxYear, setMaxYear] = useState(false);
	  	const [navLoaded, setNavLoaded] = useState(false);
	  	const [activeIndex, setIndex] = useState(0);
	  	const [activeDate, setDate] = useState(false);
	  	const [isScrolling, setScroll] = useState(false);

	  	const createObserver = (boxElement) => {

  			let observer;
  			let options = {
  			  root: null,
  			  rootMargin: "0px 0px 0px 0px",
  			  threshold: buildThresholdList(),
  			};

  			observer = new IntersectionObserver(handleIntersect, options);
  			observer.observe(boxElement);

		}

		const buildThresholdList = () => {
  			let thresholds = [];
			let numSteps = 20;

  			for (let i=1.0; i<=numSteps; i++) {
  			  let ratio = i/numSteps;
  			  thresholds.push(ratio);
  			}

  			thresholds.push(0);
  			return thresholds;
		}


		const handleIntersect = (entries, observer) => {
			entries.forEach((entry, index) => {
				let target = entry.target;
  				let inView = entry.isIntersecting;
  				let top = entry.boundingClientRect.top;
  				let bottom = entry.boundingClientRect.bottom;
  				let rootHeight = entry.rootBounds.height;
  				if (inView) {
  					let dateAttr = target.getAttribute('data-period');
  					let bullets = parent.querySelectorAll('.pagination .slide');
  					let percentTop = rootHeight * .4;
  					let percentBottom = rootHeight * .4;
  					target.classList.remove('inactive-slide');

  					if (top <= rootHeight && top >= percentTop) {
  						let diffTopHeight = rootHeight - percentTop;
  						let topDiff = rootHeight - top;
  						let percent = Math.round(topDiff/diffTopHeight * 100);
  						let transform = Math.round(100 - topDiff/diffTopHeight * 100);
  						target.setAttribute('data-opacity', percent);
  						target.setAttribute('data-transform', transform);
  						target.setAttribute('data-grayscale', transform);
  						target.classList.remove('active-period');
  						target.classList.remove('inactive-period');
  					} else if (bottom >= 0 && bottom <= percentBottom) {
  						let percent = Math.round(bottom/percentBottom * 100);
  						let transform = Math.round(100 - bottom/percentBottom * 100);
  						target.setAttribute('data-opacity', percent);
  						target.setAttribute('data-transform', - transform);
  						target.setAttribute('data-grayscale', transform);
  						target.classList.remove('active-period');
  						target.classList.add('inactive-period');
  					} else {
  						target.setAttribute('data-opacity', 100);
  						target.setAttribute('data-transform', 0);
  						target.setAttribute('data-grayscale', 0);
  						target.classList.add('active-period');
  						let currentSlide = parent.querySelectorAll('.active-period');
  						let dataPeriod = target.getAttribute('data-period');
  						
  						bullets.forEach((bullet) => {
  							let time = bullet.getAttribute('data-time');
  							let updateIndex = Number(bullet.getAttribute('data-index'));
  							if (time == dataPeriod) {
  								setIndex(updateIndex);
  							}
  						});
  						setScroll(true);
  					}


  				} else {
  					target.classList.add('inactive-slide');
  					target.setAttribute('data-opacity', 0);
  				}
			});
		}

	  	const orderDates = (dates) => {
	  		let unique = [...new Set(dates)];

	  		return unique;
	  	}

	  	
	  	const changeSlide = (event) => {
	  		let target = event.target;
	  		let index = Number(target.getAttribute('data-index'));
	  		if (index == activeIndex) return;
	  		let date = target.getAttribute('data-time');
	  		let periods = parent.querySelectorAll('[data-period="' + date + '"]');
	  		if (periods.length > 0) {
	  			let match = periods[0];
	  			match.scrollIntoView({
	  				behavior: 'smooth',
	  				block: 'center'
	  			});
	  		}
	  		setIndex(index);
	  		setScroll(false);
	  	}

	  	const detectScroll = () => {
	  		let periods = parent.querySelectorAll('.period');

	  		periods.forEach((period) => {
	  			let test = createObserver(period);
	  		})
	  	}


	  	if (times == false) {
			let tempDates = [];
			dates.forEach((date) => {
				let dateAttr = date.getAttribute('data-period');
				tempDates.push(dateAttr);
			});
			tempDates = orderDates(tempDates);
			setTimes(tempDates);
			setDate(tempDates[0]);
			setNavLoaded(true);
		}

		React.useEffect( () => {
			window.addEventListener('load', detectScroll, false);
  		}, [] );


		return (
			<Fragment>
				<div className="navigation">
					<div className="wrapper pagination" direction="vertical">
						{ (times.length > 0) && times.map((time, index) => {
								let cl = index === activeIndex ? 'slide active' : 'slide';
								return (
									<Fragment>
										<a 
											className={ cl }
											data-time={ time }
											data-index={ index }
											data-scroll={ isScrolling }
											onClick={ changeSlide }
										>{time}</a>
									</Fragment>
								);
						})}
						
					</div>
					<div className="arrow-navigation">
						{ (times.length > 0) && (
							<Fragment>
								<div 
									className="fa button swiper-button-prev" 
									data-time={ activeIndex !== 0 ? times[activeIndex - 1] : false } 
									data-active={ activeIndex == 0 ? false : true } 
									data-index={ activeIndex - 1 } 
									onClick={ changeSlide }>
								</div>
  								<div 
  									className="fa button swiper-button-next"
  									data-time={ activeIndex == times.length - 1 ? false : times[activeIndex + 1]}
  									data-active={ activeIndex == times.length - 1 ? false : true }
  									data-index={ activeIndex + 1 } 
  									onClick={ changeSlide }>
  								</div>
  							</Fragment>
  						)}
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
