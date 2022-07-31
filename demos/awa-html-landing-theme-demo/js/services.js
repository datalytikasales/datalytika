;(function ($, window, document, undefined) {
    'use strict';

  $('.services.accordion .toggle').on('click', function(e) {
    e.preventDefault();
    var $this = $(this);
    if ($this.next().hasClass('is-show')) {
      $this.next().removeClass('is-show');
      $this.next().slideUp(350);
        $this.find('i').removeClass('ion-minus').addClass('ion-plus');
    } else {
      $this.parent().parent().find('li .list-drop').removeClass('is-show');
      $this.parent().parent().find('li .list-drop').slideUp(350);
      $this.next().toggleClass('is-show');
      $this.next().slideToggle(350);
        $this.closest('.services.accordion').find('.toggle i').removeClass('ion-minus').addClass('ion-plus');
      $this.find('.ion-plus').addClass('ion-minus').removeClass('ion-plus');
    }
  });
})(jQuery, window, document);