 "use strict";  
/*========== Custome 1 Slider start ================*/


$('.custom1').owlCarousel({
    animateOut: 'fadeOut',
    items:1,
	nav:true,
	dots:false,
	autoplay:true,
	loop:true
});


/*========== Custome 1 Slider end ================*/



/*========== Custome 2 Slider start ================*/


$('.custom2').owlCarousel({
    animateOut: 'fadeOut',
    items:1,
	nav:false,
	dots:true,
	autoplay:true,
	loop:true
});


/*========== Custome 2 Slider end ================*/




/*========== Testimonials Slider start ================*/


$('.testi_slider').owlCarousel({
    items:1,
	nav:false,
	dots:true,
	autoplay:true,
	loop:true
});


/*========== Testimonials Slider end ================*/



/*========== Timeline Slider start ================*/


$('.timeline_slider').owlCarousel({
    items:4,
	nav:true,
	dots:true,
	autoplay:false,
	responsiveClass:true,
    responsive:{
        0:{
            items:1
        },
        480:{
            items:2
        },
		768:{
            items:4
        },
		640:{
            items:4
        },
        1000:{
            items:4
        }
	}
});


/*========== Timeline Slider end ================*/




/*========== Featured Work start ================*/

$(function () {
	var filterList = {
		init: function () {
			// MixItUp plugin
			// http://mixitup.io
			$('#portfoliolist').mixitup({
				targetSelector: '.portfolio',
				filterSelector: '.filter',
				effects: ['fade'],
				easing: 'snap',
				// call the hover effect
				onMixEnd: filterList.hoverEffect()
			});				
		},
		hoverEffect: function () {
			// Simple parallax effect
			$('#portfoliolist .portfolio').hover(
				function () {
					$(this).find('.label').stop().animate({bottom: 0}, 200, 'easeOutQuad');
					$(this).find('img').stop().animate({top: -30}, 500, 'easeOutQuad');				
				},
				function () {
					$(this).find('.label').stop().animate({bottom: -40}, 200, 'easeInQuad');
					$(this).find('img').stop().animate({top: 0}, 300, 'easeOutQuad');								
				}		
			);				
		}
	};
	// Run the show!
	filterList.init();		
});


$(function () {
	var filterList = {
		init: function () {
			// MixItUp plugin
			// http://mixitup.io
			$('#portfoliolist1').mixitup({
				targetSelector: '.portfolio',
				filterSelector: '.filter',
				effects: ['fade'],
				easing: 'snap',
				// call the hover effect
				onMixEnd: filterList.hoverEffect()
			});				
		},
		hoverEffect: function () {
			// Simple parallax effect
			$('#portfoliolist1 .portfolio').hover(
				function () {
					$(this).find('.label').stop().animate({bottom: 0}, 200, 'easeOutQuad');
					$(this).find('img').stop().animate({top: -30}, 500, 'easeOutQuad');				
				},
				function () {
					$(this).find('.label').stop().animate({bottom: -40}, 200, 'easeInQuad');
					$(this).find('img').stop().animate({top: 0}, 300, 'easeOutQuad');								
				}		
			);				
		}
	};
	// Run the show!
	filterList.init();		
});
/*========== Featured Work end ================*/

