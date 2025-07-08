require('es6-promise/auto');

(function() {


	function ScrollImageColumns() {

		gsap.registerPlugin(ScrollTrigger);

		var columns = document.querySelectorAll('.feature-section');

		if (columns.length > 0 ) {
			columns.forEach(function(column, index) {
				let image = column.querySelector('.image-column');

				let tl = gsap.timeline({
					scrollTrigger: {
						trigger: column,
						start: "top 100%",
						onUpdate: function(progress) {
							animateFrom(progress, image);
						},
					}
				});

			});	
		}
	}

	function animateFrom(progress, element) {
		let prog = progress.progress;
		let menu = document.querySelector('#masthead');
		let anchors = document.querySelectorAll('.anchor-links');
		let totalHeight = 0;
		if (menu) {
			let menuH = menu.offsetHeight;
			totalHeight += menuH
		}
		
		if (anchors) {
			anchors.forEach((anchor)=> {
				let anchorH = anchor.offsetHeight;
				totalHeight += anchorH;
			})
		}


		if (prog > 0) {
			element.style.top = totalHeight + 'px';
		}
	}

	ScrollImageColumns();
	
})();