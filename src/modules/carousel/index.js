import $ from 'jquery'

/* eslint-disable no-unused-vars */

import css from 'owl.carousel/dist/assets/owl.carousel.css'

import owlCarousel from 'owl.carousel'
import a11y from './a11y'

/* eslint-enable no-unused-vars */

const opts = {
  owlPrev: '.owl-prev',
  owlNext: '.owl-next',
  owlItem: '.owl-item',
  jsSelector: '.js-Carousel',
  owlOpts: {
    nav: false,
    // navText: ['precedente', 'successivo'],
    items: 3,
    dots: false,
    loop: false,
    margin: 16,
    mouseDrag: true,
    URLhashListener: true,
    startPosition: 'URLHash',
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
  }
}

const init = function() {
  const $owl = $(opts.jsSelector).owlCarousel(opts.owlOpts)
  $(opts.owlPrev).click(() => $owl.trigger('prev.owl.carousel'))
  $(opts.owlNext).click(() => $owl.trigger('next.owl.carousel'))

  // $owl.find(opts.owlItem).attr('tabindex', '0')

  $owl.on('initialized.owl.carousel changed.owl.carousel refreshed.owl.carousel', (event) => {
    if (!event.namespace) return
    var carousel = event.relatedTarget,
      element = event.target,
      current = carousel.current()
    $(opts.owlPrev, element).toggleClass('disabled', current === carousel.maximum())
    $(opts.owlNext, element).toggleClass('disabled', current === carousel.minimum())
  })
}

$(document).ready(init)

export default {
  opts,
  init
}