/* Masonry Function */
	function MasonryPortfolio() {	
		
		if( $('#portfolio-wrap').length > 0 ){	
		
			var $container = $('#portfolio');
			$container.isotope({
			  itemSelector: '.grid-item',
			  gutter:0,
			  transitionDuration: "0.5s"
			});
			
			$('#filters a').on('click',function(){
				$('#filters a').removeClass('active');
				$(this).addClass('active');
				var selector = $(this).attr('data-filter');
				/*$container.isotope({ filter: selector });		*/
				$container.isotope({ filter: selector });		
				return false;
			});
			
			
			$(document).scroll(function () {
				if($('.auto-construct').length > 0 ){
					var y = $(this).scrollTop();
					var t = $('#portfolio').offset().top + $('#portfolio').height() - window.innerHeight;
					if (y > t) {
						$('#portfolio').removeClass('auto-construct');
					} 
				}
			});
			
			$(window).on( 'resize', function () {
				
				var winWidth = window.innerWidth;
				columnNumb = 1;			
				var attr_col = $('#portfolio').attr('data-col');
					
				if (winWidth >= 1025) {
					if($("body").hasClass("full_masonary")){
					$('#portfolio-wrap').css( {width : (winWidth-40)  + 'px'});
					$('#portfolio-wrap.no-gutter').css( {width : (winWidth-40)  + 'px'});

					$('#portfolio-wrap').css( {margin : 'auto'});
					$('#portfolio-wrap.no-gutter').css( {margin : 'auto'});	
					}else{
					$('#portfolio-wrap').css( {width : 1170  + 'px'});
					$('#portfolio-wrap.no-gutter').css( {width : 1170  + 'px'});			
					}
					var portfolioWidth = $('#portfolio-wrap').width();
					var postWidth;
					if (typeof attr_col !== typeof undefined && attr_col !== false) {
						columnNumb = $('#portfolio').attr('data-col');
					} else columnNumb = 3;
						
					postWidth = Math.floor(portfolioWidth / columnNumb);
					$container.find('.grid-item').each(function () { 
						$('.grid-item').css( { 
							width : postWidth - 20 + 'px',
							height : postWidth * 0.948 - 20 + 'px',
							margin : 10 + 'px' 
						});
						$('.no-gutter .grid-item').css( {
							width : postWidth  + 'px',
							height : postWidth * 0.9089  + 'px',
							margin : 0 + 'px' 
						});
						$('.grid-item.wide').css( { 
							width : postWidth * 2 - 20 + 'px'  
						});
						$('.no-gutter .grid-item.wide').css( { 
							width : postWidth * 2 + 'px'  
						});
						$('.grid-item.tall').css( {
							height : postWidth * 1.890 - 20 + 'px'  
						});
						$('.no-gutter .grid-item.tall').css( {
							height : postWidth * 2  + 'px'  
						});
						$('.grid-item.wide-tall').css( {
							width : postWidth * 2 - 25 + 'px',
							height : postWidth * 2 - 60 + 'px'  
						});
						$('.no-gutter .grid-item.wide-tall').css( {
							width : postWidth * 2 + 'px',
							height : postWidth * 1.5  + 'px'  
						});
					});
					
					
				} else if (winWidth >= 1024) {
					
					$('#portfolio-wrap').css( {width : 940  + 'px'});
					$('#portfolio-wrap.no-gutter').css( {width : 940  + 'px'});			
					var portfolioWidth = $('#portfolio-wrap').width();
								
					if (typeof attr_col !== typeof undefined && attr_col !== false) {
						columnNumb = $('#portfolio').attr('data-col');
					} else columnNumb = 3;
					
					postWidth = Math.floor(portfolioWidth / columnNumb);			
					$container.find('.grid-item').each(function () { 
						$('.grid-item').css( { 
							width : postWidth - 20 + 'px',
							height : postWidth * 0.945 - 20 + 'px',
							margin : 10 + 'px' 
						});
						$('.no-gutter .grid-item').css( {
							width : postWidth  + 'px',
							height : postWidth * 0.9089  + 'px',
							margin : 0 + 'px' 
						});
						$('.grid-item.wide').css( { 
							width : postWidth * 2 - 20 + 'px'  
						});
						$('.no-gutter .grid-item.wide').css( { 
							width : postWidth * 2 + 'px'  
						});
						$('.grid-item.tall').css( {
							height : postWidth * 1.875 - 20 + 'px'  
						});
						$('.no-gutter .grid-item.tall').css( {
							height : postWidth * 2  + 'px'  
						});
						$('.grid-item.wide-tall').css( {
							width : postWidth * 2 - 25 + 'px',
							height : postWidth * 2 - 60 + 'px'  
						});
						$('.no-gutter .grid-item.wide-tall').css( {
							width : postWidth * 2 + 'px',
							height : postWidth * 1.5  + 'px'  
						});
					});
					
					
				} else if (winWidth >= 768) {
					
					$('#portfolio-wrap').css( {width : 710  + 'px'});
					$('#portfolio-wrap.no-gutter').css( {width : 710  + 'px'});			
					var portfolioWidth = $('#portfolio-wrap').width();
								
					if (typeof attr_col !== typeof undefined && attr_col !== false) {
						columnNumb = $('#portfolio').attr('data-col');
					} else columnNumb = 3;
					
					postWidth = Math.floor(portfolioWidth / columnNumb);			
					$container.find('.grid-item').each(function () { 
						$('.grid-item').css( { 
							width : postWidth - 20 + 'px',
							height : postWidth * 0.946 - 20 + 'px',
							margin : 10 + 'px' 
						});
						$('.no-gutter .grid-item').css( {
							width : postWidth  + 'px',
							height : postWidth * 0.9089  + 'px',
							margin : 0 + 'px' 
						});
						$('.grid-item.wide').css( { 
							width : postWidth * 2 - 20 + 'px'  
						});
						$('.no-gutter .grid-item.wide').css( { 
							width : postWidth * 2 + 'px'  
						});
						$('.grid-item.tall').css( {
							height : postWidth * 1.875 - 20 + 'px'  
						});
						$('.no-gutter .grid-item.tall').css( {
							height : postWidth * 2  + 'px'  
						});
						$('.grid-item.wide-tall').css( {
							width : postWidth * 2 - 24 + 'px',
							height : postWidth * 2 - 50 + 'px'  
						});
						$('.no-gutter .grid-item.wide-tall').css( {
							width : postWidth * 2 + 'px',
							height : postWidth * 1.5  + 'px'  
						});
					});
					
					
				} else if (winWidth < 767 && winWidth > 481) {
					
					$('#portfolio-wrap').css( {width : 100  + '%'});
					$('#portfolio-wrap.no-gutter').css( {width : 100  + '%'});
					
					var portfolioWidth = $('#portfolio-wrap').width(),
					
					columnNumb = 2;
					postWidth = Math.floor(portfolioWidth / columnNumb);			
					$container.find('.grid-item').each(function () { 
						$('.grid-item').css( { 
							width : postWidth - 20 + 'px',
							height : postWidth * 0.75 - 20 + 'px',
							margin : 10 + 'px' 
						});
						$('.no-gutter .grid-item').css( {
							width : postWidth  + 'px',
							height : postWidth * 0.75  + 'px',
							margin : 0 + 'px' 
						});
						$('.grid-item.wide').css( { 
							width : postWidth * 2 - 20 + 'px'  
						});
						$('.no-gutter .grid-item.wide').css( { 
							width : postWidth * 2 + 'px'  
						});
						$('.grid-item.tall').css( {
							height : postWidth * 1.5 - 20 + 'px'  
						});
						$('.no-gutter .grid-item.tall').css( {
							height : postWidth * 1.5  + 'px'  
						});
						$('.grid-item.wide-tall').css( {
							width : postWidth * 2 - 20 + 'px',
							height : postWidth * 1.5 - 20 + 'px'  
						});
						$('.no-gutter .grid-item.wide-tall').css( {
							width : postWidth * 2 + 'px',
							height : postWidth * 1.5  + 'px'  
						});
					});
					
					
				} else if (winWidth <= 480) {
					$('#portfolio-wrap').css( {width : 100  + '%'});
					$('#portfolio-wrap.no-gutter').css( {width : 100  + '%'});
					
					var portfolioWidth = $('#portfolio-wrap').width(),
					
					columnNumb = 1;
					postWidth = Math.floor(portfolioWidth / columnNumb);			
					$container.find('.grid-item').each(function () { 
						$('.grid-item').css( { 
							width : postWidth  + 'px',
							height : postWidth * 0.75 + 'px',
							margin : 10 + 'px' + 0 + 'px' 
						});
						$('.no-gutter .grid-item').css( {
							width : postWidth  + 'px',
							height : postWidth * 0.75  + 'px',
							margin : 0 + 'px' 
						});
						$('.grid-item.wide').css( { 
							width : postWidth + 'px'  
						});
						$('.no-gutter .grid-item.wide').css( { 
							width : postWidth + 'px'  
						});
						$('.grid-item.tall').css( {
							height : postWidth * 1.5 + 'px'  
						});
						$('.no-gutter .grid-item.tall').css( {
							height : postWidth * 1.5  + 'px'  
						});
						$('.grid-item.wide-tall').css( {
							width : postWidth + 'px',
							height : postWidth * 0.75 + 'px'  
						});
						$('.no-gutter .grid-item.wide-tall').css( {
							width : postWidth + 'px',
							height : postWidth * 0.75  + 'px'  
						});
					});
	
				}
				return columnNumb;
				
			
			}).resize();
		
			$("#all").click();	
			
			if (window.innerWidth >= 1466) {
					if($('.auto-construct').length > 0 ){		
						$('.grid-item').each(function(i){
							$(this).css({'opacity':0, 'margin-top':180 + 'px', 'margin-bottom':80 + 'px'});	
							
							if($('.auto-construct').length > 0 ){		
								$(this).appear(function() {							
									$(this).delay(i*50).animate({'opacity':1, 'margin-top':10 + 'px', 'margin-bottom':10 + 'px'},300,'easeOutSine');
								});
							}					
							
						});
					}
				} else if (window.innerWidth > 1024) {
					if($('.auto-construct').length > 0 ){		
						$('.grid-item').each(function(i){
							$(this).css({'opacity':0, 'margin-top':180 + 'px', 'margin-bottom':80 + 'px'});	
							
							if($('.auto-construct').length > 0 ){		
								$(this).appear(function() {							
									$(this).delay(i*50).animate({'opacity':1, 'margin-top':10 + 'px', 'margin-bottom':10 + 'px'},300,'easeOutSine');
								});
							}					
							
						});
					}
				}
			}
	}/*End MasonryPortfolio*/



