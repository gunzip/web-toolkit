/* global $ */

/*
 * Porting of http://www.oaa-accessibility.org/examplep/treeview1/
 */
const Frtreeview = function ({
		selector: selector = '.js-fr-treeview',
		openOnClick: openOnClick = true,
		classFocused: classFocused = 'tree-focus',
		classParent: classParent = 'tree-parent'
		// headerSelector: headerSelector = '.js-fr-accordion__header',
		// headerIdPrefix: headerIdPrefix = 'accordion-header',
		// panelSelector: panelSelector = '.js-fr-accordion__panel',
		// panelIdPrefix: panelIdPrefix = 'accordion-panel',
		// firstPanelsOpenByDefault: firstPanelsOpenByDefault = true,
		// multiselectable: multiselectable = true,
		// readyClass: readyClass = 'fr-accordion--is-ready',
		// transitionLength: transitionLength = 250
	} = {}) {

	// CONSTANTS
	const doc = document;
	const docEl = doc.documentElement;
	const _q = (el, ctx = doc) => [].slice.call(ctx.querySelectorAll(el));

	// SUPPORTS
	if (!('querySelector' in doc) || !('addEventListener' in window) || !docEl.classList) return null;

	// SETUP
	// set treeview element NodeLists
	let treeviewContainers = _q(selector);

  const keys = {
    tab: 9,
    enter: 13,
    space: 32,
    pageup: 33,
    pagedown: 34,
    end: 35,
    home: 36,
    left: 37,
    up: 38,
    right: 39,
    down: 40,
    asterisk: 106
  };

  function _expandGroup(treeview, $item) {
    let $group = $item.children('ul');
    $group.show().attr('aria-hidden', 'false');
    $item.attr('aria-expanded', 'true');
    treeview.$visibleItems = treeview.$el.find('li:visible');
  }

  function _collapseGroup(treeview, $item) {
    let $group = $item.children('ul');
    $group.hide().attr('aria-hidden', 'true');
    $item.attr('aria-expanded', 'false');
    treeview.$visibleItems = treeview.$el.find('li:visible');
  }

  function _toggleGroup(treeview, $item) {
    if ($item.attr('aria-expanded') == 'true') {
      _collapseGroup(treeview, $item);
    } else {
      _expandGroup(treeview, $item);
    }
  }

  function _updateStyling(treeview, $item) {
    treeview.$items.removeClass(classFocused).attr('tabindex', '-1');
    $item.addClass(classFocused).attr('tabindex', '0');
  }

  function _handleKeyDown(treeview, $item, e) {
    let curNdx = treeview.$visibleItems.index($item);

    if ((e.altKey || e.ctrlKey) ||
      (e.shiftKey && e.keyCode != keys.tab)) {
      return true;
    }

    switch (e.keyCode) {
      case keys.tab:
        {
          treeview.$activeItem = null;
          $item.removeClass(classFocused);
          return true;
        }

      case keys.home:
        {
          treeview.$activeItem = treeview.$parents.first();
          treeview.$activeItem.focus();
          e.stopPropagation();
          return false;
        }

      case keys.end:
        {
          treeview.$activeItem = treeview.$visibleItems.last();
          treeview.$activeItem.focus();
          e.stopPropagation();
          return false;
        }

      case keys.enter:
      case keys.space:
        {
          if (!$item.is('.' + classParent)) {
            // do nothing
          } else {
            _toggleGroup(treeview, $item);
          }
          e.stopPropagation();
          return false;
        }

      case keys.left:
        {
          if ($item.is('.' + classParent) && $item.attr('aria-expanded') == 'true') {
            _collapseGroup(treeview, $item);
          } else {
            let $itemUL = $item.parent();
            let $itemParent = $itemUL.parent();
            treeview.$activeItem = $itemParent;
            treeview.$activeItem.focus();
          }
          e.stopPropagation();
          return false;
        }

      case keys.right:
        {
          if (!$item.is('.' + classParent)) {
            // do nothing
          } else if ($item.attr('aria-expanded') == 'false') {
            _expandGroup(treeview, $item);
          } else {
            treeview.$activeItem = $item.children('ul').children('li').first();
            treeview.$activeItem.focus();
          }
          e.stopPropagation();
          return false;
        }

      case keys.up:
        {
          if (curNdx > 0) {
            let $prev = treeview.$visibleItems.eq(curNdx - 1);
            treeview.$activeItem = $prev;
            $prev.focus();
          }
          e.stopPropagation();
          return false;
        }

      case keys.down:
        {
          if (curNdx < treeview.$visibleItems.length - 1) {
            let $next = treeview.$visibleItems.eq(curNdx + 1);
            treeview.$activeItem = $next;
            $next.focus();
          }
          e.stopPropagation();
          return false;
        }

      case keys.asterisk:
        {
          treeview.$parents.each(function() {
            _expandGroup(treeview, $(this));
          });
          e.stopPropagation();
          return false;
        }

    }
    return true;
  }

  function _handleKeyPress(treeview, $item, e) {
    if (e.altKey || e.ctrlKey || e.shiftKey) {
      // do nothing
      return true;
    }

    switch (e.keyCode) {
      case keys.tab:
        {
          return true;
        }
      case keys.enter:
      case keys.home:
      case keys.end:
      case keys.left:
      case keys.right:
      case keys.up:
      case keys.down:
        {
          e.stopPropagation();
          return false;
        }
      default:
        {
          let chr = String.fromCharCode(e.which);
          let bMatch = false;
          let itemNdx = treeview.$visibleItems.index($item);
          let itemCnt = treeview.$visibleItems.length;
          let curNdx = itemNdx + 1;

          // check if the active item was the last one on the list
          if (curNdx == itemCnt) {
            curNdx = 0;
          }

          // Iterate through the menu items (starting from the current item and wrapping) until a match is found
          // or the loop returns to the current menu item
          while (curNdx != itemNdx) {

            let $curItem = treeview.$visibleItems.eq(curNdx);
            let titleChr = $curItem.text().charAt(0);

            if ($curItem.is('.' + classParent)) {
              titleChr = $curItem.find('span').text().charAt(0);
            }

            if (titleChr.toLowerCase() == chr) {
              bMatch = true;
              break;
            }

            curNdx = curNdx + 1;

            if (curNdx == itemCnt) {
              // reached the end of the list, start again at the beginning
              curNdx = 0;
            }
          }

          if (bMatch == true) {
            treeview.$activeItem = treeview.$visibleItems.eq(curNdx);
            treeview.$activeItem.focus();
          }

          e.stopPropagation();
          return false;
        }
    }

    return true;
  }

  function _handleDblClick(treeview, $item, e) {
    if (e.altKey || e.ctrlKey || e.shiftKey) {
      // do nothing
      return true;
    }
    treeview.$activeItem = $item;
    _updateStyling(treeview, $item);
    _toggleGroup(treeview, $item);
    e.stopPropagation();
    return false;
  }

  function _handleClick(treeview, $item, e) {
    if (e.altKey || e.ctrlKey || e.shiftKey) {
      // do nothing
      return true;
    }
    treeview.$activeItem = treeview.$el;
    _updateStyling(treeview, $item);
    e.stopPropagation();
    return false;
  }

  function _bindEvents(treeview) {
		if (openOnClick) {
			treeview.$parents.click(function(e) {
	      return _handleDblClick(treeview, $(this), e);
	    });
		}
		else {
	    treeview.$parents.click(function(e) {
	      return _handleDblClick(treeview, $(this), e);
	    });
	    treeview.$items.click(function(e) {
	      return _handleClick(treeview, $(this), e);
	    });
		}

    treeview.$items.keydown(function(e) {
      return _handleKeyDown(treeview, $(this), e);
    });

    treeview.$items.keypress(function(e) {
      return _handleKeyPress(treeview, $(this), e);
    });

    $(document).click(function() {
      if (treeview.$activeItem != null) {
        treeview.$activeItem.removeClass(classFocused);
        treeview.$activeItem = null;
      }
      return true;
    });
  }

  function destroy() {
    /* TODO */
  }

  function _initTreeview(treeview) {
    treeview.$parents.each(function() {
      if ($(this).attr('aria-expanded') == 'false') {
        $(this).children('ul').hide().attr('aria-hidden', 'true');
      }
    });
    treeview.$visibleItems = treeview.$el.find('li:visible');
  }

  function _addA11y(treeview) {
    /* TODO */
  }

  function init() {
    if (treeviewContainers.length) {
  		treeviewContainers.forEach((treeviewContainer) => {
        let treeview = {
          $el: $(treeviewContainer),
          $items: $(treeviewContainer).find('li'),
          $parents: $(treeviewContainer).find('.' + classParent),
          $visibleItems: null,
          $activeItem: null
        };
        _initTreeview(treeview);
  			_addA11y(treeview);
  			_bindEvents(treeview);
      });
    }
  }

  init();

  // REVEAL API
	return {
		init,
		destroy
	}

}

new Frtreeview();

export default Frtreeview;
