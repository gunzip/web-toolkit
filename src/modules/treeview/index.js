/* global $ */

const Frtreeview = function ({
		selector: selector = '.js-fr-treeview',
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
	if (!('querySelector' in doc) || !('addEventListener' in window) || !docEl.classList) return;

	// SETUP
	// set accordion element NodeLists
	let accordionContainers = _q(selector);

  let $id = $(selector);
  let $items = $id.find('li');
  let $parents = $id.find('.tree-parent');
  let $visibleItems = null;
  let $activeItem = null;

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

  function expandGroup($item) {
    var $group = $item.children('ul');
    $group.show().attr('aria-hidden', 'false');
    $item.attr('aria-expanded', 'true');
    $visibleItems = $id.find('li:visible');
  }

  function collapseGroup($item) {
    var $group = $item.children('ul');
    $group.hide().attr('aria-hidden', 'true');
    $item.attr('aria-expanded', 'false');
    $visibleItems = $id.find('li:visible');
  }

  function toggleGroup($item) {
    if ($item.attr('aria-expanded') == 'true') {
      collapseGroup($item);
    } else {
      expandGroup($item);
    }
  }

  function updateStyling($item) {
    $items.removeClass('tree-focus').attr('tabindex', '-1');
    $item.addClass('tree-focus').attr('tabindex', '0');
  }

  function handleKeyDown($item, e) {
    var curNdx = $visibleItems.index($item);

    if ((e.altKey || e.ctrlKey) ||
      (e.shiftKey && e.keyCode != keys.tab)) {
      return true;
    }

    switch (e.keyCode) {
      case keys.tab:
        {
          $activeItem = null;
          $item.removeClass('tree-focus');
          return true;
        }
      case keys.home:
        {
          $activeItem = $parents.first();
          $activeItem.focus();
          e.stopPropagation();
          return false;
        }
      case keys.end:
        {
          $activeItem = $visibleItems.last();
          $activeItem.focus();
          e.stopPropagation();
          return false;
        }
      case keys.enter:
      case keys.space:
        {
          if (!$item.is('.tree-parent')) {
            // do nothing
          } else {
            toggleGroup($item, true);
          }
          e.stopPropagation();
          return false;
        }
      case keys.left:
        {

          if ($item.is('.tree-parent') && $item.attr('aria-expanded') == 'true') {
            collapseGroup($item, true);
          } else {
            var $itemUL = $item.parent();
            var $itemParent = $itemUL.parent();
            $activeItem = $itemParent;
            $activeItem.focus();
          }
          e.stopPropagation();
          return false;
        }

      case keys.right:
        {
          if (!$item.is('.tree-parent')) {
            // do nothing
          } else if ($item.attr('aria-expanded') == 'false') {
            expandGroup($item, true);
          } else {
            $activeItem = $item.children('ul').children('li').first();
            $activeItem.focus();
          }
          e.stopPropagation();
          return false;
        }

      case keys.up:
        {
          if (curNdx > 0) {
            var $prev = $visibleItems.eq(curNdx - 1);
            $activeItem = $prev;
            $prev.focus();
          }
          e.stopPropagation();
          return false;
        }
      case keys.down:
        {
          if (curNdx < $visibleItems.length - 1) {
            var $next = $visibleItems.eq(curNdx + 1);
            $activeItem = $next;
            $next.focus();
          }
          e.stopPropagation();
          return false;
        }
      case keys.asterisk:
        {
          var thisObj = this;
          $parents.each(function() {
            if (thisObj.$activeItem[0] == $(this)[0]) {
              thisObj.expandGroup($(this), true);
            } else {
              thisObj.expandGroup($(this), false);
            }
          });
          e.stopPropagation();
          return false;
        }
    }
    return true;
  }

  function handleKeyPress($item, e) {
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
          var chr = String.fromCharCode(e.which);
          var bMatch = false;
          var itemNdx = $visibleItems.index($item);
          var itemCnt = $visibleItems.length;
          var curNdx = itemNdx + 1;

          // check if the active item was the last one on the list
          if (curNdx == itemCnt) {
            curNdx = 0;
          }

          // Iterate through the menu items (starting from the current item and wrapping) until a match is found
          // or the loop returns to the current menu item
          while (curNdx != itemNdx) {

            var $curItem = $visibleItems.eq(curNdx);
            var titleChr = $curItem.text().charAt(0);

            if ($curItem.is('.tree-parent')) {
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
            $activeItem = $visibleItems.eq(curNdx);
            $activeItem.focus();
          }

          e.stopPropagation();
          return false;
        }
    }

    return true;
  }

  function handleDblClick($id, e) {
    if (e.altKey || e.ctrlKey || e.shiftKey) {
      // do nothing
      return true;
    }
    $activeItem = $id;
    updateStyling($id);
    toggleGroup($id, true);
    e.stopPropagation();
    return false;
  }

  function handleClick($id, e) {
    if (e.altKey || e.ctrlKey || e.shiftKey) {
      // do nothing
      return true;
    }
    $activeItem = $id;
    updateStyling($id);
    e.stopPropagation();
    return false;
  }

  const bindHandlers = () => {
    $parents.click(function(e) {
      return handleDblClick($(this), e);
    });

    // $items.click(function(e) {
    //   return thisObj.handleClick($(this), e);
    // });

    $items.keydown(function(e) {
      return handleKeyDown($(this), e);
    });

    $items.keypress(function(e) {
      return handleKeyPress($(this), e);
    });

    $(document).click(function() {
      if ($activeItem != null) {
        $activeItem.removeClass('tree-focus');
        $activeItem = null;
      }
      return true;
    });
  }

  function destroy() {
    /* TODO */
  }

  function init() {

    // $(document).ready(function() {
    //   $('.Treeview').each(function(i, el){
    //       new Treeview(el);
    //   });
    // });

    $parents.each(function() {
      if ($(this).attr('aria-expanded') == 'false') {
        $(this).children('ul').hide().attr('aria-hidden', 'true');
      }
    });

    $visibleItems = $id.find('li:visible');
    bindHandlers();
  }

  init();

  // REVEAL API
	return {
		init,
		destroy
	}

}


export default Frtreeview;