/*========== Testimonials Slider Start ================*/

$('.testimonials').owlCarousel({
    loop:true,
	autoplay:true,
	nav:false,
	dots:false,
	smartSpeed: 1500,
    margin:0,
    responsiveClass:true,
    responsive:{
        0:{
            items:1
        },
        480:{
            items:1
        },
        1000:{
            items:1
        }
    }
});

/*========== Testimonials Slider end ================*/



/*========== Why Choose Slider Start ================*/

$('.slider_block').owlCarousel({
    loop:true,
	nav:true,
	dots:false,
	smartSpeed: 1500,
    margin:0,
    responsiveClass:true,
    responsive:{
        0:{
            items:1
        },
        480:{
            items:2
        },
        1000:{
            items:3
        }
    }
});

/*========== Why Choose Slider end ================*/



/*========== Clients Slider Start ================*/

$('.clients').owlCarousel({
    loop:true,
	autoplay:true,
	nav:true,
	dots:false,
	smartSpeed: 1500,
    margin:0,
    responsiveClass:true,
    responsive:{
        0:{
            items:1
        },
        480:{
            items:2
        },
        1000:{
            items:6
        }
    }
});



/*========== Clients Slider end ================*/



/*========== Testimonials Slider Start ================*/

$('.featured_work').owlCarousel({
    loop:true,
	autoplay:true,
	nav:true,
	dots:false,
	smartSpeed: 1500,
    margin:0,
    responsiveClass:true,
    responsive:{
        0:{
            items:1
        },
        480:{
            items:2
        },
        1000:{
            items:3
        }
    }
});

