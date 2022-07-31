;(function ($, window, document, undefined) {
  'use strict';


	  if($('.images-wrapper').length){
		  $('.images-wrapper').each(function () {
			  $(this).not('.slick-initialized').slick({
				  infinite: true,
				  slidesToShow: 3,
				  vertical: true,
				  verticalSwiping: true,
				  centerMode: true,
				  cssEase: 'cubic-bezier(0.445, 0.050, 0.550, 0.950)',
				  prevArrow: '<div class="slick-prev"><i class="ion-chevron-up"></i></div>',
				  nextArrow: '<div class="slick-next"><i class="ion-chevron-down"></i></div>'
			  });
		  });
	  }


  if($('.video').length) {
      $('.play').each(function() {
          $(this).magnificPopup({
              disableOn: 700,
              type: 'iframe',
              mainClass: 'mfp-fade',
              removalDelay: 160,
              preloader: false,
              fixedContentPos: true,
              fixedBgPos: true
          });
      });
  }

    $('.toggle-list').on('click', function(e) {
        e.preventDefault();
        var $this = $(this);
        if ($this.next().hasClass('is-show')) {
            $this.removeClass('active');
            $this.next().removeClass('is-show');
            $this.next().slideUp(350);
        } else {
            $this.parent().parent().find('li .list-drop').removeClass('is-show');
            $this.parent().parent().find('li .list-drop').slideUp(350);
            $this.next().toggleClass('is-show');
            $this.next().slideToggle(350);
            $this.parent().parent().find('li a').removeClass('active');
            $this.toggleClass('active');
        }
    });
    $(window).on('orientationchange', function () {
        $('.images-wrapper').slick('reinit');
    });
    $(window).on('resize', function () {
        $('.images-wrapper').slick('resize');
    })
})(jQuery, window, document);
