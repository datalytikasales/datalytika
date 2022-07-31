;
(function($, window, document, undefined) {

    "use strict";

    // BACKGROUND IMAGE
    function wpc_add_img_bg(img_sel, parent_sel) {
        if (!img_sel) {
            console.info('no img selector');
            return false;
        }

        var $parent, _this;
        $(img_sel).each(function() {
            _this = $(this);
            $parent = _this.closest(parent_sel);
            $parent = $parent.length ? $parent : _this.parent();
            $parent.css('background-image', 'url(' + this.src + ')');
            _this.hide()
        });
    }

    wpc_add_img_bg('.main-header__bg');
    wpc_add_img_bg('.main-footer__img');
    wpc_add_img_bg('.about-couple__photo');
    wpc_add_img_bg('.video-banner__video-bg');
    wpc_add_img_bg('.post__img');
    wpc_add_img_bg('.video-banner__img');
    wpc_add_img_bg('.schedule__bg-img');
    wpc_add_img_bg('.rsvp__img');
    wpc_add_img_bg('.our-mary__img');
    wpc_add_img_bg('.story-timeline__bg');
    wpc_add_img_bg('.rsvp-circle_bg');
    wpc_add_img_bg('.gallery-page__img');
    wpc_add_img_bg('.slide-gallery__img');
    wpc_add_img_bg('.post-preview__quote-bg');
    wpc_add_img_bg('.js-bg');


    // MENU
    $('#dl-menu').dlmenu();
    // ROUND COUNTDOWN
    if ($('.ClassyCountdown').length) {

        $('.countdown').each(function() {
            var finalDate = $(this).data('finaldate');
            $('.countdown').ClassyCountdown({
                theme: "black",
                now: $.now() / 1000,
                end: Date.parse(finalDate) / 1000,
                labelsOptions: {
                    lang: {
                        days: 'days',
                        hours: 'hours',
                        minutes: 'minutes',
                        seconds: 'seconds'
                    },
                    style: 'font-size: 13px;'
                },
                color: "#C0ffff",
                style: {
                    element: '',
                    labels: false,
                    days: {
                        gauge: {
                            thickness: 0.05,
                            bgColor: "#f6f6f6",
                            fgColor: "#c09f42"
                        }
                    },
                    hours: {
                        gauge: {
                            thickness: 0.05,
                            bgColor: "#f6f6f6",
                            fgColor: "#c09f42"
                        }
                    },
                    minutes: {
                        gauge: {
                            thickness: 0.05,
                            bgColor: "#f6f6f6",
                            fgColor: "#c09f42"
                        }
                    },
                    seconds: {
                        gauge: {
                            thickness: 0.05,
                            bgColor: "#f6f6f6",
                            fgColor: "#c09f42"
                        }
                    }
                }
            });
        });

    }

    // VIDEO BANNER
    function videoBanner(iFrame, playBtn, closeBtn, tmb) {

        var $iFrame = $(iFrame),
            $playBtn = $(playBtn),
            $closeBtn = $(closeBtn),
            $thumbnail = $(tmb),
            $videoSrc;

        $playBtn.on('click', function() {
            $videoSrc = $(this).attr('data-video');
            $iFrame.attr('src', $videoSrc);
            $thumbnail.hide();
            $iFrame.show();
            $closeBtn.show();
        })

        $closeBtn.on('click', function() {
            $iFrame.attr('src', 'about:blank');
            $thumbnail.show();
            $iFrame.hide();
            $closeBtn.hide();
        })
    };

    videoBanner('.video-banner__iframe', '.video-banner__play-btn', '.video-banner__close-btn', '.video-banner__tmb')
    videoBanner('.post-preview__iframe', '.post-preview__play-btn', '.post-preview__close-btn', '.post-preview__video-tmb')

    // ISOTOPE PORTFOLIO
    function isotopeGenerator(parentSel, itemSel, gutterSel) {

        var $gridPage = $(parentSel).isotope({
            itemSelector: itemSel,
            layoutMode: 'fitRows',
            fitRows: {
                gutter: gutterSel,
            }
        });


        var isotope = $(".post-preview-wrap");
        if (isotope.length) {
            // masonry
            isotope.isotope({

                percentPosition: true,
                masonry: {
                    columnWidth: ".post-preview"
                }
            });
        }




        $('#filters').on('click', '.but', function() {
            var izotope_container = $(parentSel);
            for (var i = izotope_container.length - 1; i >= 0; i--) {
                $(izotope_container[i]).find('.item').removeClass('animated');
            }

            $('#filters .but').removeClass('activbut');
            $(this).addClass('activbut');
            var filterValue = $(this).attr('data-filter');
            izotope_container.isotope({
                filter: filterValue
            });
            return false;
        });
    }

    switch ($('.gallery-page').attr('data-col-amount')) {
        case '4':
            isotopeGenerator('.gallery-page__grid--4col', '.gallery-page__item--4col', '.gutter-sizer--4col');

            break;

        case '5':
            isotopeGenerator('.gallery-page__grid--5col', '.gallery-page__item--5col', '.gutter-sizer--5col');

            break;

        default:
            isotopeGenerator('.gallery-page__grid', '.gallery-page__item', '.gutter-sizer');

            break;
    }


    var $grid = $('.gallery').isotope({
        itemSelector: '.gallery__item',
        masonry: {
            columnWidth: '.col-md-3'
        }
    });


    /*============================*/
    /* 04 - FUNCTION ON PAGE LOAD */
    /*============================*/

    $(window).on('load', function() {

        swiper()
        $('.wed-preloader').fadeOut(1000);
        // EQUAL COLUMNS
        $('.js-match-height').matchHeight();
        $('.gifts__item').matchHeight();
        $grid.isotope();
        isotopeGenerator();
    });

    $(window).on('resize', function() {
        $grid.isotope();
        isotopeGenerator();
        swiper()
    });


    // MAGNIFIC POP-UP GALLERY

    function magnificOptionsGenerate(item) {
        return {
            delegate: item,
            type: 'image',
            tLoading: 'Loading image #%curr%...',
            mainClass: 'mfp-img-mobile',
            gallery: {
                enabled: true,
                navigateByImgClick: true,
                preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
            },
            removalDelay: 500, //delay removal by X to allow out-animation
            callbacks: {
                beforeOpen: function() {
                    // just a hack that adds mfp-anim class to markup
                    this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                    this.st.mainClass = this.st.el.attr('data-effect');
                }
            },
            closeOnContentClick: true,
            midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
        }
    }


    $('.popup-gallery').magnificPopup(magnificOptionsGenerate('a'));
    $('.post-preview__hover').magnificPopup(magnificOptionsGenerate('.js-popup'));
    $('.blog-sidebar__tab-widget').magnificPopup(magnificOptionsGenerate('.js-popup'));


    // FRIENDS SLIDER


    function swiper() {
        /*============================*/
        /* 01 - VARIABLES */
        /*============================*/
        var swipers = [],
            winW, winH, winInnerW, winScr, _isresponsive, smPoint = 768,
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
            winInnerW = window.innerWidth;
        }


        /*=================================*/
        /* 03 - FUNCTION ON DOCUMENT READY */
        /*=================================*/
        pageCalculations();





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

        /*=====================*/
        /* 06 - SWIPER SLIDERS */
        /*=====================*/

        function initSwiper() {
            var initIterator = 0;
            $('.swiper-container').each(function() {
                var $t = $(this);

                var index = 'swiper-unique-id-' + initIterator;

                $t.addClass('swiper-' + index + ' initialized').attr('id', index);
                $t.find('.pagination').addClass('pagination-' + index);

                var autoPlayVar = parseInt($t.attr('data-autoplay'), 10);
                var mode = $t.attr('data-mode');
                var slidesPerViewVar = $t.attr('data-slides-per-view');
                if (slidesPerViewVar === 'responsive') {
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
                    },
                    onSlideChangeStart: function(swiper) {
                        $t.find('.swiper-slide.active').removeClass('active');
                    }
                });
                swipers['swiper-' + index].reInit();
                if ($t.attr('data-slides-per-view') === 'responsive') {
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
        initSwiper();

        function updateSlidesPerView(swiperContainer) {
            if (winInnerW >= addPoint) return parseInt(swiperContainer.attr('data-add-slides'), 10);
            else if (winInnerW >= lgPoint) return parseInt(swiperContainer.attr('data-lg-slides'), 10);
            else if (winInnerW >= mdPoint) return parseInt(swiperContainer.attr('data-md-slides'), 10);
            else if (winInnerW >= smPoint) return parseInt(swiperContainer.attr('data-sm-slides'), 10);
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

        // swiper tabs
        $(".friends__chose-btn").on('click', function(event) {
            var tab_id = $(this).attr('data-tab');

            $('.friends__chose-btn').removeClass('friends__chose-btn--active');
            $('.friends__slide').hide();

            $(this).addClass('friends__chose-btn--active');
            $("#" + tab_id).fadeIn(600);

            swipers['swiper-' + $("#" + tab_id + '>.swiper-container').attr('id')].reInit();
        });

    }

    swiper();

    // show first tab content
    $($('.blog-sidebar__tab--active').attr('href')).show()

    $('.blog-sidebar__tab').on('click', function(event) {
        event.preventDefault();
        var tab_id = $(this).attr('href');

        $('.blog-sidebar__tab').removeClass('blog-sidebar__tab--active');
        $('.js-tab-content').fade();

        $(this).addClass('blog-sidebar__tab--active');
        $(tab_id).show();
    });



    // GOOGLE MAP

    function initMap(element, locations) {
        var myLatLng = {
            lat: locations[0].lat,
            lng: locations[0].lng
        };


        var map = new google.maps.Map(document.getElementById(element), {
            zoom: 14,
            center: myLatLng,
            zoomControl: false,
            draggable: false,
            scrollwheel: false
        });

        var infowindow = new google.maps.InfoWindow();
        var bounds = new google.maps.LatLngBounds();

        var marker;

        for (i = 0; i < locations.length; i++) {
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(locations[i].lat, locations[i].lng),
                icon: 'img/decorations/map-icon.png',
                map: map
            });

            //extend the bounds to include each marker's position
            bounds.extend(marker.position);

            google.maps.event.addListener(marker, 'click', (function(marker, i) {
                return function() {
                    infowindow.open(map, marker);
                }
            })(marker, i));

        }

        // if location markers is more than 1, zoom will be automatically fit to show all markers in one frame.
        // But if you need manual zoom for multiply markers, then just comment if-rule below
        map.fitBounds(bounds);

        //now fit the map to the newly inclusive bounds
        if (locations.length > 1) {
            map.fitBounds(bounds);
        }

        var styles = [{
            "featureType": "administrative",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#444444"
            }]
        }, {
            "featureType": "administrative.locality",
            "elementType": "labels.icon",
            "stylers": [{
                "visibility": "on"
            }]
        }, {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [{
                "color": "#f2f2f2"
            }]
        }, {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "road",
            "elementType": "all",
            "stylers": [{
                "saturation": -100
            }, {
                "lightness": 45
            }]
        }, {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [{
                "visibility": "simplified"
            }]
        }, {
            "featureType": "road.arterial",
            "elementType": "labels.icon",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "water",
            "elementType": "all",
            "stylers": [{
                "color": "#abadae"
            }, {
                "visibility": "on"
            }]
        }]

        map.setOptions({
            styles: styles
        });

    }

    if ($("div").is("#js-map")) {

        var locations = [];
        var geoAddress = [{
            address: 'new york, dey st'
        }]

        for (var i = 0; i < geoAddress.length; i++) {

            var coordinatesRequest = 'http://maps.google.com/maps/api/geocode/json?address=' + geoAddress[i].address.replace(/\s/ig, '+') + '&sensor=false';

            $.ajax({
                async: false,
                url: coordinatesRequest,
                dataType: "json",
                success: function(data) {

                    locations.push(data.results[0].geometry.location);

                },
            });

        }

        initMap('js-map', locations);

    }
    $(".menu-item-has-children>a").on('click', function(event) {
        event.preventDefault();
    });

})(jQuery, window, document);