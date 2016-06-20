import Packery from 'packery';

import debounce from 'throttle-debounce/throttle';

//	Without jquery
//
//	import 'imagesLoaded' from 'imagesloaded';
//  imagesLoaded( document.querySelector('.js-packery'), function( instance ) {
//    console.log('all images are loaded');
//  });

$(document).ready(function() {
  let _packery = null;
  if ($('.js-packery-container').length <= 0) {
    return ;
  }
	var cnt = $("img").length;
  $("img").one("load", function() {
    if (--cnt === 0) {
      _packery = new Packery('.js-packery-container', {
        gutter: 0,
        itemSelector: '.js-packery-item',
        percentPosition: true
      });
    }
  });
  /* FIXME */
  $(window).resize(debounce(500, function() {
    console.log('resize');
    if (_packery) _packery.layout();
  }));
});

module.exports = Packery;
