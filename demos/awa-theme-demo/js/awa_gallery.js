;(function ($, window, document, undefined) {
    'use strict';


    if($('.modern-slider-wrap').length){
        $('.modern-slider').each(function () {
            var time = $(this).attr('data-time') ? $(this).attr('data-time') : 6000;
            $(this).kenBurning({
                time : time
            });
        });
    }


})(jQuery, window, document);