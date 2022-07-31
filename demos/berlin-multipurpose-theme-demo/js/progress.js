(function($) {
  $.fn.progress = function() {
    var percent = this.data("percent");
    this.css("width", percent + "%");
  };
}(jQuery));

$(document).on('ready', function() {
  $(".bar-one .bar").progress();
  $(".bar-two .bar").progress();
  $(".bar-three .bar").progress();
});