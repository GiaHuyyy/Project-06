const checkBox = document.getElementById('menu-check-box');
const home = document.querySelector('.header__logo-mobile');
const mail = document.querySelector('.header__info-mobile');
const nav = document.getElementById('mobile-nav');

home.addEventListener('click', ()  => {
    checkBox.checked = false;
});

mail.addEventListener('click', ()  => {
    checkBox.checked = false;
});

nav.addEventListener('click', ()  => {
    checkBox.checked = false;
});

