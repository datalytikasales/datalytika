;
(function($, window, document, undefined) {
    "use strict";

    /*============================*/
    /* 01 - VARIABLES */
    /*============================*/

    var swipers = [],
        winW, winH, winScr, _isresponsive, smPoint = 768,
        mdPoint = 992,
        lgPoint = 1200,
        addPoint = 1600,
        _ismobile = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i);


    /*========================*/
    /* 02 - PAGE CALCULATIONS */
    /*========================*/
    function pageCalculations() {
        winW = $(window).width();
        winH = $(window).height();
    }


    /*=================================*/
    /* 03 - FUNCTION ON DOCUMENT READY */
    /*=================================*/
    pageCalculations();

    $(document).on('ready', function() {
        $('.progress-circle').viewportChecker({
            callbackFunction: function(elem, action) {
                if ($('.progress-circle').length) {
                    $('.progress-circle').circleProgress({
                        size: 124,
                        emptyFill: '#D2D0D0',
                        thickness: 4,
                        reverse: true,
                        startAngle: -Math.PI / 4 * 2,
                        fill: {
                            color: "#f53752"
                        }
                    }).on('circle-animation-progress', function(event, progress) {
                        var self = $(this);
                        self.find('strong').html(parseInt((self.attr('data-value') * 100) * progress) + '<i>%</i>');
                    });
                }
            }
        });

        // ***** COUNTERS *****

        var counters = function() {
            $(".wpc-counter .counter").not('.animated').each(function() {
                if ($(window).scrollTop() >= $(this).offset().top - $(window).height() * 0.9) {
                    $(this).addClass('animated').countTo({
                        formatter: function(value, options) {
                            value = value.toFixed(options.decimals);
                            value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                            return value;
                        }
                    });
                }
            });
        };


        function wpcProgress() {
            if ($('.wpc-skills').length) {
                $('.wpc-skills').not('.animated').each(function() {
                    var self = $(this);
                    if ($(window).scrollTop() >= self.offset().top - $(window).height()) {
                        self.addClass('animated').find('.timer').countTo();

                        self.find('.line-fill').each(function() {
                            var objel = $(this);
                            var pb_width = objel.attr('data-width-pb');
                            objel.css({
                                'width': pb_width
                            });
                        });
                    }

                });
            }
        }

        $(window).on('scroll', function() {
            wpcProgress();
            counters();
        });

        $('.tabs-header').on('click', 'li:not(.active)', function() {
            var $t = $(this),
                index_el = $(this).index();
            $t.addClass('active').siblings().removeClass('active');
            $t.closest('.tabs').find('.tabs-item').removeClass('active').eq(index_el).addClass('active');

        });

    });

    var wWdth = $(window).width();

    var iW = $('.inner-wrap').width();
    var res = (wWdth - iW) / 2;

    $('.before-logo').css('width', '' + res + 'px');

    $(function() {

        $('.a-service.h-style').equalHeights();
        $('.a-service.style-2').equalHeights();
        $('.a-service.h2-style').equalHeights();
        $('.price-body ul').equalHeights();

        $('.mob-social, .mob-social-btn').on('click', function() {
            $('.header-social').toggleClass('on');
        });



        $('.select span').on('click', function() {
            $(this).siblings('.list').toggle();
            $(this).toggleClass('active');
        });

        $('.select .list li').on('click', function() {
            var tx = $(this).text();
            $('.select span').text(tx);
            $(this).parents('.list').toggle();
            $('.select span').toggleClass('active');
        });


        // background video

        var bgVideoHeight = $('.header-video').height();
        $('.video-iframe').height(bgVideoHeight);

        $('.play-btn').on('click', function() {
            var videoSrc = $(this).attr('data-video');
            $('.video-iframe').attr('src', videoSrc);
            $('.video-tmb').css({
                'position': 'absolute',
                'z-index': '-999'
            });
            $('.video-iframe').show();
            $('.close-btn').show();
        });

        $('.close-btn').on('click', function() {
            $('.video-iframe').attr('src', 'about:blank');
            $('.video-tmb').css({
                'position': 'static',
                'z-index': '1'
            })
            $('.video-iframe').hide();
            $('.close-btn').hide();
        });


        // bg video type 2

        $('.video-play-btn').on('click', function() {
            var videoSrc = $(this).attr('data-video');
            $('.bg-video-iframe').attr('src', videoSrc);
            $('.video-wrap').css('display', 'block');
            $('.bg-video-iframe').show();
            $('.close-btn-2').css('display', 'block');
        });
        $('.close-btn-2').on('click', function() {
            $('.bg-video-iframe').attr('src', 'about:blank');
            $('.video-wrap').css('display', 'none');
            $('.bg-video-iframe').hide();
            $('.close-btn-2').css('display', 'none');
        });


        $('.td-brd-1').on('click', function() {
            $(this).parent().parent().remove();
        });


    });


    /*============================*/
    /* 04 - FUNCTION ON PAGE LOAD */
    /*============================*/

    $(window).on('load', function() {
        initSwiper();
        initSliderUI();
        $('.preload-wrap').fadeOut(1000);

        if ($('.izotope-container').length) {
            var $container = $('.izotope-container');

            $('.izotope-container').each(function() {
                var self = $(this);
                var layoutM = self.attr('data-layout') || 'masonry';
                self.isotope({
                    itemSelector: '.item',
                    layoutMode: layoutM,
                    masonry: {
                        columnWidth: '.item',
                        gutterWidth: 15
                    }
                });
            });

            $(".btn-more-1").on("click", function() {
                $(".hide-item").fadeIn(1000);
                $(this).fadeOut(1000);
                $('.izotope-container').each(function() {
                    var self = $(this);
                    var layoutM = self.attr('data-layout') || 'masonry';
                    self.isotope({
                        itemSelector: '.item',
                        layoutMode: layoutM,
                        masonry: {
                            columnWidth: '.item',
                            gutterWidth: 15
                        }
                    });
                });
                return false;
            });


            $('.izotope-container.style-3, .izotope-container.style-4').each(function() {
                var self = $(this);
                var layoutM = self.attr('data-layout') || 'masonry';
                self.isotope({
                    itemSelector: '.item',
                    layoutMode: layoutM,
                    masonry: {
                        columnWidth: '.item',
                        gutterWidth: 0
                    }
                });
            });


            $(".btn-more").on("click", function() {
                $(".hide-item").fadeIn(1000);
                $(this).fadeOut(1000);
                $('.izotope-container.style-3, .izotope-container.style-4').each(function() {
                    var self = $(this);
                    var layoutM = self.attr('data-layout') || 'masonry';
                    self.isotope({
                        itemSelector: '.item',
                        layoutMode: layoutM,
                        masonry: {
                            columnWidth: '.item',
                            gutterWidth: 0
                        }
                    });
                });
                return false;
            });

            $('#filters').on('click', '.but', function() {
                var izotope_container = $('.izotope-container');

                for (var i = izotope_container.length - 1; i >= 0; i--) {
                    $(izotope_container[i]).find('.item').removeClass('animated');
                }

                $('#filters .but').removeClass('activbut');
                $(this).addClass('activbut');
                var filterValue = $(this).attr('data-filter');
                $container.isotope({
                    filter: filterValue
                });


                return false;
            });
        }


        start_rate();

    });

    function start_rate() {
        if ($('.wpc-star-rate').length) {
            $('.wpc-star-rate').raty({
                starOff: 'fa fa-fw fa-star',
                starOn: 'fa fa-fw fa-star rated',
                score: function() {
                    return $(this).attr('data-score');
                }
            })
        }
    }


    /*==============================*/
    /* 05 - FUNCTION ON PAGE RESIZE */
    /*==============================*/

    function resizeCall() {
        pageCalculations();
        $('.swiper-container.initialized[data-slides-per-view="responsive"]').each(function() {
            var thisSwiper = swipers['swiper-' + $(this).attr('id')],
                $t = $(this),
                slidesPerViewVar = updateSlidesPerView($t),
                centerVar = thisSwiper.params.centeredSlides;
            thisSwiper.params.slidesPerView = slidesPerViewVar;
            thisSwiper.reInit();
            if (!centerVar) {
                var paginationSpan = $t.find('.pagination span');
                var paginationSlice = paginationSpan.hide().slice(0, (paginationSpan.length + 1 - slidesPerViewVar));
                if (paginationSlice.length <= 1 || slidesPerViewVar >= $t.find('.swiper-slide').length) $t.addClass('pagination-hidden');
                else $t.removeClass('pagination-hidden');
                paginationSlice.show();
            }
        });
    }
    if (!_ismobile) {
        $(window).on('resize', function() {
            resizeCall();
        });
    } else {
        window.addEventListener("orientationchange", function() {
            resizeCall();
        }, false);
    }



    $('.nav-menu-icon a').on('click', function() {
        var wdth = $(window).width();
        if (wdth < 992) {
            $('body').toggleClass('overflow');
        }
    });




    $(window).on('resize', function() {
        $('.a-service.h-style').css('height', 'auto').equalHeights();
        $('.a-service.style-2').css('height', 'auto').equalHeights();
        $('.a-service.h2-style').css('height', 'auto').equalHeights();
        $('.price-body ul').css('height', 'auto').equalHeights();


        // video background

        var bgVideoHeight = $('.header-video').height();
        $('.video-iframe').height(bgVideoHeight);

        var wdth = $(window).width();
        if (wdth >= 992) {
            $('body').removeClass('overflow');
        } else if (wdth < 992) {
            if ($('.navigation nav').hasClass('slide-menu')) {
                $('body').addClass('overflow');
            }
        }



        var wWdth = $(window).width();

        var iW = $('.inner-wrap').width();
        var res = (wWdth - iW) / 2;

        $('.before-logo').css('width', '' + res + 'px');

    });


    /*=====================*/
    /* 07 - SWIPER SLIDERS */
    /*=====================*/

    function initSwiper() {
        var initIterator = 0;
        $('.swiper-container').each(function() {
            var $t = $(this),
                index = 'swiper-unique-id-' + initIterator;

            $t.addClass('swiper-' + index + ' initialized').attr('id', index);
            $t.find('.pagination').addClass('pagination-' + index);

            var autoPlayVar = parseInt($t.attr('data-autoplay'), 10);
            var mode = $t.attr('data-mode');
            var slidesPerViewVar = $t.attr('data-slides-per-view');
            if (slidesPerViewVar == 'responsive') {
                slidesPerViewVar = updateSlidesPerView($t);
            } else slidesPerViewVar = parseInt(slidesPerViewVar, 10);

            var loopVar = parseInt($t.attr('data-loop'), 10);
            var speedVar = parseInt($t.attr('data-speed'), 10);
            var centerVar = parseInt($t.attr('data-center'), 10);
            swipers['swiper-' + index] = new Swiper('.swiper-' + index, {
                speed: speedVar,
                pagination: '.pagination-' + index,
                loop: loopVar,
                paginationClickable: true,
                autoplay: autoPlayVar,
                slidesPerView: slidesPerViewVar,
                keyboardControl: true,
                calculateHeight: true,
                simulateTouch: true,
                roundLengths: true,
                centeredSlides: centerVar,
                mode: mode || 'horizontal',
                onInit: function(swiper) {
                    $t.find('.swiper-slide').addClass('active');
                },
                onSlideChangeEnd: function(swiper) {
                    var activeIndex = (loopVar === 1) ? swiper.activeLoopIndex : swiper.activeIndex;
                    var qVal = $t.find('.swiper-slide-active').attr('data-val');
                    $t.find('.swiper-slide[data-val="' + qVal + '"]').addClass('active');

                },
                onSlideChangeStart: function(swiper) {
                    $t.find('.swiper-slide.active').removeClass('active');



                    var qVal = +($t.find('.swiper-slide-active').attr('data-i')),
                        featuredTab = $('.featured-tab'),
                        featuredRow = featuredTab.parent().parent();
                    featuredRow.find('.featured-tab').removeClass('active');
                    featuredRow.children().eq(qVal).find('.featured-tab').addClass('active');
                }
            });

            $('.featured-tab').on('click', function() {
                var self = $(this);
                var index = self.parent().index();
                var row = self.parent().parent();
                row.find('.featured-tab').removeClass('active');
                self.addClass('active');
                $('.c-tabs-slider').find('.pagination .swiper-pagination-switch').eq(index).click();
                return false;
            });

            swipers['swiper-' + index].reInit();
            if ($t.attr('data-slides-per-view') == 'responsive') {
                var paginationSpan = $t.find('.pagination span');
                var paginationSlice = paginationSpan.hide().slice(0, (paginationSpan.length + 1 - slidesPerViewVar));
                if (paginationSlice.length <= 1 || slidesPerViewVar >= $t.find('.swiper-slide').length) $t.addClass('pagination-hidden');
                else $t.removeClass('pagination-hidden');
                paginationSlice.show();
            }

            if ($t.find('.default-active').length) {
                swipers['swiper-' + index].swipeTo($t.find('.swiper-slide').index($t.find('.default-active')), 0);
            }

            initIterator++;
        });

    }

    function updateSlidesPerView(swiperContainer) {
        if (winW >= addPoint) return parseInt(swiperContainer.attr('data-add-slides'), 10);
        else if (winW >= lgPoint) return parseInt(swiperContainer.attr('data-lg-slides'), 10);
        else if (winW >= mdPoint) return parseInt(swiperContainer.attr('data-md-slides'), 10);
        else if (winW >= smPoint) return parseInt(swiperContainer.attr('data-sm-slides'), 10);
        else return parseInt(swiperContainer.attr('data-xs-slides'), 10);
    }


    //swiper arrows
    $('.swiper-arrow-left').on('click', function() {
        swipers['swiper-' + $(this).parent().attr('id')].swipePrev();
    });

    $('.swiper-arrow-right').on('click', function() {
        swipers['swiper-' + $(this).parent().attr('id')].swipeNext();
    });

    $('.swiper-outer-left').on('click', function() {
        swipers['swiper-' + $(this).parent().find('.swiper-container').attr('id')].swipePrev();
    });

    $('.swiper-outer-right').on('click', function() {
        swipers['swiper-' + $(this).parent().find('.swiper-container').attr('id')].swipeNext();
    });


    /*============================*/
    /* DROPDOWN */
    /*============================*/

    $('.nav-menu-icon a').on('click', function() {
        var navigationNav = $('.navigation nav'),
            wrap = $('.wrap'),
            centerMenu = $('.center-menu'),
            leftSlide = $('.left-slide'),
            $t = $(this);

        if (navigationNav.hasClass('slide-menu')) {
            navigationNav.removeClass('slide-menu');
            wrap.removeClass('hold');
            centerMenu.removeClass('act');
            leftSlide.removeClass('slide-menu');
            $t.removeClass('active');
        } else {
            navigationNav.addClass('slide-menu');
            centerMenu.addClass('act');
            leftSlide.addClass('slide-menu');
            wrap.addClass('hold');
            $t.addClass('active');
        }
        return false;
    });


    $('nav > ul > li > a').on('click', function() {
        var $thisParent = $(this).parent();
        if ($thisParent.find('.sub-menu').hasClass('act')) {
            $thisParent.find('.sub-menu').removeClass('act');
            $thisParent.find('> a > i').css('transform', 'rotate(-90deg)');

        } else {
            $('.dropmenu').removeClass('act');
            $thisParent.find('> .sub-menu').addClass('act');
            $thisParent.find('> a > i').css('transform', 'rotate(0deg)');
        }
    });

    $('.sub-menu > li > a').on('click', function() {
        var $thisParent = $(this).parent();
        if ($thisParent.find('.sub-menu').hasClass('act')) {
            $thisParent.find('.sub-menu').removeClass('act');
            $thisParent.find('i').css('transform', 'rotate(-90deg)');
        } else {
            $('.dropmenu .dropmenu').removeClass('act');
            $thisParent.find('> .sub-menu').addClass('act');
            $thisParent.find('i').css('transform', 'rotate(0deg)');
        }
    });


    /***********************************/
    /*WINDOW SCROLL*/
    /**********************************/

    $(window).on('scroll', function() {
        if ($(this).scrollTop() >= 80) {
            $('header').addClass('scroll');
        } else {
            $('header').removeClass('scroll');
        }
    });


    /***********************************/
    /*STYLE BAR*/
    /**********************************/

    $('.serch-button').on('click', function() {
        $('.search-popup').addClass('open');
        return false;
    });

    $('.search-form .close').on('click', function() {
        $('.search-popup').removeClass('open');
        return false;
    });

    $('.input').on('focusin', function() {
        $('.input-field').addClass('active');
    });
    $('.input').on('focusin', function() {
        $('.input-field').removeClass('active');
    });

    $('.second-menu li').on('click', function() {
        $('.second-menu li').removeClass('act');
        $(this).toggleClass('act');
        return false;
    });


    /***********************************/
    /*VIDEO*/
    /**********************************/
    $('.cut_video_btn').on("click", function() {
        var $t = $(this),
            video = $t.data('video');
        $t.parents('.cut_video_block').addClass('active');
        $t.siblings('.cut_video_iframe').attr('src', video);
        return false;
    });

    $('.cut_video_close').on("click", function() {
        var $t = $(this);
        $t.parents('.cut_video_block').removeClass('active');
        $t.siblings('.cut_video_iframe').attr('src', 'about:blank');
        return false;
    });


    /***********************************/
    /*BACKGROUND*/
    /**********************************/

    //sets child image as a background
    $('.s-back-switch').each(function() {
        var $img = $(this).find('.s-img-switch'),
            $imgSrc = $img.attr('src'),
            $imgDataHidden = $img.data('s-hidden');
        $(this).css('background-image', 'url(' + $imgSrc + ')');
        if ($imgDataHidden) {
            $img.css('visibility', 'hidden');
        } else {
            $img.hide();
        }
    });



    /***********************************/
    /* LIGHTBOX */
    /**********************************/
    lightbox.option({
        'showImageNumberLabel': false,
        'disableScrolling': true
    });


    /***********************************/
    /* MAGNIFIC POPUP */
    /**********************************/



    /***********************************/
    /* 05 - POPUP */
    /**********************************/

    if ($('.popup-gallery').length) {
        $('.popup-gallery').magnificPopup({
            delegate: '.view-item',
            type: 'image',
            removalDelay: 100,
            tLoading: 'Loading image #%curr%...',
            mainClass: 'mfp-fade',
            closeBtnInside: false,
            gallery: {
                enabled: true,
            },
            callbacks: {
                beforeOpen: function() {
                    this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure animated ' + this.st.el.attr('data-effect'));
                }
            }

        });
    };

    if ($('.img-popup').length) {
        $('.img-popup').magnificPopup({
            type: 'image',
            removalDelay: 100,
            tLoading: 'Loading image #%curr%...',
            mainClass: 'mfp-fade',
            closeBtnInside: false

        });
    }



    /*=================================*/
    /* Horizontal Accordion */
    /*=================================*/


    var wpcRemoveClass = function(el, _class) {
        if (el.classList)
            el.classList.remove(_class ? _class : 'active');
        else
            el.className = panel.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    };
    $('.wpc-accordion').on('click', '.panel-title', function() {

        var panel_parent = this.parentNode,
            panel_container = panel_parent.parentNode,
            panels_wrap = panel_container.querySelectorAll('.panel-wrap');

        Array.prototype.forEach.call(panels_wrap, function(panel, i) {
            if (panel !== panel_parent) {
                wpcRemoveClass(panel);
            }
        });

        if (-1 !== this.parentNode.className.indexOf('active')) {
            wpcRemoveClass(panel_parent);
        } else {
            panel_parent.className += ' active';
        }

    });


    /*==================================================*/
    // /                  UI SLIDER                  /
    /*==================================================*/
    function initSliderUI() {

        var initIterator = 0;
        if ($(".slider-ui").length) {
            $(".slider-ui").each(function() {
                var self = $(this),
                    sliderUI = self.find('.slider-line'),
                    sliderInp = self.find('.slider-inp'),
                    sliderUniqueId = 'sliderUI' + initIterator,
                    inputUniqueId = 'inputUI' + initIterator,
                    count_step = parseInt(sliderInp.attr('data-count-step'));
                sliderUI.attr('id', sliderUniqueId);
                sliderInp.attr('id', inputUniqueId);
                initIterator++;

                count_step = count_step ? count_step : 300;

                var keypressSlider = document.getElementById(sliderUniqueId),
                    input = document.getElementById(inputUniqueId);

                noUiSlider.create(keypressSlider, {
                    start: [25, 75],
                    step: 0.01,
                    connect: true,
                    tooltips: [wNumb({
                        postfix: '$',
                        decimals: 2
                    }), wNumb({
                        postfix: '$',
                        decimals: 2
                    })],
                    format: {
                        to: function(value) {
                            return parseInt(value);
                        },
                        from: function(value) {
                            return value;
                        }
                    },
                    range: {
                        'min': 1,
                        'max': count_step
                    }
                });
            });
        }
    }

    /***********************************/
    /* 14 - Ecommerce PAGE */
    /**********************************/

    // init Isotope
    var $prodGrid = $('.prod-grid').isotope({
        itemSelector: '.item'
    });
    // filter items on button click
    $('.filter-list').on('click', 'li', function() {
        var filterValue = $(this).attr('data-filter');
        $prodGrid.isotope({
            filter: filterValue
        });
    });

    //filter list
    $('.filter-list').on('click', 'a', function(e) {
        e.preventDefault();
        $(this).addClass('active').parent().siblings().find('a').removeClass('active');
    });

    //view more
    $('.quick-view').on('click', function() {
        $('.p-commerce-more').slideDown();
        return false;
    });

    $('.view-more-close').on('click', function() {
        $('.p-commerce-more').slideUp();
    });

    $('.mobile-menu').on('click', function() {
        $('body').toggleClass('open-menu');
    });

    $('.size li').on('click', function() {
        $('.size li').removeClass();
        $(this).addClass('active');
    });

    $('.color span, .pay span').on('click', function() {
        var $t = $(this);
        $t.siblings('.list').toggle();
        $t.toggleClass('active');
    });

    $('.color .list li').on('click', function() {
        var tx = $(this).text();
        $('.color span').text(tx);
        $(this).parents('.list').toggle();
        $('.color span').toggleClass('active');
    });

    $('.pay .list li').on('click', function() {
        var $t = $(this),
            tx = $t.text();
        $t.parents().siblings('span').text(tx);
        $t.parents('.list').toggle();
        $t.parents().siblings('span').toggleClass('active');
    });

    $('.quantity .up').on('click', function() {
        var i = $(this).siblings('.count').text();
        if (i >= 1) {
            i++;
            $(this).siblings('.count').text(i);
        }
        return false;
    });

    $('.quantity .down').on('click', function() {
        var i = $(this).siblings('.count').text();
        if (i > 1) {
            i--;
            $(this).siblings('.count').text(i);
        }
        return false;
    });

    $('.galery').owlCarousel({
        items: 4,
        dots: false,
        margin: 20,
        responsive: {
            // breakpoint from 0 up
            0: {
                items: 2,
                loop: true
            },
            // breakpoint from 480 up
            480: {
                items: 4,
                loop: false
            }
        }
    });

    $('.galery-info').each(function() {
        var $el = $('.galery figure').find('> img');
        if ($el.length > 0) {
            $(this).css('background', 'url(' + $el.attr('src') + ')');
        }
    });

    $('.galery figure').on('click', function() {
        var $el = $(this).find('> img');
        if ($el.length > 0) {
            $('.galery-info').css('background', 'url(' + $el.attr('src') + ')');
        }
    });




    // contact form

    $(".a-mark-form").submit(function(){
        $.ajax({
            type: "POST",
            url: "mail.php",
            data: $(this).serialize()
        }).done(function(){
            $(".styled-textarea").val('');
            $(".c-form-input").val('');
        });
        return false;
    });


})(jQuery, window, document);

