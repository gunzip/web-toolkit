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
		transitionLength: transitionLength = 250
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

// Function Treeview() is a class constructor for a Treeview widget. The widget binds to an
// unordered list. The top-level <ul> must have role='tree'. All list items must have role='treeitem'.
//
// Tree groups must be embedded lists within the listitem that heads the group. the top <ul> of a group
// must have role='group'. aria-expanded is used to indicate whether a group is expanded or collapsed. This
// property must be set on the listitem the encapsulates the group.
//
// parent nodes must be given the class tree-parent.
//

  function expandGroup($item) {
    var $group = $item.children('ul');
    $group.show().attr('aria-hidden', 'false');
    $item.attr('aria-expanded', 'true');
    this.$visibleItems = this.$id.find('li:visible');
  }

  function collapseGroup = function($item) {
    var $group = $item.children('ul');
    $group.hide().attr('aria-hidden', 'true');
    $item.attr('aria-expanded', 'false');
    this.$visibleItems = this.$id.find('li:visible');
  }

  function toggleGroup = function($item) {
    if ($item.attr('aria-expanded') == 'true') {
      this.collapseGroup($item);
    } else {
      this.expandGroup($item);
    }
  }

  function bindHandlers = function() {
    var thisObj = this;

    this.$parents.click(function(e) {
      return thisObj.handleDblClick($(this), e);
    });

    // this.$items.click(function(e) {
    //   return thisObj.handleClick($(this), e);
    // });

    this.$items.keydown(function(e) {
      return thisObj.handleKeyDown($(this), e);
    });

    this.$items.keypress(function(e) {
      return thisObj.handleKeyPress($(this), e);
    });

    this.$items.focus(function(e) {
      return thisObj.handleFocus($(this), e);
    });

    $(document).click(function() {
      if (thisObj.$activeItem != null) {
        thisObj.$activeItem.removeClass('tree-focus');
        thisObj.$activeItem = null;
      }
      return true;
    });
  }

  function updateStyling = function($item) {
    this.$items.removeClass('tree-focus').attr('tabindex', '-1');
    $item.addClass('tree-focus').attr('tabindex', '0');
  }

  function handleKeyDown = function($item, e) {
    var curNdx = this.$visibleItems.index($item);

    if ((e.altKey || e.ctrlKey) ||
      (e.shiftKey && e.keyCode != this.keys.tab)) {
      return true;
    }

    switch (e.keyCode) {
      case this.keys.tab:
        {
          this.$activeItem = null;
          $item.removeClass('tree-focus');
          return true;
        }
      case this.keys.home:
        {
          this.$activeItem = this.$parents.first();
          this.$activeItem.focus();
          e.stopPropagation();
          return false;
        }
      case this.keys.end:
        {
          this.$activeItem = this.$visibleItems.last();
          this.$activeItem.focus();
          e.stopPropagation();
          return false;
        }
      case this.keys.enter:
      case this.keys.space:
        {
          if (!$item.is('.tree-parent')) {
            // do nothing
          } else {
            this.toggleGroup($item, true);
          }
          e.stopPropagation();
          return false;
        }
      case this.keys.left:
        {

          if ($item.is('.tree-parent') && $item.attr('aria-expanded') == 'true') {
            this.collapseGroup($item, true);
          } else {
            var $itemUL = $item.parent();
            var $itemParent = $itemUL.parent();
            this.$activeItem = $itemParent;
            this.$activeItem.focus();
          }
          e.stopPropagation();
          return false;
        }

      case this.keys.right:
        {
          if (!$item.is('.tree-parent')) {
            // do nothing
          } else if ($item.attr('aria-expanded') == 'false') {
            this.expandGroup($item, true);
          } else {
            this.$activeItem = $item.children('ul').children('li').first();
            this.$activeItem.focus();
          }
          e.stopPropagation();
          return false;
        }

      case this.keys.up:
        {
          if (curNdx > 0) {
            var $prev = this.$visibleItems.eq(curNdx - 1);
            this.$activeItem = $prev;
            $prev.focus();
          }
          e.stopPropagation();
          return false;
        }
      case this.keys.down:
        {
          if (curNdx < this.$visibleItems.length - 1) {
            var $next = this.$visibleItems.eq(curNdx + 1);
            this.$activeItem = $next;
            $next.focus();
          }
          e.stopPropagation();
          return false;
        }
      case this.keys.asterisk:
        {
          var thisObj = this;
          this.$parents.each(function() {
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

  function handleKeyPress = function($item, e) {
    if (e.altKey || e.ctrlKey || e.shiftKey) {
      // do nothing
      return true;
    }

    switch (e.keyCode) {
      case this.keys.tab:
        {
          return true;
        }
      case this.keys.enter:
      case this.keys.home:
      case this.keys.end:
      case this.keys.left:
      case this.keys.right:
      case this.keys.up:
      case this.keys.down:
        {
          e.stopPropagation();
          return false;
        }
      default:
        {
          var chr = String.fromCharCode(e.which);
          var bMatch = false;
          var itemNdx = this.$visibleItems.index($item);
          var itemCnt = this.$visibleItems.length;
          var curNdx = itemNdx + 1;

          // check if the active item was the last one on the list
          if (curNdx == itemCnt) {
            curNdx = 0;
          }

          // Iterate through the menu items (starting from the current item and wrapping) until a match is found
          // or the loop returns to the current menu item
          while (curNdx != itemNdx) {

            var $curItem = this.$visibleItems.eq(curNdx);
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
            this.$activeItem = this.$visibleItems.eq(curNdx);
            this.$activeItem.focus();
          }

          e.stopPropagation();
          return false;
        }
    }

    return true;
  }

  function handleDblClick = function($id, e) {
    if (e.altKey || e.ctrlKey || e.shiftKey) {
      // do nothing
      return true;
    }
    this.$activeItem = $id;
    this.updateStyling($id);
    this.toggleGroup($id, true);
    e.stopPropagation();
    return false;
  }

  function handleClick = function($id, e) {
    if (e.altKey || e.ctrlKey || e.shiftKey) {
      // do nothing
      return true;
    }
    this.$activeItem = $id;
    this.updateStyling($id);
    e.stopPropagation();
    return false;
  }

  function handleFocus = function($item) {
    if (this.$activeItem == null) {
      this.$activeItem = $item;
    }
    this.updateStyling(this.$activeItem);
    return true;
  }

  $(document).ready(function() {
    $('.Treeview').each(function(i, el){
        new Treeview(el);
    });
  });

  function init() {
    this.$id = $(selector);
    this.$items = this.$id.find('li');
    this.$parents = this.$id.find('.tree-parent');
    this.$visibleItems = null;
    this.$activeItem = null;

    this.$parents.each(function() {
      if ($(this).attr('aria-expanded') == 'false') {
        $(this).children('ul').hide().attr('aria-hidden', 'true');
      }
    });
    this.$visibleItems = this.$id.find('li:visible');
    this.bindHandlers();
  }

  init();

}

module.exports = Treeview;
