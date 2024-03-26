class Elements {
    constructor(slider) {
        this.slider = slider;
        this.slidesContainer = this.el(slider + ' > .container > .center');
        this.slidesList = this.el(slider + ' .slides');
        this.slides = this.els(slider + ' .slides > .slide');
        this.leftBtn = this.el(slider + ' .slider-left-btn');
        this.rightBtn = this.el(slider + ' .slider-right-btn');
        this.dotsList = this.el(slider + ' .dots');
        this.dots = null;
    }

    el(item) {
        return document.querySelector(item);
    }

    els(items) {
        return document.querySelectorAll(items);
    }
}

export class Slider extends Elements {
    constructor(parameters) {
        super(parameters.slider);
        this.parameters = parameters;

        this.items = this.responsive(parameters);

        this.offset = 0;
        this.position = 0;
        this.touchStartX = null;

        this.events();
    }

    run() {
        this.slidesWidth();
        this.dotsNavigation();
        // this.slidesContainerHeight();

        this.items = this.responsive(this.parameters);

        this.slidesList.setAttribute('style', 'transform: translateX(0px)');

        this.offset = 0;
        this.position = 0;
    }

    // slidesContainerHeight() {
    //     this.slidesContainer.setAttribute('style', 'height:' + (this.slidesList.clientHeight) + 'px');
    // }

    slidesWidth() {
        for (let i = 0; i < this.slides.length; i++) {
            this.slides[i].setAttribute('style', 'width:' + (this.slidesContainer.clientWidth / this.items) + 'px');
        }
    }

    dotsNavigation() {
        let numberOfDots = this.slides.length / this.items;

        this.dotsList.innerHTML = "";

        for (let i = 0; i < numberOfDots; i++) {
            const li = document.createElement("li");

            li.setAttribute("class", "dot");
            li.setAttribute("data-slide", i);
            li.setAttribute("data-position", (i * this.slidesContainer.clientWidth));
            li.addEventListener('click', (e) => this.moveToPosition(e));

            if (i == 0) {
                li.classList.add('active');
            }

            this.dotsList.appendChild(li);
        }

        this.dots = document.querySelectorAll(this.slider + ' .dots .dot');
    }

    moveFromRightToLeft() {
        this.offset -= (this.slidesContainer.clientWidth);

        this.position++;

        if (this.position > ((this.slides.length / this.items) - 1)) {
            this.position = ((this.slides.length / this.items) - 1);
        }

        if (Math.abs(this.offset) > (this.slidesList.clientWidth - this.slidesContainer.clientWidth)) {
            this.offset = -(this.slidesList.clientWidth - this.slidesContainer.clientWidth);
        }

        this.slidesList.setAttribute('style', 'transform: translateX(' + this.offset + 'px)');

        // dots navigation
        this.dots[this.position].classList.add('active');
        for (let i = 0; i < this.dots.length; i++) {
            if (Number(this.dots[i].getAttribute('data-slide')) != this.position) {
                this.dots[i].classList.remove('active');
            }
        }
    }

    moveFromLeftToRight() {
        this.offset += (this.slidesContainer.clientWidth);

        this.position--;

        if (this.position < 0) {
            this.position = 0;
        }

        if (this.offset > 0) {
            this.offset = 0;
        }

        this.slidesList.setAttribute('style', 'transform: translateX(' + this.offset + 'px)');

        // dots navigation
        this.dots[this.position].classList.add('active');
        for (let i = 0; i < this.dots.length; i++) {
            if (Number(this.dots[i].getAttribute('data-slide')) != this.position) {
                this.dots[i].classList.remove('active');
            }
        }
    }

    moveToPosition(e) {
        let offset = Number(e.target.getAttribute("data-position"));
        let slide = Number(e.target.getAttribute("data-slide"));

        this.slidesList.setAttribute('style', 'transform: translateX(' + (-offset) + 'px)');
        e.target.classList.add('active');

        // dots navigation
        for (let i = 0; i < this.dots.length; i++) {
            if (Number(this.dots[i].getAttribute('data-slide')) != slide) {
                this.dots[i].classList.remove('active');
            }
        }
    }

    responsive(parameters) {
        if (parameters.hasOwnProperty('breakpoints')) {
            let bp = parameters.breakpoints;
            let w = window.innerWidth;

            if (bp.hasOwnProperty('xsm') && (w < 576)) {
                return Number(bp.xsm.items);
            }

            if (bp.hasOwnProperty('sm') && (w >= 576 && w < 768)) {
                return Number(bp.sm.items);
            }

            if (bp.hasOwnProperty('md') && (w >= 768 && w < 992)) {
                return Number(bp.md.items);
            }

            if (bp.hasOwnProperty('lg') && (w >= 992 && w < 1200)) {
                return Number(bp.lg.items);
            }

            if (bp.hasOwnProperty('xl') && (w >= 1200 && w < 1400)) {
                return Number(bp.xl.items);
            }

            if (bp.hasOwnProperty('xxl') && (w >= 1400)) {
                return Number(bp.xxl.items);
            }

        } else {
            return Number(parameters.items);
        }
    }

    events() {
        if (window != null) {
            window.addEventListener('resize', () => this.run());
        }

        if (this.slidesList != null) {
            this.slidesList.addEventListener('touchstart', (e) => this.swipeStart(e));
            this.slidesList.addEventListener('touchend', (e) => this.swipeEnd(e));
            this.slidesList.addEventListener('touchmove', (e) => this.touchMove(e));
        }

        if (this.leftBtn != null) {
            this.leftBtn.addEventListener('click', () => this.moveFromLeftToRight());
        }

        if (this.rightBtn != null) {
            this.rightBtn.addEventListener('click', () => this.moveFromRightToLeft());
        }
    }

    touchMove(e) {
        let o = 0;

        if (this.touchStartX > (e.touches[0].clientX)) {
            o = (this.offset) - ((e.touches[0].clientX) / 4);
        }

        if (this.touchStartX < (e.touches[0].clientX)) {
            o = (this.offset) + ((e.touches[0].clientX) / 4);
        }

        this.slidesList.setAttribute('style', 'transform: translateX(' + (o) + 'px)');
    }

    swipeStart(e) {
        this.touchStartX = e.touches[0].clientX;
    }

    swipeEnd(e) {
        if (this.touchStartX > e.changedTouches[0].clientX) {
            this.moveFromRightToLeft();
        } else {
            this.moveFromLeftToRight();
        }
    }
}