/*------------------------------------------------------------------
[Table of contents]

1. Background image
2. Pizzeria number in home slider
3.  Swiper
4. Datepicker
5. Magnific Popup
6. Bootstrap-select
7. Bs  page tabs
8. Count to
9. Top menu 
10. Tabs 
11. Map
12. Scroll
13 Change colors fonts 
14 Ajaxs fonts
15 load fonts
16 Hide scroll in block
17 Ajax contact form 

-------------------------------------------------------------------*/

;(function($, window, document, undefined) {
    "use strict";

    /*=================================*/
    //1. Background image
    /*=================================*/

    // with out img height

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
            _this.hide();
        });

    }
    // with img height
    function wpc_add_img_bg2(img_sel, parent_sel) {

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
            _this.css('visibility', 'hidden');
        });

    }

    /*--------------------------------------------------------------------------------------*/
    /*2. Pizzeria number in home slider
    /*--------------------------------------------------------------------------------------*/
    function numberSwiperButton() {
        var elemPag = $(".wpc-pizzeria-home .pagination ").children();
        var namValue = elemPag.length;
        var newElem = $('<span>');
        for (var i = 0; i < namValue; i++) {
            elemPag.eq(i).append(newElem).html("0" + (i + 1));
        }
    }



    

    /*--------------------------------------------------------------------------------------*/
    /*3 Swiper
    /*--------------------------------------------------------------------------------------*/

    /*================*/
    /* - VARIABLES */
    /*================*/

    var swipers = [],
        winW, winH, winScr, $container, _isresponsive, xsPoint = 451,
        smPoint = 769,
        mdPoint = 992,
        lgPoint = 1200,
        addPoint = 1600,
        _ismobile = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i);

    /*========================*/
    /*  - PAGE CALCULATIONS */
    /*========================*/
    function pageCalculations() {
        winW = $(window).width();
        winH = $(window).height();
    }

    /*=================================*/
    /* - FUNCTION ON DOCUMENT READY */
    /*=================================*/
    pageCalculations();




    /*=================================*/
    /* SWIPER SLIDER */
    /*=================================*/
    function initSwiper() {
        var initIterator = 0;
        $('.swiper-container').each(function() {
            var $t = $(this);

            if ($t.find('.swiper-slide').length <= 1) {
                $t.find('.pagination').hide();
                $t.find('.swiper-slide').css('width', '100%');
                return 0;
            }

            var index = 'swiper-unique-id-' + initIterator;

            $t.addClass('swiper-' + index + ' initialized').attr('id', index);
            $t.find('.pagination').addClass('pagination-' + index);

            var autoPlayVar = parseInt($t.attr('data-autoplay'), 10);
            var mode = $t.attr('data-mode');
            var centerVar = parseInt($t.attr('data-center'), 10);
            var simVar = ($t.closest('.circle-description-slide-box').length) ? false : true;

            var slidesPerViewVar = $t.attr('data-slides-per-view');
            if (slidesPerViewVar == 'responsive') {
                slidesPerViewVar = updateSlidesPerView($t);
            } else slidesPerViewVar = parseInt(slidesPerViewVar, 10);

            var loopVar = parseInt($t.attr('data-loop'), 10);
            var speedVar = parseInt($t.attr('data-speed'), 10);

            swipers['swiper-' + index] = new Swiper('.swiper-' + index, {
                speed: speedVar,
                pagination: '.pagination-' + index,
                loop: loopVar,
                paginationClickable: true,
                autoplay: autoPlayVar,
                slidesPerView: slidesPerViewVar,
                keyboardControl: true,
                calculateHeight: true,
                simulateTouch: simVar,
                centeredSlides: centerVar,
                roundLengths: true,
                mode: mode || 'horizontal',
                onInit: function(swiper) {},
                onSlideChangeEnd: function(swiper) {
                    var activeIndex = (loopVar === 1) ? swiper.activeLoopIndex : swiper.activeIndex;
                },
                onSlideChangeStart: function(swiper) {
                    $t.find('.swiper-slide.active').removeClass('active');

                    var activeIndex = (loopVar === 1) ? swiper.activeLoopIndex : swiper.activeIndex;

                },
                onSlideClick: function(swiper) {

                }

            });

            numberSwiperButton();

            swipers['swiper-' + index].reInit();
            if (!centerVar) {
                if ($t.attr('data-slides-per-view') == 'responsive') {
                    var paginationSpan = $t.find('.pagination span');
                    var paginationSlice = paginationSpan.hide().slice(0, (paginationSpan.length + 1 - slidesPerViewVar));
                    if (paginationSlice.length <= 1 || slidesPerViewVar >= $t.find('.swiper-slide').length) $t.addClass('pagination-hidden');
                    else $t.removeClass('pagination-hidden');
                    paginationSlice.show();
                }
            }
            initIterator++;
        });



    }

    $('.slide-prev').on('click', function() {
        swipers['swiper-' + $(this).parent().find('.swiper-container').attr('id')].swipePrev();
        return false;
    });

    $('.slide-next').on('click', function() {
        swipers['swiper-' + $(this).parent().find('.swiper-container').attr('id')].swipeNext();
        return false;
    });

    function updateSlidesPerView(swiperContainer) {
        if (winW >= addPoint) return parseInt(swiperContainer.attr('data-add-slides'), 10);
        else if (winW >= lgPoint) return parseInt(swiperContainer.attr('data-lg-slides'), 10);
        else if (winW >= mdPoint) return parseInt(swiperContainer.attr('data-md-slides'), 10);
        else if (winW >= smPoint) return parseInt(swiperContainer.attr('data-sm-slides'), 10);
        else return parseInt(swiperContainer.attr('data-xs-slides'), 10);
    }

    /*==============================*/
    /*  - FUNCTION ON PAGE RESIZE */
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


   


 


    $(window).on('resize', function() {

        resizeCall();

        resizeFixes();
    });

    function resizeFixes(){
        if(winW>767){
            $('html.active').removeClass('active');
            $('.wpc-header-menu.active-mob').removeClass('active-mob');
            $('.wpc-navigation.active').removeClass('active');
        }
    }

    /*=================================*/
    // 4 Datepicker */
    /*=================================*/
    var datepicker = $('.datepicker');
    if (datepicker.length) {
        datepicker.datepicker({
            format: 'mm/dd/yyyy',
            autoclose: true,
            startDate: '-3d'

        });
    }


    /*=================================*/
    /* 5 - Magnific Popup */
    /*=================================*/
    var groups = {};
    $('.wpc-bistro-prop-item a').each(function() {
        var id = parseInt($(this).attr('data-group'), 10);

        if (!groups[id]) {
            groups[id] = [];
        }

        groups[id].push(this);
    });


    $.each(groups, function() {

        $(this).magnificPopup({
            type: 'image',
            closeOnContentClick: true,
            closeBtnInside: false,
            callbacks: {
                beforeOpen: function() {
                    $('html').addClass('popup');

                },
                afterClose: function() {
                    $('html').removeClass('popup');
                }
            },
            gallery: {
                enabled: true
            }
        })

    });



    /*=================================*/
    /*6 Bootstrap-select */
    /*=================================*/
    if ($('.selectpicker').length) {
        $('.selectpicker').selectpicker({
            style: 'btn-info',
            size: 4
        });
    }


    


    /*=================================*/
    /*7 Bs  page tabs */
    /*=================================*/

    $('.wpc-menu-item ').on('click', function() {
        var that = $(this),
            bSimg = that.attr("data-bs-img"),
            bStext = that.attr("data-bs-text"),
            bStext2 = that.attr("data-bs-text2"),
            bSurl = that.attr("data-bs-url");


        $('.wpc-bs-sub-elem span').text(bStext);
        $('.wpc-bs-sub-elem i').text(bStext2);
        $('.wpc-bs-sub-elem img').attr('src', bSimg);
        $('.wpc-bs-sub-elem a').attr('url', bSurl);




        function wpc_add_img_bg2(img_sel, parent_sel) {

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
                _this.css('visibility', 'hidden');
            });

        }
        wpc_add_img_bg2('.wpc-bs-sub-elem img', '.wpc-bs-sub-elem');

    });



    /*=================================*/
    /*8 Count to */
    /*=================================*/
    var counters = function() {
        $('.wpc-facts-count span').not('.animated').each(function() {
            if ($(window).scrollTop() >= $(this).offset().top - $(window).height() * 0.7) {
                $(this).addClass('animated').countTo();
            }
        });
    }

    counters();


    /*=================================*/
    /*9 Top menu */
    /*=================================*/

    var $first_child_link = $('.menu-item-has-children > a').append('<span class="fa fa-angle-right"></span>');

    $('.nav-menu-icon').on('click', function() {
        $(this).toggleClass('active');
        $('html').toggleClass('active');
        $('.wpc-header-menu').toggleClass('active-mob');
        $('.wpc-header-sushi').toggleClass('activeMob');

        $('.wpc-navigation').toggleClass('active');
        $('.wpc-header-pizzeria  ').toggleClass('active-pizza');
    });

    $first_child_link.find('span').on('click', function(e) {
        e.preventDefault();
        var self = $(this),
            parentLi = self.parent();
        self.toggleClass(' fa-angle-down').toggleClass('fa-angle-right ');
        self.closest('li').siblings('.menu-item.menu-item-has-children').removeClass('active').find('span.fa-angle-down').removeClass('fa-angle-down').addClass('fa-angle-right');
        self.closest('li').toggleClass('active');

    });



    /*=================================*/
    /*10 Tabs */
    /*=================================*/
    // tabs propose


    $('  .tabs-header li a ').on('click', function(e) {
        e.preventDefault();
    });


    // // tabs dishes
    $('.wpt-dish-bg .tabs-header').on('click', 'li:not(.active)', function(e) {
        e.preventDefault();
        var index_el = $(this).index();
        $(this).addClass('active').siblings().removeClass('active');
        $('.wpt-dish-tabs').find('.tabs-item').hide().removeClass('activeMore').eq(index_el).fadeIn(600).addClass('activeMore');

    });

    $(' .wpc-our-menu .tabs-header').on('click', 'li:not(.active)', function(e) {
        e.preventDefault();
        var index_el = $(this).index();
        $(this).addClass('active').siblings().removeClass('active');
        $(this).closest('.wpc-our-menu').find('.tabs-item').removeClass('visible-swiper').hide().eq(index_el).fadeIn(700).addClass('visible-swiper');
        swipers['swiper-' + $(this).closest('.wpc-our-menu ').find('.tabs-item.visible-swiper .swiper-container').attr('id')].reInit();
    });



    // add tab item
    $('.wpc-tabs-more').on('click', function(e) {
        e.preventDefault();
        var index = $('.wpt-dish-bg .tabs-header li.active').index();
        var activeTab = $(this).closest('.wpc-tabs-body').find('.tabs-item.activeMore');
        var clone = activeTab.children(':first-child').clone();
        activeTab.prepend(clone);
    })


    $('.wpc-bs-menu .tabs-header').on('click', 'li:not(.active)', function() {

        var index_el = $(this).index();

        $(this).addClass('active').siblings().removeClass('active');
        $(this).closest('.wpc-bs-menu ').find('.tabs-item').removeClass('visible-swiper').hide().eq(index_el).fadeIn(700).addClass('visible-swiper');
        swipers['swiper-' + $(this).closest('.wpc-bs-menu  ').find('.tabs-item.visible-swiper .swiper-container').attr('id')].reInit();

    });
    /*=================================*/
    // /* */BS reservation
    /*=================================*/

    $('.wpc-reservation .wpc-persons label ').on('click', function() {
        var that = $(this);
        that.parent('.wpc-persons').find('label').removeClass('active')
        that.addClass('active')
        // body...
    });
    /*============================*/
    /* WINDOW LOAD                */
    /*============================*/

    $(window).on('load resize ', function() {

        if ($(window).width()<992) {
        wpc_add_img_bg2('.wpc-upcoming-head img', '.wpc-upcoming-head ');
        }



        numberSwiperButton();
        // ajax_loadFonts();

        // change two block height in fast food index page
        $('.wpc-services-food-img').height($('.wpc-services-food ').height());


        var proposes_width = $('.wpc-proposes').width();
        var w_width = $(window).width();
        var info_block2_width = $('.wpc-info-block2').width();
        if ($(window).width() > 991) {
            $('.wpc-proposes-item').width(proposes_width / 4).height(proposes_width / 4);
            $('.wpc-info-block2-item').width((info_block2_width / 2) - 40).height((info_block2_width / 2) - 40);
        } else {

            $('.wpc-proposes-item').width('100%').height('317px');
        }

    });

    /*============================*/
    /*11 MAP                */
    /*============================*/
    if ($('.wpc-map').length) {
        $('.wpc-map').each(function() {
            initialize(this);
        });
    }

    function initialize(_this) {

        var stylesArray = {

            'style-2': [{
                "featureType": "landscape",
                "stylers": [{
                    "hue": "#FFBB00"
                }, {
                    "saturation": 43.400000000000006
                }, {
                    "lightness": 37.599999999999994
                }, {
                    "gamma": 1
                }]
            }, {
                "featureType": "road.highway",
                "stylers": [{
                    "hue": "#FFC200"
                }, {
                    "saturation": -61.8
                }, {
                    "lightness": 45.599999999999994
                }, {
                    "gamma": 1
                }]
            }, {
                "featureType": "road.arterial",
                "stylers": [{
                    "hue": "#FF0300"
                }, {
                    "saturation": -100
                }, {
                    "lightness": 51.19999999999999
                }, {
                    "gamma": 1
                }]
            }, {
                "featureType": "road.local",
                "stylers": [{
                    "hue": "#FF0300"
                }, {
                    "saturation": -100
                }, {
                    "lightness": 52
                }, {
                    "gamma": 1
                }]
            }, {
                "featureType": "water",
                "stylers": [{
                    "hue": "#0078FF"
                }, {
                    "saturation": -13.200000000000003
                }, {
                    "lightness": 2.4000000000000057
                }, {
                    "gamma": 1
                }]
            }, {
                "featureType": "poi",
                "stylers": [{
                    "hue": "#00FF6A"
                }, {
                    "saturation": -1.0989010989011234
                }, {
                    "lightness": 11.200000000000017
                }, {
                    "gamma": 1
                }]
            }],
            'style-1': [{
                "featureType": "water",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#d3d3d3"
                }]
            }, {
                "featureType": "transit",
                "stylers": [{
                    "color": "#808080"
                }, {
                    "visibility": "off"
                }]
            }, {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "visibility": "on"
                }, {
                    "color": "#b3b3b3"
                }]
            }, {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#ffffff"
                }]
            }, {
                "featureType": "road.local",
                "elementType": "geometry.fill",
                "stylers": [{
                    "visibility": "on"
                }, {
                    "color": "#ffffff"
                }, {
                    "weight": 1.8
                }]
            }, {
                "featureType": "road.local",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "color": "#d7d7d7"
                }]
            }, {
                "featureType": "poi",
                "elementType": "geometry.fill",
                "stylers": [{
                    "visibility": "on"
                }, {
                    "color": "#ebebeb"
                }]
            }, {
                "featureType": "administrative",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#a7a7a7"
                }]
            }, {
                "featureType": "road.arterial",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#ffffff"
                }]
            }, {
                "featureType": "road.arterial",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#ffffff"
                }]
            }, {
                "featureType": "landscape",
                "elementType": "geometry.fill",
                "stylers": [{
                    "visibility": "on"
                }, {
                    "color": "#efefef"
                }]
            }, {
                "featureType": "road",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#696969"
                }]
            }, {
                "featureType": "administrative",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "visibility": "on"
                }, {
                    "color": "#737373"
                }]
            }, {
                "featureType": "poi",
                "elementType": "labels.icon",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "poi",
                "elementType": "labels",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "road.arterial",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "color": "#d6d6d6"
                }]
            }, {
                "featureType": "road",
                "elementType": "labels.icon",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {}, {
                "featureType": "poi",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#dadada"
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
        if (styles_attr == 'style-2') {
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

        if ($('.wpc-fast-food-footer').length) {
            return false;
        } else {
            marker = new google.maps.Marker({
                position: myLatlng,
                map: map,
                icon: image
            });

        }

        google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map, marker);
        });

    }


    /*--------------------------------------------------------------------------------------*/
    //12 Scroll
    /*--------------------------------------------------------------------------------------*/

    $(document).on("scroll", onScroll);
    counters();

    function onScroll(event) {
        var scroll_top = $(document).scrollTop();
        var light_menu = $('.wpc-header-menu-light'),
            sushi_menu = $('.wpc-header-sushi'),
            wpc_header_sushi = $('.wpc-header-sushi');

        //////////////////////////////////////
        // write text
        var scrolSection = $('.gui_slider_console');
        var scrollTop = window.pageYOffset;

        if (scrollTop > 5) {
            light_menu.addClass('active');
            wpc_header_sushi.addClass('active');
            sushi_menu.addClass('active-sushi');

        } else {
            light_menu.removeClass('active');
            wpc_header_sushi.removeClass('active');
            sushi_menu.removeClass('active-sushi');
        }
    }



    /*--------------------------------------------------------------------------------------*/
    //13 change style button
    /*--------------------------------------------------------------------------------------*/

    $('.conf-button').on('click', function() {
        if ($('.wpc-style-page').hasClass('slide-right')) {
            $('.wpc-style-page').removeClass('slide-right');
            $('.conf-button span').removeClass('act');
        } else {
            $('.wpc-style-page').addClass('slide-right');
            $('.conf-button span').addClass('act');
        }

    });

    /*--------------------------------------------------------------------------------------*/
    // change colors fonts 
    /*--------------------------------------------------------------------------------------*/

    // check localStorage style for change color fonts
    document.querySelector("body").className += " " + localStorage.getItem("color");

    $('.entry').on('click', function() {
        var newTheme = $(this).attr('data-color');
        if ($(this).hasClass('active')) return false;
        $(this).parent().find('.active').removeClass('active');
        $(this).addClass('active');
        $('body').removeClass().addClass(newTheme);

// add localStorage style for change color fonts
        localStorage.removeItem("color");
        localStorage.setItem("color", $(this).attr("data-color"));
    });


    /*--------------------------------------------------------------------------------------*/
    // change block container
    /*--------------------------------------------------------------------------------------*/

    // check localStorage style for change block container