/*========== Testimonials Slider end ================*/


/*========== Clients Slider 2 Start ================*/

$('.clients2').owlCarousel({
    loop:true,
	autoplay:true,
	nav:true,
	dots:false,
	smartSpeed: 1500,
    margin:0,
    responsiveClass:true,
    responsive:{
        0:{
            items:1
        },
        480:{
            items:2
        },
        1000:{
            items:4
        }
    }
});


/*========== Clients Slider 2 end ================*/


/*========== shop cart slider ==========*/
$('.interested_block').owlCarousel({
    loop:true,
	autoplay:true,
	nav:true,
	dots:false,
	smartSpeed: 1500,
    margin:0,
    responsiveClass:true,
    responsive:{
        0:{
            items:1
        },
        480:{
            items:2
        },
        1000:{
            items:4
        }
    }
});
/*========== shop cart slider ==========*/


/*========== Clients Slider 2 Start ================*/

$('.clients-2 .clients3').owlCarousel({
    loop:true,
	autoplay:true,
	nav:true,
	dots:false,
	smartSpeed: 1500,
    margin:0,
    responsiveClass:true,
    responsive:{
        0:{
            items:1
        },
        480:{
            items:2
        },
		768:{
            items:3
        },
        1000:{
            items:6
        }
    }
});


