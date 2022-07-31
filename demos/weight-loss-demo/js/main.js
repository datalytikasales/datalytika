(function ($) {
    "use strict";

    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 30) {
            $('.header-nav').addClass('nav-sticky');
        } else {
            $('.header-nav').removeClass('nav-sticky');
        }
    });
    if ($(window).scrollTop() > 30) {
        $('.header-nav').addClass('nav-sticky');
    }
    var new_width = $('.header-nav').width();
    $('.navbar').width(new_width - 32); 
    
    
    // Smooth scrolling on the navbar links
    $(".navbar-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            
            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 50
            }, 1500, 'easeInOutExpo');
            
            if ($(this).parents('.navbar-nav').length) {
                $('.navbar-nav .active').removeClass('active');
                $(this).closest('a').addClass('active');
            }
        }
    });


    // Review carousel
    $(".review-carousel").owlCarousel({
        autoplay: true,
        dots: true,
        loop: true,
        responsive: {
            0:{
                items:1
            },
            480:{
                items:2
            },
            768:{
                items:3
            }
        }
    });
 
})(jQuery);

