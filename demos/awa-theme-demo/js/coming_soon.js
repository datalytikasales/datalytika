// SKILLS
;(function ($, window, document, undefined) {
    'use strict';

    function getTimeRemaining(endtime) {
        var t = Date.parse(endtime) - Date.parse(new Date());
        var seconds = Math.floor((t / 1000) % 60);
        var minutes = Math.floor((t / 1000 / 60) % 60);
        var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        var days = Math.floor(t / (1000 * 60 * 60 * 24));
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function updateClock($clock,endTime,updateDays) {
        var t = getTimeRemaining(endTime);

        if (updateDays) {
            $clock.find('.count-days').text( t.days );
        }

        if (updateDays || t.minutes === 59) {
            $clock.find('.count-hours').text( ('0' + t.hours).slice(-2) );
        }

        if (updateDays || t.seconds === 59) {
            $clock.find('.count-mins').text( ('0' + t.minutes).slice(-2) );
        }

        $clock.find('.count-secs').text( ('0' + t.seconds).slice(-2) );

        if (t.total <= 0) {
            clearInterval(timeinterval);
        }
    }

    if ($('.coming-soon').length) {
        $('.coming-soon').each(function () {
            var self = $(this),
                endTime = self.attr('data-end'),
                $mask_clock = self.find('.mask');

            updateClock($mask_clock,endTime,true);

            var timeinterval = setInterval(function(){
                updateClock($mask_clock,endTime);
            }, 1000);

        });
    }




    $(window).on('load', function(){
        if (comingSoonElements.length) {
            comingSoonValue()
        }
    });
    $(window).on('resize', function(){
        if (comingSoonElements.length) {
            comingSoonValue()
        }
    });

    var comingSoonElements = $('.coming-soon-descr');
    function comingSoonValue(){
        comingSoonElements.each(function(){
            var thisElement = $(this),
                text = thisElement.data('desktop'),
                mobileText = thisElement.data('mobile');
            if ($(window).width() < 768) {
                thisElement.text(mobileText);
            } else {
                thisElement.text(text);
            }
        })
    }



})(jQuery, window, document);