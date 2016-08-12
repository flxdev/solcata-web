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
			var initVideo = rVideo.find('.swiper-slide-active video')[0];
			setTimeout(function(){
					initVideo.play();
			},10);			
		},
		onSlideChangeStart: function(swiper) {
			var nextVideo = rVideo.find('.swiper-slide-active').find('video')[0];	
			nextVideo.play();			
		}
	};
	var textSettings = {
		speed: 1200,
		loop: true,
		parallax: true
		// effect: 'coverflow',
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


var map;
function initialize() {
	var stylez = [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#dde6e8"},{"visibility":"on"}]}];
	var mapOptions = {
		zoom: 10,
		disableDefaultUI: true,
		scrollwheel: false,
		panControl: false,
		zoomControl: true,
		zoomControlOptions: {
			style: google.maps.ZoomControlStyle.SMALL,
			position: google.maps.ControlPosition.RIGHT_CENTER
		},
		scaleControl: true,
		center: new google.maps.LatLng(55.872686, 37.43495)
	};

	map = new google.maps.Map(document.getElementById('maps'), mapOptions);
	var mapType = new google.maps.StyledMapType(stylez, { name:"Grayscale" });
	map.mapTypes.set('tehgrayz', mapType);
	map.setMapTypeId('tehgrayz');
	var image = '../img/icons/baloon.png';
	var myLatLng = new google.maps.LatLng(55.872686, 37.43495);
	var beachMarker = new google.maps.Marker({
		position: myLatLng,
		map: map,
		icon: image,
		title:""
	});
}
google.maps.event.addDomListener(window, 'load', initialize);


// if(document.getElementById('maps')){
	google.maps.event.addDomListener(window, "resize", function() {
		var center = map.getCenter();
		google.maps.event.trigger(map, "resize");
		map.setCenter(center); 
	});
// }

function cycleRotator() {
	$('.cycle').slick({
		autoplay: true,
		slidesToShow: 4,
		slidesToScroll: 1,
		autoplaySpeed: !0,
		arrows: false,
		speed: 3500, 
		infinite: true,
		cssEase: 'linear',
		adaptiveHeight: true,
		responsive: [
			{
				breakpoint: 376,
				settings: {
					slidesToShow: 2
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 3
				}
			},
			{
				breakpoint: 569,
				settings: {
					slidesToShow: 3
				}
			}
		]
	});
}

var PullMobile = function(){

	var defaults = {
		contentEl: 'load-content',
		ptrEl: 'pageloader', 
		distanceToRefresh: 70,
		resistance: 2.5
	};

	var options = {};

	var self = this;

	var pan = {
		enabled: false,
		distance: 0,
		startingPositionY: 0
	};

	var bodyClass = document.body.classList;

	this.init = function(params){
		params = params ? params : {};
		options = {
			contentEl: params.contentEl || document.getElementById(defaults.contentEl),
			ptrEl: params.ptrEl || document.getElementById(defaults.ptrEl),
			distanceToRefresh: params.distanceToRefresh || defaults.distanceToRefresh,
			resistance: params.resistance || defaults.resistance
		};

		// if(!options.contentEl || options.ptrEl) {
		// 	return false;
		// }

		var h = new Hammer(options.contentEl);

		h.get( 'pan' ).set( { direction: Hammer.DIRECTION_VERTICAL } );

		h.on('panstart', this._panStart);
		h.on('panup', this._panUp);
		h.on('pandown', this._panDown);
		h.on( 'panend', this._panEnd);
	};

	this._panStart = function() {
		pan.startingPositionY = document.body.offsetHeight;

		if(pan.startingPositionY === options.contentEl.getBoundingClientRect().bottom) {
			pan.enabled = true;
		}
	};

	this._panUp = function(e){

		if(!pan.enabled) {
			return;
		}
		e.preventDefault();
		pan.distance = e.distance / options.resistance;

		self._setPanContent();
		self._setBodyClass();
	};

	this._panDown = function(e){
		if(! pan.enabled || pan.distance === 0) {
			return;
		}

		e.preventDefault();

		if(pan.distance < e.distance / options.resistance) {
			pan.distance = 0;
		} else {
			pan.distance = e.distance / options.resistance;
		}

		self._setPanContent();
		self._setBodyClass();
	};

	this._setPanContent = function(){
		document.getElementById('container-load').style.transform = document.getElementById('container-load').style.webkitTransform = 'translate3d( 0, -' + pan.distance + 'px, 0 )';
		document.getElementById('pageloader').style.transform = document.getElementById('pageloader').style.webkitTransform = 'translate3d( 0, -' + pan.distance + 'px, 0 )';
	};

	this._panEnd = function(e) {
		if(! pan.enabled) {
			return;
		}

		e.preventDefault();

		document.getElementById('container-load').style.transform = document.getElementById('container-load').style.webkitTransform = '';
		document.getElementById('pageloader').style.transform = document.getElementById('pageloader').style.webkitTransform = '';

		pan.distance = 0;
		pan.enabled = false;

	};

	this._setBodyClass = function() {
		if ( pan.distance > options.distanceToRefresh ) {
			bodyClass.add( 'ptr-refresh' );
		} else {
			bodyClass.remove( 'ptr-refresh' );
		}		
	};
};

// window.onload = function(){
// 	var pull = new PullMobile;
// 	pull.init();
// };

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

					$('body').removeClass().scrollTop(0);

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

					if(h.find('.maps')) {
						initialize();
					};
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
	};

	function replaceAttr(b) {
		var list = $(b).find('.navigation-list'),
			r = list.find('.active').index(),
			curlist = $('.navigation-list');
			
		curlist.find('.navigation-items').eq(r).addClass('active').siblings().removeClass('active');
		curlist.prev().find('.numb-item').eq(r).addClass('visible').siblings().removeClass('visible');
	};

	function showLoader() {
		var winH = $(window).height(),
			loader = $('.pageloader'),
			rectB = $('.viewport-section')[0].getBoundingClientRect().bottom;

		if(winH === rectB + loader.height()) {
			loader.addClass('visible');
		} else {
			loader.removeClass('visible');
		}
	} showLoader();

	$(window).on('load scroll', function(){
		showLoader();
	});

});