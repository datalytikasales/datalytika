;(function( $ ){

	$.fn.prodSlider = function(options) {

		var set = $.extend( {
		  'list'        : '> ul',
		  'listItem'    : '> li',
		  'margin' : 0,
		  'button'      : '.sliderbut',
		  'classButR' : 'next',
		  'classButL' : 'prev',
		  'elemImg'     : 'img',
		  'effect'      : 'fade',
		  'timePreload' : '3000',
		  'delay'       : '2000',
		  'bebug'       : 0,
		  'autoplay'    : true
		}, options);

		this.each(function(i,el) {

			_this = $(el);

			var elThis, elActive, timer,
				elUl = _this.find(set.list),
				button = _this.find(set.button);

			_this.css({
				'position' : 'relative'
			});
			elUl.css({
				'position' : 'relative'
			});

			if (set.bebug) {
				console.log('/// debug init ///');
				//console.log(this);
				console.log('element list:'+elUl[0]);
				console.log('element button: '+set.button);
				console.log('/// debug init ///');
			}

		var timeout = function(time){
				timer = setTimeout(function() { sliderRun('',set.effect); }, time);
			},
			preload = function(el){
					img = el.find(set.elemImg);
					img.data('src') && img.attr({'src': img.data('src')}).removeAttr('data-src');
					img = 0; el = 0;
			},
			sliderRun = function(th,effect) {
				set.bebug && console.log('');
				set.bebug && console.log('/// debug play ///');
				set.bebug && console.log('effect: '+effect);
				set.bebug && console.log(elUl[0]);

				effect = set.effect;

				switch (effect) {

					case 'slide':
					
						if(effect == 'slide'){

							clearTimeout(timer);

							var elLi = elUl.find(set.listItem).removeClass('active');

							if(!elUl.is(':animated')){

								var direct = (th && $(th).hasClass(set.classButL)) ? 'left' : 'right';

								elLi.length > 1 && elUl.animate({left: ( direct == 'left' ? ((elLi.width())+(set.margin)) : -((elLi.width())+(set.margin)) ) }, 700, function(){

									if(direct == 'left'){
										preload(elUl.find('[data-src]').last().parents('li'));
										elLi.length > 1 && elUl.prepend(elLi.last());
										set.bebug && console.log('direct: '+direct);
									} else {
										preload($(elUl.find('[data-src]')[0]).parents('li'));
										elLi.length > 1 && elUl.append(elLi[0]);
										set.bebug && console.log('direct: '+direct);
									}

									elUl.css('left', 0 );

									set.autoplay && timeout(set.delay);

								});
								elLi.length == 1 && $(th).parent().find(set.button).hide();
							}

						}

					default: 
						set.bebug && console.log('effect: '+effect);

						clearTimeout(timer);

						var elLi = elUl.find(set.listItem);
						elLi.css({
							'position':'absolute'
						});

						

						if(!elLi.find('img').is(':animated')){
							elActive = 0; elThis = 0;
							elActive = elUl.find('> .active').stop();

							if(button && button.hasClass(set.classButL) ) {
								elThis = (elActive.index() == 0) ? elLi.last()  : elActive.prev();
								preload(elThis.prev());
							} else {
								elThis = (elActive.index() == elLi.length-1) ? $(elLi[0]) : elActive.next();
								preload(elThis.next());
							}

							console.log(elActive);
							console.log(elThis);
							
							elActive.fadeOut(200).removeClass('active');
							elThis.fadeIn(300).addClass('active');

							set.autoplay && timeout(set.delay);

						}

				}
				set.bebug && console.log('/// debug play ///');
				set.bebug && console.log('');
			}

			if (set.effect == 'slide') {
				elLi = elUl.find(set.listItem);
				elLi.length > 1 && elUl.css({'left':0});
				elLi.removeClass('active');
				preload($(elUl.find('[data-src]')[0]).parents('li'));
			}

			set.autoplay &&  timeout(set.timePreload);

			_this.mouseover(function(){
				clearTimeout(timer);
			});
			_this.mouseleave(function(){
				set.autoplay && timeout(1000);
			});

			button.click(function(){
				sliderRun(this,set.effect);
				return false;
			})

		});

		return this;

	}


})( jQuery );