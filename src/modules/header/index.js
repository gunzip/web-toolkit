import $ from 'jquery'
import Headroom from 'headroom.js'
import debounce from 'throttle-debounce/throttle'

// Headroom for fixed sticky header

const myElement = document.querySelector('header')

const opts = {
  // vertical offset in px before element is first unpinned
  offset: 0,
  // you can specify tolerance individually for up/down scroll
  tolerance: {
    up: 20,
    down: 10
  },
  // css classes to apply
  classes: {
    // when element is initialised
    initial: 'Headroom',
    // when scrolling up
    pinned: 'Headroom--pinned',
    // when scrolling down
    unpinned: 'Headroom--unpinned',
    // when above offset
    top: 'Headroom--top',
    // when below offset
    notTop: 'Headroom--not-top',
    // when at bottom of scoll area
    bottom: 'Headroom--bottom',
    // when not at bottom of scroll area
    notBottom: 'Headroom--not-bottom'
  },
  // element to listen to scroll events on, defaults to `window`
  scroller: window,
  // callback when pinned, `this` is headroom object
  onPin: function() {},
  // callback when unpinned, `this` is headroom object
  onUnpin: function() {},
  // callback when above offset, `this` is headroom object
  onTop: function() {},
  // callback when below offset, `this` is headroom object
  onNotTop: function() {},
  // callback when at bottom of page, `this` is headroom object
  onBottom: function() {},
  // callback when moving away from bottom of page, `this` is headroom object
  onNotBottom: function() {}
}

let headroom = null

if (myElement) {
  headroom = new Headroom(myElement, opts)
  headroom.init()
}

/*
 *	Make space when using fixed header.
 *
 *		The no-js alternative is to set up body padding inside CSS
 *	 	assuming you know the exact header height in pixel
 *	 	(expanded and minimized for all viewport width)
 */
const headroomFixed = '.Headroom--fixed'

if ($('.' + opts.classes.initial).is(headroomFixed)) {

  const _adjustPadding = function() {
    // 250px as fallback - should not happen -
    // 32px as maximum space between content and header
    const paddingTop = ($(headroomFixed).height() ?
      $(headroomFixed).height() : 250) + (Math.min(32, Math.floor($(window).width() / 50)))

    $('body').css({
      paddingTop: paddingTop + 'px'
    })
  }

  $(headroomFixed).css({
    position: 'fixed',
    top: 0
  })

  // Set up padding on page load
  // setTimeout() call due to Safari bug computing header height()
  $(window).load(function() {
    setTimeout(_adjustPadding, 100)
  })

  // Make padding responsive
  $(window).resize(debounce(250, _adjustPadding))

  // Avoid small padding on page refresh
  // when header starts minimized
  $(window).scroll(debounce(250, () => {
    if (0 === $(window).scrollTop()) {
      setTimeout(_adjustPadding, 100)
    }
  }))

}

export default {
  Headroom,
  headroom
}
