(function ($) {
	"use strict";

	window.qodefCore = {};
	qodefCore.shortcodes = {};
	
	qodefCore.body = $('body');
	qodefCore.html = $('html');
	qodefCore.windowWidth = $(window).width();
	qodefCore.windowHeight = $(window).height();
	qodefCore.scroll = 0;

	$(document).ready(function () {
		qodefInlinePageStyle.init();
	});

	var qodefScroll = {
		disable: function(){
			if (window.addEventListener) {
				window.addEventListener('wheel', qodefScroll.preventDefaultValue, {passive: false});
			}

			// window.onmousewheel = document.onmousewheel = qodefScroll.preventDefaultValue;
			document.onkeydown = qodefScroll.keyDown;
		},
		enable: function(){
			if (window.removeEventListener) {
				window.removeEventListener('wheel', qodefScroll.preventDefaultValue, {passive: false});
			}
			window.onmousewheel = document.onmousewheel = document.onkeydown = null;
		},
		preventDefaultValue: function(e){
			e = e || window.event;
			if (e.preventDefault) {
				e.preventDefault();
			}
			e.returnValue = false;
		},
		keyDown: function(e) {
			var keys = [37, 38, 39, 40];
			for (var i = keys.length; i--;) {
				if (e.keyCode === keys[i]) {
					qodefScroll.preventDefaultValue(e);
					return;
				}
			}
		}
	};

	qodefCore.qodefScroll = qodefScroll;

	var qodefPerfectScrollbar = {
		init: function ($holder) {
			if ($holder.length) {
				qodefPerfectScrollbar.qodefInitScroll($holder);
			}
		},
		qodefInitScroll: function ($holder) {
			var $defaultParams = {
				wheelSpeed: 0.6,
				suppressScrollX: true
			};

			var $ps = new PerfectScrollbar($holder.selector, $defaultParams);
			$(window).resize(function () {
				$ps.update();
			});
		}
	};

	qodefCore.qodefPerfectScrollbar = qodefPerfectScrollbar;

	var qodefInlinePageStyle = {
		init: function () {
			this.holder = $('#mycareer-core-page-inline-style');

			if (this.holder.length) {
				var style = this.holder.data('style');

				if (style.length) {
					$('head').append('<style type="text/css">' + style + '</style>');
				}
			}
		}
	};

})(jQuery);
(function ($) {
    "use strict";

    $(document).ready(function () {
        qodefBackToTop.init();
    });

    var qodefBackToTop = {
        init: function () {
            this.holder = $('#qodef-back-to-top');

            if(this.holder.length) {
                // Scroll To Top
                this.holder.on('click', function (e) {
                    e.preventDefault();
        
                    $('html, body').animate({scrollTop: 0}, $(window).scrollTop() / 4, 'swing');
                });
    
                qodefBackToTop.showHideBackToTop();
            }
        },
        showHideBackToTop: function () {
            $(window).scroll(function () {
                var $thisItem = $(this),
                    b = $thisItem.scrollTop(),
                    c = $thisItem.height(),
                    d;

                if (b > 0) {
                    d = b + c / 2;
                } else {
                    d = 1;
                }

                if (d < 1e3) {
                    qodefBackToTop.addClass('off');
                } else {
                    qodefBackToTop.addClass('on');
                }
            });
        },
        addClass: function (a) {
            this.holder.removeClass('qodef--off qodef--on');

            if (a === 'on') {
                this.holder.addClass('qodef--on');
            } else {
                this.holder.addClass('qodef--off');
            }
        }
    };

})(jQuery);

(function ($) {
	"use strict";
	
	$(document).ready(function () {
		qodefFullscreenMenu.init();
	});
	
	var qodefFullscreenMenu = {
		init: function () {
			var $fullscreenMenuOpener = $('a.qodef-fullscreen-menu-opener'),
				$menuItems = $('.qodef-fullscreen-menu-holder nav ul li a');
			
			// Open popup menu
			$fullscreenMenuOpener.on('click', function (e) {
				e.preventDefault();
				
				if (!qodef.body.hasClass('qodef-fullscreen-menu--opened')) {
					qodefFullscreenMenu.openFullscreen();
					$(document).keyup(function (e) {
						if (e.keyCode === 27) {
							qodefFullscreenMenu.closeFullscreen();
						}
					});
				} else {
					qodefFullscreenMenu.closeFullscreen();
				}
			});
			
			//open dropdowns
			$menuItems.on('tap click', function (e) {
				var $thisItem = $(this);
				if ($thisItem.parent().hasClass('menu-item-has-children')) {
					e.preventDefault();
					qodefFullscreenMenu.clickItemWithChild($thisItem);
				} else if (($(this).attr('href') !== "http://#") && ($(this).attr('href') !== "#")) {
					qodefFullscreenMenu.closeFullscreen();
				}
			});
		},
		openFullscreen: function () {
			qodef.body.removeClass('qodef-fullscreen-menu-animate--out').addClass('qodef-fullscreen-menu--opened qodef-fullscreen-menu-animate--in');
			qodefCore.qodefScroll.disable();
		},
		closeFullscreen: function () {
			qodef.body.removeClass('qodef-fullscreen-menu--opened qodef-fullscreen-menu-animate--in').addClass('qodef-fullscreen-menu-animate--out');
			qodefCore.qodefScroll.enable();
			$("nav.qodef-fullscreen-menu ul.sub_menu").slideUp(200);
		},
		clickItemWithChild: function (thisItem) {
			var $thisItemParent = thisItem.parent(),
				$thisItemSubMenu = $thisItemParent.find('.sub-menu').first();
			
			if ($thisItemSubMenu.is(':visible')) {
				$thisItemSubMenu.slideUp(300);
			} else {
				$thisItemSubMenu.slideDown(300);
				$thisItemParent.siblings().find('.sub-menu').slideUp(400);
			}
		}
	};
	
})(jQuery);
(function ($) {
	"use strict";
	
	$(document).ready(function () {
		animateProgress.init();
	});
	
	$(document).on('mycareer_trigger_get_new_posts', function () {
		animateProgress.init();
	});
	
	var animateProgress = {
		init: function () {
			var $goalProgress = $('.give-goal-progress:not(.qode-initialized)');
			
			if ($goalProgress.length) {
				$goalProgress.each(function () {
					
					// adds qode class
					$(this).addClass('qode-initialized');
					
					// gets percentages
					var $itemForPercentages = $(this).find('.give-progress-bar');
					var percentages = Math.ceil($itemForPercentages.attr('aria-valuenow'));
					
					// in order to animate progress bar, adding !important
					var $itemProgressBar = $(this).find('.give-progress-bar > span');
					var previousStyle = $itemProgressBar.attr('style');
					setTimeout(function () {
						$itemProgressBar.attr('style', 'width:' + percentages + '%' + ' !important; ' + previousStyle + '');
					});
					
					// adds our percentage text
					var $itemQodeProgressText = $(this);
					$itemQodeProgressText.append('<div class="qode-progress-text-holder"><div class="qode-progress-text"><span>' + percentages + '%' + '</span></div></div>');
					setTimeout(function () {
						$itemQodeProgressText.find('.qode-progress-text').attr('style', 'transform: translateX(' + percentages + '% ' + '); opacity: 1;  ');
					});
					
					// uses default text that is printed from Give plugin, since there are multiple type options like donations, donors, raised, funded
					var $raisedAllText = $(this).find('.raised')[0].childNodes;
					var raisedSingleText = $raisedAllText[$raisedAllText.length - 1].textContent;
					$(this).find('.raised .income, .raised .give-percentage').before('<span class="qodef-income-label">' + raisedSingleText + ':' + '</span>');
					$(this).find('.raised .goal-text').before('<span class="qodef-goal-label">' + 'Goal' + ':' + '</span>');
					
					// if type is percentage, add additional divs
					if ( $(this).find('.raised .give-percentage').length) {
						$(this).find('.raised .give-percentage').after('<span class="goal-text">' + '100%' + '</span>');
						$(this).find('.raised .give-percentage').after('<span class="qodef-goal-label">' + 'Goal' + ':' + '</span>');
					}
					
					// removes all text nodes after
					var $removeNodes = $(this).find('.raised').contents().filter(function () {
						return this.nodeType === 3; //Node.TEXT_NODE
					});
					if ($removeNodes.length) {
						$removeNodes.each(function () {
							$(this).remove();
						});
					}
				});
			}
		}
	};
	
})(jQuery);

(function($){
    "use strict";

    $(document).ready(function () {
        qodefHeaderScrollAppearance.init();
    });

    var qodefHeaderScrollAppearance = {
        appearanceType: function(){
            return qodef.body.attr('class').indexOf('qodef-header-appearance--') !== -1 ? qodef.body.attr('class').match(/qodef-header-appearance--([\w]+)/)[1] : '';
        },
        init: function(){
            var appearanceType = this.appearanceType();

            if(appearanceType !== '' && appearanceType !== 'none'){
                window.qodef[appearanceType+"HeaderAppearance"]();
            }
        }
    };

})(jQuery);

