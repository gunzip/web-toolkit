import Packery from 'packery';
import debounce from 'throttle-debounce/throttle';

//	Without jquery
//
//	import 'imagesLoaded' from 'imagesloaded';
//  imagesLoaded( document.querySelector('.js-packery'), function( instance ) {
//    console.log('all images are loaded');
//  });

$(document).ready(function() {
  let cnt = $("img").length;
  $("img").one("load", function() {
    if (--cnt === 0) {
      $('.js-packery-container').each(function(i, el) {
        const _packery = new Packery(el, {
          gutter: 0,
          itemSelector: '.js-packery-item',
          percentPosition: true
        });
        $(window).resize(debounce(250, function() {
          if (_packery) _packery.layout();
        }));
      });
    }
  });
});

module.exports = Packery;
