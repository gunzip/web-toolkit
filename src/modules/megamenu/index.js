/* global $ */

import scriptjs from 'scriptjs';

/* FIXME: wait till https://github.com/adobe-accessibility/Accessible-Mega-Menu/pull/38 and then packege with npm */

$('.js-megamenu')
  .addClass('is-ready');

scriptjs('https://cdn.rawgit.com/adobe-accessibility/Accessible-Mega-Menu/master/js/jquery-accessibleMegaMenu.js', function() {

  $('.js-megamenu')
    .accessibleMegaMenu({
    /* prefix for generated unique id attributes, which are required
       to indicate aria-owns, aria-controls and aria-labelledby */
    uuidPrefix: 'megamenu',

    /* css class used to define the megamenu styling */
    menuClass: 'Megamenu',

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
  });

});
