$(function(){
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  var element = document.getElementById('text');
  if (isMobile) {
    let slideContainer = $('.slide-container');
    slideContainer.slick({
      arrows:false,
      infinite:true,
    });
    $('.clash-card__image img').hide();
    $('.slick-active').find('.clash-card img').fadeIn(200);
  
    slideContainer.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
      $('.slick-active').find('.clash-card img').fadeOut(1000);
    });
    
    slideContainer.on('afterChange', function(event, slick, currentSlide) {
      $('.slick-active').find('.clash-card img').fadeIn(200);
    });
  }
});