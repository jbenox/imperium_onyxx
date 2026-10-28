# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  # ONYX Frontend

  Frontend React + TypeScript construit avec Vite pour le site vitrine et la boutique ONYX.

  ## Demarrage

  ```sh
  npm install
  npm run dev
  ```

  Le serveur Vite utilise le port `5173` et relaie les routes `/api` vers le backend Spring Boot sur `http://localhost:8080`.

  Pour cibler un autre backend, definir `VITE_API_URL` dans un fichier `.env.local`. Le fichier `.env.example` indique le nom de la variable.

  La boutique charge `GET /api/catalog/products`. Les autres parcours de commande, paiement et espace client seront raccordes quand les routes correspondantes seront disponibles dans le backend.

  ## Qualite

  ```sh
  npm run lint
  npm run build
  ```
])
