(function($) {

  "use strict";

  /* globals jQuery */

  var panel = $('#mfn-demo-panel');

  /**
   * Pre-built websites images list height
   */

  function demosSliderH() {

    var panelH = panel.height() - $('.header', panel).height() - $('.footer', panel).height();
    $('.demos-slider', panel).height(panelH);

  }

  /**
   * Lazy load images
   */

  function lazyLoad( count ){

    $('.demos img[data-src]', panel).slice(0,count).each(function() {
      var img = $(this);
      if( img.data('src') ){
        img.attr('src', img.data('src')).removeAttr('data-src');
      }
    });

  }

  /**
   * $(document).ready
   * Specify a function to execute when the DOM is fully loaded.
   */

  $(function() {

    /*
     * sliding panel open/close
     */

    panel.on('click', '.control.sliding', function(e) {

      e.preventDefault();

      lazyLoad(60);

      if (panel.hasClass('active')) {

        panel.removeClass('active');

        if ($('body').hasClass('header-rtl')) {
          panel.animate({
            'left': -367
          }, 500);
        } else {
          panel.animate({
            'right': -367
          }, 500);
        }

      } else {

        panel.addClass('active');

        if ($('body').hasClass('header-rtl')) {
          panel.animate({
            'left': 0
          }, 500);
        } else {
          panel.animate({
            'right': 0
          }, 500);
        }

        if ($().niceScroll) {
          setTimeout(function(){
            $('.demos-slider', panel).niceScroll().doScrollTop(0, 500);
          }, 0);
        }

      }

    });

    /**
     * nice scroll
     */

    if ($().niceScroll) {
      $('.demos-slider', panel).niceScroll({
        autohidemode: false,
        cursorborder: '0',
        cursorborderradius: '5',
        cursorcolor: '#222222',
        cursorwidth: '0',
        horizrailenabled: false,
        mousescrollstep: '40',
        scrollspeed: '60'
      }).doScrollTop(620, 0);
    }

    /**
     * .ready functions
     */

    demosSliderH();
    lazyLoad(10);

    /**
     * debouncedresize
     */

    $(window).on('debouncedresize', function() {

      demosSliderH();

    });

  });

})(jQuery);
