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
	wpcfp();
    

	/*============================*/
	/* 04 - FUNCTION ON PAGE LOAD */
	/*============================*/
    
	$(window).on("load", function(){		
	    initSwiper();
        equalCols();
        $(".preload-wrap").fadeOut(1000);
        
        if ($(".izotope-container").length) { 
            var $container = $(".izotope-container");
            
            $container.each(function(){
               var self = $(this);
                var layoutM = self.attr("data-layout") || "masonry";
                self.isotope({
                    itemSelector: ".item",
                    layoutMode: layoutM,
                    masonry: {
                        columnWidth: ".item"
                    }
                }); 
            });
            
			$("#filters").on("click", ".but", function() {

			 	for (var i = $container - 1; i >= 0; i--) {
			 		$($container[i]).find(".item").removeClass("animated");
				}

				$("#filters .but").removeClass("activbut");
				$(this).addClass("activbut");
				var filterValue = $(this).attr("data-filter");
				$container.isotope({filter: filterValue});
                
                
				return false;
			});  
        }
        
        if($(".pagepiling").length){
            $("html, body").animate({ scrollTop: 0 }, "slow");
        }
        
	});

    

	/*==============================*/
	/* 05 - FUNCTION ON PAGE RESIZE */
	/*==============================*/
    $(window).on("resize", function(){
        equalCols();
        wpcfp();
    });
    
	function resizeCall(){
		pageCalculations();
		$(".swiper-container.initialized[data-slides-per-view='responsive']").each(function(){
			var thisSwiper = swipers["swiper-"+$(this).attr("id")], $t = $(this), slidesPerViewVar = updateSlidesPerView($t), centerVar = thisSwiper.params.centeredSlides;
			thisSwiper.params.slidesPerView = slidesPerViewVar;
			thisSwiper.reInit();
			if(!centerVar){
				var paginationSpan = $t.find(".pagination span");
				var paginationSlice = paginationSpan.hide().slice(0,(paginationSpan.length+1-slidesPerViewVar));
				if(paginationSlice.length<=1 || slidesPerViewVar>=$t.find(".swiper-slide").length) $t.addClass("pagination-hidden");
				else $t.removeClass("pagination-hidden");
				paginationSlice.show();
			}
		});	
	}
	if(!_ismobile){
		$(window).on("resize", function(){
			resizeCall();
            equalCols();
		});
	} else{
		window.addEventListener("orientationchange", function() {
			resizeCall();
		}, false);
	}
    
    
    
    /***********************************/
	/* 06 - FUNCTION ON PAGE SCROLL */
	/**********************************/
	
    $(window).on("scroll", function() {
        var  wScroll = $(this).scrollTop();
	   if(wScroll >= 80) {
		   $(".a-header").addClass("scroll");
		}else{
		   $(".a-header").removeClass("scroll");
		}
        
        if($(".pagepiling").length){
            if(wScroll == 0){
                $("html").css("overflow-Y", "hidden");
            }
        }
        
	});
    
    
    
	/*=====================*/
	/* 07 - SWIPER SLIDERS */
	/*=====================*/
    
	function initSwiper(){
		var initIterator = 0;
		$(".swiper-container").each(function(){								  
			var $t = $(this);								  

			var index = "swiper-unique-id-"+initIterator;

			$t.addClass("swiper-"+index + " initialized").attr("id", index);
			$t.find(".pagination").addClass("pagination-"+index);

			var autoPlayVar = parseInt($t.attr("data-autoplay"),10);
            var mode = $t.attr("data-mode");
			var slidesPerViewVar = $t.attr("data-slides-per-view");
			if(slidesPerViewVar == "responsive"){
				slidesPerViewVar = updateSlidesPerView($t);
			}
			else slidesPerViewVar = parseInt(slidesPerViewVar,10);

			var loopVar = parseInt($t.attr("data-loop"),10);
			var speedVar = parseInt($t.attr("data-speed"),10);
            var centerVar = parseInt($t.attr("data-center"),10);
			swipers["swiper-"+index] = new Swiper(".swiper-"+index,{
				speed: speedVar,
				pagination: ".pagination-"+index,
				loop: loopVar,
				paginationClickable: true,
				autoplay: autoPlayVar,
				slidesPerView: slidesPerViewVar,
				keyboardControl: true,
				calculateHeight: true, 
				simulateTouch: true,
				roundLengths: true,
				centeredSlides: centerVar,
                mode: mode || "horizontal",
				onInit: function(swiper){
				    $t.find(".swiper-slide").addClass("active");
				},
				onSlideChangeEnd: function(swiper){
					var activeIndex = (loopVar===1)?swiper.activeLoopIndex:swiper.activeIndex;
					var qVal = $t.find(".swiper-slide-active").attr("data-val");
					$t.find('.swiper-slide[data-val="'+qVal+'"]').addClass('active');
                    
                    if($t.hasClass("a-testimonials-slider")) {
                        $t.parent().find(".testimonials-item").css("display", "none").removeClass("active");
                        $(".testimonials-item").eq(activeIndex).css({
                            "display" : "block",
                            "opacity" : 0
                        }).animate({"opacity" : 1},50,
                        function() {
                            $(this).addClass("active");
                        });
                    }
				},
				onSlideChangeStart: function(swiper){
					$t.find(".swiper-slide.active").removeClass("active");
                    
				}
			});
			swipers["swiper-"+index].reInit();
				if($t.attr("data-slides-per-view")=="responsive"){
					var paginationSpan = $t.find(".pagination span");
					var paginationSlice = paginationSpan.hide().slice(0,(paginationSpan.length+1-slidesPerViewVar));
					if(paginationSlice.length<=1 || slidesPerViewVar>=$t.find(".swiper-slide").length) $t.addClass("pagination-hidden");
					else $t.removeClass("pagination-hidden");
					paginationSlice.show();
				}
            
            if($t.find(".default-active").length){
                swipers["swiper-"+index].swipeTo($t.find(".swiper-slide").index($t.find(".default-active")), 0);    
            } 
            
			initIterator++;
            
            $(".client-slide").on("click", function () {
                var $t = $(this);
                if($t.hasClass("default-active")) return false;
                $t.closest(".a-testimonials-slider").find(".client-slide").removeClass("default-active");
                var index = $t.closest(".a-testimonials-slider").find(".client-slide").index(this);
                swipers["swiper-"+$(".a-testimonials-slider").attr("id")].swipeTo(index);

            }); 
		});
		
	}

	function updateSlidesPerView(swiperContainer){
		if(winW>=addPoint) return parseInt(swiperContainer.attr("data-add-slides"),10);
		else if(winW>=lgPoint) return parseInt(swiperContainer.attr("data-lg-slides"),10);
		else if(winW>=mdPoint) return parseInt(swiperContainer.attr("data-md-slides"),10);
		else if(winW>=smPoint) return parseInt(swiperContainer.attr("data-sm-slides"),10);
		else return parseInt(swiperContainer.attr("data-xs-slides"),10);
	}	


	//swiper arrows
	$(".swiper-arrow-left").on("click", function(){
		swipers["swiper-"+$(this).parent().attr("id")].swipePrev();
	});

	$(".swiper-arrow-right").on("click", function(){
		swipers["swiper-"+$(this).parent().attr("id")].swipeNext();
	});
    
    $(".swiper-outer-left").on("click", function(){
		swipers["swiper-"+$(this).parent().find(".swiper-container").attr("id")].swipePrev();
	});

	$(".swiper-outer-right").on("click", function(){
		swipers["swiper-"+$(this).parent().find(".swiper-container").attr("id")].swipeNext();
	});
    
  
	
    
	/*============================*/
	/* 08 - MENU */
	/*============================*/
	
	$(".nav-menu-icon a").on("click", function() {
      var nav = $(".navigation nav"),
     	 wrap = $(".wrap"),
     	 centerMenu = $(".center-menu"),
     	 leftSlide = $(".left-slide");
	  if (nav.hasClass("slide-menu")){
		   nav.removeClass("slide-menu"); 
		   wrap.removeClass("hold");
		   centerMenu.removeClass("act");
		   leftSlide.removeClass("slide-menu"); 
		   $(this).removeClass("active");
	  }else {
		   nav.addClass("slide-menu");
		   centerMenu.addClass("act");
		   $(".left-slide").addClass("slide-menu");
		   wrap.addClass("hold");
		   leftSlide.addClass("active");
	  }
		return false;
	 });
	
	
	$("nav > ul > li > a").on("click", function(){
      var self = $(this);
      var dropdown = self.parent().find(".sub-menu");
	  if (dropdown.hasClass("act")){
	      dropdown.removeClass("act");
	  }else{
		  $(".sub-menu").removeClass("act");
	      self.parent().find("> .sub-menu").addClass("act");
	  }
        if(self.attr("href") == "#")return false;
	});
	
	$(".sub-menu > li > a").on("click", function(){
        var self = $(this);
        var par = self.parent();
	  if (par.find(".sub-menu").hasClass("act")){
	      par.find(".sub-menu").removeClass("act");
	  }else{
		  $(".sub-menu .sub-menu").removeClass("act");
	      par.find("> .sub-menu").addClass("act");
	  }
		if(self.attr("href") == "#")return false;
	});
       

	
	
	/***********************************/
	/* 09 - STYLE BAR*/
	/**********************************/
	var searchPopup = $(".search-popup")

    $(".serch-button").on("click", function(){
	   searchPopup.addClass("open");
		return false;
	});
	
	$(".search-popup .close").on("click", function(){
	   searchPopup.removeClass("open");
		return false;
	});
	
	$(".input").focusin(function(){
	    $(".input-field").addClass("active");
	});
	$(".input").focusout(function(){
	    $(".input-field").removeClass("active");
	});

    $(".second-menu li").on("click", function(){
		$(".second-menu li").removeClass("act");
	    $(this).toggleClass("act");
		  return false;
	});
    

    /***********************************/
	/* 10 - VIDEO*/
	/**********************************/
    
	$(".cut_video_btn").on("click", function(){
		var video = $(this).data("video");			
		$(this).parents(".cut_video_block").addClass("active");
		$(this).siblings(".cut_video_iframe").attr("src",video);
		return false;
	});
	$(".cut_video_close").on("click", function(){
		$(this).parents(".cut_video_block").removeClass("active");
		$(this).siblings(".cut_video_iframe").attr("src","about:blank");
		return false;
	});
    
    
    /***********************************/
	/* 11 - BACKGROUND*/
	/**********************************/
    
    //sets child image as a background
    $(".s-back-switch").each(function(){
        var $img = $(this).find(".s-img-switch");
        var $imgSrc =  $img.attr("src");
        var $imgDataHidden =  $img.data("s-hidden");
        $(this).css("background-image" , "url(" + $imgSrc + ")");
        if($imgDataHidden){
        	$img.css("visibility", "hidden");
        }else{
        	$img.hide();
        }
    });
    
     //setting background image
    $(".law-slider-one .swiper-slide, .law-benefits, .law-why, .law-customers-bg").each(function(){
        var $imgSrc =  $(this).find(".law-background-img").attr("src");
        $(this).css("background-image" , "url(" + $imgSrc + ")");
    });
    
     $(".gym-slider-one .swiper-slide, .gym-for-him, .gym-for-her, .gym-back, .p-gym-classes").each(function(){
        var $imgSrc =  $(this).find(".gym-background-img").hide().attr("src");
        $(this).css("background-image" , "url(" + $imgSrc + ")");
    });
    

    
    
    /***********************************/
    /* 12 - MAGNIFIC POPUP */
    /**********************************/
	
	if ($(".popup-gallery").length) {
		$(".popup-gallery").magnificPopup({
			delegate: ".view-item",
			type: "image",
			removalDelay: 100,
			tLoading: "Loading image #%curr%...",
			mainClass: "mfp-fade",
			closeBtnInside: false,
			gallery: {
				enabled: true,
			},
			callbacks: {
              	beforeOpen: function() {
                	this.st.image.markup = this.st.image.markup.replace("mfp-figure", "mfp-figure animated " + this.st.el.attr("data-effect"));
            	}
            }

		});
	};
    
    if ($(".img-popup").length){
        $(".img-popup").magnificPopup({
            type: "image",
            removalDelay: 100,
            tLoading: "Loading image #%curr%...",
            mainClass: "mfp-fade",
            closeBtnInside: false

        });
    }
    
    
    
    /***********************************/
	/* 13 - TABS */
	/**********************************/
    
    $(".a-tabs").on("click", ".tab-head", function() {
        var self = $(this);
        var index_el = self.parent().index();

        self.addClass("active").parent().siblings().find(".tab-head").removeClass("active");
        self.closest(".a-tabs").find(".tabs-content").removeClass("active").eq(index_el).addClass("active");

    });
    
    
    
    
    /***********************************/
	/* 14 - Ecommerce PAGE */
	/**********************************/
    
    // init Isotope
    var $prodGrid = $(".prod-grid").isotope({
      itemSelector: ".item"
    });
    // filter items on button click
    $(".filter-list").on( "click", "li", function() {
      var filterValue = $(this).attr("data-filter");
      $prodGrid.isotope({ filter: filterValue });
    });
    
    //filter list
    $(".filter-list").on("click", "a", function(e){
        e.preventDefault();
        $(this).addClass("active").parent().siblings().find("a").removeClass("active");
    });
    
    //view more
    $(".quick-view").on("click", function(){
        $(".p-commerce-more").slideDown();
        return false;
    });
    
    $(".view-more-close").on("click", function(){
        $(".p-commerce-more").slideUp();   
    });
    
    $(".mobile-menu").on("click", function(){
		$("body").toggleClass("open-menu");
	});

	$(".size li").on("click", function(){
		$(".size li").removeClass();
		$(this).addClass("active");
	});

	$(".color span").on("click", function(){
		$(this).siblings(".list").toggle();
		$(this).toggleClass("active");
	});

	$(".color .list li").on("click", function(){
		var tx = $(this).text();
		$(this).parents().siblings("span").text(tx);
		$(this).parents(".list").toggle();
		$(this).parents().siblings("span").toggleClass("active");
	});

	$(".quantity .up").on("click", function(){
		var i = $(this).siblings(".count").text();
		if (i >= 1) {
			i++;
			$(this).siblings(".count").text(i);
		} return false;
	});

	$(".quantity .down").on("click", function(){
		var i = $(this).siblings(".count").text();
		if (i > 1) {
			i--;
			$(this).siblings(".count").text(i);
		} return false;
	});

	$(".galery").owlCarousel({
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

	$(".galery-info").each(function() {
		var $el = $(".galery figure").find("> img");
		if ($el.length > 0) {
			$(this).css("background", "url(" + $el.attr("src") + ")");
		}
	});

	$(".galery figure").on("click", function() {
		var $el = $(this).find("> img");
		if ($el.length > 0) {
			$(".galery-info").css("background", "url(" + $el.attr("src") + ")");
		}
	});
    
    
    /***********************************/
	/* 15 - PRELOADER */
	/**********************************/
    (function () {
            var container = document.getElementById("a-preload");
            var drop = document.getElementById("drop");
            var drop2 = document.getElementById("drop2");
            var outline = document.getElementById("outline");

            TweenMax.set(["svg"], {
                position: "absolute",
                top: "50%",
                left: "50%",
                xPercent: -50,
                yPercent: -50
            })

            TweenMax.set([container], {
                position: "absolute",
                top: "50%",
                left: "50%",
                xPercent: -50,
                yPercent: -50
            })

            TweenMax.set(drop, {
                transformOrigin: "50% 50%"
            })

            var tl = new TimelineMax({
                repeat: -1,
                paused: false,
                repeatDelay: 0,
                immediateRender: false
            });

            tl.timeScale(3);

            tl.to(drop, 4, {
                    attr: {
                        cx: 250,
                        rx: "+=10",
                        ry: "+=10"
                    },
                    ease: Back.easeInOut.config(3)
                })
                .to(drop2, 4, {
                    attr: {
                        cx: 250
                    },
                    ease: Power1.easeInOut
                }, "-=4")
                .to(drop, 4, {
                    attr: {
                        cx: 125,
                        rx: "-=10",
                        ry: "-=10"
                    },
                    ease: Back.easeInOut.config(3)
                })
                .to(drop2, 4, {
                    attr: {
                        cx: 125,
                        rx: "-=10",
                        ry: "-=10"
                    },
                    ease: Power1.easeInOut
                }, "-=4")
        })()
    
    
    
    
    
    /***********************************/
	/* 16 - EQUAL COLUMNS HEIGHT */
	/**********************************/
    function equalCols(){
        var elems = $(".eq-cols .a-service");
        if($(window).width() >= 991){
            var heights = elems.map(function (){
                return $(this).outerHeight();
            }).get();
            var maxHeight = Math.max.apply(null, heights);
            
            elems.css("height", "100%");
            setTimeout(function(){
                elems.outerHeight(maxHeight);    
            },0);   
        }else{
            elems.css("height", "auto");   
        }
    }
    
    
    /***********************************/
	/* 17 - YOUTUBE BACKGROUND */
	/**********************************/
    if($(".YTbg").length){
        var YTbg = $(".YTbg").YTPlayer({
            fitToBackground: true,
            videoId: "8asRWe5XNw8",
            playerVars: {
                modestbranding: 1,
                autoplay: 1,
                controls: 0,
                showinfo: 0,
                wmode: "transparent",
                branding: 0,
                rel: 0,
                autohide: 2,
              },
        });
    }
    
    
        
    /***********************************/
	/* 18- BLOCK HEIGHT */
	/**********************************/
    $(".box-height").height($(".box-height").parent().outerHeight());
    
    //full page height
    function wpcfp(){
        $(".wpc-fp").height($(window).height());
    }
    
    
    
    /***********************************/
	/* 19 - Pagepiling slider */
	/**********************************/
    if($(".pagepiling").length){
        $(".pagepiling").pagepiling({
            menu: null,
            direction: "horizontal",
            scrollingSpeed: 1500,
            touchSensitivity: 5,
            navigation: false,
            sectionSelector: ".page-slide"
        });   

		$("html").css("overflow-Y", "hidden");

        $(".view-section").click(function(){
            $("html").css("overflow-Y", "scroll");
            $("html, body").animate({
                scrollTop: $(window).height()
            }, 1000);
            return false;
        });
    }
    
    
    
    /***********************************/
	/* 20 - DEMO SWITCHER */
	/**********************************/
	var stylePage = $(".style-page"),
	   confButton = $(".conf-button span")
    $(".conf-button").on("mouseenter", function() {
        if (stylePage.hasClass("slide-left")) {
            stylePage.removeClass("slide-left");
            confButton.removeClass("act");
        } else {
           stylePage.addClass("slide-left");
           confButton.addClass("act");
        }
        return false;
    });

    stylePage.on("mouseleave", function() {

        stylePage.removeClass("slide-left");
        confButton.removeClass("act");

        return false;

    });

    //firefox detection
    if(navigator.userAgent.toLowerCase().indexOf("firefox") > -1){
        $("body").addClass("firefox");
    }

    
    new WOW().init();

    
})(jQuery, window, document);


    
    