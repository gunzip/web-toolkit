import $ from 'jquery';
import Megamenu from 'accessible-mega-menu';

// ASAP hide megamenu panels
$('.js-megamenu').addClass('is-ready');

const opts = {
  /* prefix for generated unique id attributes, which are required
     to indicate aria-owns, aria-controls and aria-labelledby */
  uuidPrefix: 'megamenu',

  /* css class used to define the megamenu styling */
  menuClass: 'Megamenu',

  menuListClass: 'Megamenu-list',

  /* css class for a top-level navigation item in the megamenu */
  topNavItemClass: 'Megamenu-item',

  /* css class for a megamenu panel */
  panelClass: 'Megamenu-subnav',

  /* css class for a group of items within a megamenu panel */
  panelGroupClass: 'Megamenu-subnavGroup',

  /* css class for the hover state */
  hoverClass: 'is-hover',

  /* css class for the focus state */
  focusClass: 'is-focus',

  /* css class for the open state */
  openClass: 'is-open'
};

/*
 *	Take a Treeview and make it work with Megamenu
 */
const listToMegaMenu = ($ul, _opts) => {
  const attrs = 'class aria-expanded aria-hidden role tabindex';
  return $ul
    .clone()
    .removeAttr(attrs)
    .addClass(_opts.menuListClass)
    .find('*')
      .removeAttr(attrs)
      .end()
    .find('> li')
    .each(function(i, li) {
      $(li)
        .addClass(_opts.topNavItemClass)
        .find('a')
          // make item tabbable, this is required !
          .attr('href', '#')
        .end()
        .find('> ul > li')
          .unwrap()
          .wrap(`<ul class="${_opts.panelGroupClass}" />`)
        .end()
        .find('> ul')
        .wrapAll(`<div class="${_opts.panelClass}" />`)
    })
    .end();
}

$(document).ready(function() {
  $('.js-megamenu').each((i, el) => {
    const $el = $(el);
    const rel = $(el).data('rel');
    if ($el.find('ul').length === 0 && rel && $(rel).length > 0) {
      let $menu = listToMegaMenu($(rel), opts);
      $el.append($menu);
      console.log($el.html());
    }
    $el.accessibleMegaMenu(opts);
  });
});

module.exports = { opts, listToMegaMenu, Megamenu };
