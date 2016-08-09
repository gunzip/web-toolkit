---
order: 20
title: Contribuire al progetto
label: Contribuire al progetto
---

### Installazione dell'ambiente di sviluppo

La procedura di seguito descritta è rivolta a chi vuole contribuire allo sviluppo del tema / CSS
e non è necessaria per utilizzare il CSS all'interno di un sito web; tuttavia è fortemente consigliata
anche in questo caso poiché rappresenta il modo migliore e più rapido per poter **personalizzare i fogli di stile**
inclusi nel framework e costruire quindi un "tema" grafico specifico.

#### Ottenere i sorgenti

Per ottenere i sorgenti è possibile scaricare direttamente l'[archivio compresso](@TODO)
da GitHub.

In alternativa a tale procedura, è consigliato per il download l'utilizzo
del software di versionamento [Git](https://git-scm.com/): dopo aver
[installato Git](https://git-scm.com/book/it/v1/Per-Iniziare-Installare-Git)
è possibile effettuare una copia del repository in locale digitando da linea di comando:

```
> git clone @TODO
```

Questa modalità, alternativa al download diretto dell'archivio, permette di mantenere i sorgenti sincronizzati
con le nuove versioni del framework che verrano rilasciate nel tempo nonché di contribuire al progetto
chiedendo che le proprie modifiche vengano incorporate nella linea principale di sviluppo, vedi anche:

* [Fork a repo](https://help.github.com/articles/fork-a-repo/)
* [Using pull request](https://help.github.com/articles/using-pull-requests/)

#### Compilare i sorgenti

Per compilare i sorgenti (CSS / JS) è richiesta l'installazione di [Node.js / npm](https://nodejs.org)
dopodiché è possibile eseguire la sequenza di comandi:

```
> cd @TODO
> npm i -g @frctl/fractal
> npm install
> npm run build
```

A questo punto nella directory `styleguide` saranno disponibili i template HTML
corredati degli assets (CSS / JS) necessari.

#### Modificare i sorgenti

Per poter visualizzare la styleguide (i template HTML con i diversi componenti grafici)
è possibile sostituire come ultimo passaggio (a `npm run build`) il comando

```
npm run watch
```

e visitare con il browser la pagina [http://localhost:1310](http://localhost:1310)

Qualsiasi modifica effettuata da questo momento in poi ai fogli di stile CSS, Javascript e/o template HTML
sarà immediatamente visibile **senza dover ricaricare manualmente la pagina o lanciare il comando di build**.

Le variabili personalizzate sono contenute @TODO

Il comando:
````
> gulp dist
````
provvede a rigenerare la cartella `dist` rispecchiando le modifiche effettuate.

Durante lo sviluppo, è possibile utilizzare il comando:
````
> npm run watch
````
per mantenere allineato il file-system `dist` ad ogni salvataggio dei file `html` e `scss`.
