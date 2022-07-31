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
	

	/*============================*/
	/* 04 - FUNCTION ON PAGE LOAD */
	/*============================*/
	
	$(window).on('load', function(){		
		initSwiper();
		setColsWidth(".rome-colorful-footer .rome-col-dark-bgc", ".rome-colorful-footer .rome-col-yellow-bgc");
		setColsWidth(".rome-blog", ".rome-sidebar");
		setColsWidth(".rome-sermon-details", ".rome-sidebar");
		setColsWidth(".rome-sermons", ".rome-sidebar");
	});


	/*==============================*/
	/* 05 - FUNCTION ON PAGE RESIZE */
	/*==============================*/	

	function resizeCall(){
		pageCalculations();
		setColsWidth(".rome-colorful-footer .rome-col-dark-bgc", ".rome-colorful-footer .rome-col-yellow-bgc");
		setColsWidth(".rome-blog", ".rome-sidebar");
		setColsWidth(".rome-sermon-details", ".rome-sidebar");
		setColsWidth(".rome-sermons", ".rome-sidebar");

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

		if( $('.rome-map').length ) {
    	$('.rome-map').each(function() {
    		initialize(this);
    	});
    }	
	}
	if(!_ismobile){
		$(window).on('resize', function(){
			resizeCall();
		});
	} else{
		window.addEventListener("orientationchange", function() {
			resizeCall();
		}, false);
	}

	/*=====================*/
	/* 07 - SWIPER SLIDERS */
	/*=====================*/

	function initSwiper(){
		var initIterator = 0;
		$('.swiper-container').each(function(){								  
			var $t = $(this);								  

			var index = 'swiper-unique-id-'+initIterator;

			$t.addClass('swiper-'+index + ' initialized').attr('id', index);
			$t.find('.pagination').addClass('pagination-'+index);

			var autoPlayVar = parseInt($t.attr('data-autoplay'),10);
			var mode = $t.attr('data-mode');
			var slidesPerViewVar = $t.attr('data-slides-per-view');
			if(slidesPerViewVar == 'responsive'){
				slidesPerViewVar = updateSlidesPerView($t);
			}
			else slidesPerViewVar = parseInt(slidesPerViewVar,10);

			var loopVar = parseInt($t.attr('data-loop'),10);
			var speedVar = parseInt($t.attr('data-speed'),10);
			var centerVar = parseInt($t.attr('data-center'),10);
			swipers['swiper-'+index] = new Swiper('.swiper-'+index,{
				speed: speedVar,
				pagination: '.pagination-'+index,
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
				onInit: function(swiper){

				    /*************timeline-page*******************/

						$('.slide-item').hide();
						 $('.item1').show();
				    $('.rome-slider-timeline .swiper-slide').on('click', function() {
 
						    var index_el = $(this).data("id");
						 		$('.slide-item').hide();
								$('.item'+index_el).show();
								$(".rome-slider-timeline .swiper-slide .slider-timeline-text").removeClass('slide-active'); 
								$(this).find('.slider-timeline-text').addClass('slide-active');
						    return false;
						 
						}); 

				    /*************calendar-page*******************/

						 $('.c-show').hide();
						 $('.c1, .c5, .c9, .c13').show();
						 $('.rome-slider-calendar .swiper-slide').on('click', function() {
 
						    var c_id = $(this).data("value");
						 		$('.c-show').hide();
								$('.c'+c_id).show();
								$(".rome-slider-calendar .swiper-slide .swiper-calendar-text").removeClass("swiper-calendar-text-active"); 
								$(this).find('.swiper-calendar-text').addClass('swiper-calendar-text-active');
									 
						}); 
				},
				onSlideChangeEnd: function(swiper){
					var activeIndex = (loopVar===1)?swiper.activeLoopIndex:swiper.activeIndex;
				},
				onTouchMove: function(swiper){ 
					var $target = event ? $(event.target) : undefined; 
				},
				onSlideClick: function(swiper){
				
					$('.swiper-wrapper .swiper-slide .slider-timeline-text').removeClass('slide-active');
					$('.swiper-wrapper .swiper-slide').eq(swiper.clickedSlideIndex).find('.slider-timeline-text').addClass('slide-active');

				},

				onSlideChangeStart: function(swiper){
					$t.find('.swiper-slide.active').removeClass('active');

				}
			});
			swipers['swiper-'+index].reInit();
			if($t.attr('data-slides-per-view')=='responsive'){
				var paginationSpan = $t.find('.pagination span');
				var paginationSlice = paginationSpan.hide().slice(0,(paginationSpan.length+1-slidesPerViewVar));
				if(paginationSlice.length<=1 || slidesPerViewVar>=$t.find('.swiper-slide').length) $t.addClass('pagination-hidden');
				else $t.removeClass('pagination-hidden');
				paginationSlice.show();
			}

			if($t.find('.default-active').length){
				swipers['swiper-'+index].swipeTo($t.find('.swiper-slide').index($t.find('.default-active')), 0);    
			} 

			initIterator++; 
		});
		
	}

	function updateSlidesPerView(swiperContainer){
		if(winW>=addPoint) return parseInt(swiperContainer.attr('data-add-slides'),10);
		else if(winW>=lgPoint) return parseInt(swiperContainer.attr('data-lg-slides'),10);
		else if(winW>=mdPoint) return parseInt(swiperContainer.attr('data-md-slides'),10);
		else if(winW>=smPoint) return parseInt(swiperContainer.attr('data-sm-slides'),10);
		else return parseInt(swiperContainer.attr('data-xs-slides'),10);
	}	


	//swiper arrows
	$('.swiper-arrow-left').on('click', function(){
		swipers['swiper-'+$(this).parent().attr('id')].swipePrev();
	});

	$('.swiper-arrow-right').on('click', function(){
		swipers['swiper-'+$(this).parent().attr('id')].swipeNext();
	});

	$('.swiper-outer-left').on('click', function(){
		swipers['swiper-'+$(this).parent().find('.swiper-container').attr('id')].swipePrev();
	});

	$('.swiper-outer-right').on('click', function(){
		swipers['swiper-'+$(this).parent().find('.swiper-container').attr('id')].swipeNext();
	});

	/*************calendar-page*******************/
	
	$('.tabs-header-calendar').on('click', 'li:not(.active)', function() {
 
		var index_el = $(this).index();
						 
		$(this).addClass('active').siblings().removeClass('active');
		$(this).closest('.tabs-calendar').find('.tabs-item-calendar').removeClass('active').eq(index_el).addClass('active');
		$('.c-show').hide();
		$('.c1, .c5, .c9, .c13').show();
		initSwiper();
		return false;
						 
	});

	
	

	/***********************************/
	/*WINDOW SCROLL*/
	/**********************************/
	
	$(window).on('scroll', function () {
		wpcProgress();
		/*************Fixed-Menu*******************/

	    if ($(this).scrollTop() > 30) {
				$('.fixed-menu').css({
					'position':'fixed',
					'top':'0',
					'left':'0',
			});
			}else{
				$('.fixed-menu').css({
					'position':'absolute',
					'top':'30px',
				});
			}

		/*************Fixed-Menu*******************/
	});	

	$(window).resize(function() {
	    if ($(window).width() > 480) {
				$('.fixed-menu').css({
					'position':'fixed',
					'top':'30px'
			});
			}else{
				$('.fixed-menu').css({
					'position':'absolute',
					'top':'0px'
				});
			}		
	});

	/***********************************/
	/*VIDEO*/
	/**********************************/
	$('.cut_video_btn').on("click", function(){
		var video = $(this).data('video');			
		$(this).parents('.cut_video_block').addClass('active');
		$(this).siblings('.cut_video_iframe').attr('src',video);
		return false;
	});
	$('.cut_video_close').on("click", function(){
		$(this).parents('.cut_video_block').removeClass('active');
		$(this).siblings('.cut_video_iframe').attr('src','about:blank');
		return false;
	});



	/***********************************/
	/*BACKGROUND*/
	/**********************************/

    //sets child image as a background
    $('.s-back-switch').each(function(){
    	var $img = $(this).find('.s-img-switch');
    	var $imgSrc =  $img.attr('src');
    	var $imgDataHidden =  $img.data('s-hidden');
    	$(this).css('background-image' , 'url(' + $imgSrc + ')');
    	if($imgDataHidden){
    		$img.css('visibility', 'hidden');
    	}else{
    		$img.hide();
    	}
    });
    
    function wpc_add_img_bg( img_sel, parent_sel){

    	if (!img_sel) {
    		console.info('no img selector');
    		return false;
    	}

    	var $parent, _this;

    	$(img_sel).each(function(){
    		_this = $(this);
    		$parent = _this.closest( parent_sel );
    		$parent = $parent.length ? $parent : _this.parent();
    		$parent.css( 'background-image' , 'url(' + this.src + ')' );
    		_this.hide()
    	});

    }

    wpc_add_img_bg('.bg_img');
    wpc_add_img_bg('.author-photo img');
    
    $(".rome-videos-col").fitVids();

    /***********************************/
    /* COUNTER */
    /**********************************/
    function wpcProgress(){
    	if($('.progress-bar').length) {
    		$('.progress-bar').not('.animated').each(function(){
    			var self = $(this);    
    			if($(window).scrollTop() >= self.offset().top - $(window).height() ){
    				self.addClass('animated').find('.timer').countTo();

    				self.find('.line-fill').each(function(){
    					var objel = $(this);
    					var pb_width = objel.attr('data-width-pb');
    					objel.css({'width':pb_width});
    				});
    			}

    		});      
    	}
    } 
    

    /**********MAP**********/

    if( $('.rome-map').length ) {
    	$('.rome-map').each(function() {
    		initialize(this);
    	});
    }

    function initialize(_this) {

    	var stylesArray = {
    		'default': [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}],
    		'light-blue-theme' : [{"featureType":"landscape","stylers":[{"hue":"#FFBB00"},{"saturation":43.400000000000006},{"lightness":37.599999999999994},{"gamma":1}]},{"featureType":"road.highway","stylers":[{"hue":"#FFC200"},{"saturation":-61.8},{"lightness":45.599999999999994},{"gamma":1}]},{"featureType":"road.arterial","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":51.19999999999999},{"gamma":1}]},{"featureType":"road.local","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":52},{"gamma":1}]},{"featureType":"water","stylers":[{"hue":"#0078FF"},{"saturation":-13.200000000000003},{"lightness":2.4000000000000057},{"gamma":1}]},{"featureType":"poi","stylers":[{"hue":"#00FF6A"},{"saturation":-1.0989010989011234},{"lightness":11.200000000000017},{"gamma":1}]}],
    		'dark-red-theme': [{"featureType":"all","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"administrative.locality","elementType":"labels.text.fill","stylers":[{"color":"#c4c4c4"}]},{"featureType":"administrative.neighborhood","elementType":"labels.text.fill","stylers":[{"color":"#707070"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"landscape.man_made","elementType":"all","stylers":[{"color":"#555555"}]},{"featureType":"landscape.natural","elementType":"geometry","stylers":[{"color":"#989898"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21},{"visibility":"on"}]},{"featureType":"poi.business","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#c3060d"},{"lightness":"0"},{"visibility":"on"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"labels.text.stroke","stylers":[{"visibility":"off"},{"hue":"#ff000a"}]},{"featureType":"road.arterial","elementType":"all","stylers":[{"color":"#ee1010"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#575757"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.arterial","elementType":"labels.text.stroke","stylers":[{"color":"#2c2c2c"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#999999"}]},{"featureType":"road.local","elementType":"labels.text.stroke","stylers":[{"saturation":"-52"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"transit.station.rail","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}]
    	};

    	var markers = {
    		lat: $(_this).attr("data-lat").split(","),
    		lng: $(_this).attr("data-lng").split(",")
    	}

    	var center = {
    		lat: parseFloat(markers.lat[0]),
    		lng: parseFloat(markers.lng[0])
    	}

    	var styles, map, infowindow,
    	contentString = $(_this).attr("data-string"),
    	image = $(_this).attr("data-marker"),
    	styles_attr = $(_this).attr("data-style"),
    	zoomLevel = parseInt($(_this).attr("data-zoom"),10),
    	zoomDefault = 5,
    	myLatlng = new google.maps.LatLng(center.lat, center.lng);

    	if (isNaN(zoomLevel)) zoomLevel = zoomDefault;

    	if (!(styles_attr in stylesArray)) {
    		styles_attr = 'default';
    	}

    	styles = stylesArray[styles_attr];
			
			var styledMap = new google.maps.StyledMapType(styles,{name: "Styled Map"});

			var isDraggable = $(document).width() > 767 ? true : false;

			var mapOptions = {
				zoom: zoomLevel,
				disableDefaultUI: true,
				draggable: isDraggable,
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

			function createToggleBounce(marker) {
				var toggleBounce = function() {
					if (marker.getAnimation() !== null) {
						marker.setAnimation(null);
					} else {
						marker.setAnimation(google.maps.Animation.BOUNCE);
					}
				}
				return toggleBounce;
			}

			var bounds = new google.maps.LatLngBounds();

			for (var i = 0; i < markers.lat.length; i++) {
				var marker = new google.maps.Marker({				
					position: {
						lat: parseFloat(markers.lat[i]), 
						lng: parseFloat(markers.lng[i])
					},
					map: map,
					icon: image,
					animation: google.maps.Animation.DROP
				});	
				bounds.extend(marker.position);
				marker.addListener('click', createToggleBounce(marker));
			}

			map.fitBounds(bounds);

			var listener = google.maps.event.addListener(map, "idle", function () {
				map.setZoom(zoomLevel);
				google.maps.event.removeListener(listener);
			});
		}

		function setColsWidth(leftCol, rightCol) {
			var colLeftWidth, colRightWidth;
			if(winW > 1200) {
				colLeftWidth = (winW - 1170)/2 + 1170 * 8/12;
				$(leftCol).css('width', colLeftWidth);

				colRightWidth = (winW - 1170)/2 + 1170 * 4/12;
				$(rightCol).css('width', colRightWidth);
			}

			else if (winW <= 1200 && winW > 767) {
				colLeftWidth = (8/12) * 100;
				$(leftCol).css('width', colLeftWidth + '%');

				colRightWidth = (4/12) * 100;
				$(rightCol).css('width', colRightWidth + '%');
			}

			else {
				$(leftCol).css('width', '100%');
				$(rightCol).css('width', '100%');
			}
		}
 
		$( ".rome-charity-project" ).hover(function() {
			$(this).children( ".charity-project-info-container" ).fadeToggle( 200 );
		});

	})(jQuery, window, document);

