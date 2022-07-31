;(function ($, window, document, undefined) {
    'use strict';
    if ($('.headings-wrap.anime-wrap .headings').length) {
        if ($(window).width() > 767) {
            $('.images-wrap').each(function () {
               var id = $(this).attr('id');

                var scene = document.getElementById(id);
                var parallaxInstance = new Parallax(scene, {
                    relativeInput: false,
                    clipRelativeInput: false,
                    calibrationThreshold: 100,
                    calibrationDelay: 500,
                    supportDelay: 500,
                    calibrateX: true,
                    calibrateY: false,
                    invertX: true,
                    invertY: true,
                    limitX: false,
                    limitY: false,
                    scalarX: 5.0,
                    scalarY: 5.0,
                    frictionX: 0.1,
                    frictionY: 0.1,
                    originX: 0.5,
                    originY: 0.5,
                    hoverOnly: true
                });
            });
        }
    }



    if ($('.headings.style5').length) {
        $('.headings.style5').each(function () {
            var head = $(this);
            var typingWords = head.find('.typed').data('words'),
                wordsArray = typingWords.split(',');
            head.find('.typed').each(function () {
                $(this).typed({
                    strings: wordsArray,
                    // Optionally use an HTML element to grab strings from (must wrap each string in a <p>)
                    stringsElement: null,
                    // typing speed
                    typeSpeed: 30,
                    // time before typing starts
                    startDelay: 1200,
                    // backspacing speed
                    backSpeed: 20,
                    // time before backspacing
                    backDelay: 500,
                    // loop
                    loop: true,
                    // false = infinite
                    loopCount: false,
                    // show cursor
                    showCursor: true,
                    // character for cursor
                    cursorChar: "_",
                    // attribute to type (null == text)
                    attr: null,
                    // either html or text
                    contentType: 'html',
                    // call when done callback function
                });
            })
        });
    }


})(jQuery, window, document);