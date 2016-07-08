import Headroom from 'headroom.js';

const myElement = document.querySelector('header');

const opts = {
  // vertical offset in px before element is first unpinned
  offset: 0,
  // you can specify tolerance individually for up/down scroll
  tolerance: {
    up: 0,
    down: 0
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
};

let headroom = null;

if (myElement) {
  headroom = new Headroom(myElement, opts);
  headroom.init();
}

module.exports = headroom;
