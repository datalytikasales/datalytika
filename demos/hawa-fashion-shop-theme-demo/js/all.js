/*
 * jQuery throttle / debounce - v1.1 - 3/7/2010
 * http://benalman.com/projects/jquery-throttle-debounce-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function(b,c){var $=b.jQuery||b.Cowboy||(b.Cowboy={}),a;$.throttle=a=function(e,f,j,i){var h,d=0;if(typeof f!=="boolean"){i=j;j=f;f=c}function g(){var o=this,m=+new Date()-d,n=arguments;function l(){d=+new Date();j.apply(o,n)}function k(){h=c}if(i&&!h){l()}h&&clearTimeout(h);if(i===c&&m>e){l()}else{if(f!==true){h=setTimeout(i?k:l,i===c?e-m:e)}}}if($.guid){g.guid=j.guid=j.guid||$.guid++}return g};$.debounce=function(d,e,f){return f===c?a(d,e,false):a(d,f,e!==false)}})(this);

;(function($, window, document, undefined) {
	"use strict";

	if($("#video").length) {
		$.getScript('js/jquery.youtubebackground.html', function() {
	  		//postpone execution not the end of execution queue.
	  		if ($(window).width() >= 1200) {
	  			setTimeout(function() {
	  				$('#video').YTPlayer({
	  					fitToBackground: true,
	  					videoId: 'wJF5NXygL4k',
	  					playerVars: {
	  						modestbranding: 0,
	  						autoplay: 1,
	  						controls: 0,
	  						showinfo: 0,
	  						branding: 0,
	  						rel: 0,
	  						autohide: 1,
	  						start: 0
	  					}
	  				});
	  			}, 0);
	  		}
	  	});
	}

	var swipers = [],
		_ismobile = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i),
		_isIOS = navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i);
	/*------------------------------------*/ 
	/*   FUNCTION  PAGECALCULATIONS    */ 
	/*------------------------------------*/

	if (typeof pageCalculations !== 'function') { 

		  var $win, winW, winH, winS, pageCalculations;

		  pageCalculations = function (func){
			$win = $(window);
			winW = $win.width();
			winH = $win.height();
			winS = $win.scrollTop();

			if (func) {

				$win
					.on('load',function(){
						func();
					})
					.on('resize',function(){
						func();
					});

				window.addEventListener("orientationchange", 
					function() {
						func();
					}, false);

			}

		  }

		  pageCalculations(function(){
			pageCalculations();
			izotope_portfolio();
		  });

	}

	if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1){
		$('body').addClass('firefox');
	}
	
	/*============================*/
	/* Header navigation show */
	/*============================*/
	$(".hawa-nav-menu-icon").on( 'click', function () {
		
		if($('header').hasClass( 'header-animate')){
			$('.hawa-navigation').css('overflow','hidden');
			$('header').removeClass( 'header-animate');
			$("nav").on("transitionend webkitTransitionendEnd oTransitionendEnd MSTransitionendEnd", function(){ 
				$('.hawa-navigation').css('overflow','hidden');
			});
		}
		else {
			$('header').addClass( 'header-animate');
			$("nav").on("transitionend webkitTransitionendEnd oTransitionendEnd MSTransitionendEnd", function(){ 
				$('.hawa-navigation').css('overflow','visible');
			});
		}

	});


	/*==================================================*/
	/* TIMES */
	/*==================================================*/

	if( $('#comming-soon').length ) {

		var end_date = $('#comming-soon').attr('data-time');

		$('#comming-soon').ClassyCountdown({
			theme: "flat-colors",
			end:  end_date,
			now: $.now() / 1000,
			style: {
				  element: '',
				  labels: false,
				  days: {gauge: {fgColor: 'rgba(255,255,255,0)'}},
				  hours: {gauge: {fgColor: 'rgba(255,255,255,0)'}},
				  minutes: {gauge: {fgColor: 'rgba(255,255,255,0)'}},
				  seconds: {gauge: {fgColor: 'rgba(255,255,255,0)'}}
				}
		});
	}

	/*============================*/
	/*           SKILLS           */
	/*============================*/

	var run_skills = function () {
		if ($('.skill-line').length) {
			$('.skill-line').not('.animated').each(function(){
				if($(window).scrollTop() >= $(this).offset().top-$(window).height()*0.7 ) {

					$(this).addClass('animated').find('.timer').countTo();

					$(this).find('div').each(function(){
						var objel = $(this);
						var pb_width = objel.attr('data-width-pb');
						objel.css({'width':pb_width});
					});
				}
			});
		}
	}

	/***********************************/
	/* BACKGROUND*/
	/**********************************/

	//sets child image as a background
	function wpc_add_img_bg( img_sel, parent_sel){

		if (!img_sel) {
			console.info('no img selector');
			return false;
		}

		var $parent, $imgDataHidden, _this;

		$(img_sel).each(function(){
			_this = $(this);
			$imgDataHidden = _this.data('s-hidden');
			$parent = _this.closest( parent_sel );
			$parent = $parent.length ? $parent : _this.parent();
			$parent.css( 'background-image' , 'url(' + this.src + ')' ).addClass('s-back-switch');
			if ($imgDataHidden) {
				_this.css('visibility', 'hidden');
			} else {
				_this.hide();
			}
		});

	}


	/*============================*/
	/*           COUNTERS         */
	/*============================*/
	var counters = function() {
		$(".hawa-counter .timer").not('.animated').each(function(){
			if($(window).scrollTop() >= $(this).offset().top-$(window).height()*0.7 ) {
				$(this).text($(this).attr("data-to"));
				$(this).addClass('animated').countTo({speed: $(this).attr("data-speed")});
			}
			
		});
	}


	/*============================*/
	/*           IZOTOPE         */
	/*============================*/

	var izotope_portfolio = function () {
		
		if ( $('.izotope-container').length ) { 

			$('.izotope-container').each(function(){

				var $container = $(this).find('.pc');
				var $filter = $(this).find('.filters');

				if ($container.hasClass('hawa_masonry') && $container.hasClass('gutter')){
					$container.isotope({
						itemSelector: '.pi',
						layoutMode: 'masonry'
					});
				} else if( $container.hasClass('hawa_masonry') ) {
					$container.isotope({
						itemSelector: '.pi',
						layoutMode: 'masonry'
					});
				} else {
					$container.isotope({
						itemSelector: '.pi',
						layoutMode: 'fitRows'
					});
				}

				/* Filter */
				$filter.on('click', '.but', function() {

					$filter.find('.but').removeClass('activbut');
					$(this).addClass('activbut');

					var filterValue = $(this).attr('data-filter');
						$container.isotope({filter: filterValue});
					return false;
				});
			});
		}
	}
	

	/*============================*/
	/*          BUTTON TOP        */
	/*============================*/

	var offset = 300,
		offset_opacity = 1200,
		scroll_top_duration = 700,
		$back_to_top = $('#scroll-top');

	$back_to_top.hide();

	//hide or show the "back to top" link
	$(window).scroll(function(){
		if ( $(this).scrollTop() > 500 ) {
			$back_to_top.fadeIn();
		} else {
			$back_to_top.fadeOut();
		}
	});


	//smooth scroll to top
	$back_to_top.on('click', function(event){
		event.preventDefault();
		$('body,html').animate({
			scrollTop: 0 ,
			}, scroll_top_duration
		);
	});


	$('.scroll-link').on('click', function() {
		event.preventDefault();
		$('body, html').animate({
			scrollTop: $( '.' + $(this).attr('data-scroll-to') ).offset().top
		}, 1500);
	});


	/*============================*/
	/*            TABS            */
	/*============================*/

	$('.tabs-header').on('click', 'li:not(.active)', function(event) {
		
		event.preventDefault();

		var index_el = $(this).index();

		$(this).addClass('active').siblings().removeClass('active');
		$(this).closest('.hawa-tabs').find('.tabs-item').removeClass('active').eq(index_el).addClass('active');

	});

	// Tabs detail blog

	$('.categ-comments').find('li').on('click', function() {
		
		var index_el = $(this).index();

		$(this).addClass('active').siblings().removeClass('active');
		$('.tabs-comments').find('.tab-comment').removeClass('active').eq(index_el).addClass('active');

	});
	

	/*=================================*/
	/*   		GOOGLE MAP             */
	/*=================================*/

	if ($('.hawa-map').length) {
		$('.hawa-map').each(function() {
			initialize(this);
		});
	}

	function initialize(_this) {

		var stylesArray = {
			//style 1
			'style-1': [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#ffffff"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":17},{"weight":1.2}]},{"featureType":"administrative","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"administrative.country","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"administrative.country","elementType":"geometry","stylers":[{"visibility":"simplified"}]},{"featureType":"administrative.country","elementType":"labels.text","stylers":[{"visibility":"simplified"}]},{"featureType":"administrative.province","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"administrative.locality","elementType":"all","stylers":[{"visibility":"simplified"},{"saturation":"-100"},{"lightness":"30"}]},{"featureType":"administrative.neighborhood","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"administrative.land_parcel","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"all","stylers":[{"visibility":"simplified"},{"gamma":"0.00"},{"lightness":"74"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#010101"},{"lightness":20}]},{"featureType":"landscape.man_made","elementType":"all","stylers":[{"lightness":"3"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road","elementType":"geometry","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#262626"},{"lightness":17}]}]
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

		var styledMap = new google.maps.StyledMapType(styles, { name: "Styled Map" });

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


	/*=================================*/
	/*   		SEARCH POPUP           */
	/*=================================*/

	$('.hawa-search-btn, .hawa-search-btn .fa').on('click', function() {
		
		if( ! $('.layer-dark').length ) {
			var search_form = $('.popup-search-wrapper > .search-form');

			search_form.addClass('popup-search');
			
			if( ! $('.close-search').length ) {
				search_form.append('<span class="close-search"></span>');
			}

			$('body').append('<div class="layer-dark"></div>').addClass('act');


		}

		return false;

	});

	$('body').on('click', '.close-search, .layer-dark', function() {

		$('.search-form').removeClass('popup-search');
		$('body').removeClass('act');
		$('.layer-dark').remove();

		return false;

	});

	$(".search-submit").on('click', function(e) {
		e.preventDefault();
	});

	$(".gallery-icon > a").on('click', function(e) {
		e.preventDefault();
	});



	/*=================================*/
	/* 			SWIPER SLIDER          */
	/*=================================*/
	var xsPoint = 700, smPoint = 991, mdPoint = 1199; 
	var xsValue, smValue, mdValue, lgValue;

	$(window).on('resize orientationchange', function () {
		resizeCall();
	});

	function resizeCall() {
		pageCalculations();
		$('.swiper-container.initialized[data-slides-per-view="responsive"]').each(function () {
			var thisSwiper = swipers['swiper-' + $(this).attr('id')],
				$t = $(this),
				centerVar = thisSwiper.params.centeredSlides,
				slidesPerViewVar = $t.attr('data-slides-per-view');

			if( slidesPerViewVar == 'responsive' ){ 
				xsValue = parseInt($t.attr('data-xs-slides'),10);
				smValue = parseInt($t.attr('data-sm-slides'),10);
				mdValue = parseInt($t.attr('data-md-slides'),10);
				lgValue = parseInt($t.attr('data-lg-slides'),10);
				slidesPerViewVar = updateSlidesPerView(xsValue, smValue, mdValue, lgValue);
			}

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

	function initSwiper() {
		var initIterator = 0;
		$('.swiper-container').each(function() {
			var $t = $(this);
			var $wrapper = $t.closest('.hawa-slider');
			var count_item = $t.find('.swiper-slide').length;
			var index = 'swiper-unique-id-' + initIterator;

			$t.find('.swiper-slide').each(function(l, i){
				$(this).attr('data-val', l);
			});
 
			$t.addClass('swiper-' + index + ' initialized').attr('id', index);
			$t.find('.pagination').addClass('pagination-' + index);

			var setThumb = function(activeIndex){
				var url_thumb,
					left_img = $t.find('.slide-prev'),
					right_img = $t.find('.slide-next'),
					activeIndexLeft, activeIndexRight;

				activeIndexLeft = ( activeIndex - 1 >= 0 ) ? activeIndex - 1 :  count_item - 1;
				activeIndexRight = ( activeIndex + 1 < count_item ) ? activeIndex+1 :  0;

				url_thumb = $t.find('.swiper-slide[data-val="' + activeIndexLeft + '"] img').attr('src');
				left_img.find('span').attr('style', 'background-image: url(' + url_thumb + ')' );

				url_thumb = $t.find('.swiper-slide[data-val="' + activeIndexRight + '"] img').attr('src');
				right_img.find('span').attr('style', 'background-image: url(' + url_thumb + ')' );

			}
 
			var autoPlayVar = parseInt($t.attr('data-autoplay'), 10);
			var mode = $t.attr('data-mode');
			var centerVar = parseInt($t.attr('data-center'), 10);
			var simVar = ($t.closest('.circle-description-slide-box').length) ? false : true;
			var xsValue, smValue, mdValue, lgValue;
			var slidesPerViewVar = $t.attr('data-slides-per-view');
			if( slidesPerViewVar == 'responsive' ){
				xsValue = parseInt($t.attr('data-xs-slides'),10);
				smValue = parseInt($t.attr('data-sm-slides'),10);
				mdValue = parseInt($t.attr('data-md-slides'),10);
				lgValue = parseInt($t.attr('data-lg-slides'),10);
				slidesPerViewVar = updateSlidesPerView(xsValue, smValue, mdValue, lgValue);
			} else if( slidesPerViewVar == 'auto' ){
				slidesPerViewVar = 'auto';
				centerVar = true;

			} else { slidesPerViewVar = parseInt(slidesPerViewVar,10); }
 
			var loopVar = parseInt($t.attr('data-loop'), 10);
			var speedVar = parseInt($t.attr('data-speed'), 10);
 
			swipers['swiper-' + index] = new Swiper('.swiper-' + index, {
				speed: speedVar,
				pagination: '.pagination-' + index,
				loop: loopVar,
				loopedSlides: 4,
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
					if( $wrapper.hasClass( 'show-preview' ) ) {
						setThumb( 0 );
					}
				},
				onSlideChangeEnd: function(swiper) {
					var activeIndex = (loopVar === 1) ? swiper.activeLoopIndex : swiper.activeIndex;
					swiper.startAutoplay();
				},
				onSlideChangeStart: function(swiper) {
					var activeIndex = (loopVar=== 1)?swiper.activeIndex:swiper.activeLoopIndex;
					$t.find('.slider-counter span i').text(activeIndex+1);
					$t.find('.swiper-slide.active').removeClass('active');
 
					var activeIndex = (loopVar === 1) ? swiper.activeLoopIndex : swiper.activeIndex;
					if( $wrapper.hasClass('show-preview') ) {
						setThumb( activeIndex );
					}
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
		swipers['swiper-' + $(this).closest('.hawa-slider, .hawa-image-slider').find('.swiper-container').attr('id')].swipePrev();
		swipers['swiper-' + $(this).parent().attr('id')].startAutoplay();
		return false;
	});
 
	$('.slide-next').on('click', function() {
		swipers['swiper-' + $(this).closest('.hawa-slider, .hawa-image-slider').find('.swiper-container').attr('id')].swipeNext();
		swipers['swiper-' + $(this).parent().attr('id')].startAutoplay();
		return false;
	});
 
	function updateSlidesPerView(xsValue, smValue, mdValue, lgValue){
		if(winW > mdPoint) return lgValue;
		else if(winW>smPoint) return mdValue;
		else if(winW>xsPoint) return smValue;
		else return xsValue;
	}   


	// Count Swiper Slide 

	var count_slide = $('.hawa-image-slider').find('.swiper-slide').length;
	$('.hawa-image-slider').find('.count-slide').html( count_slide );

	/*=================================*/
	/*          Contact Form    		   */
	/*=================================*/
	$('.js-contact-form, .hawa-contact-form').submit(function(e){

        $('.ajax-loader').show();

        var url = 'mail.html',
            form = this;

        $(form).find('[name="fields[code]"]').remove();

        function result(class_key, data){
          setTimeout(function(){
            $('.ajax-loader').hide();
            $('.ajax-result').find(class_key).show().text(data);
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
          result('.error', data);
        })

        e.preventDefault(); 

      });


	/*=================================*/
	/*             BG BLOCK 		   */
	/*=================================*/

	// bg banner
	$('.img-page-header').each(function() {
		var bgSrc = $(this).attr('src');
		$(this).parent().addClass('background-page-header').css({
			'background-image': 'url(' + bgSrc + ')'
		});
		$(this).hide();
	});


	/*=================================*/
	/*    POPUP VIDEO AND PORTFOLIO	   */
	/*=================================*/

	$('.video-btn').magnificPopup({
			type: 'iframe'
	});

	$(".gallery-icon > a").on('click', function(e){
		console.log("test");
		e.preventDefault();
	})

	
	$('.blog .format-image .post-header .gallery, .single-format-image .post-header .gallery').each(function(){
		$(this).addClass('popup-gallery');
		$(this).find('a').addClass('view-item').attr('data-effect', 'zoomIn');
		$(this).find('a').each(function(){
			$(this).attr('href', $(this).find('img').attr('src'));
		});
	});

	// Popup Gallery
	
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


	/*=================================*/
	/*          ALERT MESSAGES         */
	/*=================================*/
	
	$('.hawa-msg').on('click', '.close', function() {
		
		$(this).parent().hide();

	});

	/*=================================*/
	/*          PARALLAX EFFECT        */
	/*=================================*/

	function paralax_scroling() {

		if( $('.img-paralax, .paralax-slider').length ) {
			var scrollPosition = $(window).scrollTop() / 4;
			$('.img-paralax, .paralax-slider').css('bottom', '-' + scrollPosition + 'px');
		}

	}


	// Shop button product
	$('.hover-product .add_to_cart_button, .hover-product .add_to_wishlist').html('');

	$('.color-item').css('width','auto');



	/*============================*/
	/* WINDOW LOAD                */
	/*============================*/
	izotope_portfolio();

	$(window).on('load', function(){
		
		/* add  left retreat for block skills */ 
		$(".hawa-skill-block.modern .title").each(function(){
			$(this).siblings().children().children().css("left", $(this).width()+15);
		});

		run_skills();

		$('#loading').hide();

		counters();

		izotope_portfolio();

		wpc_add_img_bg('.s-img-switch', '.s-back-switch');

		$('.masonry .hawa-blog-content').masonry({

			itemSelector: '.hawa-post',
			columnWidth: '.hawa-post'

		});

		initSwiper();


		if( $('.img-fixed').length ) {
			$('.img-fixed').each(function(){
				$(this).closest('.hawa-banner').css({
					'background-image' : 'url(' + $(this).attr('src') + ')',
					'background-attachment' : 'fixed',
					'background-size' : 'cover',
					'background-position' : 'center',
					'height' : $(this).height()
				});
				if (_isIOS) {
					$(this).closest('.hawa-banner').css({
						'background-attachment' : 'initial'
					});
				}
				$(this).hide();
			});
		}

		hawaResponsiveMenu();
	});

	/*============================*/
	/* WINDOW RESIZE              */
	/*============================*/
	
	$(window).on('resize', function(){

		run_skills();

		izotope_portfolio();

		counters();

		$('.masonry').masonry({

			itemSelector: '.hawa-post',
			columnWidth: '.hawa-post'

		});

		hawaResponsiveMenu();

	});
	
	
	/*============================*/
	/* WINDOW SCROLL              */
	/*============================*/

	
	$(window).scroll(function() {
	   
		run_skills();

		counters();
			
		paralax_scroling();
			
	});
	
	/*=============================*/
	/* Add background image footer */
	/*=============================*/

	var srcImg = $(".main-footer");
	if( srcImg.attr('data-src') != undefined ) {
		srcImg.css("background-image", "url("+srcImg.attr('data-src')+")");
	}

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

	wpc_add_img_bg('.bg_img','.bg_img_parent');

	/*====================================*/
	/* Add background image pricing block */
	/*====================================*/
	
	$(".hawa-price-block .price").each(function(){
		$(this).css("background-image", "url("+$(this).attr('data-img')+")");
	});

	/*====================================*/
	/*        Add background qoute        */
	/*====================================*/

	$(".format-quote .hawa-qoute-post").css("background-image", "url("+$(".format-quote .post-header img").attr('src')+")");

	/*============================*/
	/* Enable responsive video    */
	/*============================*/

	$(".container").fitVids();

	/*============================*/
	/*           SLIDER           */
	/*============================*/

	$(".format-gallery .post-header").prepend("<button class='sliderbut prev'></button><button class='sliderbut next'></button>");


	;(function( $ ){

	$.fn.prodSlider = function(options) {

		var set = $.extend( {
		  'list'        : '> ul',
		  'listItem'    : '> li',
		  'margin' : 0,
		  'button'      : '.sliderbut',
		  'classButR' : 'next',
		  'classButL' : 'prev',
		  'elemImg'     : 'img',
		  'effect'      : 'fade',
		  'timePreload' : '3000',
		  'delay'       : '2000',
		  'bebug'       : 0,
		  'autoplay'    : true
		}, options);

		this.each(function(i,el) {

			var _this = $(el);

			var elThis, elActive, timer,
				elUl = _this.find(set.list),
				button = _this.find(set.button);


			_this.css({
				'position' : 'relative'
			});
			elUl.css({
				'position' : 'relative'
			});

			if (set.bebug) {
				console.log('/// debug init ///');
				//console.log(this);
				console.log('element list:'+elUl[0]);
				console.log('element button: '+set.button);
				console.log('/// debug init ///');
			}

		var timeout = function(time){
				timer = setTimeout(function() { sliderRun('',set.effect); }, time);
			},
			sliderRun = function(th,effect) {
				set.bebug && console.log('');
				set.bebug && console.log('/// debug play ///');
				set.bebug && console.log('effect: '+effect);
				set.bebug && console.log(elUl[0]);

				effect = set.effect;

				clearTimeout(timer);

				var elLi = elUl.find(set.listItem).removeClass('active');

				if(!elUl.is(':animated')){

					var direct = (th && $(th).hasClass(set.classButL)) ? 'left' : 'right';

					elLi.length > 1 && elUl.animate({left: ( direct == 'left' ? ((elLi.width())+(set.margin)) : -((elLi.width())+(set.margin)) ) }, 700, function(){

						if(direct == 'left'){
				
							elLi.length > 1 && elUl.prepend(elLi.last());
							set.bebug && console.log('direct: '+direct);
						} else {
							elLi.length > 1 && elUl.append(elLi[0]);
							set.bebug && console.log('direct: '+direct);
						}

						elUl.css('left', 0 );

						set.autoplay && timeout(set.delay);

					});
					elLi.length == 1 && $(th).parent().find(set.button).hide();
				}

				set.bebug && console.log('/// debug play ///');
				set.bebug && console.log('');
			}

			if (set.effect == 'slide') {
				elLi = elUl.find(set.listItem);
				elLi.length > 1 && elUl.css({'left':0});
				elLi.removeClass('active');
			}

			set.autoplay &&  timeout(set.timePreload);

			_this.mouseover(function(){
				clearTimeout(timer);
			});
			_this.mouseleave(function(){
				set.autoplay && timeout(1000);
			});

			button.click(function(){
				sliderRun(this,set.effect);
				return false;
			})

		});

		return this;

	}


	})( jQuery );

	$(".format-gallery").prodSlider({
		'list'        : '.gallery',
		'listItem'    : '.gallery-item',
		'button'      : '.sliderbut',
		'classButR' : 'next',
		'classButL' : 'prev',
		'autoplay'  : false
	});

	
	/*============================*/
	/*    ADD BACKGROUND IMAGE    */
	/*============================*/ 

	$(".format-gallery .gallery-icon").each(function(){
		$(this).css("background-image", "url("+$(this).children().children().attr('src')+")");
	});


	/*============================*/
	/* Absolute image position    */
	/*============================*/

	if( $('.absolute-image').length ) {
		$('.absolute-image').each(function(){
			$(this).closest('.wpb_wrapper').css('position','relative');
			var $image = $(this).find('img');
			$(this).css({
				'position': 'absolute',
				'width': $image.attr("width")
			});
		});
	}

	$('.menu-item-has-children > a').find('span').click(function(e) {
		$(this).closest('li').toggleClass('active');
		return false;
	});

	$('.hawa-navigation a').on('click', function(e){
		var href = $(this).attr('href');
		if( href == '#'){
			return false;
		}

	});

	function hawaResponsiveMenu(){
		var containerWidth = $('.top-header').outerWidth() - 30;
		var logoWidth = $('.top-header .hawa-logo').outerWidth();
		var menuIcon = $('.top-header .hawa-nav-menu-icon').outerWidth();

		$('.top-header .hawa-logo').outerWidth(logoWidth);
		$('.top-header .hawa-navigation').width( containerWidth - logoWidth);
		$('.hawa-main-header .hawa-navigation nav').css('width', containerWidth - logoWidth - menuIcon);
	}

	function hawaUniqueArray(list) {
		var array = list, i = array.length, result = [];
		array.sort(function(a,b) {
			return b-a;
		});
		while(i--){
			if( result.join().search(array[i]+'\\b') == '-1' ) {
				result.push(array[i]);
			}
		}
		return result;
	}

	if( $(window).width() > 976 ) {
		/* Second level menu */
		$('.main-menu > .menu-item-has-children').mouseover(function(){
			var $child = $(this).children('.sub-menu'),
				$left_position;
			if( $child.length ) {
				$left_position = ( $(window).width() - ( $child.offset().left + $child.outerWidth() ) );

				if( $left_position < 0 ) {
					$child.css('left', ( $left_position - 10 ) );
				}
			}
		});

		/* Third level menu  */
		$('.main-menu .sub-menu .menu-item-has-children').mouseover(function(){
			var $child = $(this).children('.sub-menu'),
				$left_position;
				if( $child.length ) {
					$left_position = ( $(window).width() - ( $child.offset().left + $child.outerWidth() ) );

				if( $left_position < 0 ) {
					$child.addClass('reverse');
				}
			}
		});
	}


	if( $('.hawa-process .hawa-process-item').length ) {
		var el_height = 0;
		$('.hawa-process .hawa-process-item').each(function(){
			if( $(this).height() > el_height ) {
				el_height = $(this).height();
			}
		});
		$('.hawa-process .hawa-process-item').height( el_height );
	}

	if( $('.wpb_wrapper .hawa-icon-text').length ) {
		var el_height = 0;
		$('.wpb_wrapper').find('.hawa-icon-text').each(function(){
			if( $(this).height() > el_height ) {
				$('.wpb_wrapper').find('.hawa-icon-text').height($(this).height());
			}
		});
	}

	/* OnePage menu scroll */
	$('.menu-scroll').on('click', 'a', function() {
		$('.main-menu li').removeClass('active');
		var $hash = $(this).attr('href').split('#');
		if( $hash.length > 1 ) {
			$('html, body').animate({
				scrollTop: $("#" + $hash[1]).offset().top
			}, 600);
			$(this).closest('li').addClass('active');
			return false;
		}
	}); 

	// function hideVideoText() {
	// 	if( $('.hawa-video-banner.background-enable').length && _ismobile ) {
	// 		$('.hawa-video-banner.background-enable').each(function(){
	// 			$(this).find('.video-content').hide();
	// 		});
	// 	}
	// }
	// hideVideoText();

	/***********************************/
	/*ANIMSITION PLUGIN FOR PAGE TRANSITION*/
	/**********************************/
		
	if($(".animsition").length){
	   $(".animsition").animsition({
			inClass               :   'zoom-in-sm',
			outClass              :   'zoom-out-sm',
			inDuration            :    700,
			outDuration           :    700,
			linkElement           :   'a[href]:not([target="_blank"]):not([href^="#"]):not([data-rel="prettyPhoto[product-gallery]"]):not(.animsition-link)',
			loading               :    false,
			loadingParentElement  :   'body', 
			loadingClass          :   'animsition-loading',
			unSupportCss          : [ 'animation-duration',
									  '-webkit-animation-duration',
									  '-o-animation-duration'
									],
			overlay               :   false,

			overlayClass          :   'animsition-overlay-slide',
			overlayParentElement  :   'body'
		});
	}

	/* Show menu on page load - only for desktops */ 
	if( $('.hawa-show-menu').length && ! _ismobile ) {
		$('.hawa-nav-menu-icon').trigger('click');
	}

	
								(function() {
									if (!window.mc4wp) {
										window.mc4wp = {
											listeners: [],
											forms    : {
												on: function (event, callback) {
													window.mc4wp.listeners.push({
														event   : event,
														callback: callback
													});
												}
											}
										}
									}
								})();

	$('.country_select').selectpicker({
		style: 'billing_country_field',
		size: 'auto',
		width: '100%'
	});

	$('input').on('click',function () {
		if ($('.input-checkbox').is(':checked')) {
			$(".woocommerce-billing-fields div.create-account").slideDown();
		}
		else {
			$(".woocommerce-billing-fields div.create-account").slideUp();
		}
	});

	var sliderPrice = document.getElementById('price_slider');
	
	if (sliderPrice) {
		noUiSlider.create(sliderPrice, {
			start: [40, 840],
			connect: true,
			range: {
				'min': 0,
				'max': 1200
			},
			format: wNumb({
				decimals: 2,
				thousand: '.',
				prefix: '£',
			})
		});

		var marginMin = document.getElementById('slider-margin-value-min'),
		marginMax = document.getElementById('slider-margin-value-max');

		sliderPrice.noUiSlider.on('update', function ( values, handle ) {
			if ( handle ) {
				marginMax.innerHTML = values[handle];
			} else {
				marginMin.innerHTML = values[handle];
			}
		});
	}

	$(".product-color > span").on('click', function (){
		$(".product-color > span.active").removeClass('active');
		$(this).addClass('active');
	})

	if ($(".hawa-logo a img").length) {
		$(".hawa-logo a").css("border-bottom", "none");
		$(".hawa-logo").css("padding", "0");
		$(".hawa-lines").css("display", "none");
	}

})(jQuery, window, document);