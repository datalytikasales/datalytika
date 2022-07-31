;(function ($, window, document, undefined) {
	'use strict';

	function initIsotop() {
		if ($('.awa-isotope').length) {
			$('.awa-isotope').each(function () {
				var self = $(this);
				var layoutM = self.attr('data-layout') || 'masonry';
				var gutter_val  = parseInt(self.attr('data-space'), 10) || 0;

				if ($(window).width() < 1200) {
					gutter_val  = parseInt(self.attr('data-space-tablet'), 10) || gutter_val;
				}
				if ($(window).width() < 767) {
					gutter_val  = parseInt(self.attr('data-space-mobile'), 10) || gutter_val;
				}

				self.isotope({
					itemSelector: '.grid-item',
					layoutMode: layoutM,
					masonry: {
						columnWidth: '.grid-sizer',
						gutter: gutter_val
					}
				});

				// filter items on button click
				if (self.siblings('.filters-button-group').length) {
					var buttons_group = self.siblings('.filters-button-group');

					$(buttons_group).on('click', 'button', function () {
						$(this).addClass('active').siblings().removeClass('active');
						var filterValue = $(this).attr('data-filter');
						self.isotope({
							filter: filterValue
						});
					});
				}
			});
		}
	}

	function loadItem() {
		if ($('.awa-isotope-load').length) {
			$('.awa-isotope-load').each(function () {
				var wrapBot = $(this).offset().top + $(this).outerHeight();
				var viewportTop = $(window).scrollTop();
				var viewportBottom = viewportTop + $(window).height();

				if (wrapBot < viewportBottom) {
					$(this).find('.grid-item--hide:lt(4)').show(500).removeClass('grid-item--hide');

					var self = $(this);
					var layoutM = self.attr('data-layout') || 'masonry';
					var gutter_val  = parseInt(self.attr('data-space'), 10) || 0;

					$(this).isotope({
						itemSelector: '.grid-item',
						layoutMode: layoutM,
						masonry: {
							columnWidth: '.grid-sizer',
							gutter: gutter_val
						}
					})
				}
			})
		}
	}

	function loadItemClick() {
		if ($('.grid-load-more').length) {
			$('.grid-load-more').each(function () {
				var grid_wrapp = $(this);
				$(this).find('.a-btn').click(function (evt) {
					evt.preventDefault();
					grid_wrapp.find('.grid-item--hide:lt(4)').show(500).removeClass('grid-item--hide');
					if(!grid_wrapp.find('.grid-item--hide').length){
						$(this).remove();
					}
				});
			})
		}
	}




	function initIsotopeDacca() {
		if ($('.awa-isotope-dacca').length) {
			$('.awa-isotope-dacca').each(function () {
				var itm = $('.grid-item');
				itm.each(function () {
					var itemEach = $(this);
					var widthAttr  = itemEach.attr('data-width');
					if ($(window).width() < 997) {
						widthAttr  = itemEach.attr('data-space-tablet') || widthAttr;
					}
					if ($(window).width() < 767) {
						widthAttr  = itemEach.attr('data-space-mobile') || widthAttr;
					}
					itemEach.css('width', widthAttr);
				})
			});
		}
	}

	$(window).on('load', function () {
		initIsotop();
		setTimeout(fixIsotope, 0);
		loadItem();
		loadItemClick();
		initIsotopeDacca();
	});

	$(window).on('resize', function () {
		initIsotop();
	});

	$(window).on('scroll', function () {
		loadItem();
	});

	function fixIsotope() {
		initIsotop();
	}
})(jQuery, window, document);

