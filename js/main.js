(function ($) {
"use strict";

	// preloader
	$(window).on('load', function () {
		$('#preloader').delay(350).fadeOut('slow');
		$('body').delay(350).css({ 'overflow': 'visible' });
	})

	// side-bar
	$(".bar").on("click", function () {
		$(".btn-menu-main,.offcanvas-overly").addClass("btn-menu-main-right");
		return false;
	});
	$(".crose,.offcanvas-overly").on("click", function () {
		$(".btn-menu-main,.offcanvas-overly").removeClass("btn-menu-main-right");
	});

	// meanmenu
	jQuery('#mobile-menu').meanmenu({
		meanMenuContainer: '.mobile-menu',
		meanScreenWidth: "991"
	});

	//data background
	$("[data-background]").each(function () {
		$(this).css("background-image", "url(" + $(this).attr("data-background") + ") ")
	})

	//counterUp
	$('.counter').counterUp({
		delay: 10,
		time: 1000
	});
	
	// slider active
	function mainSlider() {
		var BasicSlider = $('.slider-active');
		BasicSlider.on('init', function(e, slick) {
			var $firstAnimatingElements = $('.single-slider:first-child').find('[data-animation]');
			doAnimations($firstAnimatingElements);
		});
		BasicSlider.on('beforeChange', function(e, slick, currentSlide, nextSlide) {
			var $animatingElements = $('.single-slider[data-slick-index="' + nextSlide + '"]').find('[data-animation]');
			doAnimations($animatingElements);
		});
		BasicSlider.slick({
			autoplay: true,
			autoplaySpeed: 6000,
			dots: false,
			fade: true,
			pauseOnHover: false,
			arrows: true,
			prevArrow: '<button type="button" class="slick-prev"><i class="ti-arrow-left"></i></button>',
			nextArrow: '<button type="button" class="slick-next"><i class="ti-arrow-right"></i></button>',
			responsive: [
				{ breakpoint: 767, settings: { dots: false, arrows: false } }
			]
		});

		function doAnimations(elements) {
			var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
			elements.each(function() {
				var $this = $(this);
				var $animationDelay = $this.data('delay');
				var $animationType = 'animated ' + $this.data('animation');
				$this.css({
					'animation-delay': $animationDelay,
					'-webkit-animation-delay': $animationDelay
				});
				$this.addClass($animationType).one(animationEndEvents, function() {
					$this.removeClass($animationType);
				});
			});
		}
	}
	mainSlider();

	/* magnificPopup img view */
	$('.popup-image').magnificPopup({
		type: 'image',
		gallery: {
		enabled: true
		}
	});

	/* magnificPopup video view */
	$('.popup-video').magnificPopup({
		type: 'iframe'
	});
	
	// scroll animation 
	AOS.init({
		once: true,
		duration: 800,
		easing: 'ease'
	});

	// testimonial-active
	$('.testimonial-active').slick({
		dots: true,
		arrows: false,
		infinite: true,
		autoplay: true,
		speed: 300,
		slidesToShow: 3,
		slidesToScroll: 1,
		responsive: [
		{
			breakpoint: 1024,
			settings: {
			slidesToShow: 2,
			slidesToScroll: 1,
			infinite: true,
			dots: true
			}
		},
		{
			breakpoint: 600,
			settings: {
			slidesToShow: 2,
			slidesToScroll: 1
			}
		},
		{
			breakpoint: 480,
			settings: {
			slidesToShow: 1,
			slidesToScroll: 1
			}
		}
		]
	});

	// blog - active
	$('.post-slide').slick({
		dots: false,
		arrows: true,
		infinite: true,
		speed: 300,
		prevArrow: '<button type="button" class="slick-prev"><i class="ti-arrow-left"></i></button>',
		nextArrow: '<button type="button" class="slick-next"><i class="ti-arrow-right"></i></button>',
		slidesToShow: 1,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					infinite: true,
				}
			},
			{
				breakpoint: 991,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});

	//Campaign Single
	$(function () {
		$('.donate-amount ul.amount li').on('click', function () {
		var active = $('.donate-amount ul.amount li.active');
		active.removeClass('active');
		$(this).addClass('active');
		});
	});

	//Header Bar
	$('.header-bar').on('click', function () {
		$(this).toggleClass('active');
		$('.overlay').toggleClass('active');
		$('.menu').toggleClass('active');
		})
		$('.search-box').on('click', function () {
		$('.header-form').addClass('active');
		})
		$('.header-form .bg-lay').on('click', function () {
		$('.header-form').removeClass('active');
		})
		  
	// scrollToTop
	$.scrollUp({
		scrollName: 'scrollUp', // Element ID
		topDistance: '300', // Distance from top before showing element (px)
		topSpeed: 300, // Speed back to top (ms)
		animation: 'none', // Fade, slide, none
		animationInSpeed: 200, // Animation in speed (ms)
		animationOutSpeed: 200, // Animation out speed (ms)
		scrollText: '<i class="ti-arrow-up"></i>', // Text for element
		activeOverlay: false, // Set CSS color to display scrollUp active point, e.g '#00FFFF'
	});

})(jQuery);