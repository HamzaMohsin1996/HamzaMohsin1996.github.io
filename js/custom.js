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

window.addEventListener('load', (event) => {
    //retrieve current state
    $('body').toggleClass(localStorage.toggled);

/* Toggle */
    $('.change-theme-btn').on('click',function(){

        //localstorage values are always strings (no booleans)  

        if (localStorage.toggled != "dark" ) {
            $('body').toggleClass("dark", true );
            localStorage.toggled = "dark";
        } else {
            $('body').toggleClass("dark", false );
            localStorage.toggled = "";
    }

    });
});
  

// initializing wow.js for animations

new WOW().init();


// preloader

var loader;

function loadNow(opacity) {
    if (opacity <= 0) {
        displayContent();
    } else {
        loader.style.opacity = opacity;
        window.setTimeout(function() {
            loadNow(opacity - 0.05);
        }, 30);
    }
}

function displayContent() {
    loader.style.display = 'none';
    document.getElementById('content').style.display = 'block';
}

document.addEventListener("DOMContentLoaded", function() {
    loader = document.getElementById('loader');
    loadNow(1);
});


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

    




