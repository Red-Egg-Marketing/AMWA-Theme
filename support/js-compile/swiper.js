import Swiper from 'swiper/bundle';

(function() {

    let count = document.querySelectorAll('.product.swiper .swiper-slide');
    count = count.length;

    let vehicles = new Swiper('.product.swiper', 
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

})();