//map

if ($('.wpc-map').length) {
    $('.wpc-map').each(function() {
        initialize(this);
    });
}

function initialize(_this) {

    var stylesArray = {
        //style 1
        'style-1': [{
            "featureType": "all",
            "elementType": "labels.text.fill",
            "stylers": [{
                "saturation": 36
            }, {
                "color": "#000000"
            }, {
                "lightness": 40
            }]
        }, {
            "featureType": "all",
            "elementType": "labels.text.stroke",
            "stylers": [{
                "visibility": "on"
            }, {
                "color": "#000000"
            }, {
                "lightness": 16
            }]
        }, {
            "featureType": "all",
            "elementType": "labels.icon",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "administrative",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 20
            }]
        }, {
            "featureType": "administrative",
            "elementType": "geometry.stroke",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 17
            }, {
                "weight": 1.2
            }]
        }, {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 20
            }]
        }, {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 21
            }]
        }, {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 17
            }]
        }, {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 29
            }, {
                "weight": 0.2
            }]
        }, {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 18
            }]
        }, {
            "featureType": "road.local",
            "elementType": "geometry",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 16
            }]
        }, {
            "featureType": "transit",
            "elementType": "geometry",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 19
            }]
        }, {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 17
            }]
        }]
    };

    var styles, map, marker, infowindow,
        lat = $(_this).attr("data-lat"),
        lng = $(_this).attr("data-lng"),
        contentString = $(_this).attr("data-string"),
        image = $(_this).attr("data-marker"),
        styles_attr = $(_this).attr("data-style"),
        zoomLevel = parseInt($(_this).attr("data-zoom"), 10),
        myLatlng = new google.maps.LatLng(lat, lng);


    // style_1
    if (styles_attr == 'style-1') {
        styles = stylesArray[styles_attr];
    }
    // custom
    if (typeof hawa_style_map != 'undefined' && styles_attr == 'custom') {
        styles = hawa_style_map;
    }
    // or default style

    var styledMap = new google.maps.StyledMapType(styles, {
        name: "Styled Map"
    });

    var mapOptions = {
        zoom: zoomLevel,
        disableDefaultUI: true,
        center: myLatlng,
        scrollwheel: false,
        mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
        }
    };

    map = new google.maps.Map(_this, mapOptions);

    map.mapTypes.set('map_style', styledMap);
    map.setMapTypeId('map_style');

    infowindow = new google.maps.InfoWindow({
        content: contentString
    });


    marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        icon: image
    });

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map, marker);
    });

}