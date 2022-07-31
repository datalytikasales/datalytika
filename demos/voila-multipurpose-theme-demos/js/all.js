(function() {
    "use strict";

    /*================*/
    /* 01 - VARIABLES */
    /*================*/

    var swipers = [],
        winW, winH, winScr, $container, _isresponsive, xsPoint = 451,
        smPoint = 768,
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

    /***********************************/
    /*04 - WINDOW LOAD ON RESIZE */
    /**********************************/
    $(window).on('load resize', function() {
        
        // BANNERS - aboutUs4, aboutUs5, aboutUs6, agency
        wpc_add_img_bg('.wpc-start-item .wpc-img', '.wpc-start-item');
        wpc_add_img_bg('.wpc-start-banner-item .wpc-img', '.wpc-start-banner-item');
        // our team, team 2
        wpc_add_img_bg('.wpc-team-logo > img', '.wpc-team-logo');
        // INFO ITEMS - agency, business
        wpc_add_img_bg('.wpc-blog-start .wpc-img', '.wpc-blog-start');
        wpc_add_img_bg2('.wpc-info-block-img .wpc-img', '.wpc-info-block-img');
        wpc_add_img_bg2('.wpc-blog-slide-img img', '.wpc-blog-slide-img');
        wpc_add_img_bg('.rsm3-banner-bg .banner-img', '.rsm3-banner-bg');
        wpc_add_img_bg('.rsm4-banner-bg .banner-img', '.rsm4-banner-bg');
        wpc_add_img_bg('.rsm3-glry-item img', '.rsm3-glry-item');
        wpc_add_img_bg('.rsm-block-img .rsm-img', '.rsm-block-img');

        var $rsmBlock = $('.rsm-block-img');
        var $rsmBlockContent = $('.rsm-block-content');
        if ($(window).width() > 767) {
            $rsmBlock.height($rsmBlockContent.outerHeight(true));
        } else {
            $rsmBlock.height(300);
        }

        $('.wpc-blog-start').height($(window).height());

        if ($('.services-item').length) {
            // expression
            block_height('.services-item');
        }

        if ($('#map-canvas-contact').length === 1) {
            initialize('map-canvas-contact');
        }

        ///////////////////////

        blockInfoItem();
        block2InfoItem();
        buisnessInfoItem();
        helpInfoItem();
        full_page_img();
        photo7Height();

        // business
        wpc_add_img_bg('.wpc-bg-block > img', '.wpc-bg-block');
        wpc_add_img_bg2('.wpc-bg2-block  img', '.wpc-bg2-block');
        var $newsImg = $('.wpc-newsletter-img');
        var $newsInfo = $('.wpc-newsletter-info');
        $newsImg.height($newsInfo.outerHeight());

        // agency, business,
        var $imgBlockInfo = $('.wpc-2block-img');
        var $imgBlockInfoTo = $('.wpc-2block-info');
        var $imgBlockInfo2 = $('.wpc-2block-img2');
        var $imgBlockInfTo2 = $('.wpc-2block-info2');
        var $imgBlockBusiness = $('.wpc-business-img');
        var $imgBlockBusinessTo = $('.wpc-buisness-info');
        if (winW >= 992) {
            $imgBlockInfo.height($imgBlockInfoTo.height());
            $imgBlockBusiness.height($imgBlockBusinessTo.height());
            $imgBlockInfo2.height($imgBlockInfTo2.height() + 156);
        } else if (winW >= 768) {
            $imgBlockInfo.height('500');
            $imgBlockBusiness.height('500');
            $imgBlockInfo2.height('500');
        } else {
            $imgBlockInfo.height('300');
            $imgBlockBusiness.height('300');
            $imgBlockInfo2.height('300');
        }

        // aboutUs4
        if (winW >= 1200) {
            var imgHeight = $('.wpc-info-block-img2');
            imgHeight.height($('.wpc-info-block-text').outerHeight());
        }
        else if (winW >= 768) {
            var imgHeight = $('.wpc-info-block-img2');
            imgHeight.height('500');
        }
        else {
            var imgHeight = $('.wpc-info-block-img2');
            imgHeight.height('300');
        }

        heightPage();
        paralaxScroll();
        isotopeN();

        var $isotopFullHeight = $('.izotop-full-height');
        var $isotopFullCss = $('.izotop-full-height.gutt-col3 .item');
        if ($isotopFullHeight.length && $(window).width() >= 768) {

            $isotopFullHeight.height($(window).height() - 80).css('marginTop', '80px');
            $isotopFullCss.css({
                "marginTop": "0px",
                "marginBottom": "0px"
            })
        } else {
            $isotopFullHeight.css('marginTop', '80px');
            $isotopFullCss.css({
                "marginTop": "1%",
                "marginBottom": "1%"
            })
        }

    });

    /*============================*/
    /* 04 - WINDOW LOAD           */
    /*============================*/

    $(window).on('load', function() {
        
        initCharts();
        initSwiper();
        startLines();
        timeLines();
        startCharts();
        
        // add fix   paralax efect bug
        $(".parallax1").css("margin-top", 0);
        $(".parallax2").css("margin-bottom", 0);
        
    });

    isotopeN();

    // parallax efect

    if ($('.parallax-efect').length) {
        $('#birdsPic4').scrollingParallax({
            staticSpeed: .55,
            staticScrollLimit: false
        });
    }


    // multi slider

    if ($('#myContainer').length) {
        $('#myContainer').multiscroll({
            menu: '#menu',
            navigation: true,
            loopBottom: true,
            scrollingSpeed: 700,
            loopTop: true,
            sectionSelector: '.section',
            leftSelector: '.left',
            rightSelector: '.right',
        });
    }

    /***********************************/
    /*HEIGHT FOR ITEMS                 */
    /**********************************/
    function blockInfoItem() {
        var $blockItem = $('.wpc-2block-info-item');
        if ($blockItem.length) {
            if (winW > 600) {
                block_height($blockItem);
            } else {
                $blockItem.height('auto');
            }

        }
    }
    function block2InfoItem() {
        var $blockItem2 = $('.wpc-2block-info2-item');
        if ($blockItem2.length) {
            if (winW > 600) {
                block_height($blockItem2);
            } else {
                $blockItem2.height('auto');
            }

        }
    }
    function buisnessInfoItem() {
        var $businessItem = $('.wpc-buisness-info-item');
        if ($businessItem.length) {
            if (winW > 600) {
                block_height($businessItem);
            } else {
                $businessItem.height('auto');
            }
        }
    }
    function helpInfoItem() {
        var $helpItem = $('.wpc-help__item');
        if ($helpItem.length) {
            if (winW > 991) {
                block_height($helpItem);
            } else {
                $helpItem.height('auto');
            }

        }
    }

    /***********************************/
    /*HEIGHT FOR PHOTO7 SLIDER        */
    /**********************************/
    function photo7Height() {
        $('.wpc-photo7 .swiper-wrapper, .wpc-photo7 .swiper-slide').height($(window).height() - 144);
        $('.wpc-photo7').height($(window).height() - 144).css({
            "marginTop": "80px",
            "marginBottom": "64px"
        });
    }
    
    /***********************************/
    /*05 - WINDOW RESIZE               */
    /**********************************/
    function resizeCall() {
        pageCalculations();

        var swiper_container = $('.swiper-container[data-slides-per-view="responsive"]');

        for (var i = swiper_container.length - 1; i >= 0; i--) {

            var $th = $(swiper_container[i]);
            var xsValue = parseInt($th.attr('data-xs-slides'), 10);
            var smValue = parseInt($th.attr('data-sm-slides'), 10);
            var mdValue = parseInt($th.attr('data-md-slides'), 10);
            var lgValue = parseInt($th.attr('data-lg-slides'), 10);
            // var currentSwiper = swipers[$th.attr('init-attr')];
            var newSlideNumber = updateSlidesPerView(xsValue, smValue, mdValue, lgValue);
            // currentSwiper.params.slidesPerView = newSlideNumber;
            // currentSwiper.reInit();

        }

        var $rowSize = $('.wpc-row-size');
        if ($(window).width() < 993) {
            $rowSize.hide();
            $('.izotope-container-js').parent().removeClass().addClass('nogutt-col3');
        } else {
            $rowSize.show();
        }
    }

    $(window).on('resize', function() {
        heightPage();
        resizeCall();
    });

    window.addEventListener("orientationchange", function() {
        resizeCall();
    }, false);


    /*=================================*/
    /* 06 - SWIPER SLIDER */
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

            var verticalHeight = parseInt($t.attr('data-height'), 10);

            var autoPlayVar = parseInt($t.attr('data-autoplay'), 10);
            var mode = $t.attr('data-mode');
            var centerVar = parseInt($t.attr('data-center'), 10);
            var simVar = ($t.closest('.circle-description-slide-box').length) ? false : true;

            var slidesPerViewVar = $t.attr('data-slides-per-view');
            if (slidesPerViewVar === 'responsive') {
                slidesPerViewVar = updateSlidesPerView($t);
            } else if (slidesPerViewVar === 'auto') {
                slidesPerViewVar = 'auto'
            } else {
                slidesPerViewVar = parseInt(slidesPerViewVar, 10);
            }

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
                calculateHeight: (verticalHeight === 0) ? false : true,
                simulateTouch: simVar,
                centeredSlides: centerVar,
                roundLengths: true,
                loopedSlides: 4,
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

            swipers['swiper-' + index].reInit();
            if (!centerVar) {
                if ($t.attr('data-slides-per-view') === 'responsive') {
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
        if (winW >= addPoint) return parseInt($(swiperContainer).attr('data-add-slides'), 10);
        else if (winW >= lgPoint) return parseInt($(swiperContainer).attr('data-lg-slides'), 10);
        else if (winW >= mdPoint) return parseInt($(swiperContainer).attr('data-md-slides'), 10);
        else if (winW >= smPoint) return parseInt($(swiperContainer).attr('data-sm-slides'), 10);
        else return parseInt($(swiperContainer).attr('data-xs-slides'), 10);
    }


    /***********************************/
    /*07 - WINDOW SCROLL               */
    /**********************************/

    function paralaxScroll() {
        $(window).on('scroll', function() {
            
            // parallax effect
            var $paralax1 = $(".parallax1");
            var $paralax2 = $(".parallax2");

            if ($(window).width() > 768 && $('.parallax-efect').length ) {
         
                if ($(window).scrollTop() >= 20) {
                    $paralax1.css("margin-top", ($(window).scrollTop() / 5))
                    $paralax2.css("margin-bottom", ($(window).scrollTop() / 2))
                    console.log('test');
                } else {
                    $paralax1.css("margin-top", (0))
                    $paralax2.css("margin-bottom", (0))
                }
            } else {
                $paralax1.css("margin-top", (0))
                $paralax2.css("margin-bottom", (0))
            }

            if ($(window).scrollTop() < 20) {
                $paralax1.css("margin-top", (0))
                $paralax2.css("margin-bottom", (0))
            }
        })
    }



    $(window).on('scroll', function() {
        timeLines();
        startLines();
        processLines();
        startCharts();
        staticMenuScroll();

        var $header = $('header');

        if ($(this).scrollTop() >= 80) {
            $header.addClass('scrol');
            $header.addClass('fix');
            $('.black-menu .nav-menu-icon a').addClass('black');
            $('.black-menu .logo a').css('color', '#000');

        } else {
            $('.black-menu .logo a').css('color', '#fff');
            $header.removeClass('scrol');
            $header.removeClass('fix');
            $('.black-menu .nav-menu-icon a').removeClass('black');
        }

        var margRight = ($(window).width() - $('.container').innerWidth()) / 2;
        var margTop = $header.height();

        if ($(window).width() > 992) {
            if ($(window).scrollTop() >= $('.top-baner.half-height').height()) {
                $('.fixed-detail-panel').addClass('fix').css({
                    "right": margRight,
                    "margin-top": margTop
                });
            } else {
                $('.fixed-detail-panel').removeClass('fix').css({
                    "right": "0",
                    "margin-top": "auto"
                });
            }
        }
    });


    /***********************************/
    /*MOBILE MENU                      */
    /**********************************/
    $('.u-header').on('click', 'a[href*="#"]:not([href="#"])', function() {
        if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });

    var $first_child_link = $('.menu-item-has-children > a').append('<span class="fa fa-angle-down"></span>');

    $first_child_link.find('span').on('click', function(e) {
        $(this).closest('li').toggleClass('active');
        e.preventDefault();
    });

    $('.transpar-full-menu-icon a').on('click', function() {
        var $nav = $('nav');
        if ($nav.hasClass('active')) {
            $nav.removeClass('active');
        } else {
            $nav.addClass('active');
        }
        return false;
    })

    $('.u-header__navigation').on("click", "li > a > span", function() {
        var thisItem = $(this).parent('a'); 
        var thisParent = $(thisItem).parent('li');
        var siblings = $(thisItem).siblings('ul');
        if ($(siblings).length > 0 && $(siblings).css('display') === 'none') {
            $(siblings).slideDown(400, function(){});
            $(thisParent).addClass('active').siblings('li').removeClass('active').children('ul').slideUp(400, function(){});
               
        }
        else {
            $(siblings).slideUp(400, function(){
                console.log('up');
            });
            $(thisParent).removeClass('active');               
        }
        return false;
    });

    $('.u-header__nav-icon a').on('click', function() {
        var $nav = $('nav');
        if ($(window).width() < 992) {
            $('html').toggleClass('overflow-all');
            if ($nav.hasClass('slide-menu')) {
                $nav.removeClass('slide-menu');
                $('header').removeClass('open');
                $(this).parent().removeClass('active'); 
            }
            else {
                $nav.addClass('slide-menu');
                $('header').addClass('open');
                $(this).parent().addClass('active');
            }
        }
        else {
            if ($nav.hasClass('slide-menu')) {
                $nav.removeClass('slide-menu');
                $(this).parent().removeClass('active');
            }
            else {
                $nav.addClass('slide-menu');
                $(this).parent().addClass('active');
            }
        }
        return false;
    });

    if ($(window).width() < 992) {
        $('.menu > ul > li > a > .fa').on('click', function() {
            if ($(this).parent().parent().find('.dropmenu').hasClass('slidemenu')) {
                $(this).parent().parent().find('.dropmenu').removeClass('slidemenu');
            } else {
                $('.menu > ul > li > a').parent().parent().find('.dropmenu').removeClass('slidemenu');
                $(this).parent().parent().find('.dropmenu').addClass('slidemenu');
            }
            return false;
        });

        $('.dropmenu li').on('click', function(e) {
            // body...
            $(this).find(' > ul').toggle()
            $('.menu ul > li > ul > li > ul.right-to-left-menu').css('right', '0');
        })

        $('.submenu').on('click', function() {
            if ($(this).parent().find('ul').hasClass('slidemenu')) {
                $(this).parent().find('ul').removeClass('slidemenu');
            } else {
                $('.submenu').parent().find('ul').removeClass('slidemenu');
                $(this).parent().find('ul').addClass('slidemenu');
            }

            return false;
        });
    }

    $('.second-menu').on('click', function() {
        $('.right-menu').addClass('slides');
        $('.close-menu').addClass('active');
        $('body').addClass('act');

        return false;
    });

    $('.close-menu, .layer-dark').on('click', function() {
        $('.right-menu').removeClass('slides');
        $('.close-menu').removeClass('active');
        $('body').removeClass('act');

        return false;
    });

    $('.intro-scroll-down').on('click', function() {
        $('body, html').animate({
            'scrollTop': $('.full-width').offset().top
        });
    });


    /*=================================*/
    /*BACKGROUND IMAGE                 */
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

    ///////////////////////////////
    // rating
    ///////////////////////////////
    $('.wpc-row-size a').on('click', function(e) {
        e.preventDefault();
        var that = $(this);
        var atr = that.attr('data-row');
        var container = $('.izotope-container');
        var $container = $('.izotope-container');

        if (that.hasClass('activbut')) {
            return false;
        } else {
            that.siblings().removeClass('activbut')
            that.addClass('activbut')
            container.parent().removeClass().addClass(atr);


            $container.isotope();

        }
    })

    /*=================================*/
    /* SCROLL TO SECTION               */
    /*=================================*/

    var scrolSection = $('.scroll-section nav ul li a');

    scrolSection.on('click', function(e) {
        var el = $(this).attr('href');
        $('html,body').animate({
            scrollTop: $(el).offset().top - 100
        }, 1000);
        $('body').removeClass('.fade-out');
        return false;
    });


    /***********************************/
    /*DROPDOWN LIST                    */
    /**********************************/

    $('.drop').on("click", function() {
        var $this = $(this);
        if ($('.drop-list').hasClass('act')) {
            $this.find('.drop-list').removeClass('act');
            $this.find('span').slideUp(300);
        } else {
            $('.drop span').slideUp(300);
            $this.find('.drop-list').addClass('act');

            $this.find('span').slideDown(300);
        }
        return false;
    });

    $('.filter-drop .but').on("click", function() {
        $(this).parent().parent().find('.change').text($(this).text());
        $('.drop').find('span').slideUp(300);
    });


    /***********************************/
    /*TABS FAQ                         */
    /**********************************/

    var tabFinish = 0;
    $('.nav-tab-item').on('click', function() {
        var $t = $(this);
        if (tabFinish || $t.hasClass('active')) return false;
        tabFinish = 1;
        $t.closest('.nav-tab').find('.nav-tab-item').removeClass('active');
        $t.addClass('active');
        var index = $t.parent().parent().find('.nav-tab-item').index(this);
        $t.closest('.tab-wrapper').find('.tab-info:visible').fadeOut(500, function() {
            $t.closest('.tab-wrapper').find('.tab-info').eq(index).fadeIn(500, function() {
                tabFinish = 0;
            });
        });

        return false;
    });

    /***********************************/
    /*BOOTSTRAP SLIDER*/
    /**********************************/

    if ($('.h-slider').length) {
        $('.h-slider').slider({
            range: true,
            values: [50, 67]
        });
    }


    /***********************************/
    /*ACCORDIONS*/
    /**********************************/

    $('.u-accordion').on("click", ".u-accordion__panel-title", function() {
        var thisItem = this; 
        var thisParent = $(thisItem).parent('.u-accordion__panel-wrap'); 
        if ($(thisItem).siblings('.u-accordion__panel-content').length > 0 && $(thisItem).siblings('.u-accordion__panel-content').css('display') === 'none') {
            var siblings = $(thisItem).siblings('.u-accordion__panel-content');
            $(siblings).slideDown(400, function(){});
            $(thisParent).addClass('active').siblings('.u-accordion__panel-wrap').removeClass('active').children('.u-accordion__panel-content').slideUp(400, function(){});
        }
        else {
            var siblings = $(thisItem).siblings('.u-accordion__panel-content');
            $(siblings).slideUp(400, function(){});
            $(thisParent).removeClass('active');
            //$(thisParent).siblings('li').children('ul').slideUp(400, function(){});
               
        }
        return false;
    });

    /***********************************/
    /*RATING                           */
    /**********************************/
    var $star = $('.wpc-star-rate');
    if ($star.length) {
        $($star).raty({
            number: 5,
            half: false,
            starOff: 'fa fa-star-o',
            starOn: 'fa fa-star-o rated',
            score: function() {
                return $(this).attr('data-score');
            }
        })
    }

    /***********************************/
    /*MULTI SCROLL PLUGIN*/
    /**********************************/

    if ($('.multiscroll').length) {
        $(function() {
            $('.multiscroll').multiscroll({
                navigation: true,
                loopBottom: true,
                loopTop: true,
                scrollingSpeed: 700,
                easing: 'easeInQuart'
            });

        });
    }

    /***********************************/
    /*WOW PLUGIN*/
    /**********************************/

    var wow = new WOW({
        boxClass: 'wow',
        animateClass: 'animated',
        mobile: false,
        live: true,
    });

    /***********************************/
    /*POPUP*/
    /**********************************/
    var $popupGallery = $('.popup-gallery');
    if ($popupGallery.length) {
        $popupGallery.magnificPopup({
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
    }

    /***********************************/
    /* STATISTICS                      */
    /**********************************/

    function timeLines() {
        if ($('.js-time-line').length) {
            var time_line = $('.js-time-line').not('.animated');
            for (var i = 0; i < time_line.length; i++) {
                if ($(window).scrollTop() >= $(time_line[i]).offset().top - $(window).height() * 0.8) {
                    $(time_line[i]).addClass('animated').find('.js-timer').countTo();
                }
            }
        }
    }

    var staticMenu, staticMenuHeight, staticMenuNext, staticMenuTop;

    $(window).on('load', function () {
        if ($('.u-header--bottom').length) {
            staticMenu = $('.u-header--bottom');
            staticMenuTop = staticMenu.offset().top;
            staticMenuHeight = staticMenu.height();
            staticMenuNext = staticMenu.next();
            staticMenuTop = staticMenu.offset().top;
        }
    })

    function staticMenuScroll() {
        if ($(window).scrollTop() >= staticMenuTop) {
            staticMenu.css('position', 'fixed');
            staticMenuNext.attr('style', 'padding-top:' + staticMenuHeight + 'px');
        }
        else if ($(window).scrollTop() < staticMenuTop) {
            staticMenu.css('position', 'static');
            staticMenuNext.attr('style', 'padding-top:0px');
        }
    }

    /***********************************/
    /* SKILLS                          */
    /**********************************/

    function startLines() {
        if ($('.js-start-line').length) {
            var start_line = $('.js-start-line').not('.animated');
            for (var i = 0; i < start_line.length; i++) {

                if ($(window).scrollTop() >= $(start_line[i]).offset().top - $(window).height() * 0.9) {

                    var skill_line = $(start_line[i]).find($('.js-skill-line'));
                    for (var y = 0; y < skill_line.length; y++) {

                        var line_wrap = $(skill_line[y]).find('div');
                        var line = $(skill_line[y]).find('span');
                        var percents = $(skill_line[y]).find('i');
                        var pb_width = $(line_wrap).attr('data-width-pb');
                        line.css({
                            'width': 'calc( ' + pb_width + ' - 70px)'
                        });
                        $(percents).countTo();
                    }
                    $(start_line[i]).addClass('animated');
                }
            }
        }        
    }

    function processLines() {
        if ($('.js-process-line').length) {

            var process_line = $('.js-process-line').not('.u-process-wrap--animate');
            for (var i = 0; i < process_line.length; i++) {
                
                if ($(window).scrollTop() >= $(process_line[i]).offset().top - $(window).height() * 0.9) {

                    var process_line_item = $(process_line[i]).find($('.js-process-item'));

                    for (var y = 0; y < process_line_item.length; y++) {

                        $(process_line_item[y]).css('transition-delay', ((y * 500) + 'ms'));
                    }
                    $(process_line[i]).addClass('u-process-wrap--animate');
                }
            }
        }
    }

    /***********************************/
    /* PIE CHARTS */
    /**********************************/
    var $pieProgress = $('.pie_progress');
    function initCharts() {
        if($pieProgress.length) {
            $pieProgress.asPieProgress({});
            // 
        }
    }

    function startCharts() {
        if($pieProgress.length) {
            for (var i = 0; i < $pieProgress.length; i++) {
                if ($(window).scrollTop() >= $($pieProgress[i]).offset().top - $(window).height() * 0.9) {
                    $($pieProgress[i]).asPieProgress('start');
                }
            }
        }
    }

    /***********************************/
    /* TIMELINE */
    /**********************************/

    $('.rsm-timeline-controls').on('click', '.controls-item', function(e) {
        var index_el = $(this).index();
        $(this).addClass('active').siblings().removeClass('active');
        $(this).closest('.rsm-timeline').find('.timeline-item').removeClass('active').eq(index_el).addClass('active');
        e.preventDefault();
    });

    /***********************************/
    /* COUNTDOWN */
    /**********************************/

    $(function() {

        var classyCountdown = $('.ClassyCountdown');
        if(classyCountdown.length){

            var countdown = $('.u-countdown');

            for (var i = 0; i < countdown.length; i++) {

                var finalDate = $(countdown[i]).data('finaldate');
                $(countdown[i]).ClassyCountdown({
                    theme: "white-black",
                    now: $.now()/1000,
                    end: Date.parse(finalDate)/1000,
                    labelsOptions: {
                        lang: {
                            days: 'days',
                            hours: 'hours',
                            minutes: 'minutes',
                            seconds: 'seconds'
                        },
                        style: ''
                    },
                    color: "#ff0000",
                    style: {
                        element: '',
                        labels: false
                    }  
                });
            }
        }
    });

    /***********************************/
    /* IZOTOPE */
    /**********************************/

    function isotopeN() {
        if ($('.izotope-container').length) {
            var $container = $('.izotope-container');
            var $containerFirRow = $('.izotope-container.fitRows');

            console.log('isotop init')
            $container.isotope({
                itemSelector: '.item',
                layoutMode: 'masonry',
                masonry: {
                    columnWidth: '.grid-sizer'
                }
            });
            $containerFirRow.isotope({
                itemSelector: '.item',
                layoutMode: 'fitRows',
                masonry: {
                    columnWidth: '.grid-sizer'
                }
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
    }

    /***********************************/
    /*TEXT ROTATOR*/
    /**********************************/

    if ($('.rotator').length) {
        $('.rotator').textrotator({
            animation: "dissolve",
            separator: "|",
            speed: 3000
        });
    }

    ////////////////////////////////
    // BLOCK HEIGHT
    ////////////////////////////////

    function block_height(items) {
        $(items).matchHeight({
            property: 'height'
        });
    }

    ////////////////////////////////
    // BTN MORE
    ////////////////////////////////

    $('.btn-more').on('click', function(e) {
        $('.hide-item').fadeIn(1000);
        $('.wpc-view-more').fadeOut(100);
        isotopeN();
        e.preventDefault();
    });

    /*=================================*/
    // blog agency slider in slider
    /*=================================*/

    $('.wpc-blog-posts').on('click', '.swiper-slide-visible', function(e) {
        var that = $(this),
            corectSlide = that.find('.wpc-blog-post').attr('data-slide'),
            corectSwiperSlide = that.closest('.wpc-blog-posts').find('.swiper-slide-visible');
        if (that.prev().hasClass('swiper-slide-active') || that.prev().prev().hasClass('swiper-slide-active')) {
            $('.wpc-blog-start').fadeOut(300);
            $('.wpc-blog-start.' + corectSlide).fadeIn(300);
            swipers['swiper-' + $(this).closest('.swiper-container').attr('id')].swipeNext();
        } else if (that.next().hasClass('swiper-slide-active')) {
            $('.wpc-blog-start').fadeOut(300);
            $('.wpc-blog-start.' + corectSlide).fadeIn(300);

            swipers['swiper-' + $(this).closest('.swiper-container').attr('id')].swipePrev();
        } else {
            return false;
        }
    })

    /*=================================*/
    // hero  slider  menu option 
    /*=================================*/

    $('.u-header--hero-js').on('click', '.u-header__navigation nav ul li a', function(e) {
        e.preventDefault();
        var that = $(this);
        var index = that.attr('data-index') * 1;

        // if ($(window).width() < 993) {
        $('.u-header--hero .u-header__navigation nav').removeClass('active');
        $('.u-header__nav-icon').removeClass('active');
        $('.u-header__navigation nav').removeClass('slide-menu');
        $('.u-header').removeClass('open');
            // }
        $('.flexslider').flexslider(index);
    })

    if ($(".type-element").length) {
        $(".type-element").typed({
            strings: ["Creation.", "Agency.", "Web design."],
            typeSpeed: 150, // type Speed
            backSpeed: 150, // delete Speed
            startDelay: 0, // delay before type
            backDelay: 500, // Pause before deleting text
            loop: true, // repetition (true или false)
            loopCount: false, // number of repetitions, false = infinite
            showCursor: true,
            attr: null, // attribute
            callback: function() {} // callback
        });
    }
    if ($(".type-element2 h2").length) {
        $(".type-element2 h2 b").typed({
            strings: ["Agency.", "Creation.", "Web design."],
            typeSpeed: 150, // скорость набора
            backSpeed: 150, // скорость удаления текста
            startDelay: 0, // изначальная задержка перед набором
            backDelay: 500, // пауза перед удалением текста
            loop: true, // повтор (true или false)
            loopCount: false, // число повтором, false = бесконечно
            showCursor: true,
            attr: null, // атрибут
            callback: function() {} // функция, которая вызовется после окончания работы плагина
        });
    }

    function heightPage() {

        if ($(window).width() < 767 && $('.wpc-splitted-slider .swiper-container').length) {
            swipers['swiper-' + $('.wpc-splitted-slider').find('.swiper-container').attr('id')].destroy();
        }

        if ($(".wpc-h").length && $(".wpc-h").hasClass("gallery")) {
            if ($(window).width() > 1199) {
                $(".wpc-h").css("height", ($(window).height() - ($(".wpc-header").outerHeight(true) + $(".wpc-footer").outerHeight(true))) / 3);
                $("html").addClass("no-scroll");
            } else {
                $(".wpc-h").css({
                    "height": "auto",
                    "min-height": "293px"
                });
                $("html").removeClass("no-scroll");
            }
        } else {
            $(".wpc-h").css("height", $(window).height() - ($(".wpc-header").outerHeight(true) + $(".wpc-footer").outerHeight(true)) - 15);
            if ($(window).width() > 1199) {
                if ($(".wpc-h").length && $(".wpc-h").hasClass("full-page")) {
                    $("html").addClass("no-scroll");
                }
            } else {
                $(".wpc-h").css({
                    "height": "auto"
                });
                $("html").removeClass("no-scroll");
            }

        }
    }

    // home full_page_img
    function full_page_img() {
        var win_h = $(window).height(),
            full_page = $('.bg-full-height');

        full_page.height(win_h);

    }

    if ($('.wpc-hero-slider').length) {
        $(window).on('load resize', function() {
            $('.flexslider .slides li .heroSlideItem').height($(window).height());
            $('.flexslider').flexslider({
                // easing: "swing",
                direction: "vertical",
                mousewheel: 'true',
                animation: "slide",
                before: function() {},
                removed: function() {},
                controlNav: true,
                directionNav: false
            });
        })
    }

    if ($('.wpc-photo6-slider').length) {
        $(window).on('load resize', function() {
            $('.flexslider .slides li').height($(window).height());
            $('.flexslider').flexslider({
                before: function() {
                    if ($(window).width() > 767) {
                        $('.flexslider .slides li').addClass('activeSlide')
                        $(this).removeClass('activeSlide')
                    }
                },
                removed: function() {},
                prevText: "",
                animationLoop: true,
                nextText: "",
                //animationSpeed: 700,
                mousewheel: true
            });
        })
    }

    $('.heroSlideInfo i').on('click', function() {
        $('.flexslider').flexslider(1);
        return false;
    })

    $('.photo-ico').on('click', function() {
        $('.flexslider').flexslider();
    })

    if ($(window).width() > 992) {
        wow.init();
    }

    /***********************************/
    /*GOOGLE MAP*/
    /**********************************/
    if ($('.wpc-map').length) {
        $('.wpc-map').each(function() {
            initialize(this);
        });
    }

    function initialize(_this) {

        var stylesArray = {
            //style 1
            'style-1': [{ "featureType": "landscape", "stylers": [{ "hue": "#FFBB00" }, { "saturation": 43.400000000000006 }, { "lightness": 37.599999999999994 }, { "gamma": 1 }] }, { "featureType": "road.highway", "stylers": [{ "hue": "#FFC200" }, { "saturation": -61.8 }, { "lightness": 45.599999999999994 }, { "gamma": 1 }] }, { "featureType": "road.arterial", "stylers": [{ "hue": "#FF0300" }, { "saturation": -100 }, { "lightness": 51.19999999999999 }, { "gamma": 1 }] }, { "featureType": "road.local", "stylers": [{ "hue": "#FF0300" }, { "saturation": -100 }, { "lightness": 52 }, { "gamma": 1 }] }, { "featureType": "water", "stylers": [{ "hue": "#0078FF" }, { "saturation": -13.200000000000003 }, { "lightness": 2.4000000000000057 }, { "gamma": 1 }] }, { "featureType": "poi", "stylers": [{ "hue": "#00FF6A" }, { "saturation": -1.0989010989011234 }, { "lightness": 11.200000000000017 } , { "gamma": 1 }] }], 
            //style 2
            'style-2': [{ "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#e9e9e9" }, { "lightness": 17 }] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 20 }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }, { "lightness": 17 }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#ffffff" }, { "lightness": 29 }, { "weight": 0.2}] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 18 }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 16 }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 21 }] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#dedede" }, { "lightness": 21 }] }, { "elementType": "labels.text.stroke", "stylers": [{ "visibility": "on" }, { "color": "#ffffff" }, { "lightness": 16 }] }, { "elementType": "labels.text.fill", "stylers": [{ "saturation": 36 }, { "color": "#333333" }, { "lightness": 40 }] }, { "elementType": "labels.icon","stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#f2f2f2" }, { "lightness": 19 }] }, { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [{ "color": "#fefefe" }, { "lightness": 20 }] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#fefefe" }, { "lightness": 17 }, { "weight": 1.2 }] }],
            //style 3
            'style-3': [{ "featureType": "all", "elementType": "labels.text.fill", "stylers": [{ "saturation": 36 }, { "color": "#000000" }, { "lightness": 40 }] }, { "featureType": "all", "elementType": "labels.text.stroke", "stylers": [{ "visibility": "on" }, { "color": "#000000" }, { "lightness": 16 }] }, { "featureType": "all", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [{ "color": "#000000" }, { "lightness": 20 }] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#000000" }, { "lightness": 17 }, { "weight": 1.2 }] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 20 }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 21 }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#000000" }, { "lightness": 17 }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#000000" }, { "lightness": 29 }, { "weight": 0.2 }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 18 }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 16 }] }, { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 19 }] }, { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 17 }] }]
        }; 

        var styles, map, marker, infowindow,
        lat = $(_this).attr("data-lat"),
        lng = $(_this).attr("data-lng"),
        top = $(_this).attr("data-top"),
        left = $(_this).attr("data-left"),
        contentString = $(_this).attr("data-string"),
        image = $(_this).attr("data-marker"),
        styles_attr = $(_this).attr("data-style"),
        zoomLevel = parseInt($(_this).attr("data-zoom"), 10),
        myLatlng = new google.maps.LatLng(lat, lng);
        
        
        if ($('.wpc-contactUs-map').length !== 0) {
            var customPosition = new google.maps.LatLng(top, left);
        }
            
        // style_1
        if (styles_attr === 'style-1') {
            styles = stylesArray[styles_attr];
        } else if (styles_attr === 'style-2') {
            styles = stylesArray[styles_attr];
        } else if (styles_attr === 'style-3') {
            styles = stylesArray[styles_attr];
        }
        // custom
        if (typeof hawa_style_map != 'undefined' && styles_attr === 'custom') {
            styles = hawa_style_map;
        }
        // or default style

        var styledMap = new google.maps.StyledMapType(styles, {
            name: "Styled Map"
        });

        var mapOptions = {
            zoom: zoomLevel,
            disableDefaultUI: true,
            center: customPosition || myLatlng,
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

    /***********************************/
    /*ANIMSITION PLUGIN FOR PAGE TRANSITION*/
    /**********************************/

    if ($(".animsition").length) {
        $(".animsition").animsition({
            inClass: 'fade-in',
            outClass: 'fade-out',
            inDuration: 1000,
            outDuration: 1000,
            linkElement: '.animsition-link',
            // e.g. linkElement   :   'a:not([target="_blank"]):not([href^=#])'
            loading: false,
            loadingParentElement: 'body',
            loadingClass: 'animsition-loading',
            unSupportCss: ['animation-duration',
                '-webkit-animation-duration',
                '-o-animation-duration'
            ]
        });
    }

    $('.submit span').on('click', function() {
        $('.search-form').toggleClass('act');
        return false;
    });
    $('.submit-button').on('click', function() {
        if ($(this).closest('.search-form').find('.text-input').val() === '') {
            $('.search-form').removeClass('act');
        }
        return false;
    });

    var partNum = 100;
    //particle number - change it!

    window.requestAnimFrame = (function() {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function(callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();

    function between(min, max) {
        return Math.random() * (max - min) + min;
    }

    // canvas animation
    // From Paul Irish' post: http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
    // shim layer with setTimeout fallback
    window.requestAnimFrame = (function() {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function(callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();

    if ($('#animation_bg').length) {
        var canvas = document.getElementById('animation_bg');
        var ctx = canvas.getContext('2d'),
            width = window.innerWidth,
            height = window.innerHeight,
            dots = [],
            dotsNum = 50,
            centerY = height / 2,
            centerX = width / 2,
            timer = 0,
            TWO_PI = 2 * Math.PI;

        canvas.height = height;
        canvas.width = width;

        function Dot(i) {
            dots[i] = this;
            this.i = i;
            this.velocityX = Math.round((Math.random() * 4 - 2) * 10) / 10;
            this.velocityY = Math.round((Math.random() * 4 - 2) * 10) / 10;
            this.x = Math.round(Math.random() * width);
            this.y = Math.round(Math.random() * height);
            this.radius = 2;
        }

        Dot.prototype.draw = function() {
            this.x += this.velocityX;
            this.y += this.velocityY;
            ctx.fillStyle = '#fff';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, TWO_PI, false);
            ctx.fill();
        }

        function drawLine(iX, iY, dX, dY, dist) {
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = .4;
            ctx.beginPath();
            ctx.moveTo(iX, iY);
            ctx.lineTo(dX, dY);
            ctx.stroke();
            ctx.closePath();
        }

        // Delete a dot when it leaves the canvas and add a new one to it
        function refreshDots(x, y, i) {
            if (x < 0 || x > width || y < 0 || y > height) {
                delete dots[i];
                new Dot(i);
            }
        }

        function createDot() {
            for (var i = 0; i < dotsNum; i++) {
                new Dot(i);
            }
        }

        // Keep track of time
        function timeTrack() {
            timer++;
        }

        // rAF loop
        function draw() {
            requestAnimFrame(draw);

            // Clear
            ctx.clearRect(0, 0, width, height);

            // Draw function
            for (var i in dots) {
                for (var j = i; j < Object.keys(dots).length; j++) {
                    // Calculate distance between dots
                    var circDist,
                        dx = Math.round(dots[i].x - dots[j].x),
                        dy = Math.round(dots[i].y - dots[j].y);

                    circDist = Math.round(Math.sqrt(dx * dx + dy * dy));

                    if (circDist <= 100) {
                        drawLine(dots[i].x, dots[i].y, dots[j].x, dots[j].y, circDist / 100);
                    }
                }

                dots[i].draw();
                refreshDots(dots[i].x, dots[i].y, i);
            }
        };
        // Init
        createDot();
        draw();
    }

})(jQuery);