(function($) {
    'use strict';
    
    var like = {};
    
    like.qodefOnDocumentReady = qodefOnDocumentReady;

    $(document).ready(qodefOnDocumentReady);
    
    /**
    *  All functions to be called on $(document).ready() should be in this function
    **/
    function qodefOnDocumentReady() {
        qodefLikes();
    }

    function qodefLikes() {
        $(document).on('click','.qodef-like', function() {
            var likeLink = $(this),
                id = likeLink.attr('id'),
                postID = likeLink.data('post-id'),
                type = '';

            if ( likeLink.hasClass('liked') ) {
                return false;
            }

            if (typeof likeLink.data('type') !== 'undefined') {
                type = likeLink.data('type');
            }
    
            var dataToPass = {
                action: 'mycareer_core_action_like',
                likes_id: id,
                type: type,
                like_nonce: $('#qodef_like_nonce_'+postID).val()
            };
        
            var like = $.post(qodefGlobal.vars.qodefAjaxUrl, dataToPass, function( data ) {
                likeLink.html(data).addClass('liked').attr('title', 'You already like this!');
            });
            
            return false;
        });
    }
    
})(jQuery);
(function ($) {
    "use strict";

    $(document).ready(function () {
        qodefMobileHeaderAppearance.init();
    });

    /*
     **	Init mobile header functionality
     */
    var qodefMobileHeaderAppearance = {
        init: function () {
            if (qodef.body.hasClass('qodef-mobile-header-appearance--sticky')) {

                var docYScroll1 = qodef.scroll,
                    displayAmount = qodefGlobal.vars.mobileHeaderHeight + qodefGlobal.vars.adminBarHeight,
                    $pageOuter = $('#qodef-page-outer');

                qodefMobileHeaderAppearance.showHideMobileHeader(docYScroll1, displayAmount, $pageOuter);
                $(window).scroll(function () {
                    qodefMobileHeaderAppearance.showHideMobileHeader(docYScroll1, displayAmount, $pageOuter);
                    docYScroll1 = qodef.scroll;
                });

                $(window).resize(function () {
                    $pageOuter.css('padding-top', 0);
                    qodefMobileHeaderAppearance.showHideMobileHeader(docYScroll1, displayAmount, $pageOuter);
                });
            }
        },
        showHideMobileHeader: function(docYScroll1, displayAmount,$pageOuter){
            if(qodef.windowWidth <= 1024) {
                if (qodef.scroll > displayAmount * 2) {
                    //set header to be fixed
                    qodef.body.addClass('qodef-mobile-header--sticky');

                    //add transition to it
                    setTimeout(function () {
                        qodef.body.addClass('qodef-mobile-header--sticky-animation');
                    }, 300); //300 is duration of sticky header animation

                    //add padding to content so there is no 'jumping'
                    $pageOuter.css('padding-top', qodefGlobal.vars.mobileHeaderHeight);
                } else {
                    //unset fixed header
                    qodef.body.removeClass('qodef-mobile-header--sticky');

                    //remove transition
                    setTimeout(function () {
                        qodef.body.removeClass('qodef-mobile-header--sticky-animation');
                    }, 300); //300 is duration of sticky header animation

                    //remove padding from content since header is not fixed anymore
                    $pageOuter.css('padding-top', 0);
                }

                if ((qodef.scroll > docYScroll1 && qodef.scroll > displayAmount) || (qodef.scroll < displayAmount * 3)) {
                    //show sticky header
                    qodef.body.removeClass('qodef-mobile-header--sticky-display');
                } else {
                    //hide sticky header
                    qodef.body.addClass('qodef-mobile-header--sticky-display');
                }
            }
        }
    };

})(jQuery);
(function ($) {
	"use strict";
	
	$(document).ready(function () {
		qodefNavMenu.init();
	});
	
	var qodefNavMenu = {
		init: function () {
			qodefNavMenu.dropdownBehavior();
			qodefNavMenu.wideDropdownPosition();
			qodefNavMenu.dropdownPosition();
		},
		dropdownBehavior: function () {
			var $menuItems = $('.qodef-header-navigation > ul > li');
			
			$menuItems.each(function () {
				var $thisItem = $(this);
				
				if ($thisItem.find('.qodef-drop-down-second').length) {
					$thisItem.waitForImages(function () {
						var $dropdownHolder = $thisItem.find('.qodef-drop-down-second'),
							$dropdownMenuItem = $dropdownHolder.find('.qodef-drop-down-second-inner ul'),
							dropDownHolderHeight = $dropdownMenuItem.outerHeight();
						
						if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
							$thisItem.on("touchstart mouseenter", function () {
								$dropdownHolder.css({
									'height': dropDownHolderHeight,
									'overflow': 'visible',
									'visibility': 'visible',
									'opacity': '1'
								});
							}).on("mouseleave", function () {
								$dropdownHolder.css({
									'height': '0px',
									'overflow': 'hidden',
									'visibility': 'hidden',
									'opacity': '0'
								});
							});
						} else {
							if (qodefCore.body.hasClass('qodef-drop-down-second--animate-height')) {
								var animateConfig = {
									interval: 0,
									over: function () {
										setTimeout(function () {
											$dropdownHolder.addClass('qodef-drop-down--start').css({
												'visibility': 'visible',
												'height': '0',
												'opacity': '1'
											});
											$dropdownHolder.stop().animate({
												'height': dropDownHolderHeight
											}, 400, 'easeInOutQuint', function () {
												$dropdownHolder.css('overflow', 'visible');
											});
										}, 100);
									},
									timeout: 100,
									out: function () {
										$dropdownHolder.stop().animate({
											'height': '0',
											'opacity': 0
										}, 100, function () {
											$dropdownHolder.css({
												'overflow': 'hidden',
												'visibility': 'hidden'
											});
										});
										
										$dropdownHolder.removeClass('qodef-drop-down--start');
									}
								};
								
								$thisItem.hoverIntent(animateConfig);
							} else {
								var config = {
									interval: 0,
									over: function () {
										setTimeout(function () {
											$dropdownHolder.addClass('qodef-drop-down--start').stop().css({'height': dropDownHolderHeight});
										}, 150);
									},
									timeout: 150,
									out: function () {
										$dropdownHolder.stop().css({'height': '0'}).removeClass('qodef-drop-down--start');
									}
								};
								
								$thisItem.hoverIntent(config);
							}
						}
					});
				}
			});
		},
		wideDropdownPosition: function () {
			var $menuItems = $(".qodef-header-navigation > ul > li.qodef-menu-item--wide");
			
			if ($menuItems.length) {
				$menuItems.each(function () {
					var $menuItem = $(this);
					var $menuItemSubMenu = $menuItem.find('.qodef-drop-down-second');
					
					if ($menuItemSubMenu.length) {
						$menuItemSubMenu.css('left', 0);
						
						var leftPosition = $menuItemSubMenu.offset().left;
						
						if (qodefCore.body.hasClass('qodef--boxed')) {
							//boxed layout case
							var boxedWidth = $('.qodef--boxed #qodef-page-wrapper').outerWidth();
							leftPosition = leftPosition - (qodefCore.windowWidth - boxedWidth) / 2;
							$menuItemSubMenu.css({'left': -leftPosition, 'width': boxedWidth});
							
						} else if (qodefCore.body.hasClass('qodef-drop-down-second--full-width')) {
							//wide dropdown full width case
							$menuItemSubMenu.css({'left': -leftPosition});
						}
						else {
							//wide dropdown in grid case
							$menuItemSubMenu.css({'left': -leftPosition + (qodefCore.windowWidth - $menuItemSubMenu.width()) / 2});
						}
					}
				});
			}
		},
		dropdownPosition: function () {
			var $menuItems = $('.qodef-header-navigation > ul > li.qodef-menu-item--narrow.menu-item-has-children');
			
			if ($menuItems.length) {
				$menuItems.each(function () {
					var $thisItem = $(this),
						menuItemPosition = $thisItem.offset().left,
						$dropdownHolder = $thisItem.find('.qodef-drop-down-second'),
						$dropdownMenuItem = $dropdownHolder.find('.qodef-drop-down-second-inner ul'),
						dropdownMenuWidth = $dropdownMenuItem.outerWidth(),
						menuItemFromLeft = $(window).width() - menuItemPosition;
					
					if (qodef.body.hasClass('qodef--boxed')) {
						//boxed layout case
						var boxedWidth = $('.qodef--boxed #qodef-page-wrapper').outerWidth();
						menuItemFromLeft = boxedWidth - menuItemPosition;
					}
					
					var dropDownMenuFromLeft;
					
					if ($thisItem.find('li.menu-item-has-children').length > 0) {
						dropDownMenuFromLeft = menuItemFromLeft - dropdownMenuWidth;
					}
					
					$dropdownHolder.removeClass('qodef-drop-down--right');
					$dropdownMenuItem.removeClass('qodef-drop-down--right');
					if (menuItemFromLeft < dropdownMenuWidth || dropDownMenuFromLeft < dropdownMenuWidth) {
						$dropdownHolder.addClass('qodef-drop-down--right');
						$dropdownMenuItem.addClass('qodef-drop-down--right');
					}
				});
			}
		}
	};
	
})(jQuery);
(function ($) {
    "use strict";

    $(window).on('load', function () {
        qodefParallaxBackground.init();
    });

    /**
     * Init global parallax background functionality
     */
    var qodefParallaxBackground = {
        init: function (settings) {
            this.$sections = $('.qodef-parallax');

            // Allow overriding the default config
            $.extend(this.$sections, settings);

            var isSupported = !qodef.html.hasClass('touchevents') && !qodef.body.hasClass('qodef-browser--edge') && !qodef.body.hasClass('qodef-browser--ms-explorer');

            if (this.$sections.length && isSupported) {
                this.$sections.each(function () {
                    qodefParallaxBackground.ready($(this));
                });
            }
        },
        ready: function ($section) {
            $section.$imgHolder = $section.find('.qodef-parallax-img-holder');
            $section.$imgWrapper = $section.find('.qodef-parallax-img-wrapper');
            $section.$img = $section.find('img');

            var h = $section.height(),
                imgWrapperH = $section.$imgWrapper.height();

            $section.movement = 100 * (imgWrapperH - h) / h / 2; //percentage (divided by 2 due to absolute img centering in CSS)

            $section.buffer = window.pageYOffset;
            $section.scrollBuffer = null;

			
            //calc and init loop
            requestAnimationFrame(function () {
				$section.$imgHolder.animate({opacity: 1}, 100);
                qodefParallaxBackground.calc($section);
                qodefParallaxBackground.loop($section);
            });

            //recalc
            $(window).on('resize', function () {
                qodefParallaxBackground.calc($section);
            });
        },
        calc: function ($section) {
            var wH = $section.$imgWrapper.height(),
                wW = $section.$imgWrapper.width();

            if ($section.$img.width() < wW) {
                $section.$img.css({
                    'width': '100%',
                    'height': 'auto'
                });
            }

            if ($section.$img.height() < wH) {
                $section.$img.css({
                    'height': '100%',
                    'width': 'auto',
                    'max-width': 'unset'
                });
            }
        },
        loop: function ($section) {
            if ($section.scrollBuffer === Math.round(window.pageYOffset)) {
                requestAnimationFrame(function () {
                    qodefParallaxBackground.loop($section);
                }); //repeat loop
                return false; //same scroll value, do nothing
            } else {
                $section.scrollBuffer = Math.round(window.pageYOffset);
            }

            var wH = window.outerHeight,
                sTop = $section.offset().top,
                sH = $section.height();

            if ($section.scrollBuffer + wH * 1.2 > sTop && $section.scrollBuffer < sTop + sH) {
                var delta = (Math.abs($section.scrollBuffer + wH - sTop) / (wH + sH)).toFixed(4), //coeff between 0 and 1 based on scroll amount
                    yVal = (delta * $section.movement).toFixed(4);

                if ($section.buffer !== delta) {
                    $section.$imgWrapper.css('transform', 'translate3d(0,' + yVal + '%, 0)');
                }

                $section.buffer = delta;
            }

            requestAnimationFrame(function () {
                qodefParallaxBackground.loop($section);
            }); //repeat loop
        }
    };
	
	qodefCore.qodefParallaxBackground = qodefParallaxBackground;

})(jQuery);
(function ($) {
	"use strict";
	
	$(document).ready(function () {
		qodefSectionTooltip.init();
	});
	
	/**
	 * Init global section tooltip functionality
	 */
	var qodefSectionTooltip = {
		init: function () {
			this.holder = $('.qodef-tooltip-follow-yes');
			
			if(this.holder.length) {
				
				this.holder.each(function () {
					var followTooltipHolder = $(this);
					var followTooltip = followTooltipHolder.find('.qodef-tooltip-text');
					
					//tooltip position
					followTooltipHolder.on('mousemove', function (e) {
						followTooltip.css({
							top: e.clientY,
							left: e.clientX
						});
					});
					
					//show/hide tooltip
					followTooltipHolder.on('mouseenter', function () {
						if (!followTooltip.hasClass('qodef-is-active')) {
							followTooltip.addClass('qodef-is-active');
						}
					}).on('mouseleave', function () {
						if (followTooltip.hasClass('qodef-is-active')) {
							followTooltip.removeClass('qodef-is-active');
						}
					});
				});
			}
		}
	};
	
	qodefCore.qodefSectionTooltip = qodefSectionTooltip;
	
})(jQuery);
(function ($) {
	"use strict";
	
	$(document).ready(function () {
		qodefSideArea.init();
	});
	
	var qodefSideArea = {
		init: function () {
			var $sideAreaOpener = $('a.qodef-side-area-opener'),
				$sideAreaClose = $('#qodef-side-area-close'),
				$sideArea = $('#qodef-side-area');
				qodefSideArea.openerHoverColor($sideAreaOpener);
			// Open Side Area
			$sideAreaOpener.on('click', function (e) {
				e.preventDefault();
				
				if (!qodef.body.hasClass('qodef-side-area--opened')) {
					qodefSideArea.openSideArea();
					
					$(document).keyup(function (e) {
						if (e.keyCode === 27) {
							qodefSideArea.closeSideArea();
						}
					});
				} else {
					qodefSideArea.closeSideArea();
				}
			});
			
			$sideAreaClose.on('click', function (e) {
				e.preventDefault();
				qodefSideArea.closeSideArea();
			});
			
			if ($sideArea.length && typeof window.qodefCore.qodefPerfectScrollbar === 'object') {
				window.qodefCore.qodefPerfectScrollbar.init($sideArea);
			}
		},
		openSideArea: function () {
			var $wrapper = $('#qodef-page-wrapper');
			var currentScroll = $(window).scrollTop();

			$('.qodef-side-area-cover').remove();
			$wrapper.prepend('<div class="qodef-side-area-cover"/>');
			qodef.body.removeClass('qodef-side-area-animate--out').addClass('qodef-side-area--opened qodef-side-area-animate--in');

			$('.qodef-side-area-cover').on('click', function (e) {
				e.preventDefault();
				qodefSideArea.closeSideArea();
			});

			$(window).scroll(function () {
				if (Math.abs(qodef.scroll - currentScroll) > 400) {
					qodefSideArea.closeSideArea();
				}
			});

		},
		closeSideArea: function () {
			qodef.body.removeClass('qodef-side-area--opened qodef-side-area-animate--in').addClass('qodef-side-area-animate--out');
		},
		openerHoverColor: function ($opener) {
			if (typeof $opener.data('hover-color') !== 'undefined') {
				var hoverColor = $opener.data('hover-color');
				var originalColor = $opener.css('color');
				
				$opener.on('mouseenter', function () {
					$opener.css('color', hoverColor);
				}).on('mouseleave', function () {
					$opener.css('color', originalColor);
				});
			}
		}
	};
	
})(jQuery);

(function ($) {
	"use strict";

    $(document).ready(function() {
		spinners.init();
	});
	
	var spinners = {
		init: function () {
			$(window).on('load', function() {
				spinners.fadeOutLoader();
				spinners.landingAnimations();
			});

			// Elementor handling
			if (window.elementorFrontend) {
				spinners.fadeOutLoader();
				spinners.landingAnimations();
			}
		},
		landingAnimations: function() {
			var imgWithText = $('.qodef-image-with-text'),
				panel = $('.qodef-panel.qodef-collapsed');

			if (imgWithText.length) {
				imgWithText.css({'opacity': 0, 'transform': 'translateY(10px)'});
			}
			if(panel.length && qodef.windowWidth > 1024) {
				panel.css({'transform': 'translateX(-100%)'});
			}
			
			if (imgWithText.length) {
				setTimeout(function() {
					imgWithText.each(function(i) {
						var thisItem = $(this);
						setTimeout(function() {
							thisItem.css({'opacity': 1, 'transform': 'translateY(0)', 'transition': 'transform .7s, opacity .5s'});
						}, i * 100)
					})
				}, 500);
			}
			if(panel.length && qodef.windowWidth > 1024) {
				setTimeout(function() {
					panel.css({'transform': 'translateX(0)', 'transition': '1s cubic-bezier(0.5, 0.4, 0.07, 1)'});
				}, 100);
			}
		},
		fadeOutLoader: function(speed, delay, easing) {
			speed = speed ? speed : 400;
			delay = delay ? delay : 300;
			easing = easing ? easing : 'swing';

			var loader = $('.qodef-smooth-transition-loader');

			if (loader.length) {
				loader.delay(delay).fadeOut(speed, easing);
				$(window).on('bind', 'pageshow', function (event) {
					if (event.originalEvent.persisted) {
						loader.fadeOut(speed, easing);
					}
				});
			}
		}
	};
	
})(jQuery);

(function ($) {
    "use strict";

    $(window).on('load', function () {
        qodefSubscribeModal.init();
    });

    var qodefSubscribeModal = {
        init: function () {
            this.holder = $('#qodef-subscribe-popup-modal');

            if (this.holder.length) {
                var $preventHolder = this.holder.find('.qodef-sp-prevent'),
                    $modalClose = $('.qodef-sp-close'),
                    disabledPopup = 'no';

                if ($preventHolder.length) {
                    var isLocalStorage = this.holder.hasClass('qodef-sp-prevent-cookies'),
                        $preventInput = $preventHolder.find('.qodef-sp-prevent-input'),
                        preventValue = $preventInput.data('value');

                    if (isLocalStorage) {
                        disabledPopup = localStorage.getItem('disabledPopup');
                        sessionStorage.removeItem('disabledPopup');
                    } else {
                        disabledPopup = sessionStorage.getItem('disabledPopup');
                        localStorage.removeItem('disabledPopup');
                    }

                    $preventHolder.children().on('click', function (e) {
                        if (preventValue !== 'yes') {
                            preventValue = 'yes';
                            $preventInput.addClass('qodef-sp-prevent-clicked').data('value', 'yes');
                        } else {
                            preventValue = 'no';
                            $preventInput.removeClass('qodef-sp-prevent-clicked').data('value', 'no');
                        }

                        if (preventValue === 'yes') {
                            if (isLocalStorage) {
                                localStorage.setItem('disabledPopup', 'yes');
                            } else {
                                sessionStorage.setItem('disabledPopup', 'yes');
                            }
                        } else {
                            if (isLocalStorage) {
                                localStorage.setItem('disabledPopup', 'no');
                            } else {
                                sessionStorage.setItem('disabledPopup', 'no');
                            }
                        }
                    });
                }

                if (disabledPopup !== 'yes') {
                    if (qodef.body.hasClass('qodef-sp-opened')) {
                        qodefSubscribeModal.handleClassAndScroll('remove');
                    } else {
                        qodefSubscribeModal.handleClassAndScroll('add');
                    }

                    $modalClose.on('click', function (e) {
                        e.preventDefault();

                        qodefSubscribeModal.handleClassAndScroll('remove');
                    });

                    // Close on escape
                    $(document).keyup(function (e) {
                        if (e.keyCode === 27) { // KeyCode for ESC button is 27
                            qodefSubscribeModal.handleClassAndScroll('remove');
                        }
                    });
                }
            }
        },

        handleClassAndScroll: function (option) {
            if (option === 'remove') {
                qodef.body.removeClass('qodef-sp-opened');
                qodefCore.qodefScroll.enable();
            }
            if (option === 'add') {
                qodef.body.addClass('qodef-sp-opened');
                qodefCore.qodefScroll.disable();
            }
        },
    };

})(jQuery);
(function ($) {
	"use strict";
	
	$(document).ready(function () {
		qodefWooSelect2.init();
		qodefWooQuantityButtons.init();
		qodefWooMagnificPopup.init();
	});
	
	var qodefWooSelect2 = {
		init: function (settings) {
			this.holder = [];
			this.holder.push({holder: $('#qodef-woo-page .woocommerce-ordering select'), options: {minimumResultsForSearch: Infinity}});
			this.holder.push({holder: $('#qodef-woo-page .variations select'), options: {}});
			this.holder.push({holder: $('#qodef-woo-page #calc_shipping_country'), options: {}});
			this.holder.push({holder: $('#qodef-woo-page .shipping select#calc_shipping_state'), options: {}});
			this.holder.push({holder: $('.widget.widget_archive select'), options: {}});
			this.holder.push({holder: $('.widget.widget_categories select'), options: {}});
			this.holder.push({holder: $('.widget.widget_text select'), options: {}});
			
			// Allow overriding the default config
			$.extend(this.holder, settings);
			
			if (typeof this.holder === 'object') {
				$.each(this.holder, function (key, value) {
					qodefWooSelect2.createSelect2(value.holder, value.options);
				});
			}
		},
		createSelect2: function ($holder, options) {
			if (typeof $holder.select2 === 'function') {
				$holder.select2(options);
			}
		}
	};
	
	var qodefWooQuantityButtons = {
		init: function() {
			$(document).on('click', '.qodef-quantity-minus, .qodef-quantity-plus', function (e) {
				e.stopPropagation();
				
				var $button = $(this),
					$inputField = $button.siblings('.qodef-quantity-input'),
					step = parseFloat($inputField.data('step')),
					max = parseFloat($inputField.data('max')),
					minus = false,
                    inputValue = typeof Number.isNaN === 'function' && Number.isNaN(parseFloat($inputField.val())) ? min : parseFloat($inputField.val()),
					newInputValue;
				
				if ($button.hasClass('qodef-quantity-minus')) {
					minus = true;
				}
				
				if (minus) {
					newInputValue = inputValue - step;
					if (newInputValue >= 1) {
						$inputField.val(newInputValue);
					} else {
						$inputField.val(0);
					}
				} else {
					newInputValue = inputValue + step;
					if (max === undefined) {
						$inputField.val(newInputValue);
					} else {
						if (newInputValue >= max) {
							$inputField.val(max);
						} else {
							$inputField.val(newInputValue);
						}
					}
				}
				
				$inputField.trigger('change');
			});
		}
	};

	var qodefWooMagnificPopup = {
		init: function () {
			if (typeof qodef.qodefMagnificPopup === 'object') {
				var $holder = $('.qodef--single.qodef-magnific-popup.qodef-popup-gallery .woocommerce-product-gallery__image');

				if ($holder.length) {
					$holder.each(function () {
						$(this).children('a').attr('data-type', 'image').addClass('qodef-popup-item');
					});

					qodef.qodefMagnificPopup.init();
				}
			}
		}
	}
	
})(jQuery);

