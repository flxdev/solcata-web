window.kontext = function( _slider, _bullet ) {
	var _this = this;

	_this.f = {};
	_this.c = {};

	_this.c.slider = _slider;
	_this.c.bullets = _bullet;

	_this.action = false;

	_this.conf = {
		current: {
			slide : 0
		},
		touchEvents: {
			X: 0,
			Consumed: false
		},
		classes: {
			next: 'right',
			prev: 'left',
			hide: 'hide',
			active: 'active',
			show: 'show'
		},
		timeout: null,
		autoPlaySpeed: 5000,
		capable:	'WebkitPerspective' in document.body.style ||
					'MozPerspective' in document.body.style ||
					'msPerspective' in document.body.style ||
					'OPerspective' in document.body.style ||
					'perspective' in document.body.style,
		animationEvents: 'mozAnimationEnd MSAnimationEnd oAnimationEnd animationend'
	};

	_this.f.prev = function() {
		var cur_slide = _this.conf.current.slide,
		    next_slide = cur_slide - 1,
		    _next_slide = _this.c.slides[next_slide];

		if(typeof _next_slide == 'undefined') 
			next_slide = _this.c.slides.length - 1;

		_this.f.show(cur_slide, next_slide, 'prev');
	}

	_this.f.next = function() {
		var cur_slide = _this.conf.current.slide,
		    next_slide = cur_slide + 1,
		    _next_slide = _this.c.slides[next_slide];

		if(typeof _next_slide == 'undefined') 
			next_slide = 0;

		_this.f.show(cur_slide, next_slide, 'next');
	}

	_this.f.show = function(cur, next, action) {
		_this.action = true;


		_cur_slide = _this.c.slides[cur];
		_next_slide = _this.c.slides[next];

		_this.c.slides.forEach(function(slide, i) {
			Object.values(_this.conf.classes).map(function(class_name) {
				if(_this.conf.classes[action] != class_name) {
					slide.classList.remove(class_name);
				}
			});
			
			slide.classList.add(_this.conf.classes[action]);
		})

		_next_slide.classList.add(_this.conf.classes.active, _this.conf.classes.show);
		_cur_slide.classList.add(_this.conf.classes.hide);


		_this.conf.current.slide = next;

		_this.f.actionBullets(next);

		_this.f.afterAnimate(_next_slide);
	}

	_this.f.initEvents = function() {
		document.addEventListener( 'keyup', function( event ) {
			if(_this.action) {
				return false;
			}
			if( event.keyCode === 37 ) _this.f.prev();
			if( event.keyCode === 39 ) _this.f.next();
		}, false );

		_this.c.slider.addEventListener( 'touchstart', function( event ) {
			_this.conf.touchEvents.Consumed = false;
			lastX = event.touches[0].clientX;
		}, false );

		_this.c.slider.addEventListener( 'touchmove', function( event ) {
			event.preventDefault();
			if(_this.action) {
				return false;
			}
			if( !_this.conf.touchEvents.Consumed ) {
				if( event.touches[0].clientX > lastX + 50 ) {
					_this.f.prev();
					_this.conf.touchEvents.Consumed = true;
				}
				else if( event.touches[0].clientX < lastX - 50 ) {
					_this.f.next();
					_this.conf.touchEvents.Consumed = true;
				}
			}
		}, false );
	}

	_this.f.afterAnimate = function(element) {
		$(element).one(_this.conf.animationEvents, function() {
			_this.action = false;
		})
	}

	_this.f.getTotal = function() {
		return _this.c.slides.length;
	}

	_this.f.createBullets = function() {
		for(i = 0; i < _this.f.getTotal(); i++) {
			var _bul = document.createElement("li");
			_bul.className = i === 0 ? 'active' : '';
			_bul.setAttribute( 'index', i );
			_bul.onclick = function( event ) {
					var _activeIndex = document.body.querySelectorAll( '.bullets .active' )[0].getAttribute('index'),
					    _targetIndex = parseInt(event.target.getAttribute( 'index' )),
					    _targetDeraction = _activeIndex > _targetIndex ? "prev" : "next";

					_this.f.show( _activeIndex,  _targetIndex, _targetDeraction)
			};
			_this.c.bullets.appendChild( _bul );
		}
		_this.c.bulletsItem = document.body.querySelectorAll( '.bullets li' );
	}

	_this.f.actionBullets = function(index) {
		for( var i = 0; i < _this.c.bulletsItem.length; i++ ) {
			_this.c.bulletsItem[i].className = i === index ? 'active' : '';
		}
		_this.f.actionShadowBullets();
	}

	_this.f.actionShadowBullets = function() {
		_this.c.bulletsShadow.style.left = document.body.querySelectorAll( '.bullets .active' )[0].offsetLeft + "px";

		window.onresize = function() {
			_this.f.actionShadowBullets();
		}
	}

	_this.init = function() {
		/*
		* Check.
		*/
		if( _this.conf.capable ) {
			_this.c.slider.classList.add("animate");

			_this.c.slides = Array.prototype.slice.call( _this.c.slider.querySelectorAll( '.layer' ) );

			_this.c.bulletsShadow = document.querySelector(".bullets-shadow");
			_this.c.bulletsShadowWidth = _this.c.bulletsShadow.offsetWidth;

			_this.c.slider.classList.add( 'capable' );
			_this.c.slides[0].classList.add( 'active',  'show' );

			_this.f.initEvents();
			_this.f.createBullets();

		}
		else {
			return false;
		}
	}





}