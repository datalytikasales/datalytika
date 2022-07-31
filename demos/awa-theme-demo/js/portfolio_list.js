;(function ($, window, document, undefined) {
    'use strict';
    // FRAGMENT SHORTCODE

    (function() {

        if ( document.querySelectorAll('.fragment-img').length ) {
            imagesLoaded(document.querySelectorAll('.fragment-img'), { background: true }, function() {

                // VAR ITEM
                var fragmentItemRight = $('.fragment-img.fragment-img--right');
                var fragmentItemLeft = $('.fragment-img.fragment-img--left');

                // DATA ATRIBEUT RIGHT ITEM
                var fragmentCountRight = parseInt($(fragmentItemRight).attr('data-fragment'));
                var fragmentParalaxRight = $(fragmentItemRight).attr('data-paralax');

                // DATA ATRIBEUT LEFT ITEM
                var fragmentCountLeft = parseInt($(fragmentItemLeft).attr('data-fragment'));
                var fragmentParalaxLeft = $(fragmentItemLeft).attr('data-paralax');

                // CREATE OBJECT
                document.querySelectorAll('.fragment-img').forEach(function (element) {

                    if ( element.classList.contains('fragment-img--right') ) {
                        new FragmentsFx(element, {
                            fragments: fragmentCountRight,
                            boundaries: {x1: 100, x2: 75, y1: 50, y2: 50},
                            randomIntervals: {
                                top: {min: 0,max: 90},
                                left: {min: 0,max: 90},
                                dimension: {
                                    width: {min: 25,max: 50, fixedHeight: 10},
                                    height: {min: 15,max: 50, fixedWidth: 10}
                                }
                            },
                            parallax: fragmentParalaxRight
                        });
                    } else {
                        new FragmentsFx(element, {
                            fragments: fragmentCountLeft,
                            boundaries: {x1: 50, x2: 150, y1: 0, y2: 0},
                            randomIntervals: {
                                top: {min: 0,max: 40},
                                left: {min: 0,max: 90},
                                dimension: {
                                    width: {min: 10,max: 50, fixedHeight: 0.5},
                                    height: {min: 5,max: 10, fixedWidth: 5}
                                }
                            },
                            parallax: fragmentParalaxLeft,
                            randomParallax: {min: 30, max: 150}
                        });
                    }
                });
            });
        }
    })();

})(jQuery, window, document);