(function ($) {
	"use strict";
	
	qodefCore.shortcodes.mycareer_core_accordion = {};
	
	$(document).ready(function () {
		qodefAccordion.init();
	});
	
	var qodefAccordion = {
		init: function () {
			this.holder = $('.qodef-accordion');
			
			if (this.holder.length) {
				this.holder.each(function () {
					var $thisHolder = $(this);
					
					if ($thisHolder.hasClass('qodef-behavior--accordion')) {
						qodefAccordion.initAccordion($thisHolder);
					}
					
					if ($thisHolder.hasClass('qodef-behavior--toggle')) {
						qodefAccordion.initToggle($thisHolder);
					}
					
					$thisHolder.addClass('qodef--init');
				});
			}
		},
		initAccordion: function ($accordion) {
			$accordion.accordion({
				animate: "swing",
				collapsible: true,
				active: 0,
				icons: "",
				heightStyle: "content"
			});
		},
		initToggle: function ($toggle) {
			var $toggleAccordionTitle = $toggle.find('.qodef-accordion-title'),
				$toggleAccordionContent = $toggleAccordionTitle.next();
			
			$toggle.addClass("accordion ui-accordion ui-accordion-icons ui-widget ui-helper-reset");
			$toggleAccordionTitle.addClass("ui-accordion-header ui-state-default ui-corner-top ui-corner-bottom");
			$toggleAccordionContent.addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom").hide();
			
			$toggleAccordionTitle.each(function () {
				var $thisTitle = $(this);
				
				$thisTitle.hover(function () {
					$thisTitle.toggleClass("ui-state-hover");
				});
				
				$thisTitle.on('click', function () {
					$thisTitle.toggleClass('ui-accordion-header-active ui-state-active ui-state-default ui-corner-bottom');
					$thisTitle.next().toggleClass('ui-accordion-content-active').slideToggle(400);
				});
			});
		}
	};
	
	qodefCore.shortcodes.mycareer_core_accordion.qodefAccordion = qodefAccordion;
	
})(jQuery);
(function ($) {
	"use strict";
	
	qodefCore.shortcodes.mycareer_core_button = {};
	
	$(document).ready(function () {
		qodefButton.init();
	});
	
	var qodefButton = {
		init: function () {
			this.buttons = $('.qodef-button');
			
			if (this.buttons.length) {
				this.buttons.each(function () {
					var $thisButton = $(this);
					
					qodefButton.buttonHoverColor($thisButton);
					qodefButton.buttonHoverBgColor($thisButton);
					qodefButton.buttonHoverBorderColor($thisButton);
				});
			}
		},
		buttonHoverColor: function ($button) {
			if (typeof $button.data('hover-color') !== 'undefined') {
				var hoverColor = $button.data('hover-color');
				var originalColor = $button.css('color');
				
				$button.on('mouseenter', function () {
					qodefButton.changeColor($button, 'color', hoverColor);
				});
				$button.on('mouseleave', function () {
					qodefButton.changeColor($button, 'color', originalColor);
				});
			}
		},
		buttonHoverBgColor: function ($button) {
			if (typeof $button.data('hover-background-color') !== 'undefined') {
				var hoverBackgroundColor = $button.data('hover-background-color');
				var originalBackgroundColor = $button.css('background-color');
				
				$button.on('mouseenter', function () {
					qodefButton.changeColor($button, 'background-color', hoverBackgroundColor);
				});
				$button.on('mouseleave', function () {
					qodefButton.changeColor($button, 'background-color', originalBackgroundColor);
				});
			}
		},
		buttonHoverBorderColor: function ($button) {
			if (typeof $button.data('hover-border-color') !== 'undefined') {
				var hoverBorderColor = $button.data('hover-border-color');
				var originalBorderColor = $button.css('borderTopColor');
				
				$button.on('mouseenter', function () {
					qodefButton.changeColor($button, 'border-color', hoverBorderColor);
				});
				$button.on('mouseleave', function () {
					qodefButton.changeColor($button, 'border-color', originalBorderColor);
				});
			}
		},
		changeColor: function ($button, cssProperty, color) {
			$button.css(cssProperty, color);
		}
	};
	
	qodefCore.shortcodes.mycareer_core_button.qodefButton = qodefButton;
	
})(jQuery);
(function ($) {
	"use strict";
	
	qodefCore.shortcodes.mycareer_core_cards_gallery = {};
	
	$(document).ready(function () {
		qodefCardsGallery.init();
	});
	
	var qodefCardsGallery = {
		init: function () {
			this.holder = $('.qodef-cards-gallery');
			
			if (this.holder.length) {
				this.holder.each(function () {
					var $thisHolder = $(this);
					qodefCardsGallery.initCards( $thisHolder );
					qodefCardsGallery.initBundle( $thisHolder );
				});
			}
		},
		initCards: function ($holder) {
			var $cards = $holder.find('.qodef-m-card');
			$cards.each(function () {
				var $card = $(this);
				
				$card.on('click', function () {
					if (!$cards.last().is($card)) {
						$card.addClass('qodef-out qodef-animating').siblings().addClass('qodef-animating-siblings');
						$card.detach();
						$card.insertAfter($cards.last());
						
						setTimeout(function () {
							$card.removeClass('qodef-out');
						}, 200);
						
						setTimeout(function () {
							$card.removeClass('qodef-animating').siblings().removeClass('qodef-animating-siblings');
						}, 1200);
						
						$cards = $holder.find('.qodef-m-card');
						
						return false;
					}
				});
				
				
			});
		},
		initBundle: function($holder) {
			if ($holder.hasClass('qodef-animation--bundle') && !qodef.html.hasClass('touchevents')) {
				$holder.appear(function () {
					$holder.addClass('qodef-appeared');
					$holder.find('img').one('animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd', function () {
						$(this).addClass('qodef-animation-done');
					});
				}, {accX: 0, accY: -100});
			}
		}
	};
	
	qodefCore.shortcodes.mycareer_core_cards_gallery.qodefCardsGallery  = qodefCardsGallery;
	
})(jQuery);
(function ($) {
	"use strict";
	
	qodefCore.shortcodes.mycareer_core_countdown = {};
	
	$(document).ready(function () {
		qodefCountdown.init();
	});
	
	var qodefCountdown = {
		init: function () {
			this.countdowns = $('.qodef-countdown');
			
			if (this.countdowns.length) {
				this.countdowns.each(function () {
					var $thisCountdown = $(this),
						$countdownElement = $thisCountdown.find('.qodef-m-date'),
						options = qodefCountdown.generateOptions($thisCountdown);
					
					qodefCountdown.initCountdown($countdownElement, options);
				});
			}
		},
		generateOptions: function($countdown) {
			var options = {};
			options.date = typeof $countdown.data('date') !== 'undefined' ? $countdown.data('date') : null;
			
			options.weekLabel = typeof $countdown.data('week-label') !== 'undefined' ? $countdown.data('week-label') : '';
			options.weekLabelPlural = typeof $countdown.data('week-label-plural') !== 'undefined' ? $countdown.data('week-label-plural') : '';
			
			options.dayLabel = typeof $countdown.data('day-label') !== 'undefined' ? $countdown.data('day-label') : '';
			options.dayLabelPlural = typeof $countdown.data('day-label-plural') !== 'undefined' ? $countdown.data('day-label-plural') : '';
			
			options.hourLabel = typeof $countdown.data('hour-label') !== 'undefined' ? $countdown.data('hour-label') : '';
			options.hourLabelPlural = typeof $countdown.data('hour-label-plural') !== 'undefined' ? $countdown.data('hour-label-plural') : '';
			
			options.minuteLabel = typeof $countdown.data('minute-label') !== 'undefined' ? $countdown.data('minute-label') : '';
			options.minuteLabelPlural = typeof $countdown.data('minute-label-plural') !== 'undefined' ? $countdown.data('minute-label-plural') : '';
			
			options.secondLabel = typeof $countdown.data('second-label') !== 'undefined' ? $countdown.data('second-label') : '';
			options.secondLabelPlural = typeof $countdown.data('second-label-plural') !== 'undefined' ? $countdown.data('second-label-plural') : '';
			
			return options;
		},
		initCountdown: function ($countdownElement, options) {
			var $weekHTML = '<span class="qodef-digit-wrapper"><span class="qodef-digit">%w</span><span class="qodef-label">' + '%!w:' + options.weekLabel + ',' + options.weekLabelPlural + ';</span></span>';
			var $dayHTML = '<span class="qodef-digit-wrapper"><span class="qodef-digit">%d</span><span class="qodef-label">' + '%!d:' + options.dayLabel + ',' + options.dayLabelPlural + ';</span></span>';
			var $hourHTML = '<span class="qodef-digit-wrapper"><span class="qodef-digit">%H</span><span class="qodef-label">' + '%!H:' + options.hourLabel + ',' + options.hourLabelPlural + ';</span></span>';
			var $minuteHTML = '<span class="qodef-digit-wrapper"><span class="qodef-digit">%M</span><span class="qodef-label">' + '%!M:' + options.minuteLabel + ',' + options.minuteLabelPlural + ';</span></span>';
			var $secondHTML = '<span class="qodef-digit-wrapper"><span class="qodef-digit">%S</span><span class="qodef-label">' + '%!S:' + options.secondLabel + ',' + options.secondLabelPlural + ';</span></span>';
			
			$countdownElement.countdown(options.date, function(event) {
				$(this).html(event.strftime($weekHTML + $dayHTML + $hourHTML + $minuteHTML + $secondHTML));
			});
		}
	};
	
	qodefCore.shortcodes.mycareer_core_countdown.qodefCountdown  = qodefCountdown;
	
})(jQuery);
(function ($) {
	"use strict";
	
	qodefCore.shortcodes.mycareer_core_counter = {};
	
	$(document).ready(function () {
		qodefCounter.init();
	});
	
	var qodefCounter = {
		init: function () {
			this.counters = $('.qodef-counter');
			
			if (this.counters.length) {
				this.counters.each(function () {
					var $thisCounter = $(this),
						$counterElement = $thisCounter.find('.qodef-m-digit'),
						options = qodefCounter.generateOptions($thisCounter);
					
					qodefCounter.counterScript($counterElement, options);
				});
			}
		},
		generateOptions: function($counter) {
			var options = {};
			options.start = typeof $counter.data('start-digit') !== 'undefined' && $counter.data('start-digit') !== '' ? $counter.data('start-digit') : 0;
			options.end = typeof $counter.data('end-digit') !== 'undefined' && $counter.data('end-digit') !== '' ? $counter.data('end-digit') : null;
			options.step = typeof $counter.data('step-digit') !== 'undefined' && $counter.data('step-digit') !== '' ? $counter.data('step-digit') : 1;
			options.delay = typeof $counter.data('step-delay') !== 'undefined' && $counter.data('step-delay') !== '' ? parseInt( $counter.data('step-delay'), 10 ) : 100;
			options.txt = typeof $counter.data('digit-label') !== 'undefined' && $counter.data('digit-label') !== '' ? $counter.data('digit-label') : '';
			
			return options;
		},
		counterScript: function ($counterElement, options) {
			var defaults = {
				start: 0,
				end: null,
				step: 1,
				delay: 100,
				txt: ""
			};
			
			var settings = $.extend(defaults, options || {});
			var nb_start = settings.start;
			var nb_end = settings.end;
			
			$counterElement.text(nb_start + settings.txt);
			
			var counter = function() {
				// Definition of conditions of arrest
				if (nb_end !== null && nb_start >= nb_end) {
					return;
				}
				// incrementation
				nb_start = nb_start + settings.step;
				
				if( nb_start >= nb_end ) {
					nb_start = nb_end;
				}
				// display
				$counterElement.text(nb_start + settings.txt);
			};
			
			// Timer
			// Launches every "settings.delay"
			setInterval(counter, settings.delay);
		}
	};
	
	qodefCore.shortcodes.mycareer_core_counter.qodefCounter  = qodefCounter;
	
})(jQuery);
(function ($) {
	'use strict';
	
	qodefCore.shortcodes.mycareer_core_frame_slider = {};
	
	$(document).ready(function () {
		qodefFrameSlider.init();
	});
	
	var qodefFrameSlider = {
		init: function () {
			this.holder = $('.qodef-frame-slider-holder');
			
			if (this.holder.length) {
				this.holder.each(function () {
					var $thisHolder = $(this);
					
					qodefFrameSlider.createSlider($thisHolder);
				});
			}
		},
		
		createSlider: function ($holder) {
			var $swiperHolder = $holder.find('.qodef-m-swiper'),
				$sliderHolder = $holder.find('.qodef-m-items'),
				$pagination = $holder.find('.swiper-pagination');
			
			var $swiper = new Swiper($swiperHolder, {
				slidesPerView: 'auto',
				centeredSlides: true,
				spaceBetween: 0,
				autoplay: true,
				loop: true,
				speed: 800,
				pagination: {
					el: $pagination,
					type: 'bullets',
					clickable: true
				},
				on: {
					init: function () {
						setTimeout(function () {
                            $sliderHolder.addClass('qodef-swiper--initialized');
                        }, 1500);
					}
				}
			});
		}
	};
	
	qodefCore.shortcodes.mycareer_core_frame_slider.qodefFrameSlider  = qodefFrameSlider;
	
})(jQuery);
(function ($) {
	"use strict";
	
	qodefCore.shortcodes.mycareer_core_google_map = {};
	
	$(document).ready(function () {
		qodefGoogleMap.init();
	});
	
	var qodefGoogleMap = {
		init: function () {
			this.holder = $('.qodef-google-map');
			
			if (this.holder.length) {
				this.holder.each(function () {
					if (qodefCore.qodefGoogleMap !== undefined) {
						qodefCore.qodefGoogleMap.initMap($(this).find('.qodef-m-map'));
					}
				});
			}
		}
	};
	
	qodefCore.shortcodes.mycareer_core_google_map.qodefGoogleMap  = qodefGoogleMap;
	
})(jQuery);
(function ($) {
    "use strict";
	
	qodefCore.shortcodes.mycareer_core_icon = {};
    
    $(document).ready(function () {
        qodefIcon.init();
    });

    var qodefIcon = {
        init: function () {
            this.icons = $('.qodef-icon-holder');

            if (this.icons.length) {
                this.icons.each(function () {
                    var $thisIcon = $(this);

                    qodefIcon.iconHoverColor($thisIcon);
                    qodefIcon.iconHoverBgColor($thisIcon);
                    qodefIcon.iconHoverBorderColor($thisIcon);
                });
            }
        },
        iconHoverColor: function ($iconHolder) {
            if (typeof $iconHolder.data('hover-color') !== 'undefined') {
                var spanHolder = $iconHolder.find('span');
                var originalColor = spanHolder.css('color');
                var hoverColor = $iconHolder.data('hover-color');

                $iconHolder.on('mouseenter', function () {
                    qodefIcon.changeColor(spanHolder, 'color', hoverColor);
                });
                $iconHolder.on('mouseleave', function () {
                    qodefIcon.changeColor(spanHolder, 'color', originalColor);
                });
            }
        },
        iconHoverBgColor: function ($iconHolder) {
            if (typeof $iconHolder.data('hover-background-color') !== 'undefined') {
                var hoverBackgroundColor = $iconHolder.data('hover-background-color');
                var originalBackgroundColor = $iconHolder.css('background-color');

                $iconHolder.on('mouseenter', function () {
                    qodefIcon.changeColor($iconHolder, 'background-color', hoverBackgroundColor);
                });
                $iconHolder.on('mouseleave', function () {
                    qodefIcon.changeColor($iconHolder, 'background-color', originalBackgroundColor);
                });
            }
        },
        iconHoverBorderColor: function ($iconHolder) {
            if (typeof $iconHolder.data('hover-border-color') !== 'undefined') {
                var hoverBorderColor = $iconHolder.data('hover-border-color');
                var originalBorderColor = $iconHolder.css('borderTopColor');

                $iconHolder.on('mouseenter', function () {
                    qodefIcon.changeColor($iconHolder, 'border-color', hoverBorderColor);
                });
                $iconHolder.on('mouseleave', function () {
                    qodefIcon.changeColor($iconHolder, 'border-color', originalBorderColor);
                });
            }
        },
        changeColor: function (iconElement, cssProperty, color) {
            iconElement.css(cssProperty, color);
        }
    };
	
	qodefCore.shortcodes.mycareer_core_icon.qodefIcon = qodefIcon;

})(jQuery);
(function ($) {
    "use strict";
	qodefCore.shortcodes.mycareer_core_image_gallery = {};
	qodefCore.shortcodes.mycareer_core_image_gallery.qodefSwiper = qodef.qodefSwiper;
	qodefCore.shortcodes.mycareer_core_image_gallery.qodefMasonryLayout = qodef.qodefMasonryLayout;

})(jQuery);
(function ($) {
    "use strict";
	
	qodefCore.shortcodes.mycareer_core_interactive_link_showcase = {};
    
    // $(document).ready(function () {
    //     qodefInteractiveLinkShowcase.init();
    // });

    // var qodefInteractiveLinkShowcase = {
    //     init: function () {
    //         this.holder = $('.qodef-interactive-link-showcase');
    //
    //         if (this.holder.length) {
    //             this.holder.each(function () {
    //                 var $thisHolder = $(this),
    //                     $images = $thisHolder.find('.qodef-m-image'),
    //                     $links = $thisHolder.find('.qodef-m-item');
    //
    //                 if ($thisHolder.hasClass('qodef-type--slider')) {
    //                     var $swiperSlider = new Swiper($thisHolder.find('.swiper-container'), {
    //                         loop: true,
    //                         slidesPerView: 'auto',
    //                         centeredSlides: true,
    //                         speed: 1400,
    //                         mousewheel: true,
    //                         init: false
    //                     });
    //
    //                     $thisHolder.waitForImages(function () {
    //                         $swiperSlider.init();
    //                     });
    //
    //                     $swiperSlider.on('init', function () {
    //                         $images.eq(0).addClass('qodef--active');
    //                         $thisHolder.find('.swiper-slide-active').addClass('qodef--active');
    //
    //                         $swiperSlider.on('slideChangeTransitionStart', function () {
    //                             var $swiperSlides = $thisHolder.find('.swiper-slide'),
    //                                 $activeSlideItem = $thisHolder.find('.swiper-slide-active');
    //
    //                             $images.removeClass('qodef--active').eq($activeSlideItem.data('swiper-slide-index')).addClass('qodef--active');
    //                             $swiperSlides.removeClass('qodef--active');
    //
    //                             $activeSlideItem.addClass('qodef--active');
    //                         });
    //
    //                         $thisHolder.find('.swiper-slide').on('click', function (e) {
    //                             var $thisSwiperLink = $(this),
    //                                 $activeSlideItem = $thisHolder.find('.swiper-slide-active');
    //
    //                             if (!$thisSwiperLink.hasClass('swiper-slide-active')) {
    //                                 e.preventDefault();
    //                                 e.stopImmediatePropagation();
    //
    //                                 if (e.pageX < $activeSlideItem.offset().left) {
    //                                     $swiperSlider.slidePrev();
    //                                     return false;
    //                                 }
    //
    //                                 if (e.pageX > $activeSlideItem.offset().left + $activeSlideItem.outerWidth()) {
    //                                     $swiperSlider.slideNext();
    //                                     return false;
    //                                 }
    //                             }
    //                         });
    //
    //                         $thisHolder.addClass('qodef--init');
    //                     });
    //                 } else {
    //                     $images.eq(0).addClass('qodef--active');
    //                     $links.eq(0).addClass('qodef--active');
    //
    //                     $links.on('touchstart mouseenter', function (e) {
    //                         var $thisLink = $(this);
    //
    //                         if (!qodef.html.hasClass('touchevents') || (!$thisLink.hasClass('qodef--active') && qodef.windowWidth > 680)) {
    //                             e.preventDefault();
    //                             $images.removeClass('qodef--active').eq($thisLink.index()).addClass('qodef--active');
    //                             $links.removeClass('qodef--active').eq($thisLink.index()).addClass('qodef--active');
    //                         }
    //                     }).on('touchend mouseleave', function () {
    //                         var $thisLink = $(this);
    //
    //                         if (!qodef.html.hasClass('touchevents') || (!$thisLink.hasClass('qodef--active') && qodef.windowWidth > 680)) {
    //                             $links.removeClass('qodef--active').eq($thisLink.index()).addClass('qodef--active');
    //                             $images.removeClass('qodef--active').eq($thisLink.index()).addClass('qodef--active');
    //                         }
    //                     });
    //
    //                     $thisHolder.addClass('qodef--init');
    //                 }
    //             });
    //         }
    //     }
    // };
 
})(jQuery);
(function ($) {
    'use strict';
	qodefCore.shortcodes.mycareer_core_panel_sections = {};
 
	$(document).ready(function () {
		qodefPanelSections.init();
	});

    /*
     **	Panel Sections functionality
     */
    var qodefPanelSections = {
        init: function () {
            var panelSections = $('.qodef-panel-sections');

            if (panelSections.length) {
                var itemInView = function (item) {
                    $(window).on('scroll', function () {
                        if (qodef.scroll > item.offset().top - qodef.windowHeight &&
                            qodef.scroll < item.offset().top + item.height()) {
                            if (!item.hasClass('qodef--in-view')) {
                                item.addClass('qodef--in-view');
                            }
                        } else {
                            if (item.hasClass('qodef--in-view')) {
                                item.removeClass('qodef--in-view');
                            }
                        }
                    });
                }

                var getWheelDirection = function (e) {
                    return e.deltaY < 0 ? 'downwards' : 'upwards';
                }

                var panelTrigger = function (sections, panel) {
                    var scrollingTS = new Date().getTime(),
                        btn = sections.find('.qodef-panel-expand'),
                        close = sections.find('.qodef-collapse'),
                        expanding = false,
                        expanded = false,
                        direction;

                    var expand = function () {
                        if (!expanding && !expanded) {
                            expanding = true;
                            sections.addClass('qodef--expanding')
                            setTimeout(function () {
                                sections.addClass('qodef--done');
                                expanded = true;
                            }, 500);
                        }
                    }

                    var collapse = function () {
                        if (expanding && expanded) {
                            expanding = false;
                            sections.removeClass('qodef--done');
                            setTimeout(function () {
                                sections.removeClass('qodef--expanding')
                                expanded = false;
                            }, 500);
                        }
                    }

                    var waitForScroll = function () {
                        new Date().getTime() >= scrollingTS && expand();
                    }

                    btn.on('click', expand);
                    close.on('click', collapse);

                    $(window).on('scroll', function () {
                        scrollingTS = new Date().getTime();
                    });

                    $(document).on('keydown', function (e) {
                        if (e.keyCode == 40) {
                            qodef.scroll + qodef.windowHeight >= sections.offset().top + sections.height() &&
                            waitForScroll();
                        } else {
                            collapse();
                        }
                    });

                    $(window).on('mousewheel', function (e) {
                        direction = getWheelDirection(e);

                        if (qodef.scroll + qodef.windowHeight >= sections.offset().top + sections.height()) {
                            direction === 'downwards' && waitForScroll();
                            direction === 'upwards' && collapse();
                        } else {
                            collapse();
                        }
                    });
                }

                panelSections.waitForImages(function () {
                    var panelC = panelSections.find('.qodef-panel.qodef-collapsed'),
                        panelE = panelSections.find('.qodef-panel.qodef-expanded'),
                        items = panelSections.find('[data-bg-color]');

                    panelSections.css('visibility', 'visible');
                    !qodef.html.hasClass('touch') && panelTrigger(panelSections, panelE);
                });
            }
        }

    }
	
	qodefCore.shortcodes.mycareer_core_panel_sections.qodefPanelSections = qodefPanelSections;

})(jQuery);
(function ($) {
	'use strict';
	
	qodefCore.shortcodes.masterds_core_progress_bar = {};
	
	$(document).ready(function () {
		qodefProgressBar.init();
	});

	/**
	 * Init progress bar shortcode functionality
	 */
	var qodefProgressBar = {
		init: function () {
			this.holder = $('.qodef-progress-bar');

			if (this.holder.length) {
				this.holder.each(function () {
					var $thisHolder = $(this),
						layout = $thisHolder.data('layout'),
						data = qodefProgressBar.generateBarData($thisHolder, layout),
						container = '#qodef-m-canvas-' + $thisHolder.data('rand-number'),
						number = $thisHolder.data('number') / 100;
						
					switch (layout) {
						case 'circle':
							qodefProgressBar.initCircleBar(container, data, number);
							break;
						case 'semi-circle':
							qodefProgressBar.initSemiCircleBar(container, data, number);
							break;
						case 'line':
							number = $thisHolder.data('number');
							container = $thisHolder.find('.qodef-m-canvas');
							data = qodefProgressBar.generateLineData($thisHolder, layout, number);
							qodefProgressBar.initLineBar(container, data);
							break;
						case 'custom':
							container = "#" + $thisHolder.data('custom-shape-id');
							qodefProgressBar.initCustomBar(container, data, number);
							break;
					}
				});
			}
		},
		generateBarData: function (thisBar, layout) {
			var activeWidth = thisBar.data('active-line-width');
			var activeColor = thisBar.data('active-line-color');
			var inactiveWidth = thisBar.data('inactive-line-width');
			var inactiveColor = thisBar.data('inactive-line-color');
			var easing = 'linear';
			var duration = 1400;
			var textColor = thisBar.data('text-color');

			return {
				strokeWidth: activeWidth,
				color: activeColor,
				trailWidth: inactiveWidth,
				trailColor: inactiveColor,
				easing: easing,
				duration: duration,
				svgStyle: {
					width: '100%',
					height: '100%'
				},
				text: {
					style: {
						color: textColor
					},
					autoStyleContainer: false
				},
				from: {
					color: inactiveColor
				},
				to: {
					color: activeColor
				},
				step: function (state, bar) {
					if (layout !== 'custom') {
						bar.setText(Math.round(bar.value() * 100) + '%');
					}
				}
			};
		},
		generateLineData: function (thisBar, layout, number) {
			var height = thisBar.data('active-line-width');
			var activeColor = thisBar.data('active-line-color');
			var inactiveHeight = thisBar.data('inactive-line-width');
			var inactiveColor = thisBar.data('inactive-line-color');
			var duration = 800;
			var textColor = thisBar.data('text-color');

			return {
				percentage: number,
				duration: duration,
				fillBackgroundColor: activeColor,
				backgroundColor: inactiveColor,
				height: height,
				inactiveHeight: inactiveHeight,
				followText: true,
				textColor: textColor
			};
		},
		initCircleBar: function (container, data, number) {
			var bar = new ProgressBar.Circle(container, data);

			$(container).appear(function () {
				bar.animate(number);
			});
		},
		initSemiCircleBar: function (container, data, number) {
			var bar = new ProgressBar.SemiCircle(container, data);

			$(container).appear(function () {
				bar.animate(number);
			});
		},
		initCustomBar: function (container, data, number) {
			var bar = new ProgressBar.Path(container, data);
			bar.set(0);

			$(container).appear(function () {
				bar.animate(number);
			});
		},
		initLineBar: function (container, data) {
			$(container).appear(function () {
				container.LineProgressbar(data);
			});
		}
	};
	
	qodefCore.shortcodes.masterds_core_progress_bar.qodefProgressBar = qodefProgressBar;
	
})(jQuery);
(function ($) {
    "use strict";
	
	qodefCore.shortcodes.mycareer_core_skills = {};
    
    $(document).ready(function () {
        /*qodefSkills.init();*/
    });

    var qodefSkills = {
        init: function () {
            this.holder = $('.qodef-skills');

            if (this.holder.length) {
                this.holder.each(function () {
                    var $thisHolder = $(this),
                        $links = $thisHolder.find('.qodef-m-item');

                    if ($thisHolder.hasClass('qodef-type--accordion')) {
                        var $swiperSlider = new Swiper($thisHolder.find('.swiper-container'), {
                            loop: true,
                            slidesPerView: 'auto',
                            centeredSlides: true,
                            speed: 1400,
                            mousewheel: true,
                            init: false
                        });

                        $thisHolder.waitForImages(function () {
                            $swiperSlider.init();
                        });

                        $swiperSlider.on('init', function () {
                            $thisHolder.find('.swiper-slide-active').addClass('qodef--active');

                            $swiperSlider.on('slideChangeTransitionStart', function () {
                                var $swiperSlides = $thisHolder.find('.swiper-slide'),
                                    $activeSlideItem = $thisHolder.find('.swiper-slide-active');
                                
                                $swiperSlides.removeClass('qodef--active');

                                $activeSlideItem.addClass('qodef--active');
                            });

                            $thisHolder.find('.swiper-slide').on('click', function (e) {
                                var $thisSwiperLink = $(this),
                                    $activeSlideItem = $thisHolder.find('.swiper-slide-active');

                                if (!$thisSwiperLink.hasClass('swiper-slide-active')) {
                                    e.preventDefault();
                                    e.stopImmediatePropagation();

                                    if (e.pageX < $activeSlideItem.offset().left) {
                                        $swiperSlider.slidePrev();
                                        return false;
                                    }

                                    if (e.pageX > $activeSlideItem.offset().left + $activeSlideItem.outerWidth()) {
                                        $swiperSlider.slideNext();
                                        return false;
                                    }
                                }
                            });

                            $thisHolder.addClass('qodef--init');
                        });
                    } else {
                        $links.eq(0).addClass('qodef--active');

                        $links.on('touchstart mouseenter', function (e) {
                            var $thisLink = $(this);

                            if (!qodef.html.hasClass('touchevents') || (!$thisLink.hasClass('qodef--active') && qodef.windowWidth > 680)) {
                                e.preventDefault();
                                $links.removeClass('qodef--active').eq($thisLink.index()).addClass('qodef--active');
                            }
                        }).on('touchend mouseleave', function () {
                            var $thisLink = $(this);

                            if (!qodef.html.hasClass('touchevents') || (!$thisLink.hasClass('qodef--active') && qodef.windowWidth > 680)) {
                                $links.removeClass('qodef--active').eq($thisLink.index()).addClass('qodef--active');
                            }
                        });

                        $thisHolder.addClass('qodef--init');
                    }
                });
            }
        }
    };
	
	qodefCore.shortcodes.mycareer_core_skills.qodefSkills = qodefSkills;
 
})(jQuery);
(function ($) {
	'use strict';
	
	qodefCore.shortcodes.mycareer_core_stamp = {};
	
	$(document).ready(function () {
		qodefInitStamp.init();
	});
	
	/**
	 * Inti stamp shortcode on appear
	 */
	var qodefInitStamp = {
		init: function () {
			this.holder = $('.qodef-stamp');
			
			if (this.holder.length) {
				this.holder.each(function () {
					var $holder = $(this),
						appearing_delay = typeof $holder.data('appearing-delay') !== 'undefined' ? parseInt($holder.data('appearing-delay'), 10) : 0;
					
					// Initialization
                    qodefInitStamp.initStampText($holder);
					qodefInitStamp.load($holder, appearing_delay);
					
					if ($holder.hasClass('qodef--repeating')) {
						setInterval(function () {
							qodefInitStamp.reLoad($holder);
						}, 5500);
					}
				});
			}
		},
		initStampText: function ($holder) {
			var $stamp = $holder.children('.qodef-m-text'),
				count = typeof $holder.data('appearing-delay') !== 'undefined' ? parseInt($stamp.data('count'), 10) : 1,
				transformStart = -90, // stamp circle angle start point
				transformEnd = 360; // stamp circle end point - 360 is full circle
			
			if ( typeof $holder.data('start-point') !== 'undefined' && $holder.data('start-point') !== false  ) {
				transformStart = parseInt($holder.data('start-point'));
			}
			
			if ( typeof $holder.data('end-point') !== 'undefined' && $holder.data('end-point') !== false  ) {
				transformEnd = parseInt($holder.data('end-point'));
			}
			
			$stamp.children().each(function (i) {
				var transform = transformStart + i * transformEnd / count,
					transitionDelay = i * 60 / count * 10;
				
				$(this).css({
					'transform': 'rotate(' + transform + 'deg) translateZ(0)',
					'transition-delay': transitionDelay + 'ms'
				});
			});
		},
		load: function ($holder, appearing_delay) {
			if ($holder.hasClass('qodef--nested')) {
				setTimeout(function () {
					qodefInitStamp.appear($holder);
				}, appearing_delay);
			} else {
				$holder.appear(function () {
					setTimeout(function () {
						qodefInitStamp.appear($holder);
					}, appearing_delay);
				}, {accX: 0, accY: -100});
			}
		},
		reLoad: function ($holder) {
			$holder.removeClass('qodef--init');
			
			setTimeout(function () {
				$holder.removeClass('qodef--appear');
				
				setTimeout(function () {
					qodefInitStamp.appear($holder);
				}, 500);
			}, 600);
		},
		appear: function ($holder) {
			$holder.addClass('qodef--appear');
			
			setTimeout(function () {
				$holder.addClass('qodef--init');
			}, 300);
		}
	};
	
	qodefCore.shortcodes.mycareer_core_stamp.qodefInitStamp = qodefInitStamp;
	
})(jQuery);
(function ($) {
	"use strict";
	
	qodefCore.shortcodes.mycareer_core_swapping_image_gallery = {};
	
	$(document).ready(function () {
		qodefSwappingImageGallery.init();
	});
	
	var qodefSwappingImageGallery = {
		init: function () {
			this.holder = $('.qodef-swapping-image-gallery');
			
			if (this.holder.length) {
				this.holder.each(function () {
					var $thisHolder = $(this);
					qodefSwappingImageGallery.createSlider($thisHolder);
				});
			}
		},
		createSlider: function ($holder) {
			var $swiperHolder = $holder.find('.qodef-m-image-holder');
			var $paginationHolder = $holder.find('.qodef-m-thumbnails-holder .qodef-grid-inner');
			var spaceBetween = 0;
			var slidesPerView = 1;
			var centeredSlides = false;
			var loop = false;
			var autoplay = false;
			var speed = 800;
			
			var $swiper = new Swiper($swiperHolder, {
				slidesPerView: slidesPerView,
				centeredSlides: centeredSlides,
				spaceBetween: spaceBetween,
				autoplay: autoplay,
				loop: loop,
				speed: speed,
				pagination: {
					el: $paginationHolder,
					type: 'custom',
					clickable: true,
					bulletClass: 'qodef-m-thumbnail'
				},
				on: {
					init: function () {
						$swiperHolder.addClass('qodef-swiper--initialized');
						$paginationHolder.find('.qodef-m-thumbnail').eq(0).addClass('qodef--active');
					},
					slideChange: function slideChange() {
						var swiper = this;
						var activeIndex = swiper.activeIndex;
						$paginationHolder.find('.qodef--active').removeClass('qodef--active');
						$paginationHolder.find('.qodef-m-thumbnail').eq(activeIndex).addClass('qodef--active');
					}
				}
			});
		}
	};
	
	qodefCore.shortcodes.mycareer_core_swapping_image_gallery.qodefSwappingImageGallery = qodefSwappingImageGallery;
	
})(jQuery);
(function ($) {
	"use strict";
	
	qodefCore.shortcodes.mycareer_core_tabs = {};
	
	$(document).ready(function () {
		qodefTabs.init();
	});
	
	var qodefTabs = {
		init: function () {
			this.holder = $('.qodef-tabs');
			
			if (this.holder.length) {
				this.holder.each(function () {
					qodefTabs.initTabs($(this));
				});
			}
		},
		initTabs: function ($tabs) {
			$tabs.children('.qodef-tabs-content').each(function (index) {
				index = index + 1;
				
				var $that = $(this),
					link = $that.attr('id'),
					$navItem = $that.parent().find('.qodef-tabs-navigation li:nth-child(' + index + ') a'),
					navLink = $navItem.attr('href');
				
				link = '#' + link;
				
				if (link.indexOf(navLink) > -1) {
					$navItem.attr('href', link);
				}
			});
			
			$tabs.addClass('qodef--init').tabs();
		}
	};
	
	qodefCore.shortcodes.mycareer_core_tabs.qodefTabs = qodefTabs;
	
})(jQuery);
(function ($) {
    'use strict';
	
	qodefCore.shortcodes.mycareer_text_clip = {};

    $(document).ready(function () {
		qodefInitTextClip();
	});

    /**
     * Init Text Clip effect
     */
    function qodefInitTextClip() {
        var textClipInstances = $('.qodef-text-clip-holder');

        if (textClipInstances.length) {
            //positioning
            var clipPosition = function (item, clipItem) {
                if (item.hasClass('qodef-tc-align-center') || item.hasClass('qodef-tc-with-background-image')) {
                    clipItem.data('clip-position', 'center');
                } else if (item.hasClass('qodef-tc-align-right')) {
                    clipItem.data('clip-position', 'right');
                }
            }

            //reset
            var resetClip = function (clipItem, clipType) {
                if (clipType == 'default') {
                    clipItem.css({
                        '-webkit-clip-path': 'inset(0 0 0 0)',
                        'clip-path': 'inset(0 0 0 0)'
                    });
                } else {
                    clipItem.css({
                        '-webkit-clip-path': 'circle(0 at 50% 50%)',
                        'clip-path': 'circle(0 at 50% 50%)'
                    });
                }
            }

            //ie fallback
            var msClip = function (clipItem, clipPosition, clipSize, clipType) {
                var clipVal = clipItem.width() * 0.01 * (100 - clipSize),
                    clipValR = clipItem.width() * 0.01 * clipSize,
                    clipValOffsetC = (clipItem.width() - clipVal) / 2,
                    clipValC = clipVal + clipValOffsetC,
                    clipValOffsetBg = clipItem.width() * 0.01 * (100 - clipItem.data('bg-size')) / 2,
                    clipValBg = clipItem.width() * 0.01 * clipItem.data('bg-size') + clipValOffsetBg;

                if (clipPosition == 'left') {
                    clipItem.css({
                        'clip': 'rect(0px, ' + clipVal + 'px, ' + clipItem.height() + 'px, 0px)'
                    });
                } else if (clipPosition == 'right') {
                    clipItem.css({
                        'clip': 'rect(auto, auto, ' + clipItem.height() + 'px, ' + clipValR + 'px)'
                    });
                } else {
                    if (clipType == 'default') {
                        clipItem.css({
                            'clip': 'rect(0px, ' + clipValC + 'px, ' + clipItem.height() + 'px, ' + clipValOffsetC + 'px)'
                        });
                    } else {
                        clipItem.css({
                            'clip': 'rect(0px, ' + clipValBg + 'px, ' + clipItem.height() + 'px, ' + clipValOffsetBg + 'px)'
                        });
                    }
                }
            }

            //default animation
            var animateClip = function (clipItem, clipPosition, clipSize, clipType, bgSize) {
                var clipVal = Math.round(clipSize),
                    bgVal = Math.round(bgSize);

                if (clipPosition == 'left') {
                    clipItem.css({
                        '-webkit-clip-path': 'inset(0 ' + clipVal + '% 0 0)',
                        'clip-path': 'inset(0 ' + clipVal + '% 0 0)'
                    });
                } else if (clipPosition == 'right') {
                    clipItem.css({
                        '-webkit-clip-path': 'inset(0 0 0 ' + clipVal + '%)',
                        'clip-path': 'inset(0 0 0 ' + clipVal + '%)'
                    });
                } else {
                    if (clipType == 'default') {
                        clipItem.css({
                            '-webkit-clip-path': 'inset(0 ' + Math.floor(clipVal / 2) + '% 0 ' + Math.floor(clipVal / 2) + '%)',
                            'clip-path': 'inset(0 ' + Math.floor(clipVal / 2) + '% 0 ' + Math.floor(clipVal / 2) + '%)'
                        });
                    } else {
                        clipItem.css({
                            '-webkit-clip-path': 'circle(' + bgVal + 'px at 50% 50%)',
                            'clip-path': 'circle(' + bgVal + 'px at 50% 50%)'
                        });
                    }
                }
            }

            //main function
            var setClip = function (item, clipItem, revSlider) {
                clipItem.data('clip-type', item.hasClass('qodef-tc-with-background-image') ? 'bg' : 'default');

                var clipPosition = clipItem.data('clip-position') || 'left',
                    clipSize = clipItem.data('clip-size') || 50,
                    clipType = clipItem.data('clip-type'),
                    bgSize = (clipType == 'bg') ? item.find('.qodef-tc-bgrnd-holder').width() / 2 : null;

                if (qodef.body.hasClass('qodef-ms-browser')) {
                    msClip(clipItem, clipPosition, clipSize, clipType, bgSize);
                } else {
                    resetClip(clipItem, clipType);

                    var animationTrigger = function () {
                        if (qodef.scroll > clipItem.offset().top - qodef.windowHeight * 0.9 &&
                            qodef.scroll < clipItem.offset().top + clipItem.height()) {
                            if (!clipItem.hasClass('qodef-in-view')) {
                                clipItem.addClass('qodef-in-view');
                                animateClip(clipItem, clipPosition, clipSize, clipType, bgSize);
                            }
                        } else {
                            if (clipItem.hasClass('qodef-in-view')) {
                                clipItem.removeClass('qodef-in-view');
                                resetClip(clipItem, clipType);
                            }
                        }
                    }

                    //behavior switch
                    if (item.closest(revSlider).length) {
                        //rev behavior
                        item.closest(revSlider).on("revolution.slide.onbeforeswap", function (e) {
                            clipItem.removeClass('qodef-in-view qodef-in-rev');
                            item.hasClass('qodef-tc-with-background-image') && item.removeClass('qodef-appeared');
                            resetClip(clipItem, clipType);
                        });

                        item.closest(revSlider).on("revolution.slide.onchange", function (e) {
                            clipItem.addClass('qodef-in-view qodef-in-rev');
                            item.hasClass('qodef-tc-with-background-image') && item.addClass('qodef-appeared');
                            animateClip(clipItem, clipPosition, clipSize, clipType, bgSize);
                        });

                        $(window).on('scroll', function () {
                            if (clipItem.hasClass('qodef-in-rev')) {
                                animationTrigger();
                            }
                        });
                    } else {
                        //default content behavior
                        animationTrigger();

                        $(window).on('scroll', function () {
                            animationTrigger();
                        });
                    }

                    //recalcs
                    $(window).on('resize', function () {
                        animationTrigger();
                        bgSize = (clipType == 'bg') && item.find('.qodef-tc-bgrnd-holder').width() / 2;
                    });
                }
            }

            //img load fx
            var animateImage = function (item) {
                item.appear(function () {
                    item.addClass('qodef-appeared');
                }, {
                    accX: 0,
                    accY: -100
                });
            }

            //init
            textClipInstances.each(function () {
                var item = $(this),
                    clipItem = $(this).find('.qodef-tc-mask-wrapper'),
                    revSlider = $('.rev_slider');

                clipPosition(item, clipItem);
                setClip(item, clipItem, revSlider);
                item.hasClass('qodef-tc-with-background-image') && animateImage(item);
            });
        }
    }
    
})(jQuery);
(function ($) {
    "use strict";
	
	qodefCore.shortcodes.masterds_vertical_split_slider = {};
    
    $(document).ready(function () {
        qodefVerticalSplitSlider.init();
    });

    var qodefVerticalSplitSlider = {
        init: function () {
            var $holder = $('.qodef-vertical-split-slider'),
                breakpoint = qodefVerticalSplitSlider.getBreakpoint($holder),
                initialHeaderStyle = '';

            if (qodef.body.hasClass('qodef-header--light')) {
                initialHeaderStyle = 'light';
            } else if (qodef.body.hasClass('qodef-header--dark')) {
                initialHeaderStyle = 'dark';
            }

            if ($holder.length) {
                $holder.multiscroll({
                    navigation: true,
                    navigationPosition: 'right',
                    afterRender: function () {
                        qodef.body.addClass('qodef-vertical-split-slider--initialized');
                        qodefVerticalSplitSlider.bodyClassHandler($('.ms-left .ms-section:first-child').data('header-skin'), initialHeaderStyle);
                    },
                    onLeave: function (index, nextIndex) {
                        qodefVerticalSplitSlider.bodyClassHandler($($('.ms-left .ms-section')[nextIndex - 1]).data('header-skin'), initialHeaderStyle);
                    }
                });

                $holder.height(qodef.windowHeight);
                qodefVerticalSplitSlider.buildAndDestroy(breakpoint);

                $(window).resize(function () {
                    qodefVerticalSplitSlider.buildAndDestroy(breakpoint);
                });
            }
        },
        getBreakpoint: function ($holder) {
            if ($holder.hasClass('qodef-disable-below--768')) {
                return 768;
            } else {
                return 1024;
            }
        },
        buildAndDestroy: function (breakpoint) {
            if (qodef.windowWidth <= breakpoint) {
                $.fn.multiscroll.destroy();
                $('html, body').css('overflow', 'initial');
                qodef.body.removeClass('qodef-vertical-split-slider--initialized');
            } else {
                $.fn.multiscroll.build();
                qodef.body.addClass('qodef-vertical-split-slider--initialized');
            }
        },
        bodyClassHandler: function (slideHeaderStyle, initialHeaderStyle) {
            if (slideHeaderStyle !== undefined && slideHeaderStyle !== '') {
                qodef.body.removeClass('qodef-header--light qodef-header--dark').addClass('qodef-header--' + slideHeaderStyle);
            } else if (initialHeaderStyle !== '') {
                qodef.body.removeClass('qodef-header--light qodef-header--dark').addClass('qodef-header--' + slideHeaderStyle);
            } else {
                qodef.body.removeClass('qodef-header--light qodef-header--dark');
            }
        }
    };
	
	qodefCore.shortcodes.masterds_vertical_split_slider.qodefVerticalSplitSlider = qodefVerticalSplitSlider;

})(jQuery);
(function ($) {
	"use strict";
	
	qodefCore.shortcodes.mycareer_core_workflow = {};
	
	$(document).ready(function () {
		qodefAccordion.init();
	});
	
	var qodefAccordion = {
		init: function () {
			this.holder = $('.qodef-workflow-accordion');
			
			if (this.holder.length) {
				this.holder.each(function () {
					var $thisHolder = $(this);
					
					if ($thisHolder.hasClass('qodef-behavior--accordion')) {
						qodefAccordion.initAccordion($thisHolder);
					}
					
					if ($thisHolder.hasClass('qodef-behavior--toggle')) {
						qodefAccordion.initToggle($thisHolder);
					}
					
					$thisHolder.addClass('qodef--init');
				});
			}
		},
		initAccordion: function ($accordion) {
			$accordion.accordion({
				animate: "swing",
				collapsible: true,
				active: 0,
				icons: "",
				heightStyle: "content"
			});
		},
		initToggle: function ($toggle) {
			var $toggleAccordionTitle = $toggle.find('.qodef-accordion-title'),
				$toggleAccordionContent = $toggleAccordionTitle.next();
			
			$toggle.addClass("accordion ui-accordion ui-accordion-icons ui-widget ui-helper-reset");
			$toggleAccordionTitle.addClass("ui-accordion-header ui-state-default ui-corner-top ui-corner-bottom");
			$toggleAccordionContent.addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom").hide();
			
			$toggleAccordionTitle.each(function () {
				var $thisTitle = $(this);
				
				$thisTitle.toggleClass('ui-accordion-header-active ui-state-active ui-state-default ui-corner-bottom');
				$thisTitle.next().toggleClass('ui-accordion-content-active').slideToggle(400);
				
				$thisTitle.hover(function () {
					$thisTitle.toggleClass("ui-state-hover");
				});
				
				$thisTitle.on('click', function () {
					$thisTitle.toggleClass('ui-accordion-header-active ui-state-active ui-state-default ui-corner-bottom');
					$thisTitle.next().toggleClass('ui-accordion-content-active').slideToggle(400);
				});
			});
		}
	};
	
	qodefCore.shortcodes.mycareer_core_workflow.qodefAccordion = qodefAccordion;
	
})(jQuery);
(function ($) {
    "use strict";
	
	qodefCore.shortcodes.mycareer_core_workflow = {};

    $(window).on('load', function () {
        /*qodefWorkflow.init();*/
        setTimeout(function() {
            qodefWorkflow.qodefAnimateWorkflowLine();
        }, 500);
    });

    var qodefWorkflow = {
        init: function () {
            this.holder = $('.qodef-workflow');

            if (this.holder.length) {
                this.holder.each(function () {
                    var $thisHolder = $(this),
                        $links = $thisHolder.find('.qodef-m-item');

                    if ($thisHolder.hasClass('qodef-type--accordion')) {
                        var $swiperSlider = new Swiper($thisHolder.find('.swiper-container'), {
                            loop: true,
                            slidesPerView: 'auto',
                            centeredSlides: true,
                            speed: 1400,
                            mousewheel: true,
                            init: false
                        });

                        $thisHolder.waitForImages(function () {
                            $swiperSlider.init();
                        });

                        $swiperSlider.on('init', function () {
                            $thisHolder.find('.swiper-slide-active').addClass('qodef--active');

                            $swiperSlider.on('slideChangeTransitionStart', function () {
                                var $swiperSlides = $thisHolder.find('.swiper-slide'),
                                    $activeSlideItem = $thisHolder.find('.swiper-slide-active');
                                
                                $swiperSlides.removeClass('qodef--active');

                                $activeSlideItem.addClass('qodef--active');
                            });

                            $thisHolder.find('.swiper-slide').on('click', function (e) {
                                var $thisSwiperLink = $(this),
                                    $activeSlideItem = $thisHolder.find('.swiper-slide-active');

                                if (!$thisSwiperLink.hasClass('swiper-slide-active')) {
                                    e.preventDefault();
                                    e.stopImmediatePropagation();

                                    if (e.pageX < $activeSlideItem.offset().left) {
                                        $swiperSlider.slidePrev();
                                        return false;
                                    }

                                    if (e.pageX > $activeSlideItem.offset().left + $activeSlideItem.outerWidth()) {
                                        $swiperSlider.slideNext();
                                        return false;
                                    }
                                }
                            });

                            $thisHolder.addClass('qodef--init');
                        });
                    } else {
                        $links.eq(0).addClass('qodef--active');

                        $links.on('touchstart mouseenter', function (e) {
                            var $thisLink = $(this);

                            if (!qodef.html.hasClass('touchevents') || (!$thisLink.hasClass('qodef--active') && qodef.windowWidth > 680)) {
                                e.preventDefault();
                                $links.removeClass('qodef--active').eq($thisLink.index()).addClass('qodef--active');
                            }
                        }).on('touchend mouseleave', function () {
                            var $thisLink = $(this);

                            if (!qodef.html.hasClass('touchevents') || (!$thisLink.hasClass('qodef--active') && qodef.windowWidth > 680)) {
                                $links.removeClass('qodef--active').eq($thisLink.index()).addClass('qodef--active');
                            }
                        });

                        $thisHolder.addClass('qodef--init');
                    }
                });
            }
        },
        qodefAnimateWorkflowLine: function() {
            var workflow = $('.qodef-workflow.qodef-layout--list');
    
            if (workflow.length && qodef.windowWidth > 680) {
                workflow.each(function() {
                    var thisWorkflow = $(this),
                        workflowLine = thisWorkflow.find('.qodef-m-cover-line'),
                        workflowCircles = thisWorkflow.find('.qodef-m-circle'),
                        linesLength = workflowLine.length - 1,
                        progressMax = 0,
                        progress = 0,
                        lastScrollTop = 0,
                        st,
                        moveAmount,
                        goingDown = true,
                        elementOffsetTop = 250, // the offset to start animation inside element
                        elementOffsetBottom = 400,
                        thresholdValue = 0,
                        circleActiveBgColor = workflowLine.css('background-color');

                    // Calculate Progress Max (Combined Workflow Line Height)
                    workflowLine.each(function(i) {
                        var thisLineHeight = $(this).height();
                        if (i !== linesLength) {
                            progressMax += thisLineHeight;
                        }
                    });

                    // Set Workflow Circles threshold data
                    var thresholdDistance = progressMax / linesLength;
                    workflowCircles.each(function() {
                        var thisCircle = $(this);
                        thisCircle.data('scroll-threshold', thresholdValue);
                        thresholdValue = thresholdValue + thresholdDistance;
                    });

                    // Append follow line
                    thisWorkflow.find('.qodef-m-items .qodef-m-item:first-child').prepend('<div class="qodef-m-cover-follow-line"></div>');
                    var workflowFollowLine = thisWorkflow.find('.qodef-m-cover-follow-line');
                    workflowFollowLine.css('background-color', circleActiveBgColor);

                    // Calc Positions Top and Bottom for Workflow lines
                    var elementPosTop = workflowLine.first().offset().top;
                    var elementPosBottom = workflowLine.first().offset().top + progressMax;

                    // Scrolling Logic
                    $(window).on('scroll', function() {
                        st = $(this).scrollTop();

                        // Get Scroll Direction
                        if (st < lastScrollTop) {
                            goingDown = false;
                        } else {
                            goingDown = true;
                        }

                        // Get Scroll Amount
                        moveAmount = Math.abs(st - lastScrollTop);
                        lastScrollTop = st;
                        
                        // Going Down inside element
                        if (st + qodef.windowHeight > elementPosTop + elementOffsetTop) {
                            if (goingDown) {
                                progress += moveAmount;
                            }
                            if (progress >= progressMax) {
                               progress = progressMax;
                            }
                            
                            workflowFollowLine.css({'height': progress + 'px'});
                        } else if (st + qodef.windowHeight < elementPosTop + elementOffsetTop) {
                            progress = 0;
                        }

                        // Going Up inside element
                        if (st + qodef.windowHeight < elementPosBottom + elementOffsetBottom) {
                            if (!goingDown) {
                                progress -= moveAmount;
                            }
                            if (progress < 0) {
                                progress = 0;
                             }
                            workflowFollowLine.css({'height': progress + 'px'});
                        } else if (st + qodef.windowHeight > elementPosBottom + elementOffsetBottom) {
                            progress = progressMax;
                        }

                        // Fill Workflow Circles
                        workflowCircles.each(function() {
                            var thisCircle = $(this);
                            if (progress >= thisCircle.data('scroll-threshold')) {
                                thisCircle.addClass('qodef-m-circle--active');
                                thisCircle.css('background-color', circleActiveBgColor);
                            } else if (progress < thisCircle.data('scroll-threshold')) {
                                thisCircle.removeClass('qodef-m-circle--active');
                                thisCircle.css('background-color', 'transparent');
                            }
                        })
                    });
                });
            }
        }
    };
	
	qodefCore.shortcodes.mycareer_core_workflow.qodefWorkflow = qodefWorkflow;

})(jQuery);
(function ($) {
	
    "use strict";
	qodefCore.shortcodes.mycareer_core_blog_list = {};
	qodefCore.shortcodes.mycareer_core_blog_list.qodefPagination = qodef.qodefPagination;
	qodefCore.shortcodes.mycareer_core_blog_list.qodefFilter = qodef.qodefFilter;
	qodefCore.shortcodes.mycareer_core_blog_list.qodefJustifiedGallery = qodef.qodefJustifiedGallery;
	qodefCore.shortcodes.mycareer_core_blog_list.qodefMasonryLayout = qodef.qodefMasonryLayout;

	$(document).ready(function () {
		qodefReadMoreLinkTitle.init();
	});
	
	var qodefReadMoreLinkTitle = {
		init: function () {
			var $readMoreButton = $('.qodef-e-read-more .qodef-button.qodef-layout--textual');

			$readMoreButton.each(function() {
				var thisReadMoreBtn = $(this),
					thisArticle = thisReadMoreBtn.closest('article'),
					thisHoverElements = thisArticle.find('.qodef-e-title, .qodef-e-media-image');

				thisHoverElements.on('mouseenter', function() {
					thisArticle.addClass('qodef-e--read-more-active-hover')
				}).on('mouseleave', function() {
					thisArticle.removeClass('qodef-e--read-more-active-hover')
				});
			});
		},
	};

})(jQuery);
(function ($) {
	
    "use strict";
	qodefCore.shortcodes.mycareer_core_donation_list = {};
	qodefCore.shortcodes.mycareer_core_donation_list.qodefPagination = qodef.qodefPagination;
	qodefCore.shortcodes.mycareer_core_donation_list.qodefFilter = qodef.qodefFilter;
	qodefCore.shortcodes.mycareer_core_donation_list.qodefJustifiedGallery = qodef.qodefJustifiedGallery;
	qodefCore.shortcodes.mycareer_core_donation_list.qodefMasonryLayout = qodef.qodefMasonryLayout;

})(jQuery);
(function($) {
    "use strict";
    var headerExpanding = {};
	// qodef.modules.headerExpanding = headerExpanding;
	//
	// headerExpanding.qodefOnDocumentReady = qodefOnDocumentReady;
	// headerExpanding.qodefOnWindowLoad = qodefOnWindowLoad;
	// headerExpanding.qodefOnWindowResize = qodefOnWindowResize;
	// headerExpanding.qodefOnWindowScroll = qodefOnWindowScroll;

    $(document).ready(qodefOnDocumentReady);
    $(window).on('load', qodefOnWindowLoad);
    $(window).resize(qodefOnWindowResize);
    $(window).scroll(qodefOnWindowScroll);
    
    /* 
        All functions to be called on $(document).ready() should be in this function
    */
    function qodefOnDocumentReady() {
		qodefExpandingMenu();
		qodefAnimateExpMenuItems.init();
    }

    /* 
        All functions to be called on $(window).load() should be in this function
    */
    function qodefOnWindowLoad() {
    }

    /* 
        All functions to be called on $(window).resize() should be in this function
    */
    function qodefOnWindowResize() {
    }

    /* 
        All functions to be called on $(window).scroll() should be in this function
    */
    function qodefOnWindowScroll() {
    }

	/**
	 * Init Expanding Menu
	 */
	function qodefExpandingMenu() {
		if ($('a.qodef-expanding-menu-opener').length) {

			var expandingMenuOpener = $( 'a.qodef-expanding-menu-opener');

			// Open expanding menu
			expandingMenuOpener.on('click',function(e){
				e.preventDefault();

				if (!expandingMenuOpener.hasClass('qodef-fm-opened')) {
					expandingMenuOpener.addClass('qodef-fm-opened');
					qodef.body.addClass('qodef-expanding-menu-opened');
					$(document).keyup(function(e){
						if (e.keyCode == 27 ) {
							expandingMenuOpener.removeClass('qodef-fm-opened');
							qodef.body.removeClass('qodef-expanding-menu-opened');
						}
					});
				} else {
					expandingMenuOpener.removeClass('qodef-fm-opened');
					qodef.body.removeClass('qodef-expanding-menu-opened');
				}
			});
		}
	}

	/**
	 * Animate Expanding Menu Items
	 */
	var qodefAnimateExpMenuItems = {
		init: function() {
			var $holder = $('.qodef-header--expanding .qodef-header-navigation>ul');

			if ($holder.length) {
				var $items = $holder.find('>li'),
					itemsLength = $items.length - 2,
					itemDelay = 70;

				for (var i = itemsLength; i >= 0; i--) {
					$items.eq(i).css('transition-delay', itemDelay + 'ms');
					itemDelay += 70;
				}
			}
		}
	}

})(jQuery);
(function ($) {
	"use strict";
	
	$(document).ready(function () {
		qodefVerticalNavMenu.init();
	});
	
	/**
	 * Function object that represents vertical menu area.
	 * @returns {{init: Function}}
	 */
	var qodefVerticalNavMenu = {
		initNavigation: function ($verticalMenuObject) {
			var $verticalNavObject = $verticalMenuObject.find('.qodef-header-vertical-navigation');
			
			if ($verticalNavObject.hasClass('qodef-vertical-drop-down--below')) {
				qodefVerticalNavMenu.dropdownClickToggle($verticalNavObject);
			} else if ($verticalNavObject.hasClass('qodef-vertical-drop-down--side')) {
				qodefVerticalNavMenu.dropdownFloat($verticalNavObject);
			}
		},
		dropdownClickToggle: function ($verticalNavObject) {
			var $menuItems = $verticalNavObject.find('ul li.menu-item-has-children');
			
			$menuItems.each(function () {
				var $elementToExpand = $(this).find(' > .qodef-drop-down-second, > ul');
				var menuItem = this;
				var $dropdownOpener = $(this).find('> a');
				var slideUpSpeed = 'fast';
				var slideDownSpeed = 'slow';
				
				$dropdownOpener.on('click tap', function (e) {
					e.preventDefault();
					e.stopPropagation();
					
					if ($elementToExpand.is(':visible')) {
						$(menuItem).removeClass('qodef-menu-item--open');
						$elementToExpand.slideUp(slideUpSpeed);
					} else if ($dropdownOpener.parent().parent().children().hasClass('qodef-menu-item--open') && $dropdownOpener.parent().parent().parent().hasClass('qodef-vertical-menu')) {
						$(this).parent().parent().children().removeClass('qodef-menu-item--open');
						$(this).parent().parent().children().find(' > .qodef-drop-down-second').slideUp(slideUpSpeed);
						
						$(menuItem).addClass('qodef-menu-item--open');
						$elementToExpand.slideDown(slideDownSpeed);
					} else {
						
						if (!$(this).parents('li').hasClass('qodef-menu-item--open')) {
							$menuItems.removeClass('qodef-menu-item--open');
							$menuItems.find(' > .qodef-drop-down-second, > ul').slideUp(slideUpSpeed);
						}
						
						if ($(this).parent().parent().children().hasClass('qodef-menu-item--open')) {
							$(this).parent().parent().children().removeClass('qodef-menu-item--open');
							$(this).parent().parent().children().find(' > .qodef-drop-down-second, > ul').slideUp(slideUpSpeed);
						}
						
						$(menuItem).addClass('qodef-menu-item--open');
						$elementToExpand.slideDown(slideDownSpeed);
					}
				});
			});
		},
		dropdownFloat: function ($verticalNavObject) {
			var $menuItems = $verticalNavObject.find('ul li.menu-item-has-children');
			var $allDropdowns = $menuItems.find(' > .qodef-drop-down-second > .qodef-drop-down-second-inner > ul, > ul');
			
			$menuItems.each(function () {
				var $elementToExpand = $(this).find(' > .qodef-drop-down-second > .qodef-drop-down-second-inner > ul, > ul');
				var menuItem = this;
				
				if (Modernizr.touch) {
					var $dropdownOpener = $(this).find('> a');
					
					$dropdownOpener.on('click tap', function (e) {
						e.preventDefault();
						e.stopPropagation();
						
						if ($elementToExpand.hasClass('qodef-float--open')) {
							$elementToExpand.removeClass('qodef-float--open');
							$(menuItem).removeClass('qodef-menu-item--open');
						} else {
							if (!$(this).parents('li').hasClass('qodef-menu-item--open')) {
								$menuItems.removeClass('qodef-menu-item--open');
								$allDropdowns.removeClass('qodef-float--open');
							}
							
							$elementToExpand.addClass('qodef-float--open');
							$(menuItem).addClass('qodef-menu-item--open');
						}
					});
				} else {
					//must use hoverIntent because basic hover effect doesn't catch dropdown
					//it doesn't start from menu item's edge
					$(this).hoverIntent({
						over: function () {
							$elementToExpand.addClass('qodef-float--open');
							$(menuItem).addClass('qodef-menu-item--open');
						},
						out: function () {
							$elementToExpand.removeClass('qodef-float--open');
							$(menuItem).removeClass('qodef-menu-item--open');
						},
						timeout: 300
					});
				}
			});
		},
		verticalAreaScrollable: function ($verticalMenuObject) {
			return $verticalMenuObject.hasClass('qodef-with-scroll');
		},
		initVerticalAreaScroll: function ($verticalMenuObject) {
			if (qodefVerticalNavMenu.verticalAreaScrollable($verticalMenuObject)) {
				window.qodefCore.qodefPerfectScrollbar.init($verticalMenuObject);
			}
		},
		init: function () {
			var $verticalMenuObject = $('.qodef-header--vertical #qodef-page-header');
			
			if ($verticalMenuObject.length) {
				qodefVerticalNavMenu.initNavigation($verticalMenuObject);
				qodefVerticalNavMenu.initVerticalAreaScroll($verticalMenuObject);
			}
		}
	};
	
})(jQuery);
(function($){
    "use strict";

    var fixedHeaderAppearance = {
        showHideHeader: function($pageOuter, $header){
            if(qodef.windowWidth > 1024) {
                if (qodef.scroll <= 0) {
                    qodef.body.removeClass('qodef-header--fixed-display');
                    $pageOuter.css('padding-top', '0');
                    $header.css('margin-top', '0');
                } else {
                    qodef.body.addClass('qodef-header--fixed-display');
                    $pageOuter.css('padding-top', parseInt(qodefGlobal.vars.headerHeight + qodefGlobal.vars.topAreaHeight) + 'px');
                    $header.css('margin-top', parseInt(qodefGlobal.vars.topAreaHeight) + 'px');
                }
            }
        },
        init: function(){
            var $pageOuter = $('#qodef-page-outer'),
                $header = $('#qodef-page-header');
            fixedHeaderAppearance.showHideHeader($pageOuter, $header);
            $(window).scroll(function() {
                fixedHeaderAppearance.showHideHeader($pageOuter, $header);
            });
            $(window).resize(function() {
                $pageOuter.css('padding-top', '0');
                fixedHeaderAppearance.showHideHeader($pageOuter, $header);
            });
        }
    };
    
    qodef.fixedHeaderAppearance = fixedHeaderAppearance.init;

})(jQuery);
(function ($) {
	"use strict";
	
	var stickyHeaderAppearance = {
		displayAmount: function () {
			if (qodefGlobal.vars.qodefStickyHeaderScrollAmount !== 0) {
				return parseInt(qodefGlobal.vars.qodefStickyHeaderScrollAmount, 10);
			} else {
				return parseInt(qodefGlobal.vars.headerHeight + qodefGlobal.vars.adminBarHeight, 10);
			}
		},
		showHideHeader: function (displayAmount) {
			
			if (qodef.scroll < displayAmount) {
				qodef.body.removeClass('qodef-header--sticky-display');
			} else {
				qodef.body.addClass('qodef-header--sticky-display');
			}
		},
		init: function () {
			var displayAmount = stickyHeaderAppearance.displayAmount();
			
			stickyHeaderAppearance.showHideHeader(displayAmount);
			$(window).scroll(function () {
				stickyHeaderAppearance.showHideHeader(displayAmount);
			});
		}
	};
	
	qodef.stickyHeaderAppearance = stickyHeaderAppearance.init;
	
})(jQuery);
(function ($) {
	"use strict";
	
	$(document).ready(function () {
		qodefMobileHeaderAppearance.init();
	});
	
	/*
	 **	Init mobile header functionality
	 */
	var qodefMobileHeaderAppearance = {
		init: function () {
			if (qodef.body.hasClass('qodef-mobile-header--vertical')) {
				
				var navigationOpener = $('#qodef-page-mobile-header .qodef-mobile-vertical-menu-opener, .qodef-close-mobile-side-area-holder'),
					navigationHolder = $('#qodef-page-mobile-header .qodef-mobile-side-area'),
					dropdownOpener = $('#qodef-vertical-mobile-header-navigation .qodef-menu-arrow'),
					animationSpeed = 200;
				
				//whole mobile menu opening / closing
				if (navigationOpener.length && navigationHolder.length) {
					navigationOpener.on('tap click', function (e) {
						e.stopPropagation();
						e.preventDefault();
						
						if (navigationHolder.hasClass('opened')) {
							navigationHolder.removeClass('opened');
							
						} else {
							navigationHolder.addClass('opened');
						}
					});
				}
				
				//dropdown opening / closing
				if (dropdownOpener.length) {
					dropdownOpener.each(function () {
						var $thisItem = $(this);
						
						$thisItem.on('tap click', function (e) {
							var $thisItemParent = $thisItem.parent(),
								$thisItemParentSiblingsWithDrop = $thisItemParent.siblings('.menu-item-has-children');
							
							if ($thisItemParent.hasClass('menu-item-has-children')) {
								var $submenu = $thisItemParent.find('ul.sub-menu').first();
								
								if ($submenu.is(':visible')) {
									$submenu.slideUp(animationSpeed);
									$thisItemParent.removeClass('qodef--opened');
								} else {
									$thisItemParent.addClass('qodef--opened');
									
									if ($thisItemParentSiblingsWithDrop.length === 0) {
										$thisItemParent.find('.sub-menu').slideUp(animationSpeed, function () {
											$submenu.slideDown(animationSpeed);
										});
									} else {
										$thisItemParent.siblings().removeClass('qodef--opened').find('.sub-menu').slideUp(animationSpeed, function () {
											$submenu.slideDown(animationSpeed);
										});
									}
								}
							}
							
						});
					});
				}
				
				// close menu on link/logo click
				$('#qodef-vertical-mobile-header-navigation a, .qodef-mobile-header-logo-link').on('click tap', function (e) {
					if ($(this).attr('href') !== 'http://#' && $(this).attr('href') !== '#') {
						navigationHolder.removeClass('opened');
					}
				});
				
				qodefMobileHeaderAppearance.initMobileNavigationScroll();
				qodefMobileHeaderAppearance.mobileHeaderBehavior();
				
				$(window).resize(function () {
					qodefMobileHeaderAppearance.initMobileNavigationScroll();
				});
			}
		},
		initMobileNavigationScroll: function() {
			if (qodef.windowWidth <= 1024) {
				var mobileHeader = $('#qodef-page-mobile-header'),
					mobileHeaderHeight = mobileHeader.length ? mobileHeader.height() : 0,
					navigationHolder = mobileHeader.find('.qodef-mobile-side-area-inner'),
					navigationHeight = navigationHolder.outerHeight(),
					windowHeight = qodef.windowHeight - 100;
				
				//init scrollable menu
				var scrollHeight = mobileHeaderHeight + navigationHeight > windowHeight ? windowHeight - mobileHeaderHeight : navigationHeight;
				
				// in case if mobile header exists on specific page
				if(navigationHolder.length && typeof window.qodefCore.qodefPerfectScrollbar === 'object') {
					navigationHolder.height(scrollHeight);
					window.qodefCore.qodefPerfectScrollbar.init(navigationHolder);
				}
			}
		},
		mobileHeaderBehavior: function() {
			var mobileHeader = $('#qodef-page-mobile-header'),
				mobileHeaderHeight = mobileHeader.length ? mobileHeader.outerHeight() : 0;
			
			if (qodef.body.hasClass('qodef-content-behind-header') && mobileHeaderHeight > 0 && qodef.windowWidth <= 1024) {
				$('#qodef-page-outer').css('marginTop', -mobileHeaderHeight);
			}
		}
	};
	
})(jQuery);
(function ($) {
    "use strict";

    $(document).ready(function(){
        qodefSearchCoversHeader.init();
    });

    var qodefSearchCoversHeader = {
        init: function(){
            var $searchOpener = $('a.qodef-search-opener'),
                $searchForm = $('form.qodef-search-cover'),
                $searchClose = $('.qodef-search-close');

            if ($searchOpener.length && $searchForm.length) {
                $searchOpener.on('click', function (e) {
                    e.preventDefault();
                    qodefSearchCoversHeader.openCoversHeader($searchForm);

                });
                $searchClose.on('click', function (e) {
                    e.preventDefault();
                    qodefSearchCoversHeader.closeCoversHeader($searchForm);
                });
            }
        },
        openCoversHeader: function($searchForm){
            qodef.body.addClass('qodef-covers-search--opened qodef-covers-search--fadein');
            qodef.body.removeClass('qodef-covers-search--fadeout');

            setTimeout(function () {
                $searchForm.find('.qodef-search-field').focus();
            }, 600);
        },
        closeCoversHeader: function($searchForm){
            qodef.body.removeClass('qodef-covers-search--opened qodef-covers-search--fadein');
            qodef.body.addClass('qodef-covers-search--fadeout');

            setTimeout(function () {
                $searchForm.find('.qodef-search-field').val('');
                $searchForm.find('.qodef-search-field').blur();
                qodef.body.removeClass('qodef-covers-search--fadeout');
            }, 300);
        }
    };

})(jQuery);

