$(window).load(function(){
	$('body').removeClass('page-is-changing');
});

var md = new MobileDetect(window.navigator.userAgent);
function dTablet() {	
	if(md.tablet() && $("html").hasClass("portrait")) {
		deleteCookie("tablet")
		setCookie("tablet", "P", {
			expires: 0,
			path: "/",
			// domain: ".flex.by"
		})
		$("html").addClass("tablet");
	} else {
		deleteCookie("tablet")
		setCookie("tablet", "L", {
			expires: 0,
			path: "/",
			// domain: ".flex.by"
		})
		$("html").removeClass("tablet");
	}
} dTablet();

$(window).on("resize", function(){
	setTimeout(function(){
		dTablet()
	},100)
	
});

function setCookie(name, value, options) {
  options = options || {};

  var expires = options.expires;

  if (typeof expires == "number" && expires) {
    var d = new Date();
    d.setTime(d.getTime() + expires * 1000);
    expires = options.expires = d;
  }
  if (expires && expires.toUTCString) {
    options.expires = expires.toUTCString();
  }

  value = encodeURIComponent(value);

  var updatedCookie = name + "=" + value;

  for (var propName in options) {
    updatedCookie += "; " + propName;
    var propValue = options[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }

  document.cookie = updatedCookie;
};

function deleteCookie(name) {
  setCookie(name, "", {
    expires: -1
  })
}

function Menu(){
	var trigger = $('.navigation__trigger'),
		area = $('.navigation-area'),
		content = $('.navigation-content'),
		view = $('.viewport'),
		body = $('body'),
		tl = new TimelineLite(), posY;
	// tl
	// 		.set(area, {autoAlpha: 0, visibility: 'hidden'})
	// 		.set(content, {width: '0%'})
	trigger.on('click', function(){
		var _ = $(this);
		if(!_.hasClass('open')) {

			view.addClass('return');
			mainScrollInit.destroy();
			tl
				.set(_, {className: '+=open'})
				.set(area,{className: "+=visible"})
				// .to(area, 0.2, {autoAlpha: 1, ease:Power3.easeInOut})
				// .to(content, 0.2, {width: '88%', ease:Power3.easeInOut}, 0)
		} else {
			view.removeClass('return');
			posY = $(".scroll").offset().top;
			mainScrollInit.init();
			mainScrollInit.scrollToElement(posY);
			tl
				.set(_, {className: '-=open'})
				.set(area,{className: "-=visible"})
				// .to(content, 0.2, {width: '0%', ease:Power3.easeInOut}, 0)
				// .to(area, 0.2, {autoAlpha: 0, delay: 0.1, ease:Power3.easeInOut})
		}

			
	});
	area.on('click', function(){
		tl
			.set(trigger, {className: '-=open'})
			.set(area,{className: "-=visible"})
			// .to(content, 0.2, {width: '0', ease:Power3.easeInOut}, 0)
			// .to(area, 0.2, {autoAlpha: 0, delay: 0.1, ease:Power3.easeInOut})
		view.removeClass('return');
		mainScrollInit.init();
		mainScrollInit.scrollToElement(posY);
		mainScrollInit.update();
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

		numbers.children().eq(index).addClass('visible').siblings().removeClass('visible');
		_.addClass('active').siblings().removeClass('active');

		view.removeClass('return');
		body.css('overflow', 'hidden');

		tl
			.set(trigger, {className: '-=open'})
			.set(area,{className: "-=visible"})

			// .to(content, 0.2, {width: '0', ease:Power3.easeInOut})
			// .to(area, 0.2, {autoAlpha: 0, ease:Power3.easeInOut})
		mainScrollInit.init();
		mainScrollInit.update();
			
		event.preventDefault();

	});
};
var rotator;
function rotators() {
	var gRotator = $('.rotator'),
		rVideo = gRotator.find('.rotator_video .swiper-container'),
		rText = gRotator.find('.rotator-video_text .swiper-container'),
		rImage = gRotator.find('.gallery-image .swiper-container'),
		rNews = gRotator.find(".rotator-news_single .swiper-container"),
		rCareer = gRotator.find(".rotator-news_single .swiper-container");


	var videoSettings = {
		// autoplay: 3000,
		speed: 1200,
		loop: true,
		noSwiping: false,
		runCallbacksOnInit: false,
		effect: 'fade',
	};
	var textSettings = {
		loop: true,
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

	var imagesSettingsNews = {
		pagination: '.rotator .pagination',
		paginationClickable: true,
		speed: 1200,
		loop: false,
		noSwiping: false,
		runCallbacksOnInit: false,
		parallax: false,
		onInit: function(swiper) {
			createShadow();
		},
		onSlideChangeStart: function(swiper, event){
			bulletsShadow();
		}
	};

	if(typeof $('.rotator_video') == 'object' && $('.rotator_video').length > 0) {
		if(typeof swiperVideo == 'object') {
			swiperVideo.destroy();
			swiperText.destroy();
		}
		setTimeout(function(){
			swiperVideo = new Swiper(rVideo, videoSettings);
			swiperText = new Swiper(rText, textSettings);

			// swiperVideo.params.control = swiperText;
			swiperText.params.control = swiperVideo;

		},10)
		$(window).on('resize', function(){
			swiperVideo.onResize();
			createShadow();
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
			createShadow();
		});
	}

	if(typeof $('.rotator-news_single') == 'object' && $('.rotator-news_single').length > 0) {
		if(typeof swiperVideo == 'object') {
			swiperVideo.destroy();
		}
		setTimeout(function(){
			swiperVideo = new Swiper(rNews, imagesSettingsNews);
		},10)
		$(window).on('resize', function(){
			swiperVideo.onResize();
			createShadow();
		});
	};

	function bulletsShadow() {
			if($('.swiper-pagination-bullet-active').length) {
				var left = $('.swiper-pagination-bullet-active').position().left;
				$('.pagination').find('.shadow').css('left', left + 6);
			}
		};

	var time;
		$(window).on("resize", function(){
			clearTimeout(time);
			time = setTimeout(function(){
				createShadow()
				bulletsShadow()
			}, 10);
			
		});

	function createShadow() {
		if($('.rotator .swiper-pagination-bullet').length === 1) {
			$('.rotator .pagination').css('display', 'none');
		}	
		$('.pagination').append('<div class="shadow"></div>')
	};
}

function mainRotators() {
	// Create a new instance of kontext
		var cont = document.querySelector( '.kontext' ),
			bullet = document.querySelector( '.bullets' );
			var k = new kontext( cont , bullet);
			k.init();
}

function slickRotator() {
	var slickRotator = $('.rotator'),
		rImage = slickRotator.find('.rotator_video .slick-wrapper'),
		rText = slickRotator.find('.rotator-video_text .slick-wrapper');

	var imageSet = {
		fade: true,
		arrows: false,
		asNavFor: rText,
		autoplay: true,
		speed: 1200,
		autoplaySpeed: 3000
	}

	var textSet = {
		arrows: false,
		asNavFor: rImage,
		speed: 1200,
		autoplaySpeed: 3000
	}

	rImage.on("init", function(){
		autoHeight();
	})

	rImage.slick(imageSet);
	rText.slick(textSet);

	function autoHeight() {
		$(".rotator-video_item").height($("#container-load").height());
	}
	window.onresize = function() {
		autoHeight();
	}

}

function accordion() {
	var accordion = $('.accordion').find('.head');

	accordion.each(function(){
		var _ = $(this),
			parent = _.parent(),
			container = parent.find('.containers');

		_.on('click', function(){
			if($(this).hasClass('open')) {
				container.slideUp(300);
				$(this).removeClass('open');
			} else {
				container.slideDown(300);
				$(this).addClass('open');
				$(this).parents('.news-item').siblings().find('.container').slideUp(300);
				$(this).parents('.news-item').siblings().find('.head').removeClass('open');

			}
		})
	});
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
	map.setOptions({ 'draggable': false });
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
					slidesToShow: 3
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
		contentEl: 'out',
		ptrEl: 'pan-loader', 
		distanceToRefresh: 120,
		loadingFunction: false,
		resistance: 2.5
	};

	var options = {};

	var self = this;

	var pan = {
		enabled: false,
		distance: 0,
		startingPositionY: 0,
		isFunction: false,
		idLoading: false
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

		if(pan.startingPositionY === Math.round(options.contentEl.getBoundingClientRect().bottom)) {
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

		
		pan.distance = e.distance / options.resistance;
		
		self._setPanContent();
		self._setBodyClass();
		
		if(!pan.isFunction) {
			mainScrollInit.destroy();
			pan.isFunction = true;
		}
	};

	this._setPanContent = function(){
		document.getElementById('viewport').style.webkitTransform = 'translate3d( 0, -' + pan.distance + 'px, 0 )';
		document.getElementById('pan-loader').style.webkitTransform = 'translate3d( 0, -' + pan.distance + 'px, 0 )';
		$(".outer").attr("stroke-dashoffset", 50 - (pan.distance/2.4));
	};

	this._panEnd = function(e) {
		if(!pan.enabled) {
			return;
		}

		if(pan.isFunction) {
			mainScrollInit.init();
			pan.isFunction = false;
		}

		e.preventDefault();

		document.getElementById('viewport').style.webkitTransform = '';
		document.getElementById('pan-loader').style.webkitTransform = '';

		pan.isLoading = false;
		pan.distance = 0;
		pan.enabled = false;

	};

	this._setBodyClass = function() {
		if ( pan.distance > options.distanceToRefresh ) {
			bodyClass.add( 'ptr-refresh' );
			
			if(!pan.isLoading){
				self._doLoading();
				pan.isLoading = true;
			}

			document.getElementById('viewport').style.webkitTransform = '';
			document.getElementById('pan-loader').style.webkitTransform = '';
		}
		
	};

	this._doLoading = function(){
		bodyClass.add('loading');
		setTimeout(function(){
			loadProject($("#link-page"))
		}, 1500);			
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

var mainScroll = ".viewport",
		scrollPopup = ".navigation-area",
		scrollModal = ".popup__wrapper";
window.onload =  function(){
	mainScrollInit = new customScroll(mainScroll);
	scrollPopupInit = new customScroll(scrollPopup);
	// scrollModalInit = new customScroll(scrollModal);

	document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
	var pull = new PullMobile;
	pull.init();
}

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
					$.ajax({
						url:'',
						type:'post',
						dataType:'html',
						data:$form.serialize()
					})

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

function customScroll(el) {
	this.el = el;
	this.init();
}
customScroll.prototype.init = function() {
	var self = this;
	this.scroll = new IScroll(self.el, {
		bounce: false,
		click: true,
		mouseWheel: true,
		probeType: 2,
		scrollbars: true,
		fadeScrollbars: true,
		HWCompositing: true
	});
	var objChild = $(this.el).children();

	if(objChild.eq(0).offset().top < 0) {
		self.scroll.scrollTo(0, -Math.round(objChild.eq(0).innerHeight()) + $(self.el).height());
	}	
}

customScroll.prototype.destroy = function(){
	this.scroll.destroy();
}

customScroll.prototype.update = function() {
	this.scroll.refresh();	
}

customScroll.prototype.scrollUp = function(){
	this.scroll.scrollTo(0,0);
}

customScroll.prototype.scrollToElement = function (y) {
	this.scroll.scrollTo(0, y)
}

customScroll.prototype.endscroll = function() {
	var self = this;
	this.scroll.on("scrollEnd", function() {
		// if($("#news-template").length) {
		// 	fb.scrollEvents(-this.y, self.el);
		// }
	})
}

function loadProject(link) {
	if(typeof link =="object") {
		var l = $(link).attr("href") || $(link).data("href");
	} else {
		var l = link;
	}
	$.ajax({
		url: l,
		dataType:"html",
		beforeSend: function(){
			loaders(link);
		},
		success: function(b){
			var h = $(b).find('#load-content');
			var cont = h.find('#container-load').children();
			var nav = h.find('#pageloader').children();

			setTimeout(function(){
				$('#container-load').html(cont).promise().done(function(){
					window.history.pushState("page" + l, l, l);
					window.history.replaceState("page" + l, l, l);
					
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
					mainScrollInit.scrollUp();
					mainScrollInit.update();
					_doReset();
					setTimeout(function(){
						$('#pageloader').html(nav);
						$("body").removeClass('page-is-changing animation');
					}, 500);

				});					
			}, 500);
		}
	});
};

function loaders(link) {
	if(typeof link =="object") {
		if($(link).is("[data-ajax]")) {
			var ajaxName = $(link).data("ajax");

			$('body').addClass("animation");

		} else {
			$('body').addClass('page-is-changing')
		}
	} else {
		$('body').addClass('page-is-changing')
	}
};

$(window).bind("popstate", function(e) {

	var newPageArray = location.pathname;

	loadProject(newPageArray)

});

function heightContainer() {
	function mHeigth() {
	 	var cIndex = $('.content-index').parents('.container'),
	 		vp = $(".viewport-section"),
	 		wh = $(window).height();

	 		if(wh <= 414) {
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


function replaceAttr(b) {
	var list = $(b).find('.navigation-list'),
		r = list.find('.active').index(),
		curlist = $('.navigation-list');
		
	curlist.find('.navigation-items').eq(r).addClass('active').siblings().removeClass('active');
	curlist.prev().find('.numb-item').eq(r).addClass('visible').siblings().removeClass('visible');
};

function modal(){
	$(document).on("click", '[data-popup]',  function(e){
		popups($(this).data("popup"));
		e.preventDefault();
	});
} modal();

function popups(data) {
	var popup = $("[data-wrapper-popup=" + data + "]"),
		close = popup.find(".close__popup"),
		popupWrap = popup.find(".popup"),
		popupBody = popup.find(".popup__body"),
		popupSuccess = popup.find(".popup__success"),
		form = popup.find("form"),
		duration = 300, 
		posY;

	mainScrollInit.destroy();

	popup.fadeIn({
		duration: duration,
		complete: function() {
			popupWrap.addClass("visible");
			scrollModalInit.update();
		}
	});

	close.off('click.popup').on("click.popup", function() {
		posY = $(".scroll").offset().top;
		mainScrollInit.init();
		mainScrollInit.scrollToElement(posY);

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
$(document).ready(function () {
	Menu();
	menuNumbers();

	if($('.content-index').length) {
		heightContainer();
	};

	
	$('body').on('click','.ajaxtrigger', function(event){
		loadProject($(this));

		event.preventDefault();
	});

	$('.navigation-items').on('click', function(event){
		var attr = $(this);
		setTimeout(function(){
			loadProject(attr);
		}, 500);
			

		event.preventDefault();
	});
});