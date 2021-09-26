"use strict"

document.addEventListener('DOMContentLoaded', function () {

    //Бургер
    //Блоку, который мы хотим поместить внутрь бургера, добавляем class="burger"
    const burgerToggleBtn = document.querySelector('.burger-icon-wrapper');
    const burgerIcon = document.querySelector('.burger-icon');
    const burger = document.querySelector('.burger');
    const body = document.querySelector('body');
    burgerToggleBtn.onclick = function () {
        burgerIcon.classList.toggle('burger-icon-active');
        burger.classList.toggle('burger-mobile-active');
        body.classList.toggle('lock');
    };

    //Выпадающее меню
    const user = document.querySelector('.user_logo');
    const menu_user = document.querySelector('.user_list');
    user.addEventListener("click", function(e){
        menu_user.classList.toggle('active');
    });
    document.documentElement.addEventListener("click", function(e){
        if(!e.target.closest('.options_user')) {
            menu_user.classList.remove('active');
        }
    });

    //Слайдер
    new Swiper('.swiper', {
        initialSlide: 1,
        grabCursor: true,
        speed: 600,
        parallax: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }
    });

    new Swiper('.swiper-lots', {
        slidesPerView: 3,
        loop: true,
        speed: 600,
        navigation: {
            nextEl: '.swiper-lots-button-next',
            prevEl: '.swiper-lots-button-prev',
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
            },
            590: {
                slidesPerView: 2,
            },
            860: {
                slidesPerView: 3,
            }
        }
    });

    new Swiper('.swiper-interesting', {
        effect: "flip",
        grabCursor: true,
        loop: true,
        speed: 600,

        navigation: {
            nextEl: ".control-slider-interesting_link",
        },
    });
    
    //Картинку из html-тега <img> делаем фоновой
    //Родительскому блок тега <img> добавляем class="ibg"
    function ibg(){
        const ibg = document.querySelectorAll(".ibg");
        for (let i = 0; i < ibg.length; i++) {
        if (ibg[i].querySelector('img')) {
        ibg[i].style.backgroundImage = 'url('+ibg[i].querySelector('img').getAttribute('src')+')';
        }}}
        ibg();

    //Валидатор форм
    //Тегу <form> добавляем id="form"
    //Обязательным для заполнения полям добавляем class="_req"
    //Полю почты добавляем class="_email"
    //В CSS задаем стили для "._error"
    const form = document.getElementById("form");
    form.addEventListener("submit", formSend);
    async function formSend(e) {
        e.preventDefault();
        let error = formValidate(form);
    }
    function formValidate(form) {
        let error = 0;
        let formReq = document.querySelectorAll("._req")
        for (let i = 0; i < formReq.length; i++) {
            const input = formReq[i];
            formRemoveError(input);
            if (input.classList.contains("_email")) {
                if (emailTest(input)) {
                    formAddError(input);
                    error++;
                }
            } else {
                if (input.value == "") {
                    formAddError(input);
                    error++;
                }
            }
        }
    }
    function formAddError(input) {
        input.parentElement.classList.add("_error");
        // input.classList.add("_error");
    }
    function formRemoveError(input) {
        input.parentElement.classList.remove("_error");
        // input.classList.remove("_error");
    }
    function emailTest(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input.value);
    };
    
    //Плавная прокрутка к якорю по id
    const anchors = document.querySelectorAll('a[href*="#"]')
    for (let anchor of anchors) {
        anchor.addEventListener('click', function (e) {
        e.preventDefault()
        const blockID = anchor.getAttribute('href').substr(1)
        document.getElementById(blockID).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
    };

    //Popup
    //Ссылкам, которые открывают popup, добавляем class="popup-link",
    //а в атрибут href="" добавляем id нужного popup
    //Ссылкам, которые закрывают popup, добавляем class="close-popup"
    //Для фиксированных объектов добавляем class="lock-padding"
    //Внутри body должен быть <div class="wrapper">
    const popupLinks = document.querySelectorAll('.popup-link');
    const lockPadding = document.querySelectorAll('.lock-padding');
    let unlock = true;
    const timeout = 400;//Эта переменная должна быть = transition в CSS
    if (popupLinks.length > 0) {
        for (let index = 0; index < popupLinks.length; index++) {
            const popupLink = popupLinks[index];
            popupLink.addEventListener("click", function (e) {
                const popupName = popupLink.getAttribute('href').replace('#', '');
                const curentPopup = document.getElementById(popupName);
                popupOpen(curentPopup);
                e.preventDefault();
            });
        }
    }
    const popupCloseIcon =  document.querySelectorAll('.close-popup');
    if (popupCloseIcon.length > 0) {
        for (let index = 0; index < popupCloseIcon.length; index++) {
            const el = popupCloseIcon[index];
            el.addEventListener("click", function (e) {
                popupClose(el.closest('.popup'));
                e.preventDefault();
            });
        }
    }
    function popupOpen(curentPopup) {
        if (curentPopup && unlock) {
            const popupActive = document.querySelector('.popup.open');
            if (popupActive) {
                popupClose(popupActive, false);
            } else {
                bodyLock();
            }
            curentPopup.classList.add('open');
            setTimeout(function(doUnlock = true){
                if(curentPopup.classList.contains('popup_oops')) {
                    curentPopup.classList.remove('open');
                    if (doUnlock) {
                        bodyUnLock();
                    }
                }
            }, 1000); //Проверка на class и автоматическое закрытие popup
            curentPopup.addEventListener("click", function (e) {
                if (!e.target.closest('.popup_content')) {
                    popupClose(e.target.closest('.popup'));
                }
            });
        }
    }
    function popupClose (popupActive, doUnlock = true) {
        if (unlock) {
            popupActive.classList.remove('open');
            if (doUnlock) {
                bodyUnLock();
            }
        }
    }
    function bodyLock() {
        const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
        if (lockPadding.length > 0) {
            for (let index = 0; index < lockPadding.length; index++) {
                const el = lockPadding[index];
                el.style.paddingRight = lockPaddingValue;
            }
        }
        body.style.paddingRight = lockPaddingValue;
        body.classList.add('lock');
        unlock = false;
        setTimeout(function () {
            unlock = true;
        },  timeout);
    }
    function bodyUnLock() {
        setTimeout(function() {
            if (lockPadding.length > 0) {
                for (let index = 0; index < lockPadding.length; index++) {
                    const el = lockPadding[index];
                    el.style.paddingRight = '0px';
                }
            }
            body.style.paddingRight = '0px';
            body.classList.remove('lock');
        },  timeout);
        unlock = false;
        setTimeout(function(){
            unlock = true;
        },  timeout);
    }
    document.addEventListener('keydown', function (e) {
        if (e.key === "Escape") {
            const popupActive = document.querySelector('.popup.open');
            popupClose(popupActive);
        }
    });

});
