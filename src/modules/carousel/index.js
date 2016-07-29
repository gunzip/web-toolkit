import $ from 'jquery'

/* eslint-disable no-unused-vars */

import css from 'owl.carousel/dist/assets/owl.carousel.css'

import owlCarousel from 'owl.carousel'

/* eslint-enable no-unused-vars */

$(function() {

  $('.js-Carousel').owlCarousel({
    nav: true,
    navText: ['precedente', 'successivo'],
    items: 3,
    dots: false,
    loop: false,
    margin: 16,
    mouseDrag: true,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 2
      },
      992: {
        items: 3
      }
    }
  })


})
