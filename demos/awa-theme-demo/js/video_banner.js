;(function ($, window, document, undefined) {
  'use strict';

  // banner video full screen
  if($('.banner-video .full-button').length){
    $('.banner-video .full-button').each(function (index) {
      $(this).on('click', function(){
        if($(this).hasClass('on')){
          $(this).removeClass('on');
          $(this).closest('.banner-video').removeClass('full');
          $('header').show();
          $('footer:not(.no-footer)').show();
        }else{
          $(this).addClass('on');
          $(this).closest('.banner-video').addClass('full');
          $('header').hide();
          $('footer').hide();
        }
      });
    });
  }

  function visibleFull(){
    if($('.banner-video .full-button').length){
      $('header').show();
    }
  }

  $(window).on('load', function () {
    if($('.banner-video .full-button').length){
      $('.banner-video .full-button').addClass('on');
      $('.banner-video .full-button').closest('.banner-video').addClass('full');
      $('header').hide();
      $('footer').hide();
    }

    setTimeout (visibleFull, 3000);
  });

})(jQuery, window, document);