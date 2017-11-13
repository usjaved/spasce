if ( $('.listing-lower .small-request-outer .owl-carousel').length > 0 ) {
    $('.listing-lower .small-request-outer .owl-carousel').owlCarousel({
        margin:16,
        responsiveClass:true,
        responsive:{
            0:{
                items:1,
                nav:true
            },
            500:{
                items:1,
                nav:false
            },
            650:{
                items:2,
                nav:true,
                loop:false
            },
            1441:{
                items:3,
                nav:true,
                loop:false
            }
        }
    })
}
if ( $('.space-slider-outer .small-request-outer .owl-carousel').length > 0 ) {
    $('.space-slider-outer .small-request-outer .owl-carousel').owlCarousel({
        margin:16,
        responsiveClass:true,
        responsive:{
            0:{
                items:1,
                nav:true
            },
            500:{
                items:1,
                nav:false
            },
            993:{
                items:2,
                nav:true,
                loop:false
            }
        }
    })
}
if ( $('.small-request-outer .owl-carousel').length > 0 ) {
    $('.small-request-outer .owl-carousel').owlCarousel({
        margin:16,
        responsiveClass:true,
        responsive:{
            0:{
                items:1,
                nav:true
            },
            500:{
                items:2,
                nav:false
            },
            993:{
                items:3,
                nav:true,
                loop:false
            }
        }
    })
}
if ( $('.book-slide-fig').length > 0 ) {
    $('.book-slide-fig').flexslider({
        animation: "slide",
        controlNav: false
    });
}
if ( $('.flexslider1').length > 0 ) {
    $('.flexslider1').flexslider({
        animation: "slide",
        controlNav: false
    });
}
$('.filter-section .filter-inner li input[type="text"]').click(function() {
    $('.location-dropdown').addClass('active')
});
$(document).click(function() {
    $('.location-dropdown').removeClass('active')
});
$('.location-dropdown,.filter-section .filter-inner li input[type="text"]').click(function(e) {
    e.stopPropagation();
});

function autoScroll() {
    $('.accordion-nav1 a').on('click',function (e) {
        e.preventDefault();

        var $el1 = $(this),
            id1 = $el1.attr('href');

        $('.accordion-nav1 a').removeClass('active');
        $('.accordion-content1 section').removeClass('active');
        $(this).addClass('active');
        $(id1).addClass('active');
    });
}
function autoScroll2() {
    $('.accordion-nav2 a').on('click',function (e) {
        e.preventDefault();

        var $el2 = $(this),
            id2 = $el2.attr('href');

        $('.accordion-nav2 a').removeClass('active');
        $('.accordion-content2 section').removeClass('active');
        $(this).addClass('active');
        $(id2).addClass('active');
    });
}

autoScroll();
autoScroll2();
$(window).on('load scroll' ,function(){
    autoScroll();
    autoScroll2();
});
$(window).on('load', function(){
if ( $(window).width() < 768 ) {
        $('#header-right .prof-menu > li > a').click(function() {
            $('.prof-inner').slideToggle();
            return false;
        });
        $('.msg-btn').click(function() {
            $('.msg-menu').slideToggle();
            return false;
        });
        $('#header-right .navbar-toggle').click(function() {
            $('.nav-menu').slideToggle();
            $(this).toggleClass('active');
            return false;
        });
    }
})

if ( $('.selection-calendar').length > 0 ) {
    var dateFormat = "mm/dd/yy",
      from = $( "#from,#from1" )
        .datepicker({
          defaultDate: "+1w",
          changeMonth: true,
          numberOfMonths: 1
        })
        .on( "change", function() {
          to.datepicker( "option", "minDate", getDate( this ) );
        }),
      to = $( "#to,#to1" ).datepicker({
        defaultDate: "+1w",
        changeMonth: true,
        numberOfMonths: 1
      })
      .on( "change", function() {
        from.datepicker( "option", "maxDate", getDate( this ) );
      });

    function getDate( element ) {
      var date;
      try {
        date = $.datepicker.parseDate( dateFormat, element.value );
      } catch( error ) {
        date = null;
      }

      return date;
    }
}

if ( $('.preview-panel').length > 0 ){
    $('#carousel').flexslider({
        animation: "slide",
        controlNav: false,
        animationLoop: false,
        slideshow: false,
        itemWidth: 153.3,
        itemMargin: 24,
        asNavFor: '#slider'
    });

    $('#slider').flexslider({
        animation: "slide",
        controlNav: false,
        animationLoop: false,
        slideshow: false,
        sync: "#carousel"
    });
}

$('.step-muilty li').click(function() {
    $(this).toggleClass('active');
});
if ( $('.range-slider').length > 0 ){
    $('.range-slider').jRange({
        from: 0,
        to: 200,
        step: 1,
        format: '%s',
        width: 100 + "%",
        showLabels: true,
        isRange : true
    });
}
if ( $('.range-slider2').length > 0 ){
    $('.range-slider2').jRange({
        from: 0,
        to: 2500,
        step: 1,
        format: '$%s',
        width: 100 + "%",
        showLabels: true,
        isRange : true
    });
}

function sideBarHeight() {
    var eHeight = $('.step-sidebar-inner').outerHeight();
    $('#step-wrap').css({
        'min-height' : eHeight
    })
}
function sideBarHeight2() {
    var eHeight = $('.listing-sidebar-inner').outerHeight();
    $('#step-wrap').css({
        'min-height' : eHeight
    })
}
$(window).on('load resize', function(){
    if ( $(window).width() > 767 ) {
        sideBarHeight();
        sideBarHeight2();
    }else{
        $('#step-wrap').css({
            'min-height' : 'auto'
        })
    }
});