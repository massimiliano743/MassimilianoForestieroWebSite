# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

## Backend API locale

Nel progetto è presente un semplice server Express nella cartella `server` che espone l'endpoint:

GET /api/hello -> { "message": "Ciaoooo poppi" }

### Avvio backend

```
cd server
npm install
npm start
```

Il server parte sulla porta 4000 (http://localhost:4000).

### Avvio frontend

In un secondo terminale, dalla root del progetto:

```
npm install
npm start
```

In sviluppo il proxy (campo `proxy` in package.json) inoltra /api/* al backend.

### Build produzione

```
npm run build
```

(Se vuoi servire la build con Express aggiungi static + fallback su index.html.)

## Struttura del progetto (architettura attuale)

```
src/
  api/
    helloApi.js          # Funzioni di chiamata API (nessuno stato)
  hooks/
    useHello.js          # Logica di fetching + loading/error/data
  components/
    Layout.jsx           # Macro layout (wrapper comune)
    NavBar.jsx           # Navigazione (link principali)
    HelloMessage.jsx     # Sotto-componente presentazionale (solo props)
  pages/
    HomePage.jsx         # Macro-pagina: compone hook + componenti
    AboutMe.jsx       # Altra macro-pagina
  App.js                 # Routing (BrowserRouter + Routes)
  index.js               # Bootstrap React
```

### Linee guida

- API wrapper: solo funzioni async che ritornano dati o lanciano errori.
- Hook: orchestrano chiamate, gestiscono stato (loading/error/data) e isolano la logica.
- Componenti presentazionali: nessuna fetch, solo UI in base alle props.
- Pagine: aggregano hook + componenti e definiscono la struttura della vista.
- Layout: contenitore globale (nav, footer, ecc.).
- Routing centralizzato in `App.js`.

### Aggiungere una nuova pagina

1. Creare eventuale API wrapper (se servono nuove chiamate) in `api/`.
2. Creare un hook dedicato in `hooks/` (es. `useUsers.js`).
3. Creare componenti UI riutilizzabili in `components/`.
4. Creare la macro-pagina in `pages/NuovaPagina.jsx` che usa hook + componenti.
5. Aggiungere la `<Route />` in `App.js` e il link in `NavBar.jsx`.

### Vantaggi della struttura

- Separazione chiara tra logica (hook) e presentazione (componenti).
- Facilità di test: i componenti presentazionali sono puri, gli hook si testano isolando fetch.
- Scalabile: aggiungere pagine non richiede modifiche invasive altrove.