/*========== Clients Slider 2 end ================*/


/*========== Project-details1 image gallery start ================*/
$('.project_gallery').owlCarousel({
    //loop:true,
	//autoplay:true,
	nav:true,
	dots:false,
	smartSpeed: 1500,
	margin:0,
	URLhashListener:true,
	autoplayHoverPause:true,
	startPosition: 'URLHash',
    responsiveClass:true,
    responsive:{
        0:{
            items:1
        },
        480:{
            items:1
        },
        1000:{
            items:1
        }
    }
});
/*========== Project-details1 image gallery end ================*/


/*========== About image gallery start ================*/

$('.about_gallery').owlCarousel({
    //loop:true,
	//autoplay:true,
	nav:true,
	dots:false,
	smartSpeed: 1500,
	margin:0,
	URLhashListener:true,
	autoplayHoverPause:true,
	startPosition: 'URLHash',
    responsiveClass:true,
    responsive:{
        0:{
            items:1
        },
        480:{
            items:1
        },
        1000:{
            items:1
        }
    }
});

/*========== About image gallery end ================*/


/*========== Selectpicker start ================*/

$(function () {
	$('.selectpicker').selectpicker();
});

/*========== Selectpicker end ================*/


/*========== Accordion start ================*/

$(function () {
	if($('.accordion_main').length>0)$('.accordion_main').accordion({ autoHeight:true });
});

$(function () {
	if($('.accordion_block').length>0)$('.accordion_block').accordion({ autoHeight:true });
});

$(function () {
	if($('.faq_accordion-main .accordion_block').length>0)$('.faq_accordion-main .accordion_block').accordion({ active: 1, autoHeight:true });
});

$(function () {
	if($('.career_content .accordion_block').length>0)$('.career_content .accordion_block').accordion({ active: 1, autoHeight:true });
});

$(function() {
   if($('#accordion').length>0)$( "#accordion" ).accordion({autoHeight:true});
	
});

/*========== Accordion end ================*/





/*========== Search Drop Down start ================*/

$(function () {
	$(".header .search_bar").on('click',function(){
		$(".header .search_block").slideToggle();
	});
	$(".load_more").on('click',function(){
        $(".singlecol").removeClass("display_none");
		$(".load_more").addClass("display_none");
    })
});


/*========== Search Drop Down end ================*/


/*========== Slider Height Start ================*/

/*function slider_height() {
    var height = jQuery(window).height();
    var sliderheight = (height);
    sliderheight = parseInt(sliderheight) + 'px';
    jQuery("#full_width_slider-2, #full_width_slider-2 .item img").css('height',sliderheight);
}*/

