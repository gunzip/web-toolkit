import $ from 'jquery'

import Froffcanvas from 'fr-offcanvas'

/* eslint-disable no-unused-vars */

import stylesheet from 'fr-offcanvas/offcanvas.css'

/* eslint-enable */

const opts = {
  // String - panel
  panelSelector: '.Offcanvas',

  // String - content
  contentSelector: '.Offcanvas-content',

  // String - content
  modalSelector: '.Offcanvas--modal',

  // String - trigger
  jsSelector: '.js-fr-offcanvas-open',

  // String - Selector for the open button(s)
  openSelector: '.js-fr-offcanvas-open',

  // String - Selector for the close button
  closeSelector: '.js-fr-offcanvas-close',

  // String - Class name that will be added to the selector when the component has been initialised
  readyClass: 'is-ready',

  // String - Class name that will be added to the selector when the panel is visible
  activeClass: 'is-active'
}

const offcanvas = Froffcanvas(opts)

/*
 *  Prevent scroll on body when offcanvas is visible
 *  (the touchmove handler targets iOS devices)
 */
const _handleModalScroll = () => {
  $(opts.contentSelector).on('transitionend', function() {
    if (!$(opts.panelSelector).hasClass(opts.activeClass)) {
      $('body, html').css({
        'overflow-y': 'visible'
      })
      $(document).off('touchmove.offcanvas')
    } else {
      const scrollTop = $('body').scrollTop()
      $('body, html').css({
        'overflow-y': 'hidden'
      })
      $(document).on('touchmove.offcanvas', function() {
        $('body').scrollTop(scrollTop)
      })
    }
  })
}

/*
 *	FIXME: hack to show / hide the background panel
 */
const _handleModal = (e) => {
  if (e && $(opts.panelSelector).hasClass(opts.activeClass) &&
    !$(e.target).is(opts.contentSelector)) {
    // for some odd reason plain jquery click() does not work here
    // // so we add that get(0) call
    $(opts.closeSelector).get(0).click()
  }
  // we're using "one" here instead of "bind" because
  // otherwise $(opts.closeSelector).click() would trigger
  // a click on modal again looping forever
  $(opts.modalSelector).one('click', _handleModal)
}

$(document).ready(() => {
  $(opts.openSelector)
    .add($(opts.closeSelector))
    .click((e) => {
      e.preventDefault()
    })
  _handleModal()
  _handleModalScroll()
})

export default {
  Froffcanvas,
  offcanvas,
  opts
}
