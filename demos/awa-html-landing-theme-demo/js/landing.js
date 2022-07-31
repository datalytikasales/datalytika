(function ($, window, document, undefined) {
	'use strict';
	var dataTop = $('.main-wrapper').data('top');
	if ($(window).width() > dataTop) {
		$('a[href^="#"]').on('click', function (evt) {
			evt.preventDefault();
			var target = $(this).attr('href');
			var scrollTop = $(target).offset().top;
			$('body,html').animate({scrollTop: scrollTop}, 500);
			return false;
		});
	}

})(jQuery, window, document);