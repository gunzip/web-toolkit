---
order: 25
title: Creare o modificare un modulo
label: Creare o modificare un modulo
---

Gli elementi dell'interfaccia (moduli), contenuti nella directory `src/modules` sono costituiti da:

1. uno (o più) file **CSS**
2. uno (o più) file **Javascript**
3. uno (o più) snippet HTML di esempio (file \*.tmpl)

All'interno della directory di ogni modulo deve esser presente almeno una tra queste tre componenti.

Negli snippet HTML è possibile utilizzare i costrutti del
[linguaggio di templating nunjucks](https://mozilla.github.io/nunjucks/).

I CSS vengono processati tramite PostCSS (e plugin, vedi la sezione "[Tecnologie](/docs/tecnologie)").

Nei file Javascript è possibile utilizzare la sintassi [ECMAScript 2015](https://babeljs.io/docs/learn-es2015/).

### Regole generali nello sviluppo di nuovi moduli

- i moduli devono essere quanto più possibile indipendenti tra loro
- i CSS possono utilizzare le classi di utilità (quelle con prefisso `u-*`), ma **mai** incorporare selettori di altri moduli
- [le regole di nomenclatura sono quelle di SUIT CSS](https://github.com/suitcss/suit/blob/master/doc/naming-conventions.md)
- i Javascript devono dichiarare tutte le loro dipendenze (es. tramite il costrutto `import`)
- è incoraggiato l'utilizzo del costrutto PostCSS `@extend`, ma **esclusivamente** per estendere le classi di utilità (`u-*`)

[Struttura del filesystem](/docs/struttura)
