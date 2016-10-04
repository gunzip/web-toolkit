import $ from 'jquery'
import Macy from 'macy'

const MASONRY_SELECTOR = '.js-Masonry-container'

/*
 *  @FIXME: Only one instance per page supported ATM
 *    see https://github.com/bigbitecreative/macy.js/issues/7
 */
const initMasonry = (masonrySelector = MASONRY_SELECTOR) => {
    Macy.init({
      container: masonrySelector,
      trueOrder: false,
      waitForImages: true,
      margin: 16,
      columns: 3,
      breakAt: {
        768: 1,
        992: 2,
      }
    })
}

$(document).ready(function() {
  if ($(MASONRY_SELECTOR).length !== 0) {
    initMasonry()
  }
})

export default {
  Macy,
  initMasonry
}