if (localStorage.getItem("wpcFluid")) {
    document.querySelector("html").className += " " + localStorage.getItem("wpcFluid");

    $('.check-option').removeClass('active')
    var newContainBox = '.wpc-change-grid .' + localStorage.getItem("wpcFluid") + 'a';
    $(newContainBox).addClass('active')

}

    $('.check-option').on('click', function() {
        $('body').removeClass().removeAttr('style');

        if ($(this).hasClass('active')) {
            return false;
        } else {
            $(this).parent().find('.active').removeClass('active');
            $(this).addClass('active');
            $('html').removeClass();
            if ($('.wpc-product-text .col-sm-6').length) {
                $('.wpc-product-text .wpc-product-item').parent().removeClass().addClass('col-sm-12');
            } else {
                $('.wpc-product-text .wpc-product-item ').parent().removeClass().addClass('col-sm-6');
            }
            $('html').addClass($(this).attr('data-size'));

    // add localStorage style for change block container
        localStorage.removeItem("wpcFluid");
        localStorage.setItem("wpcFluid", $(this).attr('data-size') );

        // restart activations swiper
            for (var i in swipers) {
                swipers[i].resizeFix();
            }
        }
    });




    $('.wpc-img-style a').on('click', function(e) {
        e.preventDefault();
        var that = $(this);
        that.parent().children().removeClass('active');
        that.addClass('active');
        $('.wpc-product-text .wpc-product-item').parent().removeClass().addClass('col-sm-12');
        $('html').addClass('wpc-no-fluid').addClass('wpc-bg-body').css('background', $(this).attr('data-bg-color') || 'url(' + $(this).find('img').attr('src') + ')');
        $('.check-option').removeClass('active').eq(0).addClass('active');
        $('body').css('background', '#fff');
        for (var i in swipers) {
            swipers[i].resizeFix();
        }
    })

    if ($('.wpc-img-style .wpc-bg-color').length) {
        $('.wpc-img-style .wpc-bg-color').each(function() {
            $(this).css('background', $(this).attr('data-bg-color'));
        });
    }




    /*--------------------------------------------------------------------------------------*/
    /* 16 Hide scroll in block
    /*--------------------------------------------------------------------------------------*/
    var div = document.createElement('div');

    div.style.overflowY = 'scroll';
    div.style.width = '50px';
    div.style.height = '50px';
    div.style.visibility = 'hidden';

    document.body.appendChild(div);
    var scrollWidth = div.offsetWidth - div.clientWidth;

    $('.wrappers').css('margin-right', -scrollWidth);
    document.body.removeChild(div);



    /*--------------------------------------------------------------------------------------*/
    /* 17 Ajax contact form 
    /*--------------------------------------------------------------------------------------*/
      $('.js-contact-form').submit(function(e){

        $('.ajax-loader').show();

        var url = 'mail.html',
            form = this;

        $(form).find('[name="fields[code]"]').remove();

        function result(class_key, data){
          setTimeout(function(){
            $('.ajax-loader').hide();
            $('.ajax-result .success, .ajax-result .error').hide();
            $('.ajax-result').find(class_key).show().html(data);
          },500);
        }

        $.ajax({
          type: "POST",
          url: url,
          data: $(form).serialize(),
        })
        .done(function(data) {
          result('.success', data);
        }).error(function(data){
            console.log(data);
            if ( !data.status ) {
                data = 'Server not found.';
            } else {
                if (data.statusText) {
                    data = data.responseText;
                    data += '<br>Error code: ';
                    data += data.status;
                } else {
                    data = "Message wasn't sent, a technical error.<br>Error code: " + data.status;
                }
            }
            result('.error', data);
        })

        e.preventDefault(); 

      });
      /* end ajax form */






     $(window).on('load', function() {
        setTimeout(function(){
            initSwiper();
        },0);
    /*=================================*/
        /* preload */
    /*=================================*/
        $('.load-wrap').delay(1000).fadeOut();

    /*=================================*/
        /* BACKGROUND IMAGE */
    /*=================================*/
        wpc_add_img_bg('.wpc-chef-menu-item img', '.wpc-chef-menu-item');
        wpc_add_img_bg('.wpc-blog-h3-item-head img', '.wpc-blog-h3-item-head');
        wpc_add_img_bg('.wpc-info-block img', '.wpc-info-block');
        wpc_add_img_bg('.wpc-our-service .wpc-img', '.wpc-our-service');
        wpc_add_img_bg('.wpc-info-block img', '.wpc-info-block');
        wpc_add_img_bg('.wpc-food-menu2-bg1 .wpc-img', '.wpc-food-menu2-bg1');
        wpc_add_img_bg('.wpc-info-block4 img', '.wpc-info-block4');
        wpc_add_img_bg('.wpt-dish-bg img ', '.wpt-dish-bg');
        wpc_add_img_bg('.wpc-food-menu-testi  .wpc-img', '.wpc-food-menu-testi');
        wpc_add_img_bg('.wpc-info-block5 img', '.wpc-info-block5');
        wpc_add_img_bg('.wpc-food-menu.wpc-our-service img', '.wpc-food-menu.wpc-our-service');
        wpc_add_img_bg('.wpc-our-menu   .wpc-img', '.wpc-our-menu ');
        wpc_add_img_bg('.wpc-home3.wpc-our-menu   .wpc-img', '.wpc-home3.wpc-our-menu ');
        wpc_add_img_bg('.wpc-info-block6 img', '.wpc-info-block6');
        wpc_add_img_bg('.wpc-swiper .swiper-slide img', '.wpc-swiper .swiper-slide ');
        wpc_add_img_bg('.wpc-info-b3 .swiper-slide img', '.wpc-info-b3 .swiper-slide');
        wpc_add_img_bg('.wpc-testi-h3 .swiper-slide .wpc-img', '.wpc-testi-h3 .swiper-slide ');
        wpc_add_img_bg('.wpc-sushi-dish .wpc-img', '.wpc-sushi-dish');
        wpc_add_img_bg('.wpc-food-menu .wpc-img', '.wpc-food-menu');
        wpc_add_img_bg('.wpc-bakery-info2 .wpc-img', '.wpc-bakery-info2');
        wpc_add_img_bg('.wpc-bakery-logo img', '.wpc-bakery-logo');
        wpc_add_img_bg('.wpc-bakery-3block img', '.wpc-bakery-3block');
        wpc_add_img_bg('.wpc-bakery-footer .wpc-img', '.wpc-bakery-footer');
        wpc_add_img_bg('.wpc-about-food .wpc-img', '.wpc-about-food');
        wpc_add_img_bg('.wpc-services-food-img .wpc-img', '.wpc-services-food-img');
        wpc_add_img_bg('.wpc-food-item-logo img', '.wpc-food-item-logo');
        wpc_add_img_bg('.wpc-bakery-dish .wpc-img2', '.wpc-bakery-dish');
        wpc_add_img_bg('.wpc-fast-food-menu .wpc-img', '.wpc-fast-food-menu');
        wpc_add_img_bg('.wpc-fast-food-footer .wpc-img', '.wpc-fast-food-footer');
        wpc_add_img_bg('.wpc-fast-food-footer .wpc-img', '.wpc-fast-food-footer');
        wpc_add_img_bg('.wpc-bistro-order img', '.wpc-bistro-order');
        wpc_add_img_bg('.wpc-footer-info img', '.wpc-footer-info');
        wpc_add_img_bg('.wpc-bistro-prop-item  .wpc-show img', '.wpc-bistro-prop-item  .wpc-show');
        wpc_add_img_bg('.wpc-bs-prop .wpc-img', '.wpc-bs-prop');
        wpc_add_img_bg('.wpc-bs-menu .wpc-img', '.wpc-bs-menu');
        wpc_add_img_bg('.wpc-pizzeria-recipes .wpc-img', '.wpc-pizzeria-recipes');
        wpc_add_img_bg('.wpc-food-prop-item img', '.wpc-food-prop-item');
        wpc_add_img_bg('.wpc-spizzeria-info .wpc-img', '.wpc-spizzeria-info');
        wpc_add_img_bg('.wpc-img-style a img', '.wpc-img-style a');
        wpc_add_img_bg('.wpc-sushi-disc img', '.wpc-sushi-disc');
        wpc_add_img_bg('.wpc-sushi-choose img', '.wpc-sushi-choose');
        wpc_add_img_bg('.wpc-bistro-discount .wpc-img', '.wpc-bistro-discount');


        wpc_add_img_bg2('.wpc-spizzeria-img  .wpc-img1', '.wpc-spizzeria-img ');
        wpc_add_img_bg2('.wpc-sushi-prop-item img', '.wpc-sushi-prop-item');
        wpc_add_img_bg2('.wpc-bs-sub-elem img', '.wpc-bs-sub-elem');
        wpc_add_img_bg2('.wpc-spizzeria-img  .wpc-img', '.wpc-spizzeria-img ');
        wpc_add_img_bg2('.wpc-pizzeria-prop-item  img', '.wpc-pizzeria-prop-item ');


    });


})(jQuery, window, document);