(function($) {
    "use strict";

    $(document).ready(function(){
        qodefSearchFullscreen.init();
    });

	var qodefSearchFullscreen = {
	    init: function(){
            var $searchOpener = $('a.qodef-search-opener'),
                $searchHolder = $('.qodef-fullscreen-search-holder'),
                $searchClose = $('.qodef-search-close');

            if ($searchOpener.length && $searchHolder.length) {
                $searchOpener.on('click', function (e) {
                    e.preventDefault();
                    if(qodef.body.hasClass('qodef-fullscreen-search--opened')){
                        qodefSearchFullscreen.closeFullscreen($searchHolder);
                    }else{
                        qodefSearchFullscreen.openFullscreen($searchHolder);
                    }
                });
                $searchClose.on('click', function (e) {
                    e.preventDefault();
                    qodefSearchFullscreen.closeFullscreen($searchHolder);
                });

                //Close on escape
                $(document).keyup(function (e) {
                    if (e.keyCode === 27) { //KeyCode for ESC button is 27
                        qodefSearchFullscreen.closeFullscreen($searchHolder);
                    }
                });
            }
        },
        openFullscreen: function($searchHolder){
            qodef.body.removeClass('qodef-fullscreen-search--fadeout');
	        qodef.body.addClass('qodef-fullscreen-search--opened qodef-fullscreen-search--fadein');

            setTimeout(function () {
                $searchHolder.find('.qodef-search-field').focus();
            }, 900);

            qodefCore.qodefScroll.disable();
        },
        closeFullscreen: function($searchHolder){
            qodef.body.removeClass('qodef-fullscreen-search--opened qodef-fullscreen-search--fadein');
            qodef.body.addClass('qodef-fullscreen-search--fadeout');

            setTimeout(function () {
                $searchHolder.find('.qodef-search-field').val('');
                $searchHolder.find('.qodef-search-field').blur();
                qodef.body.removeClass('qodef-fullscreen-search--fadeout');
            }, 300);

            qodefCore.qodefScroll.enable();
        }
    };

})(jQuery);

