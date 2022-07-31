/**
 * jQuery Line Progressbar
 * Author: KingRayhan<rayhan095@gmail.com>
 * Author URL: http://rayhan.info
 * Version: 1.0.0
 */

(function ($) {
	'use strict';
	
	
	$.fn.LineProgressbar = function (options) {
		
		options = $.extend({
			percentage: null,
			ShowProgressCount: true,
			duration: 1000,
			
			// Styling Options
			fillBackgroundColor: '#000',
			backgroundColor: '#fafafa',
			radius: '0px',
			height: '4px',
			inactiveHeight: '4px',
			width: '100%',
			followText: false,
			textColor: ''
		}, options);
		
		$.options = options;
		return this.each(function(index, el) {
			// Markup
			$(el).html('<div class="progressbar"><div class="proggress"></div><div class="percentCount"></div></div>');
			
			
			
			var progressFill = $(el).find('.proggress');
			var progressBar= $(el).find('.progressbar');
			var percentCount= $(el).find('.percentCount');
			
			var activePositionTop = 0;
			if( options.inactiveHeight < options.height ) {
				activePositionTop = (options.height - options.inactiveHeight) / 2;
			}
			
			
			progressFill.css({
				backgroundColor : options.fillBackgroundColor,
				height : options.height,
				top: -activePositionTop,
				borderRadius: options.radius
			});
			progressBar.css({
				width : options.width,
				height : options.inactiveHeight,
				backgroundColor : options.backgroundColor,
				borderRadius: options.radius
			});
			if(options.textColor != '') {
				percentCount.css({
					color : options.textColor
				});
			}
			
			// Progressing
			progressFill.animate(
				{
					width: options.percentage + "%"
				},
				{
					step: function(x) {
						if(options.ShowProgressCount){
							percentCount.text(Math.round(x) + "%");
							if(options.followText) {
								percentCount.css({'left': Math.round(x) + '%'});
							}
						}
					},
					duration: options.duration
				}
			);
			////////////////////////////////////////////////////////////////////
		});
	}
	
})(jQuery);