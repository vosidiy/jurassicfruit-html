(function() {
    'use strict';
    // Prevent closing from click inside dropdown
    $(document).on('click', '.dropdown-menu', function (e) {
        e.stopPropagation();
    });

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

    $(".close, .screen-overlay").click(function(e){
        $(".screen-overlay").removeClass("show");
        $(".mobile-offcanvas").removeClass("show");
        $("body").removeClass("offcanvas-active");

    });

    $('.btn-readmore').click(function(e){
        e.preventDefault();

        $('.text').toggleClass('text-short');

        if ($('.text').hasClass('text-short')){
            $(this).text('Read more');
        }else{
            $(this).text('Show less');
        }
    });

    var header_height = $('.header-main').outerHeight();
    // fixed menu on scroll for desktop
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

    $('#search #name').on('change keyup', function() {
        $(this).parents('form').find('button[type=reset]').toggle(
            Boolean($(this).val()));
    }).change();
    $('#search').on('reset', function(e) {
        var form = $(this);
        setTimeout(function() {
            form.find('input').change();
        }, 0);
    });

    if ($('.toast').length > 0) {
        $('.toast').toast();
    }

    if ($('[data-fancybox]').length > 0) {
        $('[data-fancybox]').fancybox();
    }



    $('.js-check :radio').change(function () {
        var check_attr_name = $(this).attr('name');
        if ($(this).is(':checked')) {
            $('input[name='+ check_attr_name +']').closest('.js-check').removeClass('active');
            $(this).closest('.js-check').addClass('active');

        } else {
            item.removeClass('active');
        }
    });


    $('.js-check :checkbox').change(function () {
        var check_attr_name = $(this).attr('name');
        if ($(this).is(':checked')) {
            $(this).closest('.js-check').addClass('active');
        } else {
            $(this).closest('.js-check').removeClass('active');
        }
    });


    if ($('#detailGallery').length > 0) {
         var gallerySlider = $('#detailGallery').lightSlider({
            gallery:true,
            item:1,
            loop:true,
            thumbItem:6,
            slideMargin:0,
            enableDrag: true,

        });
        $(window).on('load', function() {
            $('#detailGallery').find('img').each(function() {
                if (!this.complete || this.naturalWidth == 0) {
                    $(this).parent('li').remove();
                    gallerySlider.refresh();
                }
            });
        });
    }


    if ($('.js-slider-category').length > 0) {
        $('.js-slider-category').owlCarousel({
            loop:true,
            margin:10,
            nav:true,
            dots:false,
            items:9,
            navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"],
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
        });
    }


    if ($('.js-slider-items').length > 0) {
        $('.js-slider-items').owlCarousel({
            loop:true,
            margin:20,
            nav:true,
            dots:false,
            items:4,
            navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"],
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
        });
    }


    if ($('.js-slider-review').length > 0) {
        $('.js-slider-review').owlCarousel({
            loop:true,
            margin:20,
            nav:true,
            dots:false,
            items:3,
            navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"],
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
        });
    }


    $(document).on('click', ".toast .close", function(e) {
        var id = $(this).data('target');
        if (id) {
            setCookie(id, 'closed', '/');
        }
    });

    $.ajaxSetup({
        headers: {
            'X-Requested-From': window.location.href,
        }
    });

    $(document).on('submit', 'form', function(e) {
        var form = $(this);
        if (this.checkValidity()) {
            if (form.hasClass('submitting')) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
            form.addClass('submitting');
            return true;
        } else {
            return false;
        }
    });

    function convertDOM(el) {
        el = $(el);
        el.find('[data-quantity]').on('change', function(e) {
            var select = $(this);
            var input = select.siblings('input,.input-group-append');
            if (select.val() == 'other') {
                input.removeClass('d-none');
                select.remove();
            } else {
                input.val(parseFloat(select.val(), 10));
            }
        });
        el.find('form *[data-submit-on-change]').each(function(index, el) {
            el = $(el);
            var content = el;
            if (el.prop('tagName').toLowerCase() == 'button') {
                el.hide();
                content= el.parents('form');
            }
            content.find('input,select').change(function() {
                $(this).parents('form').find(':submit').click();
            });
        });
    }
    $(document).ready(function() {
        convertDOM(document);
    });


    function refreshCart() {
        $('#modal_cart_aside,[href="#modal_cart_aside"]').find('*[data-load]')
            .each(function() {
                $(this).load($(this).data('load'), function() {
                    convertDOM(this);
                });
            });
    }

    function openCart() {
        $('#modal_cart_aside').modal('show');
    }

    var ajaxFunction = {
        'refreshCart': refreshCart,
        'openCart': openCart,
    };

    $(document).on('submit', 'form[data-submit-ajax]', function(e) {
        e.preventDefault();

        var form = $(this);

        var jqxhr = $.ajax({
            'type': form.attr('method') || 'POST',
            'url': form.attr('action'),
            'data': form.serialize(),
        });

        jqxhr.then(function() {
            form.data('submit-ajax').split(',').forEach(function(fn) {
                ajaxFunction[fn]();
            });
        }, function(data) {
            if (~(data.getResponseHeader('content-type') || []).indexOf('text/html')) {
                document.open();
                document.write(data.responseText); // jshint ignore:line
            } else {
                alert(data.statusText);
            }
        }).always(function() {
            form.removeClass('submitting');
        });
    });

    $(document).on('click', '[data-update-cart]', function() {
        var el = $(this);
        var product = el.data('update-cart');
        var quantity = 1;
        var event_id = el.closest('form').find('input[name="event_id"]').val();
        if (el.data('quantity-new')) {
            quantity = el.parents('form')
                .find('[name=' + el.data('quantity-new') + ']').val() || 0;
        }
        quantity -= el.data('quantity-old') || 0;
        product.price = el.data('price') * Math.abs(quantity);
        if (quantity < 0) {
            dataLayer.push({
                'event': 'removeFromCart',
                'ecommerce': {
                    'remove': {
                        'products': [product],
                    },
                },
            });
        } else if (quantity > 0) {
            dataLayer.push({
                'event': 'addToCart',
                'ecommerce': {
                    'add': {
                        'products': [product],
                    },
                },
            });
            if (window.fbq) {
                fbq('track', 'AddToCart', {
                    content_type: 'product',
                    content_ids: [product.id],
                }, {eventID: event_id});
            }
        }
    });

    $(document).ready(function() {
        var observe = function() {};
        if ('IntersectionObserver' in window) {
            var moreObserver = new IntersectionObserver(function(entries, observer) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        $(entry.target).trigger('click');
                    }
                });
            }, {
                rootMargin: '0px 0px 100px 0px',
            });

            observe = function() {
                var more = $('#more');
                if (more.length) {
                    moreObserver.observe(more[0]);
                }
            };
        }
        $(document).on('click', '#more', function() {
            var button = $(this);
            $.get(button.data('url'), function(data) {
                var content = $(data);
                convertDOM(content);
                button.parent().replaceWith(content);
                observe();
            });
        });
        observe();
    });
}());

var async = async || [];
$(document).ready(function() {
    while (async.length) {
        var task = async.shift();
        task();
    }
});
