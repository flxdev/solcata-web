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
			tl
				.set(_, {className: '+=open'})
				.to(area, 0.2, {autoAlpha: 1, ease:Power0.easeNone})
				.to(content, 0.2, {width: '88%', ease:Power0.easeNone}, 0)
		} else {
			tl
				.set(_, {className: '-=open'})
				.to(content, 0.2, {width: '0', ease:Power0.easeNone}, 0)
				.to(area, 0.2, {autoAlpha: 0, delay: 0.1, ease:Power0.easeNone})
		}

			
	});
	area.on('click', function(){
		tl
			.set(trigger, {className: '-=open'})
			.to(content, 0.2, {width: '0', ease:Power0.easeNone}, 0)
			.to(area, 0.2, {autoAlpha: 0, delay: 0.1, ease:Power0.easeNone})
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
		numbers.append('<div class="numb-item">0' + (i + 1) + '</div>')
	}

	var activeIndex = list.find('.active').index();
	if (activeIndex === -1) {
		activeIndex = 0;
	}
	numbers.children().eq(activeIndex).addClass('visible');

	tl
		.set(container, {autoAlpha: 1});

	numbersItem.on('click', function(event){
		var _ = $(this),
			index = _.index();

		console.log(index)


		numbers.children().eq(index).addClass('visible').siblings().removeClass('visible');
		_.addClass('active').siblings().removeClass('active');

		view.removeClass('return');
		body.css('overflow', 'hidden');

		tl
			.set(trigger, {className: '-=open'})

			.to(content, 0.2, {width: '0', ease:Power3.easeInOut})
			.to(area, 0.2, {autoAlpha: 0, ease:Power3.easeInOut})
			
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
		// autoplay: 7000,
		speed: 1200,
		loop: true,
		noSwiping: false,
		runCallbacksOnInit: false,
		effect: 'fade',
		longSwipesMs: 10,
		longSwipesRatio: 0.1,
		onInit: function(swiper) {

			// setTimeout(function(){
			// 	$("video").each(function(){
			// 		$(this).get(0).play();
			// 	});
			// 	$('video').trigger('play');
			// },5000);
		},
		onSlideChangeStart: function(swiper) {
			// var nextVideo = rVideo.find('.swiper-slide-active').find('video')[0];	
			// nextVideo.play();			
		}
	};
	var textSettings = {
		speed: 1200,
		loop: true,
		parallax: true,
		longSwipesMs: 10,
		longSwipesRatio: 0.1,
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


function initMap() {
	$(window).bind(initialize());
};

function ZoomControl(controlDiv, map) {
	controlDiv.style.padding = "15px";

	var controlWrapper = document.createElement('div');
		controlWrapper.style.cursor = 'pointer';
		controlWrapper.style.textAlign = 'center';
		controlWrapper.style.width = '25px'; 
		controlWrapper.style.height = '50px';
		controlDiv.appendChild(controlWrapper);

	var zoomInButton = document.createElement('div');
		zoomInButton.classList.add("zoomIn");
		zoomInButton.style.width = '25px'; 
		zoomInButton.style.height = '25px';
		controlWrapper.appendChild(zoomInButton);

	var zoomOutButton = document.createElement('div');
		zoomOutButton.classList.add("zoomOut");
		zoomOutButton.style.width = '25px'; 
		zoomOutButton.style.height = '25px';
		controlWrapper.appendChild(zoomOutButton);

	google.maps.event.addDomListener(zoomInButton, 'click', function() {
		map.setZoom(map.getZoom() + 1);
	});

	google.maps.event.addDomListener(zoomOutButton, 'click', function() {
		map.setZoom(map.getZoom() - 1);
	});
}

function initialize(){
	var stylez = [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"lightness":"13"},{"color":"#30070c"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ec1235"},{"lightness":"-44"}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#d66776"},{"lightness":"-33"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#aa3838"},{"lightness":"-41"},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#a71623"},{"lightness":"-26"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#821620"},{"lightness":"-23"}]},{"featureType":"poi.sports_complex","elementType":"all","stylers":[{"color":"#821620"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ca1a30"},{"lightness":"-34"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#570f11"},{"lightness":"-27"},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#a01628"},{"lightness":"-41"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#800516"},{"lightness":"-22"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#711214"},{"lightness":"-29"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#590c15"},{"lightness":"0"}]}];
	var mapOptions = {
		zoom: 14,
		disableDefaultUI: true,
		scrollwheel: false,
		panControl: false,
		zoomControl: false,
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

	google.maps.event.addDomListener(window, "resize", function() {
		var center = map.getCenter();
		google.maps.event.trigger(map, "resize");
		map.setCenter(center); 
	});

	var zoomControlDiv = document.createElement('div');
  	var zoomControl = new ZoomControl(zoomControlDiv, map);

  	zoomControlDiv.index = 1;
	map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(zoomControlDiv);

};

function gMaps(){
	var sct_tag = document.createElement("script");
	if(typeof(google) != 'object') {
		sct_tag.setAttribute("type", "text/javascript");
		sct_tag.setAttribute("src", "https://maps.googleapis.com/maps/api/js?key=AIzaSyCcDrkEbKdrAWUT7ZorYyn-NwTj9YD6DN4&callback=initMap");
		$(".maps").parent().append(sct_tag);
	}
	else {
		$(initialize);
	}
};

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
		loadingFunction: false,
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
			loadingFunction: params.loadingFunction || defaults.loadingFunction,
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
		h.on('panend', this._panEnd);
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
		document.getElementById('container-load').style.webkitTransform = 'translate3d( 0, -' + pan.distance + 'px, 0 )';
		document.getElementById('pageloader').style.webkitTransform = 'translate3d( 0, -' + pan.distance + 'px, 0 )';
	};

	this._panEnd = function(e) {
		if(! pan.enabled) {
			return;
		}

		e.preventDefault();

		document.getElementById('container-load').style.webkitTransform = '';
		document.getElementById('pageloader').style.webkitTransform = '';

		if(document.body.classList.contains("ptr-refresh")) {
			self._doLoading();
		}

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

	this._doLoading = function(){
		bodyClass.add('loading');
		setTimeout(function(){
			$(options.contentEl).find("#link-page").trigger("click");
		}, 500);			
	};
};

var _doReset = function() {
	var bodyClass = document.body.classList;
		bodyClass.remove('loading');
		bodyClass.remove('ptr-refresh');
		bodyClass.add('ptr-reset');

		var bodyClassRemove = function() {
			bodyClass.remove('ptr-reset');
			document.body.removeEventListener( 'transitionend', bodyClassRemove, false );
		};

		document.body.addEventListener( 'transitionend', bodyClassRemove, false );
	};

window.onload = function(){
	// var pull = new PullMobile;
	// pull.init();
};

function validator() {
		var form_validate = $('.js-validate');
	if (form_validate.length) {
		form_validate.each(function () {
			var form_this = $(this);
			$.validate({
				form : form_this,
				borderColorOnError : true,
				scrollToTopOnError : false,
				onValid: function($form){

				},
				onSuccess: function($form){
					$(".popup__body").addClass("hide");
					setTimeout(function(){
						$(".popup__success").addClass("show");
					},400);
					return false;
				}
			});
		});
	};
};

$(document).ready(function () {
	Menu();
	menuNumbers();

	$("body").on("click", '[data-popup]',  function(e){
		popups($(this).data("popup"));
		e.preventDefault();
	});

	function popups(data) {
		var popup = $("[data-wrapper-popup=" + data + "]");
			close = popup.find(".close__popup"),
			popupWrap = popup.find(".popup"),
			popupBody = popup.find(".popup__body"),
			popupSuccess = popup.find(".popup__success"),
			form = popup.find("form"),
			duration = 300;

		popup.fadeIn({
			duration: duration,
			complete: function() {
				popupWrap.addClass("visible");
			}
		});

		close.on("click", function() {
			popup.fadeOut({
				duration: duration,
				complete: function() {
					popupWrap.removeClass("visible");
					popupBody.removeClass("hide");
					popupSuccess.removeClass("show");
					form.trigger("reset");
				}
			})
		})
	};

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
					$('#container-load').html(cont).promise().done(function(){
						window.history.pushState("page" + link, link, link);
						window.history.replaceState("page" + link, link, link);
						
						replaceAttr(b);

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
						$(".scroll").scrollTop(0);
						_doReset();
						setTimeout(function(){
							$('#pageloader').html(nav);
							$("body").removeClass('page-is-changing');
							// $('.viewport-inner').perfectScrollbar('update');
						}, 500);

					});					
				}, 500);
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
		var attr = $(this).attr('href')
		setTimeout(function(){
			loadProject(attr);

			changeLoad('cd-main');
		}, 500);
			

		event.preventDefault();
	});

	function heightContainer() {
		function mHeigth() {
		 	var cIndex = $('.content-index').parents('.container'),
		 		vp = $(".viewport-section"),
		 		wh = $(window).height();

		 		if(wh <= 320) {
		 			cIndex.css('min-height', 480);
		 			vp.css('min-height', 480);
		 		} else {
		 			cIndex.css('min-height', wh);
		 			vp.css('min-height', wh);
		 		}
		 	
		}  mHeigth();
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

	$(window, document, 'body').on("scroll", function(){
		return false;
	})
});