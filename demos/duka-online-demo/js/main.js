(function (KES) {
    "use strict";
    
    // Dropdown on mouse hover
    KES(document).ready(function () {
        function toggleNavbarMethod() {
            if (KES(window).width() > 768) {
                KES('.navbar .dropdown').on('mouseover', function () {
                    KES('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    KES('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                KES('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        KES(window).resize(toggleNavbarMethod);
    });
    
    
    // Back to top button
    KES(window).scroll(function () {
        if (KES(this).scrollTop() > 100) {
            KES('.back-to-top').fadeIn('slow');
        } else {
            KES('.back-to-top').fadeOut('slow');
        }
    });
    KES('.back-to-top').click(function () {
        KES('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });
    
    
    // Home page slider
    KES('.main-slider').slick({
        autoplay: true,
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        variableWidth: true
    });
    
    
    // Product Slider 4 Column
    KES('.product-slider-4').slick({
        autoplay: true,
        infinite: true,
        dots: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                }
            },
        ]
    });
    
    
    // Product Slider 3 Column
    KES('.product-slider-3').slick({
        autoplay: true,
        infinite: true,
        dots: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                }
            },
        ]
    });
    
    
    // Single Product Slider
    KES('.product-slider-single').slick({
        infinite: true,
        dots: false,
        slidesToShow: 1,
        slidesToScroll: 1
    });
    
    
    // Brand Slider
    KES('.brand-slider').slick({
        speed: 1000,
        autoplay: true,
        autoplaySpeed: 1000,
        infinite: true,
        arrows: false,
        dots: false,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 300,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });
    
    
    // Quantity
    KES('.qty button').on('click', function () {
        var KESbutton = KES(this);
        var oldValue = KESbutton.parent().find('input').val();
        if (KESbutton.hasClass('btn-plus')) {
            var newVal = parseFloat(oldValue) + 1;
        } else {
            if (oldValue > 0) {
                var newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 0;
            }
        }
        KESbutton.parent().find('input').val(newVal);
    });
    
    
    // Shipping address show hide
    KES('.checkout #shipto').change(function () {
        if(KES(this).is(':checked')) {
            KES('.checkout .shipping-address').slideDown();
        } else {
            KES('.checkout .shipping-address').slideUp();
        }
    });
    
    
    // Payment methods show hide
    KES('.checkout .payment-method .custom-control-input').change(function () {
        if (KES(this).prop('checked')) {
            var checkbox_id = KES(this).attr('id');
            KES('.checkout .payment-method .payment-content').slideUp();
            KES('#' + checkbox_id + '-show').slideDown();
        }
    });
})(jQuery);

