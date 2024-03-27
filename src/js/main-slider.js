class Elements {
    constructor(slider) {
        this.slides = document.querySelectorAll('.main-slider-slides .slide');
        this.miniatures = document.querySelectorAll('.main-slider-miniatures .item');
        this.leftBtn = document.querySelector('.main-slider .left-btn');
        this.rightBtn = document.querySelector('.main-slider .right-btn');
    }

    el(item) {
        return document.querySelector(item);
    }

    els(items) {
        return document.querySelectorAll(items);
    }
}

export class Slider extends Elements {
    firstStartTimeout = 5000;
    changeSlideTimeout = 7000;
    timeoutId = null;
    slide = this.startFromSlide();

    constructor() {
        super();

        this.leftBtn.addEventListener('click', () => this.prev());
        this.rightBtn.addEventListener('click', () => this.next());

        this.miniaturesInit();
    }

    start() {
        this.timeoutId = setTimeout(() => this.move(), this.firstStartTimeout);
    }

    stop() {
        clearTimeout(this.timeoutId);
    }

    move() {
        this.slider();
        this.timeoutId = setTimeout(() => this.move(), this.changeSlideTimeout);
    }

    slider() {
        this.animationOn();
        this.increment();
        this.changeSlide();
    }

    prev() {
        this.stop();
        this.animationOff();
        this.decrement();
        this.changeSlide();
        this.start();
    }

    next() {
        this.stop();
        this.animationOff();
        this.increment();
        this.changeSlide();
        this.start();
    }

    increment() {
        this.slide++;

        if (this.slide > (this.slides.length - 1)) {
            this.slide = 0;
        }
    }

    decrement() {
        this.slide--;

        if (this.slide < 0) {
            this.slide = (this.slides.length - 1);
        }
    }

    changeSlide() {
        this.slides[this.slide].classList.add('show');
        this.miniatures[this.slide].classList.add('current');

        for (let i = 0; i < this.slides.length; i++) {
            if (i != this.slide) {
                this.slides[i].classList.remove('show');
                this.miniatures[i].classList.remove('current');
            }
        }
    }

    animationOff() {
        for (let i = 0; i < this.slides.length; i++) {
            this.slides[i].classList.add('na');
        }
    }

    animationOn() {
        for (let i = 0; i < this.slides.length; i++) {
            if (this.slides[i].classList.contains('na')) {
                this.slides[i].classList.remove('na');
            }
        }
    }

    startFromSlide() {
        for (let i = 0; i < this.slides.length; i++) {
            if (this.slides[i].classList.contains('show')) {
                return i;
            }
        }
    }

    miniaturesInit() {
        for (let i = 0; i < this.miniatures.length; i++) {
            this.miniatures[i].setAttribute("data-item", i);

            if (this.miniatures[i] != null) {
                this.miniatures[i].addEventListener("click", () => this.directChangeSlide(i));
            }
        }
    }

    directChangeSlide(elem) {
        this.stop();
        this.animationOff();

        this.slide = elem;

        this.changeSlide();
        this.start();
    }
}