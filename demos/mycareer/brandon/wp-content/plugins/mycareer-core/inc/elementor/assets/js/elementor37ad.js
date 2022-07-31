(function ($) {
	"use strict";
	
	$(window).on('load', function () {
		for (var key in qodefCore.shortcodes) {
			
			for (var keyChild in qodefCore.shortcodes[key]) {
				qodefElementor.init(key, keyChild);
			}
			
		}
		
		qodefElementorSection.init();
		elementorSection.init();
	});
	
	var qodefElementor = {
		init: function (key, keyChild) {
			$(window).on('elementor/frontend/init', function (e) {
				elementorFrontend.hooks.addAction('frontend/element_ready/' + key + '.default', function (e) {
					qodefCore.shortcodes[key][keyChild].init();
				});
			});
		}
	};
	
	var qodefElementorSection = {
		init: function() {
			$(window).on('elementor/frontend/init', function () {
				elementorFrontend.hooks.addAction('frontend/element_ready/section', elementorSection.init );
			});
		}
	}
	
	
	var elementorSection = {
		init: function( $scope ){
			var $target = $scope,
				isEditMode = Boolean( elementorFrontend.isEditMode() ),
				settings = [],
				sectionData = {};
			
			//generate parallax settings
			if( isEditMode && typeof $scope !== 'undefined' ){
				// generate options when in admin
				var editorElements = window.elementor.elements,
					sectionId = $target.data('id');
				
				$.each( editorElements.models, function( index, object ) {
					if ( sectionId === object.id ) {
						sectionData = object.attributes.settings.attributes;
					}
				} );
				
				if( sectionData.qodef_enable_parallax.length ){
					settings['enable_parallax'] = sectionData.qodef_enable_parallax;
				}
				if( sectionData.qodef_parallax_image['url'] ){
					settings['image_url'] = sectionData.qodef_parallax_image['url'];
				}
				if( sectionData.qodef_parallax_height.length ){
					settings['section_height'] = sectionData.qodef_parallax_height;
				}
				
				// tooltip text
				if( sectionData.qodef_enable_tooltip_text.length ){
					settings['enable_tooltip_text'] = sectionData.qodef_enable_tooltip_text;
				}
				
				if( sectionData.qodef_tooltip_text.length ){
					settings['tooltip_text'] = sectionData.qodef_tooltip_text;
				}
				
				// vertical text
				if( sectionData.qodef_enable_vertical_text.length ){
					settings['enable_vertical_text'] = sectionData.qodef_enable_vertical_text;
				}
				
				if( sectionData.qodef_vertical_text.length ){
					settings['vertical_text'] = sectionData.qodef_vertical_text;
				}
				
				if( sectionData.qodef_vertical_text_link.length ){
					settings['vertical_text_link'] = sectionData.qodef_vertical_text_link;
				}
				
			} else{
				// generate options when in frontend using global js variable
				var parallaxSectionData = qodefElementorGlobal.vars.elementorParallaxSection;
				var tooltipSectionData = qodefElementorGlobal.vars.elementorTooltipSection;
				var verticalTextSectionData = qodefElementorGlobal.vars.elementorVerticalTextSection;
				
				$.each( parallaxSectionData, function( index, property ){
					$target = $('[data-id="' + index + '"]');
					settings['image_url'] = property[0].url;
					settings['section_height'] = property[1];
					if(typeof settings['image_url'] !== 'undefined' ){
						settings['enable_parallax'] = 'yes';
					}
					//generate output
					if( typeof $target !== 'undefined' && $target.length ){
						elementorSection.generateOutput($target, settings);
					}
				})
				
				$.each( tooltipSectionData, function( index, property ){
					$target = $('[data-id="' + index + '"]');
					settings['tooltip_text'] = property[0];
					if(typeof settings['tooltip_text'] !== 'undefined' ){
						settings['enable_tooltip_text'] = 'yes';
					}

					//generate output
					if( typeof $target !== 'undefined' && $target.length ){
						elementorSection.generateTooltipOutput($target, settings);
					}
				})
				
				$.each( verticalTextSectionData, function( index, property ){
					$target = $('[data-id="' + index + '"]');
					settings['vertical_text'] = property[0];
					settings['vertical_text_link'] = property[1];
					console.log('testing');
					console.log(settings);
					if(typeof settings['vertical_text'] !== 'undefined' ){
						settings['enable_vertical_text'] = 'yes';
					}

					//generate output
					if( typeof $target !== 'undefined' && $target.length ){
						elementorSection.generateVerticalTextOutput($target, settings);
					}
				})
			}
			
			//generate output
			if( typeof $target !== 'undefined' ){
				elementorSection.generateOutput($target, settings);
				elementorSection.generateTooltipOutput($target, settings);
				elementorSection.generateVerticalTextOutput($target, settings);
			}
		},
		generateOutput: function($target, settings){
			$( '.qodef-parallax-img-holder', $target ).remove();
			$target.removeClass('qodef-parallax qodef--parallax-row');
			$target.css({'overflow':'hidden'});
			
			if( typeof settings['enable_parallax'] !== 'undefined' && settings['enable_parallax'] == 'yes' && typeof settings['image_url'] !== 'undefined' ){
				var $layout = null;
				
				$target.addClass('qodef-parallax qodef--parallax-row');
				$target.css({'height':settings['section_height'], 'background':'transparent'});
				
				$layout = $( '<div class="qodef-parallax-img-holder"><div class="qodef-parallax-img-wrapper"><img src="'+settings['image_url']+'" alt="Parallax image"></div></div>' )
					.prependTo( $target );
				
				//wait for image src to be loaded
				var newImg = new Image;
				newImg.onload = function () {
					$target.find('img').attr('src', this.src);
					qodefCore.qodefParallaxBackground.init();
				};
				newImg.src = settings['image_url'];
			}
		},
		generateTooltipOutput: function($target, settings){
			$( '.qodef-tooltip-text', $target ).remove();
			
			if( typeof settings['tooltip_text'] !== 'undefined' && settings['tooltip_text'] !== '' && settings['enable_tooltip_text'] !== 'no' ){
				var $layout = null;
				
				$layout = $( '<span class="qodef-tooltip-text">'+settings['tooltip_text']+'</span>' )
					.prependTo( $target );
				
				//init section tooltip
				qodefCore.qodefSectionTooltip.init();
			}
		},
		generateVerticalTextOutput: function($target, settings){
			$( '.qodef-vertical-text-inner', $target ).remove();
			$target.css({'overflow':'visible'});
			
			if( typeof settings['vertical_text'] !== 'undefined' && settings['vertical_text'] !== '' && settings['enable_vertical_text'] !== 'no' ){
				var $layout = null;
				
				if( typeof settings['vertical_text_link'] !== 'undefined' && settings['vertical_text_link'] !== '' ) {
					$layout = $( '<div class="qodef-vertical-text-inner"><p><a target="_blank" href="'+settings['vertical_text_link']+'">'+settings['vertical_text']+'</a></p></div>' ).prependTo( $target );
				} else {
					$layout = $( '<div class="qodef-vertical-text-inner"><p>'+settings['vertical_text']+'</p></div>' ).prependTo( $target );
				}
			}
		}
	}
})(jQuery);
