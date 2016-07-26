import $ from 'jquery'

import Froffcanvas from 'fr-offcanvas'

/* eslint-disable no-unused-vars */

import stylesheet from 'fr-offcanvas/offcanvas.css'

/* eslint-enable */

const offcanvas = Froffcanvas({
  // String - Selector for the open button(s)
  openSelector: '.js-fr-offcanvas-open',

  // String - Selector for the close button
  closeSelector: '.js-fr-offcanvas-close',

  // String - Class name that will be added to the selector when the component has been initialised
  readyClass: 'is-ready',

  // String - Class name that will be added to the selector when the panel is visible
  activeClass: 'is-active'
})

/*
 *	FIXME: hack to show / hide the background panel
 */
const _handleModal = function(e) {
  if (e && $('.Offcanvas').hasClass('is-active') &&
    !$(e.target).hasClass('Offcanvas-content')) {
    $('.js-fr-offcanvas-close').click()
  }
  $('.Offcanvas--modal').one('click', _handleModal)
}

/*
 *	Prevent scroll on body when offcanvas is visible
 */
const _handleOverflow = () => {
  if ('false' === $('.Offcanvas').attr('aria-hidden')) {
    $('body').css('overflow-y', 'hidden')
  } else {
    $('body').css('overflow-y', 'visible')
  }
}

$(document).ready(() => {
  _handleModal()

  $('.js-fr-offcanvas')
    .focus(_handleOverflow)
    .blur(_handleOverflow)
})

export default {
  Froffcanvas,
  offcanvas
}