(function ($) {
    "use strict";
	qodefCore.shortcodes.masterds_core_product_categories_list = {};
	qodefCore.shortcodes.masterds_core_product_categories_list.qodefMasonryLayout = qodef.qodefMasonryLayout;

})(jQuery);
(function ($) {
	
    "use strict";
	qodefCore.shortcodes.mycareer_core_product_list = {};
	qodefCore.shortcodes.mycareer_core_product_list.qodefPagination = qodef.qodefPagination;
	qodefCore.shortcodes.mycareer_core_product_list.qodefFilter = qodef.qodefFilter;
	qodefCore.shortcodes.mycareer_core_product_list.qodefJustifiedGallery = qodef.qodefJustifiedGallery;
	qodefCore.shortcodes.mycareer_core_product_list.qodefMasonryLayout = qodef.qodefMasonryLayout;

})(jQuery);
(function ($) {
	
    "use strict";
	qodefCore.shortcodes.mycareer_core_portfolio_list = {};
	qodefCore.shortcodes.mycareer_core_portfolio_list.qodefPagination = qodef.qodefPagination;
	qodefCore.shortcodes.mycareer_core_portfolio_list.qodefFilter = qodef.qodefFilter;
	qodefCore.shortcodes.mycareer_core_portfolio_list.qodefJustifiedGallery = qodef.qodefJustifiedGallery;
	qodefCore.shortcodes.mycareer_core_portfolio_list.qodefMasonryLayout = qodef.qodefMasonryLayout;

})(jQuery);
(function ($) {
	"use strict";
	
	qodefCore.shortcodes.mycareer_core_sprinkled_portfolio = {};
	qodefCore.shortcodes.mycareer_core_sprinkled_portfolio.qodefPagination = qodef.qodefPagination;
	qodefCore.shortcodes.mycareer_core_sprinkled_portfolio.qodefFilter = qodef.qodefFilter;
	qodefCore.shortcodes.mycareer_core_sprinkled_portfolio.qodefJustifiedGallery = qodef.qodefJustifiedGallery;
	qodefCore.shortcodes.mycareer_core_sprinkled_portfolio.qodefMasonryLayout = qodef.qodefMasonryLayout;
	
	
	$(document).ready(function () {
	});
	
	$(window).on('load', function () {
		qodefSprinkledPortfolio.init();
	});
	
	var qodefSprinkledPortfolio = {
		init: function () {
			var $holder = $('.qodef-sprinkled-portfolio.qodef-layout--sprinkled-portfolio');
			var $animate = false;
			
			if ($holder.length) {
				
				var $animationSettings = {
					grid: {duration: 0.8, ease: Expo.easeOut},
					images: {duration: 1, ease: Quint.easeOut}, // not in use currently
				};
				
				$holder.each(function () {
					var $thisHolder = $(this);
					var $explore = $thisHolder.find('.menu__item-explore');
					var $gridback = $thisHolder.find('.qodef-gridback');

					$explore.on('click', function(e) {
						e.preventDefault();
						e.stopPropagation();
						qodefSprinkledPortfolio.spread(true, $thisHolder, $animationSettings);
						qodefSprinkledPortfolio.clickClass($thisHolder);
						
					});
					
					$gridback.on('click', function(e) {
						e.preventDefault();
						e.stopPropagation();
						qodefSprinkledPortfolio.spread(false, $thisHolder, $animationSettings);
						qodefSprinkledPortfolio.clickClass($thisHolder);
						
					});
					
					
					qodefSprinkledPortfolio.spread($animate, $thisHolder, $animationSettings);
					qodefSprinkledPortfolio.showImages($thisHolder);
				});
			}
		},
		// Helper functions
		getRandomFloat: function(min, max) {
			return (Math.random() * (max - min) + min).toFixed(2)
		},
		// Spreads the grid items by randomly positioning them and scaling them down
		spread: function (animate, holder, animationSettings) {
			if (holder.length) {
				var animateCount = 0;
				var gridHeight = holder.height();
				var gridTop = holder.offset().top;
				var item = holder.find('.grid__item-wrap');
				var images = holder.find('.grid__item');
				
				item.each(function(){
					var $thisItem = $(this);
					var rectTop = $thisItem.offset().top;
					var rectLeft = $thisItem.offset().left;
					var rectWidth = $thisItem.width();
					var rectHeight = $thisItem.height();
					
					// Item´s center point
					var center = {x: rectLeft+rectWidth/2, y: rectTop+rectHeight/2};
					// Calculate the item´s quadrant in the viewport
					var quadrant = center.x >= qodef.windowWidth/2 ?
						center.y <= gridHeight/2 + gridTop ? 1 : 4 :
						center.y <= gridHeight/2 + gridTop ? 2 : 3;
					
					// Now calculate how much to translate the item
					// The positions will be random but only in the area of the item´s quadrant
					// Also, consider a margin so the item does not stay completely out of the viewport or its quadrant
					var margins = {x: qodef.windowWidth*.02, y: qodef.windowHeight*.04}
					var tx = quadrant === 1 || quadrant === 4 ?
						qodefSprinkledPortfolio.getRandomFloat(-1*center.x + qodef.windowWidth/2 + margins.x*4, qodef.windowWidth - center.x - margins.x) :
						qodefSprinkledPortfolio.getRandomFloat(-1*center.x + margins.x, qodef.windowWidth/2 - center.x - margins.x*4);
					var ty = quadrant === 1 || quadrant === 2 ?
						qodefSprinkledPortfolio.getRandomFloat(-1*center.y + margins.y, qodef.windowHeight/2 - center.y - margins.y*4) :
						qodefSprinkledPortfolio.getRandomFloat(-1*center.y + qodef.windowHeight/2 + margins.y*4, qodef.windowHeight - center.y - margins.y);
					
					// Save the current translation
					$thisItem.attr('data-ctx', tx); // sets
					$thisItem.attr('data-cty', ty); // sets
					
					if ( animate ) {
						TweenMax.to($thisItem, animationSettings.grid.duration, {
							ease: animationSettings.grid.ease,
							x: 0,
							y: 0,
							scale: 1
						});
					}
					else {
						TweenMax.to($thisItem, animationSettings.grid.duration, {
							ease: animationSettings.grid.ease,
							x: tx,
							y: ty,
							scale: 0.35
						});
					}
				});
			}
			
		},
		showImages: function(holder) {
			var images = holder.find('.grid__item');
			TweenMax.set(images, {opacity: 1});
		},
		clickClass: function(holder) {
			var pagePreviewHolder = holder.find('.qodef-page');
			
			if (pagePreviewHolder.hasClass('page--preview')) {
				pagePreviewHolder.removeClass('page--preview');
			} else {
				pagePreviewHolder.addClass('page--preview');
			}
		}
	};
	
})(jQuery);
(function ($) {
	
    "use strict";
	qodefCore.shortcodes.mycareer_core_team_list = {};
	qodefCore.shortcodes.mycareer_core_team_list.qodefPagination = qodef.qodefPagination;
	qodefCore.shortcodes.mycareer_core_team_list.qodefFilter = qodef.qodefFilter;
	qodefCore.shortcodes.mycareer_core_team_list.qodefJustifiedGallery = qodef.qodefJustifiedGallery;
	qodefCore.shortcodes.mycareer_core_team_list.qodefMasonryLayout = qodef.qodefMasonryLayout;

})(jQuery);
(function ($) {
    "use strict";
	qodefCore.shortcodes.mycareer_core_testimonials_list = {};
	qodefCore.shortcodes.mycareer_core_testimonials_list.qodefSwiper = qodef.qodefSwiper;

})(jQuery);
(function ($) {
	"use strict";
	
	$(document).ready(function () {
		qodeCertificate.init();
	});

	var qodeCertificate = {
		init: function () {
			var $qodeCertificateEl = $('.qodef-certificate.qodef-layout--before-content');
			
			if ($qodeCertificateEl.length) {
				$qodeCertificateEl.each(function () {
					var $thisBox = $(this);
                    
                    if ($thisBox.data('hover-background-color')) {
                        var thisBg = $thisBox.css('background-color');
                        var thisHoverBg = $thisBox.data('hover-background-color');
                        $thisBox.on('mouseenter', function() {
                            $thisBox.css('background-color', thisHoverBg);
                        }).on('mouseleave', function() {
                            $thisBox.css('background-color', thisBg);
                        });
                    }
				});
			}
		}
	};
	
})(jQuery);
(function ($) {
	"use strict";
	
	$(document).ready(function () {
		qodeInfoBox.init();
	});

	var qodeInfoBox = {
		init: function () {
			var $qodeInfoBoxEl = $('.qodef-info-box.qodef-layout--before-content');
			
			if ($qodeInfoBoxEl.length) {
				$qodeInfoBoxEl.each(function () {
					var $thisBox = $(this);
                    
                    if ($thisBox.data('hover-background-color')) {
                        var thisBg = $thisBox.css('background-color');
                        var thisHoverBg = $thisBox.data('hover-background-color');
                        $thisBox.on('mouseenter', function() {
                            $thisBox.css('background-color', thisHoverBg);
                        }).on('mouseleave', function() {
                            $thisBox.css('background-color', thisBg);
                        });
                    }
				});
			}
		}
	};
	
})(jQuery);
(function ($) {
	"use strict";
	
	$(window).on('load', function () {
		qodefTilt.init();
	});
	
	$(document).on('mycareer_trigger_get_new_posts', function () {
		qodefTilt.init();
	});

	var qodefTilt = {
		init: function () {
			var $gallery = $('.qodef-hover-animation--tilt');
			
			if ($gallery.length) {
				$gallery.each(function () {
					var $this = $(this),
						$thisImage = $this.find('article .qodef-e-media-image'),
						$thisTitle = $this.find('article .qodef-e-title-link');
					
					$thisImage.each(function () {
						$(this).tilt({
							maxTilt: 25,
							perspective: 1600,
							scale: 1,
							easing: "cubic-bezier(.03,.98,.52,.99)",
							transition: true,
							speed: 300,
							glare: true,
							maxGlare: 0.2,
						});
					});

					// Hover on title - tilt image
					var getRandRangeNum = function(max, min) {
						return Math.floor(Math.random() * (max - min + 1)) + min;
					}

					var plusOrMinus = function() {
						return Math.random() < 0.5 ? -1 : 1;
					}

					$thisTitle.each(function(){
						$(this).on('mouseenter', function() {
							var randomRangeNum = getRandRangeNum(10, 5) * plusOrMinus(),
								randomRangeNum2 = getRandRangeNum(10, 5) * plusOrMinus();

							$(this).closest('article').find('.qodef-e-media-image').css({'transform': 'perspective(1600px) rotateX('+ randomRangeNum +'deg) rotateY('+ randomRangeNum2 +'deg)', 'transition': '.2s'});
						}).on('mouseleave', function() {
							$(this).closest('article').find('.qodef-e-media-image').css({'transform': 'perspective(1600px) rotateX(0) rotateY(0)', 'transition': '0'});
						});
					})
				});
			}
		}
	};
	
	qodefCore.shortcodes.mycareer_core_sprinkled_portfolio.qodefTilt = qodefTilt;
	
})(jQuery);
(function ($) {
	"use strict";
	
	$(document).ready(function () {
		qodefInfoFollow.init();
	});
	
	$(document).on('mycareer_trigger_get_new_posts', function () {
		qodefInfoFollow.init();
	});
	
	var qodefInfoFollow = {
		init: function () {
			var $gallery = $('.qodef-hover-animation--follow');
			
			if ($gallery.length) {
				qodef.body.append('<div class="qodef-follow-info-holder"><div class="qodef-follow-info-inner"><span class="qodef-follow-info-category"></span><br/><span class="qodef-follow-info-title"></span></div></div>');
				
				var $followInfoHolder = $('.qodef-follow-info-holder'),
					$followInfoCategory = $followInfoHolder.find('.qodef-follow-info-category'),
					$followInfoTitle = $followInfoHolder.find('.qodef-follow-info-title');
				
				$gallery.each(function () {
					$gallery.find('.qodef-e-inner').each(function () {
						var $thisItem = $(this);
						
						//info element position
						$thisItem.on('mousemove', function (e) {
                            if(e.clientX + 20 + $followInfoHolder.width() > qodef.windowWidth){
                                $followInfoHolder.addClass('qodef-right');
                            }else{
                                $followInfoHolder.removeClass('qodef-right');
                            }

							$followInfoHolder.css({
								top: e.clientY + 20,
								left: e.clientX + 20
							});
						});
						
						//show/hide info element
						$thisItem.on('mouseenter', function () {
							var $thisItemTitle = $(this).find('.qodef-e-title'),
								$thisItemCategory = $(this).find('.qodef-e-info-category');
							
							if ($thisItemTitle.length) {
								$followInfoTitle.html($thisItemTitle.clone());
							}
							
							if ($thisItemCategory.length) {
								$followInfoCategory.html($thisItemCategory.html());
							}
							
							if (!$followInfoHolder.hasClass('qodef-is-active')) {
								$followInfoHolder.addClass('qodef-is-active');
							}
						}).on('mouseleave', function () {
							if ($followInfoHolder.hasClass('qodef-is-active')) {
								$followInfoHolder.removeClass('qodef-is-active');
							}
						});
					});
				});
			}
		}
	};
	
	qodefCore.shortcodes.mycareer_core_portfolio_list.qodefInfoFollow = qodefInfoFollow;
	
})(jQuery);
(function ($) {
	"use strict";
	
	$(document).ready(function () {
		qodefHoverDir.init();
	});
	
	$(document).on('mycareer_trigger_get_new_posts', function () {
		qodefHoverDir.init();
	});
	
	var qodefHoverDir = {
		init: function () {
			var $gallery = $('.qodef-hover-animation--direction-aware');
			
			if ($gallery.length) {
				$gallery.each(function () {
					var $this = $(this);
					$this.find('article').each(function () {
						$(this).hoverdir({
							hoverElem: 'div.qodef-e-content',
							speed: 330,
							hoverDelay: 35,
							easing: 'ease'
						});
					});
				});
			}
		}
	};
	
	qodefCore.shortcodes.mycareer_core_portfolio_list.qodefHoverDir = qodefHoverDir;
	
})(jQuery);
(function ($) {
	"use strict";
	
	$(document).ready(function () {
		qodefTilt.init();
	});
	
	$(document).on('mycareer_trigger_get_new_posts', function () {
		qodefTilt.init();
	});

	var qodefTilt = {
		init: function () {
			var $gallery = $('.qodef-hover-animation--tilt');
			
			if ($gallery.length) {
				$gallery.each(function () {
					var $this = $(this);
					
					$this.find('article .qodef-e-media-image').each(function () {
						$(this).tilt({
							maxTilt: 25,
							perspective: 1600,
							scale: 1,
							easing: "cubic-bezier(.03,.98,.52,.99)",
							transition: true,
							speed: 300,
							glare: true,
							maxGlare: 0.2,
						});
					});
				});
			}
		}
	};
	
	qodefCore.shortcodes.mycareer_core_sprinkled_portfolio.qodefTilt = qodefTilt;
	
})(jQuery);
(function ($) {
	"use strict";
	
	$(document).ready(function () {
		qodefInfoFollow.init();
	});
	
	$(document).on('mycareer_trigger_get_new_posts', function () {
		qodefInfoFollow.init();
	});
	
	var qodefInfoFollow = {
		init: function () {
			var $gallery = $('.qodef-hover-animation--follow');
			
			if ($gallery.length) {
				qodef.body.append('<div class="qodef-follow-info-holder"><div class="qodef-follow-info-inner"><span class="qodef-follow-info-category"></span><br/><span class="qodef-follow-info-title"></span></div></div>');
				
				var $followInfoHolder = $('.qodef-follow-info-holder'),
					$followInfoCategory = $followInfoHolder.find('.qodef-follow-info-category'),
					$followInfoTitle = $followInfoHolder.find('.qodef-follow-info-title');
				
				$gallery.each(function () {
					$gallery.find('.qodef-e-inner').each(function () {
						var $thisItem = $(this);
						
						//info element position
						$thisItem.on('mousemove', function (e) {
                            if(e.clientX + 20 + $followInfoHolder.width() > qodef.windowWidth){
                                $followInfoHolder.addClass('qodef-right');
                            }else{
                                $followInfoHolder.removeClass('qodef-right');
                            }

							$followInfoHolder.css({
								top: e.clientY + 20,
								left: e.clientX + 20
							});
						});
						
						//show/hide info element
						$thisItem.on('mouseenter', function () {
							var $thisItemTitle = $(this).find('.qodef-e-title'),
								$thisItemCategory = $(this).find('.qodef-e-info-category');
							
							if ($thisItemTitle.length) {
								$followInfoTitle.html($thisItemTitle.clone());
							}
							
							if ($thisItemCategory.length) {
								$followInfoCategory.html($thisItemCategory.html());
							}
							
							if (!$followInfoHolder.hasClass('qodef-is-active')) {
								$followInfoHolder.addClass('qodef-is-active');
							}
						}).on('mouseleave', function () {
							if ($followInfoHolder.hasClass('qodef-is-active')) {
								$followInfoHolder.removeClass('qodef-is-active');
							}
						});
					});
				});
			}
		}
	};
	
	qodefCore.shortcodes.mycareer_core_portfolio_list.qodefInfoFollow = qodefInfoFollow;
	
})(jQuery);
(function ($) {
	"use strict";
	
	$(document).ready(function () {
		qodefHoverDir.init();
	});
	
	$(document).on('mycareer_trigger_get_new_posts', function () {
		qodefHoverDir.init();
	});
	
	var qodefHoverDir = {
		init: function () {
			var $gallery = $('.qodef-hover-animation--direction-aware');
			
			if ($gallery.length) {
				$gallery.each(function () {
					var $this = $(this);
					$this.find('article').each(function () {
						$(this).hoverdir({
							hoverElem: 'div.qodef-e-content',
							speed: 330,
							hoverDelay: 35,
							easing: 'ease'
						});
					});
				});
			}
		}
	};
	
})(jQuery);