$(window).load(function(){
	$('body').removeClass('page-is-changing');
});

function Menu(){
	var trigger = $('.navigation__trigger'),
		area = $('.navigation-area'),
		content = $('.navigation-content'),
		view = $('.viewport'),
		body = $('body'),
		tl = new TimelineLite();
	tl
			.set(area, {autoAlpha: 0, visibility: 'hidden'})
			.set(content, {width: '0'})
	trigger.on('click', function(){
		var _ = $(this);
		view.addClass('return');
		if(!_.hasClass('open')) {
			body.css('overflow', 'hidden');
			tl
				.set(_, {className: '+=open'})
				.to(area, 0.3, {autoAlpha: 1, ease:Power3.easeInOut})
				.to(content, 0.3, {width: '88%', ease:Power3.easeInOut}, 0)
		} else {
			body.css('overflow', 'visible');
			tl
				.set(_, {className: '-=open'})
				.to(content, 0.3, {width: '0', ease:Power3.easeInOut}, 0)
				.to(area, 0.3, {autoAlpha: 0, delay: 0.2, ease:Power3.easeInOut})
		}

			
	});
	area.on('click', function(){
		tl
			.set(trigger, {className: '-=open'})
			.to(content, 0.3, {width: '0', ease:Power3.easeInOut}, 0)
			.to(area, 0.3, {autoAlpha: 0, delay: 0.2, ease:Power3.easeInOut})
		view.removeClass('return');
	});
	content.on('click', function(event){
		event.stopPropagation();
	})
};	

function menuNumbers(){
	var container = $('.navigation-layer'),
		numbers = $('.navigation-numbers'),
		list = $('.navigation-list'),
		numbersItem = $('.navigation-items'),
		numbersItemLength = +numbersItem.length,
		active = container.find('.active'),
		index = active.data('number'),
		trigger = $('.navigation__trigger'),
		area = container.parents('.navigation-area'),
		content = container.parents('.navigation-content'),
		view = $('.viewport'),
		body = $('body'),
		tl = new TimelineLite();

	for(var i = 0; i <= numbersItemLength - 1; i++) {
		numbers.append('<div class="numb-item">0' + (i +1) + '</div>')
	}

	var activeIndex = list.find('.active').index();
	if (activeIndex === -1) {
		activeIndex = 0;
	}
	numbers.children().eq(activeIndex).addClass('visible');

	tl
		.set(container, {autoAlpha: 1});

	numbersItem.on('click', function(event){
		var _ = $(this);

		_.addClass('active').siblings().removeClass('active');

		view.removeClass('return');
		body.css('overflow', 'visible');

		tl
			.set(trigger, {className: '-=open'})

			.to(content, 0.5, {width: '0', ease:Power3.easeInOut})
			.to(area, 0.5, {autoAlpha: 0, ease:Power3.easeInOut})
			
		event.preventDefault();

	});
};
var rotator;
function rotators() {
	var gRotator = $('.rotator'),
		rVideo = gRotator.find('.rotator_video .swiper-container'),
		rText = gRotator.find('.rotator-video_text .swiper-container'),
		rImage = gRotator.find('.gallery-image .swiper-container');

	var videoSettings = {
		autoplay: 7000,
		speed: 1200,
		loop: true,
		noSwiping: false,
		runCallbacksOnInit: false,
		effect: 'fade',
		onInit: function(swiper) {
			var initVideo = rVideo.find('.swiper-slide-active').find('video')[0];
			setTimeout(function(){
					initVideo.play();
			},10);				
		},
		onSlideChangeStart: function(swiper) {
			var nextVideo = rVideo.find('.swiper-slide-active').find('video')[0];	
			nextVideo.play();			
		},
		// onSlideChangeEnd: function(swiper){
		// 	// if( rVideo.find('.swiper-slide-prev').length) {
		// 	// 	var prevVideo = rVideo.find('.swiper-slide-prev').find('video')[0];
		// 	// 	prevVideo.pause();
		// 	// };
		// 	// if($('.swiper-slide-next').length) {
		// 	// 	var nextVideo = rVideo.find('.swiper-slide-next').find('video')[0];
		// 	// 	nextVideo.pause();
		// 	// };	
		// }
	};
	var textSettings = {
		speed: 1200,
		loop: true,
		effect: 'coverflow',
		// flip: {
		// 	slideShadows: false
		// }
	}

	var imageSettings = {
		speed: 1200,
		loop: true,
		pagination: '.gallery-image .pagination',
		onInit: function(swiper) {
			createShadow();
		},
		onSlideChangeStart: function(swiper, event){
			bulletsShadow();
		}
	}

	if(typeof $('.rotator_video') == 'object' && $('.rotator_video').length > 0) {
		if(typeof swiperVideo == 'object') {
			swiperVideo.destroy();
			swiperText.destroy();
		}
		setTimeout(function(){
			swiperVideo = new Swiper(rVideo, videoSettings);
			swiperText = new Swiper(rText, textSettings);

			swiperVideo.params.control = swiperText;
			swiperText.params.control = swiperVideo;

		},10)
		$(window).on('resize', function(){
			swiperVideo.onResize();
		});
	}
	if(typeof $('.gallery-image') == 'object' && $('.gallery-image').length > 0) {
		if(typeof swiperVideo == 'object') {
			swiperVideo.destroy();
		}
		setTimeout(function(){
			swiperVideo = new Swiper(rImage, imageSettings);
		},10)
		$(window).on('resize', function(){
			swiperVideo.onResize();
		});
	}

	function bulletsShadow() {
			if($('.swiper-pagination-bullet-active').length) {
				var left = $('.swiper-pagination-bullet-active').position().left;
				$('.pagination').find('.shadow').css('left', left + 6);
			}
		};

		function createShadow() {
			if($('.rotator .swiper-pagination-bullet').length === 1) {
				$('.rotator .pagination').css('display', 'none');
			}	
			$('.pagination').append('<div class="shadow"></div>')
		};
}


