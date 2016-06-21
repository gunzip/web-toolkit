import $ from 'jquery';
import Packery from 'packery';
import debounce from 'throttle-debounce/throttle';

//	Without jquery
//
//	import 'imagesLoaded' from 'imagesloaded';
//  imagesLoaded( document.querySelector('.js-packery-container'), function( instance ) {
//    console.log('all images are loaded');
//  });

const MASONRY_SELECTOR = '.js-packery-container';
const MASONRY_ITEM_SELECTOR = '.js-packery-item';

const initMasonry = (masonrySelector = MASONRY_SELECTOR,
  masonryItemSelector = MASONRY_ITEM_SELECTOR) => {
  $(masonrySelector).each(function(i, el) {
    const _packery = new Packery(el, {
      gutter: 0,
      itemSelector: masonryItemSelector,
      percentPosition: true
    })
    $(window).resize(debounce(250, function() {
      _packery.layout()
    }))
  })
}

$(document).ready(function() {

  if ($(MASONRY_SELECTOR).length === 0) return;

  const $images = $(MASONRY_SELECTOR + ' img')
  let cnt = $images.length;

  if (cnt === 0) {
    initMasonry()
  } else {
    $images.one('load', function() {
      if (--cnt === 0) initMasonry()
    });
  }

})

module.exports = {
  Packery
}
