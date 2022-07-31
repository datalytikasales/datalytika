/*****MIFOLIO*****/

;(function($, window, document, undefined) {
    "use strict";

    /* Masonry Function */
    function MasonryPortfolio() {

        if ($('#portfolio-wrap').length > 0) {

            var $container = $('#portfolio');
            $container.isotope({
                itemSelector: '.grid-item',
                gutter: 0,
                transitionDuration: "0.5s"
            });

            $('#filters a').on('click', function() {
                $('#filters a').removeClass('active');
                $(this).addClass('active');
                var selector = $(this).attr('data-filter');
                /*$container.isotope({ filter: selector });     */
                $container.isotope({
                    filter: selector
                });
                return false;
            });


            $(document).scroll(function() {
                if ($('.auto-construct').length > 0) {
                    var y = $(this).scrollTop();
                    var t = $('#portfolio').offset().top + $('#portfolio').height() - window.innerHeight;
                    if (y > t) {
                        $('#portfolio').removeClass('auto-construct');
                    }
                }

                if ($('.time-line').length) {
                    $('.time-line').not('.animated').each(function() {
                        if ($(window).scrollTop() >= $(this).offset().top - $(window).height() * 0.5) {
                            $(this).addClass('animated').find('.timer').countTo();
                        }
                    });
                }
            });

            $(window).on('resize', function() {

                var winWidth = window.innerWidth;
                columnNumb = 1;
                var attr_col = $('#portfolio').attr('data-col');

                if (winWidth >= 1466) {

                    $('#portfolio-wrap').css({
                        width: 970 + 'px'
                    });
                    $('#portfolio-wrap.no-gutter').css({
                        width: 970 + 'px'
                    });
                    $('#portfolio-wrap.full-width').css({
                        width: 100 + '%'
                    });
                    var portfolioWidth = $('#portfolio-wrap').width();
                    var postWidth;
                    if (typeof attr_col !== typeof undefined && attr_col !== false) {
                        columnNumb = $('#portfolio').attr('data-col');
                    } else columnNumb = 5;

                    postWidth = Math.floor(portfolioWidth / columnNumb);
                    $container.find('.grid-item').each(function() {
                        $('.grid-item').css({
                            width: postWidth - 20 + 'px',
                            height: postWidth * 0.75 - 20 + 'px',
                            margin: 10 + 'px'
                        });
                        $('.no-gutter .grid-item').css({
                            width: postWidth + 'px',
                            height: postWidth * 0.75 + 'px',
                            margin: 0 + 'px'
                        });
                        $('.grid-item.wide').css({
                            width: postWidth * 2 - 20 + 'px'
                        });
                        $('.no-gutter .grid-item.wide').css({
                            width: postWidth * 2 + 'px'
                        });
                        $('.grid-item.tall').css({
                            height: postWidth * 1.5 - 20 + 'px'
                        });
                        $('.no-gutter .grid-item.tall').css({
                            height: postWidth * 1.5 + 'px'
                        });
                        $('.grid-item.wide-tall').css({
                            width: postWidth * 2 - 20 + 'px',
                            height: postWidth * 1.5 - 20 + 'px'
                        });
                        $('.no-gutter .grid-item.wide-tall').css({
                            width: postWidth * 2 + 'px',
                            height: postWidth * 1.5 + 'px'
                        });
                    });


                } else if (winWidth >= 1024) {

                    $('#portfolio-wrap').css({
                        width: 970 + 'px'
                    });
                    $('#portfolio-wrap.no-gutter').css({
                        width: 970 + 'px'
                    });
                    $('#portfolio-wrap.full-width').css({
                        width: 100 + '%'
                    });
                    var portfolioWidth = $('#portfolio-wrap').width();

                    if (typeof attr_col !== typeof undefined && attr_col !== false) {
                        columnNumb = $('#portfolio').attr('data-col');
                    } else columnNumb = 3;

                    postWidth = Math.floor(portfolioWidth / columnNumb);
                    $container.find('.grid-item').each(function() {

                        $('.grid-item').css({
                            width: postWidth - 20 + 'px',
                            height: postWidth * 0.75 - 20 + 'px',
                            margin: 10 + 'px'
                        });
                        $('.no-gutter .grid-item').css({
                            width: postWidth + 'px',
                            height: postWidth * 0.75 + 'px',
                            margin: 0 + 'px'
                        });
                        $('.grid-item.wide').css({
                            width: postWidth * 2 - 20 + 'px'
                        });
                        $('.no-gutter .grid-item.wide').css({
                            width: postWidth * 2 + 'px'
                        });
                        $('.grid-item.tall').css({
                            height: postWidth * 1.5 - 20 + 'px'
                        });
                        $('.no-gutter .grid-item.tall').css({
                            height: postWidth * 1.5 + 'px'
                        });
                        $('.grid-item.wide-tall').css({
                            width: postWidth * 2 - 20 + 'px',
                            height: postWidth * 1.5 - 20 + 'px'
                        });
                        $('.no-gutter .grid-item.wide-tall').css({
                            width: postWidth * 2 + 'px',
                            height: postWidth * 1.5 + 'px'
                        });
                    });


                } else if (winWidth >= 768) {

                    $('#portfolio-wrap').css({
                        width: 100 + '%'
                    });
                    $('#portfolio-wrap.no-gutter').css({
                        width: 100 + '%'
                    });
                    var portfolioWidth = $('#portfolio-wrap').width();

                    if (typeof attr_col !== typeof undefined && attr_col !== false) {
                        columnNumb = $('#portfolio').attr('data-col');
                    } else columnNumb = 3;

                    postWidth = Math.floor(portfolioWidth / columnNumb);
                    $container.find('.grid-item').each(function() {
                        $('.grid-item').css({
                            width: postWidth - 20 + 'px',
                            height: postWidth * 0.75 - 20 + 'px',
                            margin: 10 + 'px'
                        });
                        $('.no-gutter .grid-item').css({
                            width: postWidth + 'px',
                            height: postWidth * 0.75 + 'px',
                            margin: 0 + 'px'
                        });
                        $('.grid-item.wide').css({
                            width: postWidth * 2 - 20 + 'px'
                        });
                        $('.no-gutter .grid-item.wide').css({
                            width: postWidth * 2 + 'px'
                        });
                        $('.grid-item.tall').css({
                            height: postWidth * 1.5 - 20 + 'px'
                        });
                        $('.no-gutter .grid-item.tall').css({
                            height: postWidth * 1.5 + 'px'
                        });
                        $('.grid-item.wide-tall').css({
                            width: postWidth * 2 - 20 + 'px',
                            height: postWidth * 1.5 - 20 + 'px'
                        });
                        $('.no-gutter .grid-item.wide-tall').css({
                            width: postWidth * 2 + 'px',
                            height: postWidth * 1.5 + 'px'
                        });
                    });


                } else if (winWidth < 767 && winWidth > 481) {

                    $('#portfolio-wrap').css({
                        width: 100 + '%'
                    });
                    $('#portfolio-wrap.no-gutter').css({
                        width: 100 + '%'
                    });

                    var portfolioWidth = $('#portfolio-wrap').width(),

                        columnNumb = 2;
                    postWidth = Math.floor(portfolioWidth / columnNumb);
                    $container.find('.grid-item').each(function() {
                        $('.grid-item').css({
                            width: postWidth - 20 + 'px',
                            height: postWidth * 0.75 - 20 + 'px',
                            margin: 10 + 'px'
                        });
                        $('.no-gutter .grid-item').css({
                            width: postWidth + 'px',
                            height: postWidth * 0.75 + 'px',
                            margin: 0 + 'px'
                        });
                        $('.grid-item.wide').css({
                            width: postWidth - 20 + 'px'
                        });
                        $('.no-gutter .grid-item.wide').css({
                            width: postWidth + 'px'
                        });
                        $('.grid-item.tall').css({
                            height: postWidth * 1.5 - 20 + 'px'
                        });
                        $('.no-gutter .grid-item.tall').css({
                            height: postWidth * 1.5 + 'px'
                        });
                        $('.grid-item.wide-tall').css({
                            width: postWidth - 20 + 'px',
                            height: postWidth * 0.75 - 20 + 'px'
                        });
                        $('.no-gutter .grid-item.wide-tall').css({
                            width: postWidth + 'px',
                            height: postWidth * 0.75 + 'px'
                        });
                    });


                } else if (winWidth <= 480) {
                    $('#portfolio-wrap').css({
                        width: 100 + '%'
                    });
                    $('#portfolio-wrap.no-gutter').css({
                        width: 100 + '%'
                    });

                    var portfolioWidth = $('#portfolio-wrap').width(),

                        columnNumb = 1;
                    postWidth = Math.floor(portfolioWidth / columnNumb);
                    $container.find('.grid-item').each(function() {
                        $('.grid-item').css({
                            width: postWidth - 40 + 'px',
                            height: postWidth * 0.75 - 40 + 'px',
                            margin: 20 + 'px'
                        });
                        $('.no-gutter .grid-item').css({
                            width: postWidth + 'px',
                            height: postWidth * 0.75 + 'px',
                            margin: 0 + 'px'
                        });
                        $('.grid-item.wide').css({
                            width: postWidth - 40 + 'px'
                        });
                        $('.no-gutter .grid-item.wide').css({
                            width: postWidth + 'px'
                        });
                        $('.grid-item.tall').css({
                            height: postWidth * 1.5 - 40 + 'px'
                        });
                        $('.no-gutter .grid-item.tall').css({
                            height: postWidth * 1.5 + 'px'
                        });
                        $('.grid-item.wide-tall').css({
                            width: postWidth - 40 + 'px',
                            height: postWidth * 0.75 - 40 + 'px'
                        });
                        $('.no-gutter .grid-item.wide-tall').css({
                            width: postWidth + 'px',
                            height: postWidth * 0.75 + 'px'
                        });
                    });

                }
                return columnNumb;


            }).resize();

            $("#all").click();


        }
    } /*End MasonryPortfolio*/

    function f() {
        var dt = 0;
        dt.length && (768 > B ? ct.each(function() {
            var t = $(this);
            t.width(t.data("percent"));
        }) : dt.waypoint(function() {
            pt.each(function() {
                var t = $(this);
                t.width(t.data("percent"));
            });
        }, {
            offset: "60%"
        }));
    }

    function v() {
        if (!isMobile) {
            skrollr.init({
                forceHeight: !1,
                smoothScrolling: !1
            });
        }
    }
    /* End Blog Parallax */

    /* Responsive Menu */
    if( $(window).width() < 992 ) {

        $('.ham-wrap').on('click', function() {
            if ($('.navigation').hasClass('slide-menu')) {
                $('.navigation').removeClass('slide-menu');

                $(this).removeClass('active');
            } else {
                $('.navigation').addClass('slide-menu');
                $(this).addClass('active');
                $('.header-section').addClass('responsive');
            }

            return false;
        });

        $('.close-menu, .layer-dark').on('click', function() {
            $('.navigation').removeClass('slide-menu');
            $('.header-section').removeClass('responsive');
            $('.close-menu').removeClass('active');
            $('body').removeClass('act');

            return false;
        });

        $( '#dl-menu' ).dlmenu({
            animationClasses : { classin : 'dl-animate-in-2', classout : 'dl-animate-out-2' }
        }); 

    } 

    /* Map */
    function g() {
        var t, a;
        $("#map-section").length && (t = $("#map-opener"), a = $("#map-section"), t.on("click", function() {
            a.toggleClass("map-opened");
        }));
    }
    /* End Map */

    /* Map */
    function initialize(obj) {
        var lat = $('#' + obj).attr("data-lat");
        var lng = $('#' + obj).attr("data-lng");
        var contentString = $('#' + obj).attr("data-string");
        var myLatlng = new google.maps.LatLng(lat, lng);
        var map, marker, infowindow;
        var image = 'images/pin.html';
        var zoomLevel = parseInt($('#' + obj).attr("data-zoom"), 10);

        var styles = [{
            "featureType": "landscape",
            "stylers": [{
                "saturation": -100
            }, {
                "lightness": 65
            }, {
                "visibility": "on"
            }]
        }, {
            "featureType": "poi",
            "stylers": [{
                "saturation": -100
            }, {
                "lightness": 51
            }, {
                "visibility": "simplified"
            }]
        }, {
            "featureType": "road.highway",
            "stylers": [{
                "saturation": -100
            }, {
                "visibility": "simplified"
            }]
        }, {
            "featureType": "road.arterial",
            "stylers": [{
                "saturation": -100
            }, {
                "lightness": 30
            }, {
                "visibility": "on"
            }]
        }, {
            "featureType": "road.local",
            "stylers": [{
                "saturation": -100
            }, {
                "lightness": 40
            }, {
                "visibility": "on"
            }]
        }, {
            "featureType": "transit",
            "stylers": [{
                "saturation": -100
            }, {
                "visibility": "simplified"
            }]
        }, {
            "featureType": "administrative.province",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "water",
            "elementType": "labels",
            "stylers": [{
                "visibility": "on"
            }, {
                "lightness": -25
            }, {
                "saturation": -100
            }]
        }, {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [{
                "hue": "#ffff00"
            }, {
                "lightness": -25
            }, {
                "saturation": -97
            }]
        }];

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

        map = new google.maps.Map(document.getElementById(obj), mapOptions);

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

    /* Event - Window Scroll */
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();
        var height = $(window).height();



        if ($(this).scrollTop() >= 50) {
            // If page is scrolled more than 50px
            $('#back-to-top').fadeIn(200); // Fade in the arrow
        } else {
            $('#back-to-top').fadeOut(200); // Else fade out the arrow
        }

    });
    /* Event - Window Scroll /- */

    /* Event - Window click */
    $(document).on('click', ".ham-wrap", function(e) {

        /*header animation*/
        if($('header').hasClass( 'header-animate')){
            $('.navigation').css('overflow','hidden');
            $('header').removeClass( 'header-animate');
            $(".dl-menu").on("transitionend webkitTransitionendEnd oTransitionendEnd MSTransitionendEnd", function(){ 
                $('.navigation').css('overflow','hidden');
            });
        }
        else {
            $('header').addClass( 'header-animate');
            $(".dl-menu").on("transitionend webkitTransitionendEnd oTransitionendEnd MSTransitionendEnd", function(){ 
                $('.navigation').css('overflow','visible');
            });
        }
        /*header animation*/
    });

    if ($('#load_more').length) {
        $(document).on('click', "#load_more", function(e) {
            $('#load_more').remove();
            $('.grid-item').removeClass('hidden');
            MasonryPortfolio();
        });

    }

    /* Event - Window click /- */

    /* Event - Document Ready /- */
    $(document).ready(function($) {
        var scroll = $(window).scrollTop();
        var height = $(window).height();
        /* Window Hight Set to Elements /- */
        $(".full-height").css("height", height + "px");
        $('.navbar-nav li a, .logo-block a').on('click', function(event) {
            var anchor = $(this);

            if (anchor == 'undefined' || anchor == null || anchor.attr('href') == '#') {
                return;
            }
            if (anchor.attr('href').indexOf('#') === 0) {
                if ($(anchor.attr('href')).length) {
                    $('html, body').stop().animate({
                        scrollTop: $(anchor.attr('href')).offset().top - 20
                    }, 1500, 'easeInOutExpo');
                }
                event.preventDefault();
            }
        });

        $('.goto-next a').on('click', function(event) {
            var anchor = $(this);

            if (anchor == 'undefined' || anchor == null || anchor.attr('href') == '#') {
                return;
            }
            if (anchor.attr('href').indexOf('#') === 0) {
                if ($(anchor.attr('href')).length) {
                    $('html, body').stop().animate({
                        scrollTop: $(anchor.attr('href')).offset().top - 20
                    }, 1500, 'easeInOutExpo');
                }
                event.preventDefault();
            }
        });

        /*****Tabs*****/
        var tpl_tab_height;
        $(".tpl-minimal-tabs > li > a").click(function() {

            if (!($(this).parent("li").hasClass("active"))) {
                tpl_tab_height = $(".tpl-minimal-tabs-cont > .tab-pane").filter($(this).attr("href")).height();
                $(".tpl-minimal-tabs-cont").animate({
                    height: tpl_tab_height
                }, function() {
                    $(".tpl-minimal-tabs-cont").css("height", "auto");
                });

            }

        });


        /***** Background banner *****/

        $('.bg-homepage-img').each(function() {
            var bgSrc = $(this).attr('src');
            $(this).parent().addClass('background-homepage').css({
                'background-image': 'url(' + bgSrc + ')'
            });
            $(this).hide();
        });

        $('.bg-banner-img').each(function() {
            var bgSrc = $(this).attr('src');
            $(this).parent().addClass('background-banner').css({
                'background-image': 'url(' + bgSrc + ')'
            });
            $(this).hide();
        });

        $('.bg-blog-img').each(function() {
            var bgSrc = $(this).attr('src');
            $(this).parent().addClass('background-block').css({
                'background-image': 'url(' + bgSrc + ')'
            });
            $(this).hide();
        });

        $('.bg-item-img').each(function() {
            var bgSrc = $(this).attr('src');
            $(this).parent().addClass('background-item').css({
                'background-image': 'url(' + bgSrc + ')'
            });
            $(this).hide();
        });


        /*****Animition Plugin*****/


        if ($(".animsition").length) {
            $(".animsition").animsition({
                inClass: 'fade-in-down',
                outClass: 'fade-out-up',
                inDuration: 600,
                outDuration: 800,
                linkElement: '.animsition-link',
                // e.g. linkElement   :   'a:not([target="_blank"]):not([href^=#])'
                loading: true,
                loadingParentElement: 'body',
                loadingClass: 'animsition-loading',
                unSupportCss: ['animation-duration',
                    '-webkit-animation-duration',
                    '-o-animation-duration'
                ],
                overlay: false,

                overlayClass: 'animsition-overlay-slide',
                overlayParentElement: 'body'
            });
        }
        /* Window Hight Set to Elements /- */
        var window_height = $(window).height();
        var window_width = $(window).width();

        $("#back-to-top").on("click", function() {
            // When arrow is clicked
            $('body,html').animate({
                scrollTop: 0 // Scroll to top of body
            }, 800);
        });

        $('.dial').each(function() {
            var $this = $(this);
            var myVal = $(this).data("value");

            $this.appear(function() {
                $this.knob({});
                $({
                    value: 0
                }).animate({
                    value: myVal
                }, {
                    duration: 2000,
                    easing: 'swing',
                    step: function() {
                        $this.val(Math.ceil(this.value)).trigger('change');
                    }
                });
            });
        });

        //$('.parallax-window').parallax({imageSrc: 'images/blog/blog-thumb-1.jpg'});       

        /* ## Dropdown Menu ## */
        $('.responsive-caret').on('click', function() {
            var li = $(this).parent();
            if (li.hasClass('dm-active') || li.find('.dm-active').length !== 0 || li.find('.dropdown-menu').is(':visible') || li.find('.mom_custom_mega').is(':visible')) {
                li.removeClass('dm-active');
                li.children('.dropdown-menu').slideUp();
                if (li.find('.mom_mega_wrap').length === 0) {
                    li.find('.dropdown-menu').slideUp();
                }
                if (li.hasClass('mom_default_menu_item') || li.find('.cats-mega-wrap').length !== 0) {
                    li.find('.dropdown-menu').slideUp();
                    li.find('.mom-megamenu').slideUp();
                    li.find('.sub-mom-megamenu').slideUp();
                    li.find('.sub-mom-megamenu2').slideUp();
                }
                li.find('.dm-active').removeClass('dm-active');
                if (li.find('.mom_custom_mega').length !== 0) {
                    li.find('.mom_custom_mega').slideUp();
                }

            } else {
                $('.device-menu').find('.dm-active').removeClass('dm-active');
                li.addClass('dm-active');
                li.children('.dropdown-menu').slideDown();
                if (li.find('.cats-mega-wrap').length !== 0) {
                    li.find('.dropdown-menu').slideDown();
                    li.find('.mom-megamenu').slideDown();
                    li.find('.sub-mom-megamenu').slideDown();
                    li.find('.sub-mom-megamenu2').slideDown();
                }
                if (li.find('.mom_custom_mega').length !== 0) {
                    li.find('.mom_custom_mega').slideDown();
                }

            }
        });

        /* Slide in down portfolio */
        $("[id*='workimg-']").on('click', function() {
            $(".details").css("display", "none");
            $("[id*='details-" + $(this).attr("id").split("-")[1] + "']").css("display", "none");
            $("[id='details-" + $(this).attr("id").split("-")[1] + "']").slideDown(900).delay(100);
            $("[id='details-" + $(this).attr("id").split("-")[1] + "']").css("display", "block");
            $('html, body').stop().animate({
                scrollTop: $("#work-section").offset().top - 72
            }, 500, 'easeInOutExpo');
        });

        $(".dtl-box-close").on('click', function() {
            $(this).parent(".details").slideUp(300).delay(800);
        });

        /* Team Section */
        if ($("#team-carousel").length) {
            $("#team-carousel").owlCarousel({
                autoplay: true,
                touchDrag: true,
                mouseDrag: true,
                loop: true,
                margin: 10,
                nav: false,
                dots: true,
                responsive: {
                    0: {
                        items: 1
                    },
                    480: {
                        items: 2
                    },
                    640: {
                        items: 3
                    },
                    1000: {
                        items: 4
                    }
                }
            });
        }

        $("#owl-demo").owlCarousel({

            autoPlay: 3000, //Set AutoPlay to 3 seconds

            items: 3,
            itemsDesktop: [1199, 3],
            itemsDesktopSmall: [979, 3]

        });

        /* Testimonial Section */
        if ($("#testimonial-slider").length) {
            $("#testimonial-slider").owlCarousel({
                autoplay: true,
                touchDrag: true,
                mouseDrag: true,
                loop: true,
                margin: 10,
                nav: true,
                dots: true,
                responsive: {
                    0: {
                        items: 1
                    }
                }
            });
        }

        /* partner Section */
        if ($("#client").length) {
            $("#client").owlCarousel({
                autoplay: true,
                touchDrag: true,
                mouseDrag: true,
                loop: true,
                margin: 10,
                nav: false,
                dots: true,
                responsive: {
                    0: {
                        items: 1
                    },
                    480: {
                        items: 2
                    },
                    640: {
                        items: 3
                    },
                    1000: {
                        items: 4
                    }
                }
            });
        }

        // filter items on button click
        $('.portfolio-categories').on('click', 'li', function() {
            var filterValue = $(this).attr('data-filter');
            $('#work-masonry').isotope({
                filter: filterValue
            });
        });

        /*$('#equal-three-column').isotope({
            filter: '*',
            itemSelector: '.grid-item',
            layoutMode: 'fitRows',
            gutter: 9
        });*/

        // filter items on button click
        $('.portfolio-categories').on('click', 'li', function() {
            var filterValue = $(this).attr('data-filter');
            $('#equal-three-column').isotope({
                filter: filterValue
            });
        });

        $('.portfolio-categories li a').on('click', function(e) {
            $(".portfolio-categories li a").removeClass('active');
            $(this).addClass('active');
        });

        /* Instafeed */
        if ($(".social-instafeeds").length) {
            $('.social-instafeeds').instagramLite({
                username: 'apieceofcake82',
                clientID: '199554eb34504658a4770d2859b5a583',
                urls: true,
                limit: 6,
                load_more: '.il-foodnetwork-load-more',
                success: function() {

                    /*console.log('The request was successful!');*/
                },
                error: function(errorCode, errorMessage) {

                    console.log('There was an error');

                    if (errorCode && errorMessage) {

                        alert(errorCode + ': ' + errorMessage);

                    }
                }
            });
        }

        /* Statistics Section */
        $('#statistics-section').each(function() {
            var $this = $(this);
            var myVal = $(this).data("value");
            $this.appear(function() {
                var statistics_item_count = 0;
                var statistics_count = 0;
                statistics_item_count = $("[id*='statistics_count-']").length;

                for (var i = 1; i <= statistics_item_count; i++) {
                    statistics_count = $("[id*='statistics_count-" + i + "']").attr("data-statistics_percent");
                    $("[id*='statistics_count-" + i + "']").animateNumber({
                        number: statistics_count
                    }, 2000);
                }
            });
            $this.appear(function() {
                var statistics_item_count = 0;
                var statistics_count = 0;
                statistics_item_count = $("[id*='statistics_count-']").length;

                for (var i = 1; i <= statistics_item_count; i++) {
                    statistics_count = $("[id*='statistics_count-" + i + "']").attr("data-statistics_percent");
                    $("[id*='statistics_count-" + i + "']").animateNumber({
                        number: statistics_count
                    }, 2000);
                }
            });
        });

        /* Skills Section */
        $('.skill-section').each(function() {
            var $this = $(this);
            var myVal = $(this).data("value");

            $this.appear(function() {
                var skill_type1_item_count = 0;
                var skill_type1_count = 0;
                skill_type1_item_count = $("[id*='skill_type1_count-']").length;

                var skill_bar_count = 0;
                var skills_bar_count = 0;
                skill_bar_count = $("[id*='skill_bar1_count-']").length;

                for (var i = 1; i <= skill_type1_item_count; i++) {
                    skill_type1_count = $("[id*='skill_type1_count-" + i + "']").attr("data-skill_percent");
                    $("[id*='skill_type1_count-" + i + "']").animateNumber({
                        number: skill_type1_count
                    }, 4000);
                }

                for (var j = 1; j <= skill_bar_count; j++) {
                    skills_bar_count = $("[id*='skill_type1_count-" + j + "']").attr("data-skill_percent");
                    $("[id*='skill_bar1_count-" + j + "']").css({
                        'width': skills_bar_count + '%'
                    });
                    $("[id*='skill_type1_count-" + j + "']").css({
                        'width': skills_bar_count + '%'
                    });
                }
            });
        });

        /* PreetyPhoto Gallery Lightbox */
        $("a[data-gal^='prettyPhoto']").prettyPhoto();
        $("#portfolio:first a[data-gal^='prettyPhoto']").prettyPhoto({
            animation_speed: 'normal',
            theme: 'light_square',
            slideshow: 3000,
            autoplay_slideshow: false
        });
        $("#portfolio:gt(0) a[data-gal^='prettyPhoto']").prettyPhoto({
            animation_speed: 'fast',
            slideshow: 10000,
            hideflash: true
        });

        if ($('#map-canvas-contact').length == 1) {
            initialize('map-canvas-contact');
        }

        /* parallax  */
        var parallax = document.querySelectorAll(".parallax"),
            speed = 0.2;

        window.onscroll = function() {
            [].slice.call(parallax).forEach(function(el, i) {

                var windowYOffset = window.pageYOffset,
                    elBackgrounPos = "0 " + (windowYOffset * speed) + "px";

                el.style.backgroundPosition = elBackgrounPos;

            });
        };

        /* Twitter  */
        $('#tweecool').tweecool({
            username: 'jqueryscript',
            limit: 5,
            profile_image: true,
            show_time: true,
            show_media: false,
            show_media_size: 'thumb'
        });

        /* Lightbox for Highlights Gallery  */
        $('.video-popup-block .slide-title').magnificPopup({
            delegate: 'a',
            /*type: 'image',*/
            type: 'iframe',
            tLoading: 'Loading image #%curr%...',
            /*mainClass: 'mfp-img-mobile',*/
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false,
            gallery: {
                enabled: true,
                navigateByImgClick: true,
                preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
            },
            image: {
                tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
            }
        });

        $('#program').carousel({
            interval: 6000
        });

        /* Quick Contact Form */
        $("#btn_submit").on("click", function(event) {
            event.preventDefault();
            var mydata = $("form").serialize();

            $.ajax({
                type: "POST",
                dataType: "json",
                url: "contact.php",
                data: mydata,
                success: function(data) {

                    if (data["type"] == "error") {
                        $("#alert-msg").html(data["msg"]);
                        $("#alert-msg").removeClass("alert-msg-success");
                        $("#alert-msg").addClass("alert-msg-failure");
                        $("#alert-msg").show();
                    } else {
                        $("#alert-msg").html(data["msg"]);
                        $("#alert-msg").addClass("alert-msg-success");
                        $("#alert-msg").removeClass("alert-msg-failure");
                        $("#input_name").val("");
                        $("#input_email").val("");
                        $("#textarea_message").val("");
                        $("#alert-msg").show();
                    }
                },
                error: function(xhr, textStatus, errorThrown) {
                    //alert(textStatus);
                }
            });
            return false;
            $('#contact-form').attr("action", "saveQuery").submit();
        });

        /* Ticker */
        var words = $('.words')
        if (words.length == 1) {
            words.on('switched', function() {
                var timeout = setTimeout(function() {
                    animateWords(words);
                }, 3000);
                words.data('timeout', timeout);
            }).trigger('switched');
        }

        function animateWords(words) {
            var activeWord = words.find('.is-active');
            var newWord = activeWord.next();
            if (newWord.length == 0)
                newWord = words.find('.word').first();
            newWord.css({
                display: 'block',
                position: 'absolute',
                top: 0,
                left: 0,
                opacity: 0
            });
            var newWordWidth = newWord.find('div').outerWidth();
            newWord.find('div').css({
                width: 0
            });
            var tl = new TimelineLite();
            tl.pause();
            tl.to(activeWord.find('div'), 0.5, {
                width: 0,
                ease: Power3.easeInOut
            });
            tl.call(function() {
                activeWord.css({
                    opacity: 0
                });
                newWord.css({
                    opacity: 1
                });
            });
            tl.to(newWord.find('div'), 0.5, {
                width: newWordWidth,
                ease: Power3.easeInOut
            }, '+=0.1');
            tl.call(function() {
                activeWord.attr('style', '').removeClass('is-active');
                newWord.attr('style', '').addClass('is-active');
                activeWord.find('div').attr('style', '');
                newWord.find('div').attr('style', '');
                newWord.closest('.words').trigger('switched');
            });
            tl.play();
        }

         MasonryPortfolio();
        var y, E = $(window);

        isMobile || screen.width < 768 ? (f(), v(), g()) : (y = new WOW({
            boxClass: "wow",
            animateClass: "animated",
            offset: 0,
            mobile: !1,
            live: !0
        }), (f(), v()), (function() {
            clearTimeout(Z), Z = setTimeout(function() {
                skrollr.init({
                    forceHeight: !1,
                    smoothScrolling: !1
                }).refresh();
            }, 1200);
        }), g());
        
        /* Flex Slider */
        $('.slider6 .flexslider').flexslider({
            animation: "fade",
            animationSpeed: 3000,
            slideshowSpeed: 6000,
            controlNav: false,
            directionNav: false,
        });

        /* Flex Slider */
        $('.home2 .flexslider').flexslider({
            animation: "fade",
            animationSpeed: 3000,
            slideshowSpeed: 6000,
            controlNav: false,
            directionNav: false,
        });

        var $window = $(window),
            flexslider;

        // tiny helper function to add breakpoints
        function getGridSize() {
            return (window.innerWidth < 600) ? 2 :
                (window.innerWidth < 900) ? 3 : 4;
        }


        $window.load(function() {
            $('.flexslider').flexslider({
                animation: "slide",
                animationLoop: false,
                itemWidth: 210,
                itemMargin: 5,
                minItems: getGridSize(), // use function to pull in initial value
                maxItems: getGridSize() // use function to pull in initial value
            });
            $('.flex-prev, .flex-next').html('');
        });

        // check grid size on resize event
        $window.resize(function() {
            var gridSize = getGridSize(),
                vars;

            flexslider.vars.minItems = gridSize;
            flexslider.vars.maxItems = gridSize;
        });

    });
    /* document.ready /- */

    $('.modal-backdrop').remove();

    /* Event - Window Resize /- */
    $(window).resize(function() {
        /* Window Hight Set to Elements /- */
        var window_height = $(window).height();
        var window_width = $(window).width();
        $(".full-height").css("height", window_height + "px");
    });
    /* Event - Window Resize /- */

    var wow = new WOW({
        boxClass: 'wow', // animated element css class (default is wow)
        animateClass: 'animated', // animation css class (default is animated)
        offset: 0, // distance to the element when triggering the animation (default is 0)
        mobile: true, // trigger animations on mobile devices (default is true)
        live: true // act on asynchronously loaded content (default is true)
    });
    wow.init();

    if (!$('html').is('.ie6, .ie7, .ie8')) {
        $(window).load(function() {
            $("#site-loader").delay(1000).fadeOut("slow");

            $('.text-rotator').each(function() {

                var text_rotator_content = $(this).html();
                $(this).empty();
                $(this).html('<div class="rotator-wrap"></div>');
                var this_item = $(this).children('.rotator-wrap');
                var text_rotator_content_split = text_rotator_content.split(',');
                var item_size = text_rotator_content_split.length;
                nova_text_rotator(text_rotator_content_split, this_item, item_size);
            });

            function nova_text_rotator(item_array, this_item, item_size, my_index) {

                if (my_index == undefined)
                    var my_index = -1;

                my_index++;

                if (my_index < item_size) {

                    this_item.fadeOut(3000, function() {
                        this_item.html('<span>' + item_array[my_index] + '</span>');
                        this_item.fadeIn(3000);
                    });
                } else {
                    my_index = -1;
                }

                setTimeout(function() {
                    nova_text_rotator(item_array, this_item, item_size, my_index);
                }, 2000);
            }
        });
    } else {
        $("#site-loader").css('display', 'none');
    }
    $(document).on('click', ".vimeo a,.youtube a", function(e) {
        e.preventDefault();
        var videoLink = $(this).attr('href');
        var classeV = $(this).parent();
        var PlaceV = $(this).parent();
        if ($(this).parent().hasClass('youtube')) {
            $(this).parent().wrapAll('<div class="cntVid">');
            $(PlaceV).html('<iframe frameborder="0" height="333" src="' + videoLink + '?autoplay=1&showinfo=0" title="YouTube video player" width="547"></iframe>');
        } else {
            $(this).parent().wrapAll('<div class="cntVid">');
            $(PlaceV).html('<iframe src="' + videoLink + '?title=0&amp;byline=0&amp;portrait=0&amp;autoplay=1&amp;color=ffffff" width="500" height="281" frameborder="0"></iframe>');
        }
    });
})(jQuery, window, document);
