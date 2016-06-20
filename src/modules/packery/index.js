import Packery from 'packery';

let _packery;

//	Without jquery
//
//	import 'imagesLoaded' from 'imagesloaded';
//  imagesLoaded( document.querySelector('.js-packery'), function( instance ) {
//    console.log('all images are loaded');
//  });

$(document).ready(function() {
  if ($('.js-packery-container').length <= 0) {
    return ;
  }
	var cnt = $("img").length;
  $("img").one("load", function() {
    if (--cnt === 0) {
			_packery = new Packery('.js-packery-container', {
			  itemSelector: '.js-packery-item',
				gutter: 0
			});
    }
  });
});

module.exports = _packery;
