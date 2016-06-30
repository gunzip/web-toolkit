import Froffcanvas from 'fr-offcanvas';

/* eslint-disable no-unused-vars */

import stylesheet from 'fr-offcanvas/offcanvas.css';

/* eslint-enable */

module.exports = Froffcanvas({
	// String - Selector for the open button(s)
	openSelector: '.js-fr-offcanvas-open',

	// String - Selector for the close button
	closeSelector: '.js-fr-offcanvas-close',

	// String - Class name that will be added to the selector when the component has been initialised
	readyClass: 'is-ready',

	// String - Class name that will be added to the selector when the panel is visible
	activeClass: 'is-active'
});
