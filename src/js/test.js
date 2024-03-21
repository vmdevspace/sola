const displayContainer = document.querySelector('.slider > .container > .center');
const slidesContainer = document.querySelector('.slides');
const slides = document.querySelectorAll('.slides > .slide');
const leftBtn = document.querySelector('.left-btn');
const rightBtn = document.querySelector('.right-btn');

window.addEventListener('resize', sliderInit);
leftBtn.addEventListener('click', moveLeftToRight);
rightBtn.addEventListener('click', moveRightToLeft);

let items = 1;
let offset = 0;

sliderInit();

function slideWidth() {
    for (let i = 0; i < slides.length; i++) {
        slides[i].setAttribute('style', 'width:' + (displayContainer.clientWidth / items) + 'px');
    }
}

function slidesContainerHeight() {
    displayContainer.setAttribute('style', 'height:' + slidesContainer.clientHeight + 'px');
}

function sliderInit() {
    slideWidth();
    slidesContainerHeight();
    slidesContainer.setAttribute('style', 'transform: translateX(0px)');
    offset = 0;
}

function moveLeftToRight() {
    offset += displayContainer.clientWidth;

    if (offset > 0) {
        offset = 0;
    }

    console.log('toRight');
    console.log(offset);

    slidesContainer.setAttribute('style', 'transform: translateX(' + offset + 'px)');
}

function moveRightToLeft() {
    offset -= displayContainer.clientWidth;

    if (Math.abs(offset) > slidesContainer.clientWidth - displayContainer.clientWidth) {
        offset = -(slidesContainer.clientWidth - displayContainer.clientWidth);
    }

    console.log('toLeft');
    console.log(offset);

    slidesContainer.setAttribute('style', 'transform: translateX(' + offset + 'px)');
}