jQuery(document).ready(function() {
	/*slider_height();
    jQuery(window).bind('resize', slider_height);*/
		var height= $( window ).height();
		$(".full_banner").css("height" , height); 
	/** form_1 JS **/
	if(jQuery("#form_1").length>0){
		jQuery("#form_1").on("submit", function(e){
			e.preventDefault();
			var user_name = jQuery('#yname').val();
			var user_email = jQuery('#yemail').val();
			var user_subject = jQuery('#ysubject').val();
			var user_text = jQuery('#ytext').val();
			
			if(user_name!=="" && user_email!=="" && user_subject!=="" && user_text!=="")
			{
				var post_data = {
					'user_name': user_name,
					'user_email': user_email,
					'user_subject': user_subject,
					'user_text': user_text
				};
				
				//Ajax post data to server
				jQuery.post('php/contact_me_1.html', post_data, function(response) {
					var output;
					//load json data from server and output message
					if (response.type == 'error') {
						output = '<div class="error">' + response.text + '</div>';
					} else {
						output = '<div class="success">' + response.text + '</div>';
						//reset values in all input fields
						
					}
					jQuery("#result").hide().html(output).fadeIn(500);
					
				}, 'json');
			}
		});
	}
	/** form_2 JS **/
	if(jQuery("#form_2").length>0){
		jQuery("#form_2").on("submit", function(e){
			e.preventDefault();
			
			var user_name = jQuery('#yname').val();
			var user_email = jQuery('#yemail').val();
			var user_text = jQuery('#ytext').val();
			
			if(user_name!=="" && user_email!=="" && user_text!=="")
			{
				var post_data = {
					'user_name': user_name,
					'user_email': user_email,
					'user_text': user_text
				};
				
				//Ajax post data to server
				jQuery.post('php/contact_me_2.html', post_data, function(response) {
					var output;
					//load json data from server and output message
					if (response.type == 'error') {
						output = '<div class="error">' + response.text + '</div>';
					} else {
						output = '<div class="success">' + response.text + '</div>';
						//reset values in all input fields
						
					}
					jQuery("#result").hide().html(output).fadeIn(500);
					
				}, 'json');
			}
		});
	}
	/** Subscribe JS **/
	if(jQuery("#notifyMe").length>0){
		jQuery("#notifyMe").notifyMe();
	}
	/*Activate notifyMe plugin on a '#notifyMe' element */
	
	
	/* ==========================================================================
        Smooth Scroll
	========================================================================== */
        if(jQuery("#onepage").length>0){
			smoothScroll.init({
            offset: 90,
            speed: 800,
            updateURL: false
			});
		}
		MasonryPortfolio();
});

/*========== Slider Height end ================*/


/*========== Custome 1 Slider start ================*/


$('.blog_slider').owlCarousel({
   
    items:1,
	nav:true,
	dots:false,
	autoplay:true,
	loop:true
});


/*========== Custome 1 Slider end ================*/



/*========== Animation On Scroll start ================*/
$(window).scroll(function() {    
    var scroll = $(window).scrollTop();    
    if (scroll >= 100) {
        $(".topbar").addClass("topbar-hide");
		$(".navbar").addClass("sticky");
    }
	if (scroll == 0){
		$(".topbar").removeClass("topbar-hide");
		$(".navbar").removeClass("sticky");
	}
});