// var map;
// function initialize() {
// 	var stylez = [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#dde6e8"},{"visibility":"on"}]}];
// 	var mapOptions = {
// 		zoom: 14,
// 		disableDefaultUI: true,
// 		scrollwheel: false,
// 		panControl: false,
// 		zoomControl: true,
// 		zoomControlOptions: {
// 			style: google.maps.ZoomControlStyle.SMALL,
// 			position: google.maps.ControlPosition.RIGHT_CENTER
// 		},
// 		scaleControl: true,
// 		center: new google.maps.LatLng(55.872686, 37.43495)
// 	};

// 	map = new google.maps.Map(document.getElementById('maps'), mapOptions);
// 	var mapType = new google.maps.StyledMapType(stylez, { name:"Grayscale" });
// 	map.mapTypes.set('tehgrayz', mapType);
// 	map.setMapTypeId('tehgrayz');
// 	var image = '../img/icons/baloon.png';
// 	var myLatLng = new google.maps.LatLng(55.872686, 37.43495);
// 	var beachMarker = new google.maps.Marker({
// 		position: myLatLng,
// 		map: map,
// 		icon: image,
// 		title:""
// 	});
// }
// google.maps.event.addDomListener(window, 'load', initialize);


// google.maps.event.addDomListener(window, "resize", function() {
// 	var center = map.getCenter();
// 	google.maps.event.trigger(map, "resize");
// 	map.setCenter(center); 
// });




