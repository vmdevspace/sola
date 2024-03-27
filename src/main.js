// scss
// import './style.scss';

import { Slider as Carousel } from "./js/carousel";
import { Slider as MainSlider } from "./js/main-slider";

document.addEventListener('DOMContentLoaded', function () {

    new MainSlider().start();

    new Carousel(
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

    new Carousel(
        {
            slider: "#latest-projects",
            items: 4,
            breakpoints: {
                xsm: { items: 1 },
                sm: { items: 2 },
                md: { items: 2 },
                lg: { items: 3 },
                xl: { items: 3 },
                xxl: { items: 4 }
            }
        }
    ).run();

}, false);