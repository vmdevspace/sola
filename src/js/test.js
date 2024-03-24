class Elements {
    constructor(slider) {
        this.slider = slider;
        this.slidesContainer = document.querySelector(slider + ' > .container > .center');
        this.slidesList = document.querySelector(slider + ' .slides');
        this.slides = document.querySelectorAll(slider + ' .slides > .slide');
        this.dotsList = document.querySelector(slider + ' .dots');
        this.dots = null;
        this.leftBtn = document.querySelector(slider + ' .left-btn');
        this.rightBtn = document.querySelector(slider + ' .right-btn');
    }
}

class Slider extends Elements {
    constructor(parameters) {
        super(parameters.slider);
        this.parameters = parameters;
        this.items = this.responsive(parameters);

        this.offset = 0;
        this.position = 0;

        this.events();
    }

    run() {
        this.slidesWidth();
        this.slidesContainerHeight();
        this.dotsNavigation();

        this.items = this.responsive(this.parameters);

        this.slidesList.setAttribute('style', 'transform: translateX(0px)');

        this.offset = 0;
        this.position = 0;
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
        this.offset -= this.slidesContainer.clientWidth;

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
        this.offset += this.slidesContainer.clientWidth;

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

            if (bp.hasOwnProperty('xsm') && (w >= 320 && w < 576)) {
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
        window.addEventListener('resize', () => this.run());
        this.leftBtn.addEventListener('click', () => this.moveFromLeftToRight());
        this.rightBtn.addEventListener('click', () => this.moveFromRightToLeft());
    }
}

new Slider(
    {
        slider: "#testimonials",
        items: 1,
        breakpoints: {
            xsm: { items: 1 },
            sm: { items: 1 },
            md: { items: 1 },
            lg: { items: 1 },
            xl: { items: 1 },
            xxl: { items: 1 }
        }
    }
).run();