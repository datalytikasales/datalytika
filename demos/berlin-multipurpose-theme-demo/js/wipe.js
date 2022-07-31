
jQuery(function($){$('.cover-slider').each(function(){var $slides=$(this).find('.cover-slider__slide');var numSlides=$slides.length-1;var i=0;var rotate=function(){$slides.removeClass('active inactive');$slides.eq(i).addClass('inactive');if(i==numSlides){i=-1;}
$slides.eq(++i).addClass('active');var timer=window.setTimeout(rotate,4000);};rotate();});});