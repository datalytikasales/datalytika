/*-------------------------------------------------------------------------------------------------------------------------------*/
/*This is main js file that contains custom style rules used in this template*/
/*-------------------------------------------------------------------------------------------------------------------------------*/
/* Template Name: Medicare*/
/* Version: 1.0 auto Release*/
/* Build Date: 28-03-2016*/
/* Author: Unbranded*/
/* Website: 
/* Copyright: (C) 2016 */
/*-------------------------------------------------------------------------------------------------------------------------------*/


/*--------------------------------------------------------*/
/* TABLE OF CONTENTS: *//*

    01 - VARIABLES 
    02 - PAGE CALCULATIONS
    03 - FUNCTION ON DOCUMENT READY
    04 - FUNCTION ON PAGE LOAD
    05 - FUNCTION ON PAGE RESIZE
    06 - SWIPER SLIDERS  
    07 - ADD BACKGROUND IMAGE
    08 - ADD RETREAT
    09 - ACTIVE PANEL ACCORDION
    10 - CHANGE VALUE INPUT
    11 - TABS
    12 - GOOGLE MAPS
    13 - OPEN ELEMENTS
    14 - RANGE
 *//*--------------------------------------------------------*/


;(function($, window, document, undefined) {
    "use strict";

    /*============================*/
	/* 01 - VARIABLES */
	/*============================*/
	
	var swipers = [], winW, winH, winScr, _isresponsive, smPoint = 768, mdPoint = 992, lgPoint = 1200, addPoint = 1600, _ismobile = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i);


	/*========================*/
	/* 02 - PAGE CALCULATIONS */
	/*========================*/
	function pageCalculations(){
		winW = $(window).width();
		winH = $(window).height();
	}

	/*=================================*/
	/* 03 - FUNCTION ON DOCUMENT READY */
	/*=================================*/
	pageCalculations();
	

		/*-------------------choose select-----------------------*/ 
	$(window).load(function() {
		$('.group-select').click(function() {
	        open($(this).siblings().children());
	    });
	    $(".wpc-preloader").hide();

	});


	/*============================*/
	/* 04 - FUNCTION ON PAGE LOAD */
	/*============================*/
	
	$(window).load(function(){
		if($('#map-canvas-contact').length==1){
		  initialize('map-canvas-contact');}
	    $('#loading').hide();
	    initSwiper();
		if ($('.izotope-container').length) {
		 var $container = $('.izotope-container');
		  $container.isotope({
			itemSelector: '.item',
			layoutMode: 'masonry',
			masonry: {
			  columnWidth: '.grid-sizer'
			}
		  });
		}
        //clear
        $('.s-back-switch').each(function(){
            var $imgSrc =  $(this).find('.s-img-switch').attr('src');
            $(this).css('background-image' , 'url(' + $imgSrc + ')');
        });
	});


	/*==============================*/
	/* 05 - FUNCTION ON PAGE RESIZE */
	/*==============================*/	


	function resizeCall(){
		pageCalculations();

		$('.swiper-container.initialized[data-slides-per-view="responsive"]').each(function(){
			var thisSwiper = swipers['swiper-'+$(this).attr('id')], $t = $(this), slidesPerViewVar = updateSlidesPerView($t), centerVar = thisSwiper.params.centeredSlides;
			thisSwiper.params.slidesPerView = slidesPerViewVar;
			thisSwiper.reInit();
			if(!centerVar){
				var paginationSpan = $t.find('.pagination span');
				var paginationSlice = paginationSpan.hide().slice(0,(paginationSpan.length+1-slidesPerViewVar));
				if(paginationSlice.length<=1 || slidesPerViewVar>=$t.find('.swiper-slide').length) $t.addClass('pagination-hidden');
				else $t.removeClass('pagination-hidden');
				paginationSlice.show();
			}
		});
		if($('.custom_slider').length){
		 	reinitCustomSlider();
		}		
	}
	$(window).resize(function(){
		resizeCall();
		headerScroll();		
		// removeHScroll();
	});
	// if(!_ismobile){
		
	// } else{
	// 	window.addEventListener("orientationchange", function() {
	// 		resizeCall();
	// 	}, false);
	// }


	 var $first_child_link = $('.menu-item-has-children > a').append('<span class="fa fa-angle-down"></span>');
 
    $('.nav-menu-icon').click(function(e) {
        $(this).toggleClass('active');
        $('.wpc-navigation').toggleClass('active');
    });
 
    // $first_child_link.find('span').click(function(e) {
    //     $(this).closest('li').toggleClass('active');
    // });

    $(".menu-item-has-children").on("click", function(){
    	$(this).find(".sub-menu").fadeToggle();
    });



    function sectionHeight() {
    	
	    if($(window).width()>1850) {
	    	$(".section-details").each(function(){
		    	$(this).css("height", $(".doctor-details .swiper-wrapper").height()-90);
		    });
	    } else {
	    	$(".section-details").each(function(){
		    	$(this).css("height", $(".doctor-details .swiper-wrapper").height()-6);
		    });
	    }
    }

    function sliderHeight() {
    	$(".doctors-slider.big-slider-x .medic-img.modern-style").css("height", $(".doctors-block-wrap").outerHeight()-15);
    }


	/*=====================*/
	/* 06 - SWIPER SLIDERS */
	/*=====================*/
	    function initSwiper() {
        var initIterator = 0;
        $('.swiper-container').each(function() {
            var $t = $(this);
 
            if ($t.find('.swiper-slide').length <= 1) { 
                $t.find('.pagination').hide(); 
                $t.find('.swiper-slide').css('width','100%');
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
                onInit: function(swiper) {
                	
                },
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
        swipers['swiper-' + $(this).closest('.slider-wrap').find('.swiper-container').attr('id')].swipePrev();
        return false;
    });
 
    $('.slide-next').on('click', function() {
        swipers['swiper-' + $(this).closest('.slider-wrap').find('.swiper-container').attr('id')].swipeNext();
        return false;
    });

 
    function updateSlidesPerView(swiperContainer) {
        if (winW >= addPoint) return parseInt(swiperContainer.attr('data-add-slides'), 10);
        else if (winW >= lgPoint) return parseInt(swiperContainer.attr('data-lg-slides'), 10);
        else if (winW >= mdPoint) return parseInt(swiperContainer.attr('data-md-slides'), 10);
        else if (winW >= smPoint) return parseInt(swiperContainer.attr('data-sm-slides'), 10);
        else return parseInt(swiperContainer.attr('data-xs-slides'), 10);
    }

    $(window).on('load', function() {
 
        initSwiper();
        sectionHeight();
        sliderHeight();
 
    });
    $(window).on('resize', function() {
        sectionHeight();
 		sliderHeight();
    });

    $(".departmens-tabs.nav-tabs > li").on("click", function(e){
    	e.preventDefault();
        var index_el = $(this).index();
        var self = $(this);

        setTimeout(function(){
        	//self.closest('.tasb-slider-wrapper').find('.tab-pane.active').fadeOut(3000);
        	$(".slider-wrap").removeClass('visible-swiper');
        	$('.tab-pane.active').find(".slider-wrap").addClass('visible-swiper');
        	swipers['swiper-' + self.closest('.tasb-slider-wrapper').find('.tab-pane.active .swiper-container').attr('id')].reInit();

        	//alert(1);
        },0);
        //alert($(this).closest('.tasb-slider-wrapper').find('.tab-pane.active .swiper-container').attr('id'));
    });



	/*===========================*/
	/* 07 - ADD BACKGROUND IMAGE */
	/*===========================*/

	$(".img-bg").each(function(){
		$(this).css("background-image", "url("+$(this).attr('data-img')+")");
	});


	/*=====================*/
	/* 08 - ADD RETREAT    */
	/*=====================*/
	if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1)
	{
	    $(".medic-footer .content-footer").css("margin-top", "-10px")
	}


	/*==================================*/
	/*   09 - ACTIVE PANEL ACCORDION    */
	/*==================================*/
	$('#accordion')
	  .on('show.bs.collapse', function(e) {
	    $(e.target).prev('.panel-heading').addClass('active');
	  })
	  .on('hide.bs.collapse', function(e) {
	    $(e.target).prev('.panel-heading').removeClass('active');
  	});



  	/*=========================*/
	/* 10 - CHANGE VALUE INPUT */
	/*========================*/
	$(document).ready(function() {
		$(".quantity .fa.minus").on("click", function(){
			var count=Number($(".products-table .products-row .input-quantity").val());
			$(".products-table .products-row .input-quantity").val(count-1);
		});
	  
		$(".quantity .fa.plus").on("click", function(){
			var count=Number($(".products-table .products-row .input-quantity").val());
			$(".products-table .products-row .input-quantity").val(count+1);
		});
	});

  


	/*=====================*/
	/*       11 - TABS     */
	/*=====================*/

	$('.tabs-header').on('click', 'li:not(.active)', function() {

		var index_el = $(this).index();

		$(this).addClass('active').siblings().removeClass('active');
		$(this).closest('.tabs').find('.tabs-item').removeClass('active').eq(index_el).addClass('active');

	});


	

	/*=====================*/
	/*   12 - GOOGLE MAPS  */
	/*=====================*/

	$(document).ready(function(){
		if( $('.wpc-map').length ) {
			$('.wpc-map').each(function() {
				initialize(this);
			});
		}

		function initialize(_this) {
		
			var stylesArray = {
				//style 1
				'style-1' : [{"featureType":"landscape","stylers":[{"hue":"#FFBB00"},{"saturation":43.400000000000006},{"lightness":37.599999999999994},{"gamma":1}]},{"featureType":"road.highway","stylers":[{"hue":"#FFC200"},{"saturation":-61.8},{"lightness":45.599999999999994},{"gamma":1}]},{"featureType":"road.arterial","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":51.19999999999999},{"gamma":1}]},{"featureType":"road.local","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":52},{"gamma":1}]},{"featureType":"water","stylers":[{"hue":"#0078FF"},{"saturation":-13.200000000000003},{"lightness":2.4000000000000057},{"gamma":1}]},{"featureType":"poi","stylers":[{"hue":"#00FF6A"},{"saturation":-1.0989010989011234},{"lightness":11.200000000000017},{"gamma":1}]}]
			};

			var styles ,map, marker, infowindow,
				lat = $(_this).attr("data-lat"),
		   		lng = $(_this).attr("data-lng"),
				contentString = $(_this).attr("data-string"),
				image = $(_this).attr("data-marker"),
				styles_attr = $(_this).attr("data-style"),
				zoomLevel = parseInt($(_this).attr("data-zoom"),10),
				myLatlng = new google.maps.LatLng(lat,lng);
				

			// style_1
			if (styles_attr == 'style-1') {
				styles = stylesArray[styles_attr];
			}
			// custom
			if (typeof hawa_style_map != 'undefined' && styles_attr == 'custom') {
				styles = hawa_style_map;
			}
			// or default style
			
			var styledMap = new google.maps.StyledMapType(styles,{name: "Styled Map"});
		    
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
				infowindow.open(map,marker);
			});

		}
	});



	/*=====================*/
	/* 13 - OPEN ELEMENTS  */
	/*=====================*/

	function open(elem) {
	    if (document.createEvent) {
	        var e = document.createEvent("MouseEvents");
	        e.initMouseEvent("mousedown", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	        elem[0].dispatchEvent(e);
	    } else if (element.fireEvent) {
	        elem[0].fireEvent("onmousedown");
	    }
	}




	/*=====================*/
	/*     14 - RANGE      */
	/*=====================*/

	if($("#filter-price").length) {
		var slider = document.getElementById('filter-price');
		var valueSlide1 = document.getElementById('value-filter'),
		valueSlide2 = document.getElementById('value-filter-2');

		noUiSlider.create(slider, {
			start: [0, 55],
			connect: true,
			range: {
				'min': 0,
				'max': 60
			}
		});

		// When the slider value changes, update the value1 and value2
		slider.noUiSlider.on('update', function( values, handle ) {
			if ( handle ) {
				valueSlide2.innerHTML = values[handle];

			} else {
				valueSlide1.innerHTML = values[handle];
			}
		});
	}
	


	$(".p-commerce-more .main-visual figure").on("click", function(){
		$(".p-commerce-more .main-visual .galery-info").css("background-image", "url("+$(this).attr("data-img")+")");
	});

    
    //filter list
    $('.filter-list').on('click', 'a', function(e){
        e.preventDefault();
        $(this).addClass('active').parent().siblings().find('a').removeClass('active');
    });
    
    //view more
    $('.quick-view').on('click', function(){
        $('.p-commerce-more').slideDown();
        return false;
    });
    
    $('.view-more-close').on('click', function(){
        $('.p-commerce-more').slideUp();   
    });
    
    $('.mobile-menu').on('click', function(){
		$('body').toggleClass('open-menu');
	});

	$('.size li').on('click', function(){
		$('.size li').removeClass();
		$(this).addClass('active');
	});

	$('.color span').on('click', function(){
		$(this).siblings('.list').toggle();
		$(this).toggleClass('active');
	});

	$('.color .list li').on('click', function(){
		var tx = $(this).text();
		$(this).parents().siblings('span').text(tx);
		$(this).parents('.list').toggle();
		$(this).parents().siblings('span').toggleClass('active');
	});

	$('.quantity .up').on('click', function(){
		var i = $(this).siblings('.count').text();
		if (i >= 1) {
			i++;
			$(this).siblings('.count').text(i);
		} return false;
	});

	$('.quantity .down').on('click', function(){
		var i = $(this).siblings('.count').text();
		if (i > 1) {
			i--;
			$(this).siblings('.count').text(i);
		} return false;
	});


	if($(".galery").length) {
		$('.galery').owlCarousel({
			items:4,
			dots:false,
	        margin: 20,
	        responsive : {
	            // breakpoint from 0 up
	            0 : {
	                items : 2,
	                loop:true
	            },
	            // breakpoint from 480 up
	            480 : {
	                items : 4,
	                loop:false
	            }
	        }
		});
	}

	

	

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


	/***********************************/
	/* MASONRY */
	/**********************************/


	if($(".grid").length) {
		$('.grid').masonry({
		  // options...
		  itemSelector: '.grid-item'
		  // columnWidth: 200
		});
	}


	/***********************************/
	/*POPUP*/
	/**********************************/

	if($(".popup-gallery").length) {
		$('.popup-gallery').magnificPopup({
			delegate: '.magnific-popup-link',
			type: 'image',
			tLoading: 'Loading image #%curr%...',
			mainClass: 'mfp-with-zoom',
			gallery: {
				enabled: true,
				navigateByImgClick: true
			},
			callbacks: {                    
                markupParse: function (template, values, item) {
                    values.title = item.el.attr('title'); 
                }
            },
			zoom: {
			    enabled: true, // By default it's false, so don't forget to enable it

			    duration: 300, // duration of the effect, in milliseconds
			    easing: 'ease-in-out' // CSS transition easing functio
			  }
		});
	}


	/*-------------------------*/ 
    /*        IS SAFARI        */ 
    /*-------------------------*/
    var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);

	if (isSafari) {
		$("body").addClass("safari");
	}


	/*-------------------------*/ 
    /*        CUSTOMIZER       */ 
    /*-------------------------*/



    /*--------------------------------------------------------------------------------------*/
    // babkgound img
    /*--------------------------------------------------------------------------------------*/

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
     wpc_add_img_bg('.wpc-img-style a img', '.wpc-img-style a');
        /*--------------------------------------------------------------------------------------*/
        // Open sidebar 
        /*--------------------------------------------------------------------------------------*/

        $('.conf-button').on('click', function() {
            if ($('.wpc-style-page').hasClass('slide-right')) {
                $('.wpc-style-page').removeClass('slide-right');
                $('.conf-button span').removeClass('act');
            } else {
                $('.wpc-style-page').addClass('slide-right');
                $('.conf-button span').addClass('act');
            }
            
            // return false;
        });


        /*--------------------------------------------------------------------------------------*/
        // change colors fonts 
        /*--------------------------------------------------------------------------------------*/

        $('.entry').on('click', function() {
            var newTheme = $(this).attr('data-color');
            if ($(this).hasClass('active')) return false;
            $(this).parent().find('.active').removeClass('active');
            $(this).addClass('active');
            $('html').removeClass().addClass(newTheme);
            if (typeof(Storage) !== "undefined") {
			    localStorage.setItem("color", $(this).attr("data-color"));
			} else {
				console.log("Sorry, your browser does not support Web Storage...");
			}
        });



        /*--------------------------------------------------------------------------------------*/
        // change block container
        /*--------------------------------------------------------------------------------------*/


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
                initSwiper();
            }
        });




        /*--------------------------------------------------------------------------------------*/
        // change background container
        /*--------------------------------------------------------------------------------------*/
        $('.wpc-img-style a').on('click', function(e) {
            e.preventDefault();
            var that = $(this);
            that.parent().children().removeClass('active')
            that.addClass('active')
            $('.wpc-product-text .wpc-product-item').parent().removeClass().addClass('col-sm-12');
            $('html').addClass('wpc-no-fluid').addClass('wpc-bg-body').css('background', $(this).attr('data-bg-color') || 'url(' + $(this).find('img').attr('src') + ')');
            $('.check-option').removeClass('active').eq(0).addClass('active');
            $('body').css('background', '#fff');

        });

        if ($('.wpc-img-style .wpc-bg-color').length) {
            $('.wpc-img-style .wpc-bg-color').each(function() {
                $(this).css('background', $(this).attr('data-bg-color'));
            });
        }



        /*--------------------------------------------------------------------------------------*/
        // load fonts
        /*--------------------------------------------------------------------------------------*/
        function load_fonts(fonts) {
            WebFont.load({
                google: {
                    families: fonts
                }
            });
        }

        /*--------------------------------------------------------------------------------------*/
        // Ajaxs fonts
        /*--------------------------------------------------------------------------------------*/


        function ajax_loadFonts() {
            var dataList = $('#json-datalist');


            $.ajax({
                url: 'https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyAyrLCbxcoFkeY386ShlvtcuFKbHdde1Fw',
                dataType: 'json'
            }).done(function(data) {
                if (!data) {
                    return;
                }
                $.each(data.items, function(key, object) {
                    var option = document.createElement('option');
                    option.value = object.family;
                    dataList.append(option);

                });

            });
        }



        $('body').on('input propertychange', '#pFont', function() {
            load_fonts([$(this).val()]);
            $('p').css('font-family', $(this).val() + ', sans-serif');
        });
        $('body').on('input propertychange', '#menuFont', function() {
            load_fonts([$(this).val()]);
            $('.main-menu li a').css('font-family', $(this).val() + ', sans-serif');
        });
        $('body').on('input propertychange', '#h1Font', function() {
            load_fonts([$(this).val()]);
            $('.wpc-header  h2, h2').css('font-family', $(this).val() + ', sans-serif');
        });
        $('body').on('input propertychange', '#h2Font', function() {
            load_fonts([$(this).val()]);
            $('.wpc-header  h3,h3,h1').css('font-family', $(this).val() + ', sans-serif');
        });
        $('body').on('input propertychange', '#fFont', function() {
            load_fonts([$(this).val()]);
            $('.wpc-footer span').css('font-family', $(this).val() + ', sans-serif');
        });

        /*--------------------------------------------------------------------------------------*/
        /* Hide scroll in block
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





        function headerScroll() {
			$(".scroll-btn").on("click", function(){
				$("html, body").animate({ scrollTop: 600 }, 500);
				return false;         
			});
		}

		headerScroll();


	

    
})(jQuery, window, document);