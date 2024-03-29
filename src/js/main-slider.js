class Elements {
    constructor(slider) {
        this.slides = this.els(slider + ' .main-slider-slides .slide');
        this.miniatures = this.els(slider + ' .main-slider-miniatures .item');
        this.articles = this.els(slider + ' .main-slider-articles .article');
        this.center = this.el(slider + ' .center');
        this.leftBtn = this.el(slider + ' .left-btn');
        this.rightBtn = this.el(slider + ' .right-btn');
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
    slide = this.startFromSlide();
    timeoutId = null;
    touchStartX = null;

    constructor(parameters) {
        super(parameters.slider);
        this.events();
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
        this.articles[this.slide].classList.add('d');

        for (let i = 0; i < this.slides.length; i++) {
            if (i != this.slide) {
                this.slides[i].classList.remove('show');
                this.miniatures[i].classList.remove('current');
                this.articles[i].classList.remove('d');
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
            this.miniatures[i].addEventListener("click", () => this.directChangeSlide(i));
        }
    }

    directChangeSlide(elem) {
        this.stop();
        this.animationOff();

        this.slide = elem;

        this.changeSlide();
        this.start();
    }

    swipeStart(e) {
        this.touchStartX = e.touches[0].clientX;
    }

    swipeEnd(e) {
        if (this.touchStartX > e.changedTouches[0].clientX) {
            this.prev();
        } else {
            this.next();
        }
    }

    events() {
        if (this.leftBtn != null) {
            this.leftBtn.addEventListener('click', () => this.prev());
        }

        if (this.rightBtn != null) {
            this.rightBtn.addEventListener('click', () => this.next());
        }

        if (this.center != null) {
            this.center.addEventListener('touchstart', (e) => this.swipeStart(e));
            this.center.addEventListener('touchend', (e) => this.swipeEnd(e));
        }
    }
}