;(function($, window, document, undefined) {
    "use strict";
 
    var $first_child_link = $('.menu-item-has-children > a').append('<span class="fa fa-angle-down"></span>');
 
    $('.nav-menu-icon').on('click', function(e) {
        $(this).toggleClass('active');
        $('.wpc-navigation').toggleClass('active');
    });
 
    $first_child_link.find('span').click(function(e) {
        $(this).closest('li').toggleClass('active');
    });

    $('.main-menu').on('click', 'li',function(e) {
        var asd = $(this);
        asd.find('.sub-menu').toggle();
    });

/************Animate-js*****************/

function testAnim(x) {
    $('#animationSandbox').removeClass().addClass(x + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
      $(this).removeClass();
    });
  };

  $(document).ready(function(){
    $('.js--triggerAnimation').click(function(){
      var anim = $('.js--animations').val();
      testAnim(anim);
    });
        $('.js--animations').change(function(){
      var anim = $(this).val();
      testAnim(anim);
    });
});

/************Modal-Animate*****************/

$("#modal").addClass("animated bounceInDown");
$(".timeline-bg ul li:nth-child(odd)").addClass("animated fadeInLeft");
$(".timeline-bg ul li:nth-child(even)").addClass("animated fadeInRight");
$(".rome-slider-calendar").addClass("animated flipInX");
$(".calendar-block ").addClass("animated slideInUp");
$(".tabs-item").addClass("animated zoomIn");

/************Background-icon*****************/

	function wpc_add_img_bg( img_sel, parent_sel){
    
    if (!img_sel) {
      console.info('no img selector');
      return false;
    }
 
    var $parent, _this;
 
    $(img_sel).each(function(){
      _this = $(this);
      $parent = _this.closest( parent_sel );
      $parent = $parent.length ? $parent : _this.parent();
      $parent.css( 'background-image' , 'url(' + this.src + ')' );
      _this.hide()
    });
 
  }

 $(window).on('load', function(){
     wpc_add_img_bg( '.fon-1' );
 });

/************Tabs*****************/

$('.tabs-header').on('click', 'li:not(.active)', function() {
 
    var index_el = $(this).index();
 
    $(this).addClass('active').siblings().removeClass('active');
    $(this).closest('.tabs').find('.tabs-item').removeClass('active').eq(index_el).addClass('active');
    return false;
 
});

/************Preloader*****************/

$(window).on('load', function () {
    var $preloader = $('.page-preloader'),
        $spinner   = $preloader.find('.spinner');
    $spinner.fadeOut();
    $preloader.delay(350).fadeOut('slow');
});

/************Search-modal*****************/

$('.search-form').on('click', 'a', function(){
  $('#modal').arcticmodal();
})

/************Video*****************/

$(".rome-main-project").fitVids();

/************Video*****************/

  $('.play-but-first').on('click', function() {
    var videoSrc = $(this).attr('data-video');
    $('.video-iframe-first').attr('src', videoSrc).show();
    $('.play-but-first').hide();
    $('.close-but-first').show();
    return false
  });
  $('.close-but-first').on('click', function() {
    $('.video-iframe-first').attr('src', 'about:blank').hide();
    $('.play-but-first').show();
    $('.close-but-first').hide();
    return false
  });

  $('.play-but-second').on('click', function() {
    var videoSrc = $(this).attr('data-video');
    $('.video-iframe-second').attr('src', videoSrc).show();
    $('.play-but-second').hide();
    $('.close-but-second').show();
    return false
  });
  $('.close-but-second').on('click', function() {
    $('.video-iframe-second').attr('src', 'about:blank').hide();
    $('.play-but-second').show();
    $('.close-but-second').hide();
    return false
  });

/************Isotope*****************/
    
    var $container = $('.iconContainer'); 
    $container.isotope({ 
      filter: '*', 
      animationOptions: { 
        duration: 750, 
        easing: 'linear', 
        queue: false, 
      } 
    }); 
    
    $('.gallery-menu').on('click', 'a', function(){ 
      $(this).parent().siblings().find('a').each(function(){
        $(this).removeClass('gallery-menu-active');        
      })
      $(this).addClass('gallery-menu-active');

      var selector = $(this).attr('data-filter'); 
      $container.isotope({ 
        filter: selector, 
        animationOptions: { 
          duration: 750, 
          easing: 'linear', 
          queue: false, 
        } 
      }); 
      return false; 
    });     
    
    $('.iconContainer').masonry({
        itemSelector: '.item'
    });    
    

   
 
})(jQuery, window, document);