(function () {
	var Util, __bind = function (fn, me) {
		return function () {
			return fn.apply(me, arguments);
		};
	};
	Util = (function () {
		function Util() {}
		Util.prototype.extend = function (custom, defaults) {
			var key, value;
			for (key in custom) {
				value = custom[key];
				if (value !== null) {
					defaults[key] = value;
				}
			}
			return defaults;
		};
		Util.prototype.isMobile = function (agent) {
			return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(agent);
		};
		return Util;
	})();
	this.WOW = (function () {
		WOW.prototype.defaults = {
			boxClass: 'wow',
			animateClass: 'animated',
			offset: 0,
			mobile: true
		};
		function WOW(options) {
			if (options === null) {
				options = {};
			}
			this.scrollCallback = __bind(this.scrollCallback, this);
			this.scrollHandler = __bind(this.scrollHandler, this);
			this.start = __bind(this.start, this);
			this.scrolled = true;
			this.config = this.util().extend(options, this.defaults);
		}
		WOW.prototype.init = function () {
			var _ref;
			this.element = window.document.documentElement;
			if ((_ref = document.readyState) === "interactive" || _ref === "complete") {
				return this.start();
			} else {
				return document.addEventListener('DOMContentLoaded', this.start);
			}
		};
		WOW.prototype.start = function () {
			var box, _i, _len, _ref;
			this.boxes = this.element.getElementsByClassName(this.config.boxClass);
			if (this.boxes.length) {
				if (this.disabled()) {
					return this.resetStyle();
				} else {
					_ref = this.boxes;
					for (_i = 0, _len = _ref.length; _i < _len; _i++) {
						box = _ref[_i];
						this.applyStyle(box, true);
					}
					window.addEventListener('scroll', this.scrollHandler, false);
					window.addEventListener('resize', this.scrollHandler, false);
					return this.interval = setInterval(this.scrollCallback, 50);
				}
			}
		};
		WOW.prototype.stop = function () {
			window.removeEventListener('scroll', this.scrollHandler, false);
			window.removeEventListener('resize', this.scrollHandler, false);
			if (this.interval !== null) {
				return clearInterval(this.interval);
			}
		}; 
		WOW.prototype.show = function (box) {
			this.applyStyle(box);
			return box.className = "" + box.className + " " + this.config.animateClass;
		};
		WOW.prototype.applyStyle = function (box, hidden) {
			var delay, duration, iteration;
			duration = box.getAttribute('data-wow-duration');
			delay = box.getAttribute('data-wow-delay');
			iteration = box.getAttribute('data-wow-iteration');
			return box.setAttribute('style', this.customStyle(hidden, duration, delay, iteration));
		};
		WOW.prototype.resetStyle = function () {
			var box, _i, _len, _ref, _results;
			_ref = this.boxes;
			_results = [];
			for (_i = 0, _len = _ref.length; _i < _len; _i++) {
				box = _ref[_i];
				_results.push(box.setAttribute('style', 'visibility: visible;'));
			}
			return _results;
		};
		WOW.prototype.customStyle = function (hidden, duration, delay, iteration) {
			var style;
			style = hidden ? "visibility: hidden; -webkit-animation-name: none; -moz-animation-name: none; animation-name: none;" : "visibility: visible;";
			if (duration) {
				style += "-webkit-animation-duration: " + duration + "; -moz-animation-duration: " + duration + "; animation-duration: " + duration + ";";
			}
			if (delay) {
				style += "-webkit-animation-delay: " + delay + "; -moz-animation-delay: " + delay + "; animation-delay: " + delay + ";";
			}
			if (iteration) {
				style += "-webkit-animation-iteration-count: " + iteration + "; -moz-animation-iteration-count: " + iteration + "; animation-iteration-count: " + iteration + ";";
			}
			return style;
		};
		WOW.prototype.scrollHandler = function () {
			return this.scrolled = true;
		};
		WOW.prototype.scrollCallback = function () {
			var box;
			if (this.scrolled) {
				this.scrolled = false;
				this.boxes = (function () {
					var _i, _len, _ref, _results;
					_ref = this.boxes;
					_results = [];
					for (_i = 0, _len = _ref.length; _i < _len; _i++) {
						box = _ref[_i];
						if (!(box)) {
							continue;
						}
						if (this.isVisible(box)) {
							this.show(box);
							continue;
						}
						_results.push(box);
					}
					return _results;
				}).call(this);
				if (!this.boxes.length) {
					return this.stop();
				}
			}
		};
		WOW.prototype.offsetTop = function (element) {
			var top;
			top = element.offsetTop;
			while (element = element.offsetParent) {
				top += element.offsetTop;
			}
			return top;
		};
		WOW.prototype.isVisible = function (box) {
			var bottom, offset, top, viewBottom, viewTop;
			offset = box.getAttribute('data-wow-offset') || this.config.offset;
			viewTop = window.pageYOffset;
			viewBottom = viewTop + this.element.clientHeight - offset;
			top = this.offsetTop(box);
			bottom = top + box.clientHeight;
			return top <= viewBottom && bottom >= viewTop;
		};
		WOW.prototype.util = function () {
			return this._util || (this._util = new Util());
		};
		WOW.prototype.disabled = function () {
			return !this.config.mobile && this.util().isMobile(navigator.userAgent);
		};
		return WOW;
	})();
}).call(this);
var wow = new WOW({
	animateClass: 'animated',
	offset: 100
});
wow.init();

