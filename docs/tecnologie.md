---
order: 15
title: Principali tecnologie utilizzate
label: Tecnologie utilizzate
---

Il toolkit è basato su alcuni software open source che assolvono
diversi task e di cui è bene possedere una conoscenza anche sommaria
prima di procedere a modificare i sorgenti.

## SUIT CSS

[SUIT CSS](http://suitcss.github.io/) è sia una metodologia di implementazione per i fogli di stile CSS
che un insieme di utilità atte a facilitarne la realizzazione.

1. Nella stesura del codice dei fogli di stile vengono adottate le
[convenzioni di nomenclatura](https://github.com/suitcss/suit/blob/master/doc/naming-conventions.md)
documentate sul sito di SUIT CSS.

2. Vengono utilizzate le [classi di utilità](https://github.com/suitcss/suit/blob/master/doc/utilities.md)
fornite dalla libreria. Si consiglia in particolare di far riferimento alla
[documentazione online delle classi SUIT CSS](https://github.com/suitcss/utils)

3. Viene utilizzato il [preprocessore CSS di SUIT](https://github.com/suitcss/preprocessor)
ovvero PostCSS corredato da un insieme di plugin *ad-hoc* che è possibile
visualizzare allinterno del file `.postcss.js` contenuto nella directory radice del *repository*.

## PostCSS

[PostCSS](http://postcss.org/) è un tool che permette di manipolare i CSS tramite javascript.

I fogli di stile del toolkit vengono trasformati tramite PostCSS: in questo modo è possibile
usufruire di alcuni costrutti non standard che agevolano il mantenimento del codice.
Si consiglia di far riferimento alla documentazione online dei singoli plugin:

- [postcss-devtools](https://github.com/postcss/postcss-devtools)
- [postcss-easy-import](https://github.com/TrySound/postcss-easy-import)
- [postcss-custom-properties](https://github.com/postcss/postcss-custom-properties)
- [postcss-custom-media](https://github.com/postcss/postcss-custom-media)
- [postcss-nesting](https://github.com/jonathantneal/postcss-nesting)
- [postcss-extend](https://github.com/travco/postcss-extend)
- [postcss-color-function](https://github.com/postcss/postcss-color-function)
- [postcss-inline-svg](https://github.com/TrySound/postcss-inline-svg)
- [postcss-assets](https://github.com/assetsjs/postcss-assets)
- [postcss-url](https://github.com/postcss/postcss-url)
- [postcss-calc](https://github.com/postcss/postcss-calc)
- [autoprefixer](https://github.com/postcss/autoprefixer)
- [postcss-pseudoelements](https://github.com/axa-ch/postcss-pseudoelements)
- [postcss-flexbugs-fixes](https://github.com/luisrudge/postcss-flexbugs-fixes)
- [postcss-reporter](https://github.com/postcss/postcss-reporter)

## Verifica della sintassi

Per il *linting* (ovvero, l'analisi del codice in cerca di errori e/o costrutti con sintassi errata)
vengono utlizzati i due tool:

- [stylelint](http://stylelint.io/) - per il codice CSS
- [ESlint](http://eslint.org/) - per il codice Javascript

## Generazione della styleguide e dei moduli CSS / JS

Due tool sono attivati dagli *script npm* secondo le modalità descritte
nel capitolo successivo: ["Utilizzare l'ambiente di sviluppo"](./sviluppare).

- [fractal](http://fractal.build) è utilizzato per generare la *styleguide* (l'elenco navigabile dei componenti grafici)
- [webpack](https://webpack.github.io) organizza i moduli CSS / Javascript in modo da poter esser utilizzati in produzione

Non è necessario conoscere il funzionamento di questi due tool che vengono qui citati per completezza.
