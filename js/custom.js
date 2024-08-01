/* Sticky Menu Filled */

if ($(window).scrollTop() > 10) {
    $('.nav-wraper').addClass('filled');
} else {
    $('.nav-wraper').removeClass('filled');
}
$(window).on('scroll', function () {
    if ($(window).scrollTop() > 10) {
        $('.nav-wraper').addClass('filled');
    } else {
        $('.nav-wraper').removeClass('filled');
    }
});


// dark mode toggle button


  

// initializing wow.js for animations

new WOW().init();


// preloader


// laod more projects button

$(function () {
    $(".recent-work-inner-wrap .col-lg-4.col-md-6").slice(0, 6).show();
    $("body").on('click', '.load-more', function (e) {
        e.preventDefault();
        $(".recent-work-inner-wrap .col-lg-4.col-md-6:hidden").slice(0, 3).slideDown();
        if ($(".recent-work-inner-wrap .col-lg-4.col-md-6:hidden").length == 0) {
            $(".load-more").css('display', 'none');
        }
        // $('html,body').animate({
        //     scrollTop: $(this).offset().top
        // });
    });
});