/*========== Animation On Scroll end ================*/

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
/*====================Home 5 Parallax start ==========================*/
		if($("body").hasClass("home_5")){
		if ($('.index_4')) {
			$('#nav .button1').click(function() {
				$('#nav .but').each(function() {
					$(this).removeClass('active');
				});
				$(this).addClass('active');
				$.scrollTo($('#parallaxBlock1'), 2000);
				return false;
			});
			$('#nav .button2').click(function() {
				$.scrollTo($('#parallaxBlock2'), 2000);
				$('#nav .but').each(function() {
					$(this).removeClass('active');
				});
				$(this).addClass('active');
				return false;
			});
			$('#nav .button3').click(function() {
				$.scrollTo($('#parallaxBlock3'), 2000);
				$('#nav .but').each(function() {
					$(this).removeClass('active');
				});
				$(this).addClass('active');
				return false;
			});
			$('#nav .button4').click(function() {
				$.scrollTo($('#parallaxBlock4'), 2000);
				$('#nav .but').each(function() {
					$(this).removeClass('active');
				});
				$(this).addClass('active');
				return false;
			});
			$('#nav .button5').click(function() {
				$.scrollTo($('#parallaxBlock5'), 2000);
				$('#nav .but').each(function() {
					$(this).removeClass('active');
				});
				$(this).addClass('active');
				return false;
			});
			$('#nav .button6').click(function() {
				$.scrollTo($('#parallaxBlock6'), 2000);
				$('#nav .but').each(function() {
					$(this).removeClass('active');
				});
				$(this).addClass('active');
				return false;
			});
		
			 //.parallax(xPosition, speedFactor, outerHeight) ?????:
			$('#parallaxBlock1').parallax("-50%", -0.1);
			$('#parallaxBlock2').parallax("50%", 0.1);
			$('#parallaxBlock3').parallax("-50%", -0.1);
			$('#parallaxBlock4').parallax("50%", 0.1);
			$('#parallaxBlock5').parallax("50%", -0.1);
			$('#parallaxBlock6').parallax("50%", 0.3);
			$('.title_banner3').parallax("50%", -0.1);
			$('.title_banner1').parallax("50%", -0.1);
			$('.title_banner2').parallax("50%", -0.1);
			$('.title_banner6').parallax("50%", -0.1);
			$('.title_banner5').parallax("50%", -0.1);
			$('.title_banner4').parallax("50%", -0.12);
			$('.title_banner7').parallax("50%", -0.12);
			$('.title_service1').parallax("50%", -0.1);
			
		}
		}
/*====================Home 5 Parallax End ==========================*/
/*===================== range slider start ==========================*/

  $(function() {
    if($( "#slider-range" ).length>0){
		$( "#slider-range" ).slider({
		  range: true,
		  min: 0,
		  max: 999,
		  values: [ 0, 800 ],
		  slide: function( event, ui ) {
			$( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
		  }
		});
		
		$( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) + " - $" + $( "#slider-range" ).slider( "values", 1 ) );
	}
  });
 
  
  
/*===================== range slider end ==========================*/


/*========== Page Loader start ================*/

jQuery(window).load(function() {
	// Animate loader off screen
	jQuery(".pre-loader").delay(1000).fadeOut("slow"); 
	jQuery('.la-anim-1').addClass('la-animate');
});

/*========== Page Loader end ================*/


/*========== Checkout Dropdown start ================*/

jQuery('.checkout_inner .login_return h4 a').on('click',function(event) {
	event.preventDefault();
jQuery('.checkout_inner .login_return .form-block').slideToggle();
});

jQuery('.checkout_inner .coupon_block h4 a').on('click',function(event) {
	event.preventDefault();
jQuery('.checkout_inner .coupon_block .form-block').slideToggle();
});

/*========== Checkout Dropdown end ================*/



/*========== Countdown Start ================

var newYear = new Date(); 
newYear = new Date(newYear.getFullYear() + 1, 1 - 1, 1); 
//$('#defaultCountdown').countdown({until: newYear}); 
$('#removeCountdown').on('click',function() { 
    var destroy = $(this).text() === 'Remove'; 
    $(this).text(destroy ? 'Re-attach' : 'Remove'); 
    $('#defaultCountdown').countdown(destroy ? 'destroy' : {until: newYear}); 
});


========== Countdown end ================*/


jQuery(window).on('load resize',function(){
	console.log($('.csslider1').find('li img').outerHeight());
	$('.csslider1-list').outerHeight($('.csslider1').find('li img').outerHeight());
//document.title = jQuery(".btn-default").offset().left;
//jQuery(".btn-info").css("left", jQuery(".btn-default").offset().left);


});
