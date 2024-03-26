class Elements {
    constructor(slider) {

    }

    el(item) {
        return document.querySelector(item);
    }

    els(items) {
        return document.querySelectorAll(items);
    }
}

export class Slider extends Elements {
    constructor() {
        super();
    }

    run() {
        console.log('main slider');
    }
}