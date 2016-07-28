import $ from 'jquery'

const hideClass = 'u-hiddenVisually'

$(document).ready(() => {
  $('.Share > ul')
    .addClass(hideClass)
    .find('li')
    .css({
      maxWidth: 0
    })
})

const _toggleVisibility = ($share) => {
  $share
    .find('.Share-revealText')
    .toggleClass('u-hiddenVisually')

  $share
    .find('.Share-revealIcon')
    .toggleClass('is-open')
}


$('.js-Share').click((e) => {
  const $el = $(e.currentTarget)
  const $share = $el.closest('.Share')
  const $buttons = $share.find('ul')

  if ($buttons.hasClass(hideClass)) {

    _toggleVisibility($share)

    $buttons
      .removeClass(hideClass)
      .find('li')
      .animate({
        maxWidth: '200px'
      },
      250)

  } else {

    $buttons
      .find('li')
      .animate({
          maxWidth: 0
        },
        500,
        () => {
          $buttons.addClass(hideClass)
          _toggleVisibility($share)
        })

  }

})
