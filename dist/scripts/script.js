'use strict';

$(() => {
    const burger = $('.burger');
    const menu = $('.menu');
    const shading = $('.shading');
    const mapButton = $('.places__map-btn');

    burger.on('click', () => {
        burger.toggleClass('burger_active');
        menu.toggleClass('menu__active');
        shading.toggleClass('shading__active');
    });

    mapButton.click(function () {
        mapButton.not(this).removeClass('places__map-btn_active');
        $(this).addClass('places__map-btn_active');
    });

    $('.program__slider').slick({
        dots: false,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear',
    });

    $('.reviews__slider').slick({
        dots: false,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear',
    });

    $('.gallery__slider').slick({
        dots: true,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        autoplay: true,
        autoplaySpeed: 5000,
        appendArrows: $('.gallery__slider-nav'),
        prevArrow: '<button id="prev" type="button" class="slick-arrow-prev"></button>',
        nextArrow: '<button id="next" type="button" class="slick-arrow-next"></button>',
        appendDots: $('.gallery__slider-dots'),
    });


    const currentYear = new Date().getFullYear();
    $('.road-data-year').text(currentYear);

    const peopleButtons = $('.reservation__form-item');

    peopleButtons.on('click', function () {
        peopleButtons.not(this).removeClass('reservation__form-item_active');
        $(this).addClass('reservation__form-item_active');
    });

    const buttonReserv = $('.main__btn');
    const formBlock = $('.reservation');

    buttonReserv.on('click', () => {
        formBlock[0].scrollIntoView({
            behavior: 'smooth',
        });
    });

    const buttonVideo = $('.video__button');
    const video = $('.video__items');
    const buttonVideoHide = $('.circle-hide');

    buttonVideo.click(() => {
        video.css('display', 'block');
        buttonVideoHide.css('display', 'none');
    });

    let name = $('#name');
    let phone = $('#phone');
    const formButton = $('#form-btn');
    const errorText = $('.error-text');



    phone.keydown((e) => {
        let num = parseInt(e.key);
        if (isNaN(num) && e.key !== 'ArrowRight' && e.key !== 'ArrowLeft' && e.key !== 'Delete' && e.key !== 'F5' && e.key !== 'Backspace') {
            e.preventDefault();
        }
    });

    const formMessage = $('.message');
    const form = $('#form');
    const formBorder = $('.form-border');

    let radio = $('.radio');
    let val;
    radio.click(() => {
        val = $('input[name=peoples]:checked').val();
    });

    const peoplesBlock = $('.reservation__form-items');

    formButton.on('click', function () {
        errorText.css('display', 'none')
        let error = false;
        formBorder.removeClass('form-border_error');

        if(!val) {
            peoplesBlock.next().show();
            peopleButtons.addClass('form-border_error');
            error = true;
        }

        if (!name.val()) {
            name.next().show();
            name.addClass('form-border_error');
            error = true;
        }
        if (!phone.val()) {
            phone.next().show();
            phone.addClass('form-border_error');
            error = true;
        }
        if (!error) {
            $.ajax({
                method: "POST",
                url: "https://testologia.ru/checkout",
                data: {name: name.val(), phone: phone.val(), peoples: val}
            })
                .done(function (msg) {
                    if (msg.success) {
                        formMessage.css('display', 'flex');
                        form.trigger("reset");

                    } else {
                        alert('Ошибка. Для отправки формы, в поле "Ваше имя" введите пожалуйста itlogia и код отработает, благодарю! :)');
                    }
                });
        }
    });

    const messageButton = $('.message__btn_main');
    const messageButtonMobile = $('.message__btn_mobile');
    const mainBlock = $('.main');
    const messageCloseButton = $('.message__close');

    messageCloseButton.click(() => {
        formMessage.hide();
    });

    messageButtonMobile.click(() => {
        formMessage.hide();
    });

    messageButton.on('click', () => {
        formMessage.hide();
        mainBlock[0].scrollIntoView({
            behavior: "smooth",
        })
    });

    $('.gallery__slider-image').magnificPopup({
        type: 'image',
        closeOnContentClick: false,
        closeBtnInside: false,
        mainClass: 'mfp-with-zoom mfp-img-mobile',
        allowHTMLInTemplate: true,

        gallery: {
            enabled: true
        },
        zoom: {
            enabled: true,
            duration: 300,
        }

    });

    let wow = new WOW({
        boxClass: 'wow',
        animateClass: 'animate__animated',
    });
    wow.init();

});