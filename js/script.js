/////// Prevent closing from click inside dropdown
$(document).on('click', '.dropdown-menu', function (e) {
  e.stopPropagation();
});

// some scripts
function item_qty(this_input){
    if($(this_input).val() == 'other') {
        let new_input = $( "<input type='number' step='0.25' value='1' class='form-control'>");
        $(this_input).parent('.order').prepend(new_input);
        $(this_input).remove();
    };

}

$('#category_all').clone().appendTo('.dropdown-category-fixed');


$("[data-trigger]").on("click", function(e){
    e.preventDefault();
    e.stopPropagation();
    var offcanvas_id =  $(this).attr('data-trigger');
    $(offcanvas_id).toggleClass("show");
    $('body').toggleClass("offcanvas-active");
    $(".screen-overlay").toggleClass("show");
}); 

// Close menu when pressing ESC
$(document).on('keydown', function(event) {
    if(event.keyCode === 27) {
       $(".mobile-offcanvas").removeClass("show");
       $("body").removeClass("overlay-active");
    }
});

$(".btn-close, .screen-overlay").click(function(e){
    $(".screen-overlay").removeClass("show");
    $(".mobile-offcanvas").removeClass("show");
    $("body").removeClass("offcanvas-active");


}); 

// readmore 
$('.btn-readmore').click(function(e){
    e.preventDefault();

    $('.text').toggleClass('text-short');

    if ($('.text').hasClass('text-short')){
      $(this).text('Read more');
    }else{
       $(this).text('Show less');
    }
});

let header_height = $('.header-main').outerHeight();
///////////////// fixed menu on scroll for desktop
$(window).scroll(function(){  
 if ($(this).scrollTop() > 40) {
    $('.header-main').addClass("fixed-top");
    // add padding top to show content behind navbar
    $('body').css('padding-top', header_height + 'px');
  }else{
     $('body').css('padding-top', '0');
    $('.header-main').removeClass("fixed-top");
  }   
});

if ($('.toast').length > 0) { // check if element exists
    $('.toast').toast();
} // end if

if ($('[data-fancybox]').length > 0) { // check if element exists
    $('[data-fancybox]').fancybox();
} // end if



$('.js-check :radio').change(function () {
    var check_attr_name = $(this).attr('name');
    if ($(this).is(':checked')) {
        $('input[name='+ check_attr_name +']').closest('.js-check').removeClass('active');
        $(this).closest('.js-check').addClass('active');
       // item.find('.radio').find('span').text('Add');

    } else {
        item.removeClass('active');
        // item.find('.radio').find('span').text('Unselect');
    }
});


$('.js-check :checkbox').change(function () {
    var check_attr_name = $(this).attr('name');
    if ($(this).is(':checked')) {
        $(this).closest('.js-check').addClass('active');
       // item.find('.radio').find('span').text('Add');
    } else {
        $(this).closest('.js-check').removeClass('active');
        // item.find('.radio').find('span').text('Unselect');
    }
});



//////////////////////// Bootstrap tooltip
if($('[data-toggle="tooltip"]').length>0) {  // check if element exists
	$('[data-toggle="tooltip"]').tooltip()
} // end if


/////// gallery - LIGHTSLIDER
if ($('#detailGallery').length > 0) { // check if element exists
$('#detailGallery').lightSlider({
    gallery:true,
    item:1,
    loop:true,
    thumbItem:6,
    slideMargin:0,
    enableDrag: true,
     
});  
} // end if


/////////////////  items slider. /plugins/owlslider/
if ($('.js-slider-category').length > 0) { // check if element exists
    $('.js-slider-category').owlCarousel({
        loop:true,
        margin:10,
        nav:true,
        dots:false,
        items:9,
        navText: ["<i class='feather icon-chevron-left'></i>", "<i class='feather icon-chevron-right'></i>"],
        responsive:{
            0:{
                items:3,
                dots:true,
                nav:false,
            },
            640:{
                items:5
            },
            1024:{
                items:9
            }
        }
    })
} // end if


 /////////////////  items slider. /plugins/owlslider/
if ($('.js-slider-items').length > 0) { // check if element exists
    $('.js-slider-items').owlCarousel({
        loop:true,
        margin:20,
        nav:true,
        dots:false,
        items:4,
        navText: ["<i class='feather icon-chevron-left'></i>", "<i class='feather icon-chevron-right'></i>"],
        responsive:{
            0:{
                items:1,
                margin:5,
                stagePadding:40,
                dots:true,
                nav:false,
            },
            720:{
                stagePadding:40,
                items:2
            },
            992:{
                items:3
            },
            1200:{
                items:4
            }
        }
    })
} // end if


 /////////////////  items slider. /plugins/owlslider/
if ($('.js-slider-review').length > 0) { // check if element exists
    $('.js-slider-review').owlCarousel({
        loop:true,
        margin:20,
        nav:true,
        dots:false,
        items:3,
        navText: ["<i class='feather icon-chevron-left'></i>", "<i class='feather icon-chevron-right'></i>"],
        responsive:{
            0:{
                items:1,
                dots:true,
                nav:false,
            },
            992:{
                items:2
            },
            1200:{
                items:3
            }
        }
    })
} // end if



