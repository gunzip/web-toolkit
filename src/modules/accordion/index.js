import Fraccordion from 'fr-accordion';
import stylesheet from 'fr-accordion/accordion.css';

module.exports = Fraccordion({
	// String - Use header id on element to tie each accordion panel to its header - see panelIdPrefix
	headerIdPrefix: 'accordion-header',
	// String - Use panel id on element to tie each accordion header to its panel - see headerIdPrefix
	panelIdPrefix: 'accordion-panel',
	// Boolean - If set to false, all accordion panels will be closed on init()
	firstPanelsOpenByDefault: false,
	// Boolean - If set to false, each accordion instance will only allow a single panel to be open at a time
	multiselectable: false,
	// String - Class name that will be added to the selector when the component has been initialised
	readyClass: 'fr-accordion--is-ready'
});