$(document).ready(function () {
	Menu();
	menuNumbers();
	function loadProject(link) {
		$.ajax({
			url: link,
			dataType:"html",
			beforeSend: function(){
				
			},
			success: function(b){
				var h = $(b).find('#load-content');
				var cont = h.find('#container-load').children();
				var nav = h.find('#pageloader').children();

				setTimeout(function(){
					$('#container-load').html(cont);
					$('#pageloader').html(nav);

					replaceAttr(b);

					window.history.pushState("page" + link, link, link);
					window.history.replaceState("page" + link, link, link);

					Menu();
					menuNumbers();

					if($('.content-index').length) {
						heightContainer();
					} else {
						$('#container-load').removeAttr('style');
					}

					if(h.data('logistics')) {
						$('.viewport').addClass('logistics');
					} else {
						$('.viewport').removeClass('logistics');
					};


					$('body').removeClass();

				}, 2000);
			}
		});
	};

	function changeLoad(loader) {
		$('body').addClass('page-is-changing').addClass(loader);
	}
	
	$(window).bind("popstate", function(e) {

		changeLoad();

		var newPageArray = location.pathname;

		loadProject(newPageArray)


	});

	$('body').on('click','.ajaxtrigger', function(event){
		loadProject($(this).attr('href'));

		changeLoad($(this).data('loader'))

		event.preventDefault();
	});

	$('.navigation-items').on('click', function(event){
		loadProject($(this).attr('href'));

		changeLoad('cd-main')

		event.preventDefault();
	});

	function heightContainer() {
		function mHeigth() {
		 	var cIndex = $('.content-index').parents('.container'),
		 		wh = $(window).height();

		 		if(wh <= 568) {
		 			cIndex.css('min-height', 568);
		 		} else {
		 			cIndex.css('min-height', wh);
		 		}
		 	
		} mHeigth();
		$(window).on('resize', function(){
			mHeigth();
		});
	}
	if($('.content-index').length) {
		heightContainer();
	}
	// function replaceNav(h) {
	// 	if( $(h).hasClass('inner') ) {
	// 		$('.page-navigation').addClass('hidden');
	// 		setTimeout(function(){
	// 			$('.page-navigation').find('.pager__item').addClass('inactive');
	// 		}, 300)
	// 	} else {
	// 		$('.page-navigation').removeClass('hidden');
	// 		if(!$('.page-navigation').find('.pager__item').attr('href') === ''){
	// 			$('.page-navigation').find('.pager__item').removeClass('inactive');
	// 		}
			
	// 	}
	// } replaceNav($('#container'))

	function replaceAttr(b) {
		var list = $(b).find('.navigation-list'),
			r = list.find('.active').index(),
			curlist = $('.navigation-list');
			
		curlist.find('.navigation-items').eq(r).addClass('active').siblings().removeClass('active');
		curlist.prev().find('.numb-item').eq(r).addClass('visible').siblings().removeClass('visible');
	}

	// function naviTrigger(trigger) {
	// 	var _ = this;

	// 	_.init = function(){

	// 		trigger.on('click', function(e){
	// 			var $this = $(this),
	// 				id = $this.attr('id');

	// 			if(id === 'pager-top') {
	// 				_.animTop($('#' + id));
	// 			} else if(id === 'pager-left') {
	// 				_.animLeft($('#' + id));
	// 			} else {
	// 				_.animBottom($('#' + id));
	// 			}

	// 		e.preventDefault();
	// 		});

	// 	};
	// 	_.animTop = function(item){
	// 		var _ = item,
	// 			tl = new TimelineLite();

	// 		tl
	// 			.set(_, {y: 0})
	// 			.to(_, 0.2, {y: '-10px', ease:Circ.easeOut}, 0)
	// 			.to(_, 0.2, {y: 0, delay: 0.2, ease:Circ.easeOut})
	// 	};
	// 	_.animBottom = function(item){
	// 		var _ = item,
	// 			tl = new TimelineLite();

	// 		tl
	// 			.set(_, {y: 0})
	// 			.to(_, 0.2, {y: '10px', ease:Circ.easeOut}, 0)
	// 			.to(_, 0.2, {y: 0, delay: 0.2, ease:Circ.easeOut})
	// 	}
	// 	_.animLeft = function(){
	// 		var _ = item,
	// 			tl = new TimelineLite();

	// 		tl
	// 			.set(_, {y: 0})
	// 			.to(_, 0.2, {x: '-10px', ease:Circ.easeOut}, 0)
	// 			.to(_, 0.2, {x: 0, delay: 0.2, ease:Circ.easeOut})
	// 	}
	// 	_.init();
	// };

	// var trigger = $('.pager__item');
	// trigger = new naviTrigger(trigger);
	
	// $('.cycle').slick({
	// 	autoplay: true,
	// 	slidesToShow: 10,
	// 	slidesToScroll: 1,
	// 	autoplaySpeed: !0,
	// 	arrows: false,
	// 	speed: 3500, 
	// 	infinite: true,
	// 	cssEase: 'linear',
	// 	vertical: true,
	// 	adaptiveHeight: true
	// })


	// // js mobile
	// var PullToRefresh = (function() {
	// 	function Main(container, slidebox, slidebox_icon, handler) {
	// 		var self = this;

	// 		this.breakpoint = -80;

	// 		this.container = container;
	// 		this.slidebox = slidebox;
	// 		this.slidebox_icon = slidebox_icon;
	// 		this.handler = handler;

	// 		this._slidedown_height = 0;
	// 		this._anim = null;
	// 		this._dragged_down = false;

	// 		this.hammertime = Hammer(this.container, { direction: Hammer.DIRECTION_VERTICAL })
	// 			.on("touch dragup dragdown release", function(ev) {
	// 				self.handleHammer(ev);
	// 			});
	// 	}

	// 	Main.prototype.handleHammer = function(ev) {
	// 		var self = this;

	// 		switch(ev.type) {

	// 			case 'touch':
	// 				this.hide();
	// 				break;

	// 			case 'release': 
	// 				if(!this._dragged_down) {
	// 					return;
	// 				}
	// 				cancelAnimationFrame(this._anim);

	// 				if(ev.gesture.deltaY <= this.breakpoint) {

	// 					this.setHeight(0);
	// 					this.handler.call(this);

	// 				} else {

	// 					this.hide();
	// 				}
	// 				break;

	// 			case 'dragup':
	// 				this._dragged_down = true;

	// 				if(!this._anim) {
	// 					this.updateHeight();
	// 				}

	// 				ev.gesture.preventDefault();

	// 				this._slidedown_height = ev.gesture.deltaY * 0.4;
	// 				break;
	// 		}
	// 	};

	// 	Main.prototype.setHeight = function(height){
	// 		if(Modernizr.csstransforms3d) {
	// 			this.container.style.transform = 'translate3d(0,'+height+'px,0)';
	// 			this.container.style.oTransform = 'translate3d(0,'+height+'px,0)';
	// 			this.container.style.msTransform = 'translate3d(0,'+height+'px,0)';
	// 			this.container.style.mozTransform = 'translate3d(0,'+height+'px,0)';
	// 			this.container.style.webkitTransform = 'translate3d(0,'+height+'px,0) scale3d(1,1,1)';
	// 		} else if(Modernizr.csstransforms) {
	// 			this.container.style.transform = 'translate(0,'+height+'px)';
	// 			this.container.style.oTransform = 'translate(0,'+height+'px)';
	// 			this.container.style.msTransform = 'translate(0,'+height+'px)';
	// 			this.container.style.mozTransform = 'translate(0,'+height+'px)';
	// 			this.container.style.webkitTransform = 'translate(0,'+height+'px)';
	// 		} else {
	// 			this.container.style.top = height+"px";
	// 		}
	// 	};

	// 	Main.prototype.hide = function() {
	// 		container_el.className = '';
	// 		this._slidedown_height = 0;
	// 		this.setHeight(0);
	// 		cancelAnimationFrame(this._anim);
	// 		this._anim = null;
	// 		this._dragged_down = false;
	// 	};

	// 	Main.prototype.slideUp = function(){
	// 		var self = this;

	// 		cancelAnimationFrame(this._anim);

	// 		this.setHeight(0);

	// 		setTimeout(function(){
	// 			self.hide();
	// 		}, 500);
	// 	};

	// 	Main.prototype.updateHeight = function(){
	// 		var self = this;

	// 		this.setHeight(this._slidedown_height);

	// 		this._anim = requestAnimationFrame(function(){
	// 			self.updateHeight();
	// 		})
	// 	};

	// 	return Main;
	// })();
	
	// function getEl(id) {
 //        return document.getElementById(id);
 //    }

 //    var container_el = getEl('container');
 //    var pullrefresh_el = getEl('pullrefresh');
 //    var pullrefresh_icon_el = getEl('pullrefresh-icon');
 //    var image_el = getEl('random-image');

 //    var refresh = new PullToRefresh(container_el, pullrefresh_el, pullrefresh_icon_el);

 //    refresh.handler = function() {
 //        var self = this;

 //        var link = $(this.slidebox).find('a').attr('href');


 //        console.log(link);
 //    };
});