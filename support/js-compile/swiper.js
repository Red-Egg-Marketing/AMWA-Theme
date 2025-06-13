import Swiper from 'swiper/bundle';

(function() {

    let count = document.querySelectorAll('.product.swiper .swiper-slide');
    count = count.length;

    let products = new Swiper('.product.swiper', 
        {
            loop: true,
            slidesPerView: 1,
            autoplay: false,
            autoHeight: true,
            effect: 'slide',
            spaceBetween: 15,
            loopedSlides: count,
            speed: 800,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }
        }
    );

    console.log('what up');
    let collections = new Swiper('.collections.swiper', 
        {
            loop: true,
            slidesPerView: 1,
            autoplay: false,
            autoHeight: true,
            effect: 'slide',
            spaceBetween: 10,
            speed: 800,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                768: {
                    slidesPerView: 3.15,
                    spaceBetween: 15
                },
                1200: {
                    slidesPerView: 4.25,
                    spaceBetween: 20
                }
            }
        }
    );

})();