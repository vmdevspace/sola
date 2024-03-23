// const displayContainer = document.querySelector('.slider > .container > .center');
// const slidesContainer = document.querySelector('.slides');
// const slides = document.querySelectorAll('.slides > .slide');

// const dotsListContainer = document.querySelector('.slider .dots');
// const leftBtn = document.querySelector('.left-btn');
// const rightBtn = document.querySelector('.right-btn');

// window.addEventListener('resize', sliderInit);
// leftBtn.addEventListener('click', moveLeftToRight);
// rightBtn.addEventListener('click', moveRightToLeft);



// slidesContainer.addEventListener('touchstart', function () {
//     console.log('touchstart');
// });

// slidesContainer.addEventListener('touchend', function () {
//     console.log('touchend');
// });

// slidesContainer.addEventListener('touchmove', function () {
//     console.log('touchmove');
// });

// slidesContainer.addEventListener('mousedown', function () {
//     console.log('mousedown');
// });

// slidesContainer.addEventListener('click', function () {
//     console.log('click');
// });


// let items = 1;
// let offset = 0;
// let position = 0;

// sliderInit();

// function appendDotsNavigation() {
//     let dots = slides.length / items;

//     dotsListContainer.innerHTML = "";

//     for (let i = 0; i < dots; i++) {
//         const li = document.createElement("li");

//         li.setAttribute("class", "dot");
//         li.setAttribute("data-slide", i);
//         li.setAttribute("data-position", (i * displayContainer.clientWidth));
//         li.addEventListener('click', moveToPosition);

//         if (i == 0) {
//             li.classList.add('active');
//         }

//         dotsListContainer.appendChild(li);
//     }
// };

// function sliderInit() {
//     slideWidth();
//     slidesContainerHeight();
//     appendDotsNavigation()

//     slidesContainer.setAttribute('style', 'transform: translateX(0px)');

//     offset = 0;
//     position = 0;
// }

// function slideWidth() {
//     for (let i = 0; i < slides.length; i++) {
//         slides[i].setAttribute('style', 'width:' + (displayContainer.clientWidth / items) + 'px');
//     }
// }

// function slidesContainerHeight() {
//     displayContainer.setAttribute('style', 'height:' + slidesContainer.clientHeight + 'px');
// }

// function moveLeftToRight() {
//     offset += displayContainer.clientWidth;

//     position--;
//     if (position < 0) {
//         position = 0;
//     }

//     if (offset > 0) {
//         offset = 0;
//     }

//     slidesContainer.setAttribute('style', 'transform: translateX(' + offset + 'px)');

//     // dots navigation
//     let dots = document.querySelectorAll(".slider .nav .dots .dot");
//     dots[position].classList.add('active');
//     for (let i = 0; i < dots.length; i++) {
//         if (Number(dots[i].getAttribute('data-slide')) != position) {
//             dots[i].classList.remove('active');
//         }
//     }
// }

// function moveRightToLeft() {
//     offset -= displayContainer.clientWidth;

//     position++;

//     if (position > ((slides.length / items) - 1)) {
//         position = ((slides.length / items) - 1);
//     }

//     if (Math.abs(offset) > slidesContainer.clientWidth - displayContainer.clientWidth) {
//         offset = -(slidesContainer.clientWidth - displayContainer.clientWidth);
//     }

//     slidesContainer.setAttribute('style', 'transform: translateX(' + offset + 'px)');

//     // dots navigation
//     let dots = document.querySelectorAll(".slider .nav .dots .dot");
//     dots[position].classList.add('active');
//     for (let i = 0; i < dots.length; i++) {
//         if (Number(dots[i].getAttribute('data-slide')) != position) {
//             dots[i].classList.remove('active');
//         }
//     }
// }

// function moveToPosition() {
//     let offset = Number(this.getAttribute("data-position"));
//     let slide = Number(this.getAttribute("data-slide"));

//     slidesContainer.setAttribute('style', 'transform: translateX(' + (-offset) + 'px)');
//     this.classList.add('active');

//     // dots navigation
//     let dots = document.querySelectorAll(".slider .nav .dots .dot");
//     for (let i = 0; i < dots.length; i++) {
//         if (Number(dots[i].getAttribute('data-slide')) != slide) {
//             dots[i].classList.remove('active');
//         }
//     }
// }

class Elements {
    constructor(slider) {
        this.slidesContainer = document.querySelector(slider + ' > .container > .center');
        this.slidesList = document.querySelector(slider + ' .slides');
        this.slides = document.querySelectorAll(slider + ' .slides > .slide');
        this.dots = document.querySelector(slider + ' .dots');
    }
}

class Slider extends Elements {
    constructor(parameters) {
        super(parameters.slider);
        this.items = parameters.items;
        this.events();
    }

    run() {
        this.slidesWidth();
        this.slidesContainerHeight();
        this.dotsNavigation();
    }

    slidesWidth() {
        for (let i = 0; i < this.slides.length; i++) {
            this.slides[i].setAttribute('style', 'width:' + (this.slidesContainer.clientWidth / this.items) + 'px');
        }
    }

    slidesContainerHeight() {
        this.slidesContainer.setAttribute('style', 'height:' + (this.slidesList.clientHeight) + 'px');
    }

    dotsNavigation() {
        let numberOfDots = this.slides.length / this.items;

        this.dots.innerHTML = "";

        for (let i = 0; i < numberOfDots; i++) {
            const li = document.createElement("li");

            li.setAttribute("class", "dot");
            li.setAttribute("data-slide", i);
            li.setAttribute("data-position", (i * this.slidesContainer.clientWidth));
            li.addEventListener('click', () => console.log('move'));

            if (i == 0) {
                li.classList.add('active');
            }

            this.dots.appendChild(li);
        }
    }

    moveFromRightToLeft() { }
    moveFromLeftToRight() { }
    moveToPosition() { }

    events() {
        window.addEventListener('resize', () => this.run());
    }
}

new Slider(
    {
        slider: "#testimonials",
        items: 1
    }
).run();