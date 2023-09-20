# lineup

Plan your softball team's batting order and field positions.

[Try the live app now!](https://krazkidd.github.io/lineup/)

Project hosted at: https://github.com/krazkidd/lineup

License: AGPLv3 (see LICENSE.md file)

## Features

* Set player jersey numbers and field positions
* Drag-and-drop to reorder players
* Lock the lineup
  * Only field positions can be changed after locking
* Customizable team colors
* Dark mode

The app can be used without an active internet connection by making use of local browser storage. (This may change in the future.)

## Development

### VS Code Recommended Extensions:

- [vue.volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
- [vue.vscode-typescript-vue-plugin](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)
  - With [Takeover Mode](https://vuejs.org/guide/typescript/overview.html#volar-takeover-mode) enabled
- [bradlc.vscode-tailwindcss](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
  - Consider installing [moalamri.inline-fold
](https://marketplace.visualstudio.com/items?itemName=moalamri.inline-fold) or similar to collapse verbose Tailwind CSS classes

### Setup

To install dependencies and run the Vite development server:

```bash
npm install
npm run dev
```

The server listens on http://localhost:3000/.

## Deployment

Only static Nuxt deployments (SSG) are supported at this time. This is due to a limitation in the way the Pinia and local storage Nuxt modules (i.e. the `defineStore()` and `useLocalStorage()` composables) work when Nuxt's server-side rendering (SSR) is enabled.

The basic problem is that hydration of the Pinia store on the client does not capture the locally-stored app state. Because of this, SSR is disabled with `ssr: false`. You may find additional details [here](https://github.com/krazkidd/lineup/pull/3).

### Static Site Generation (SSG)

To pre-render the app as static files, run:

```bash
npm run generate
```

Then simply copy the contents of the `.output/public/` directory to your host. An `index.html` entry point and a `404.html` error page are provided and may need to be configured for use by your server.

For a preview of the generated site on http://localhost:3000/, you can run:

```bash
npm run preview
```

## Hosting

### GitHub Pages (free)

A workflow is available under `.github/workflows/` which will run the SSG command and publish `.output/public/` to your repository's Pages site.

### DigitalOcean App Platform (free)

An app spec is available under `.do/` which will run the SSG command and publish `.output/public/` to DigitalOcean's App Platform. Some modification will be required to point to your repository (rather than this one). Additional configuration of the App Platform may be necessary. (Make sure you have the free plan selected.)

## Attributions

The softball favicon (`public/favicon/favicon.ico`) is used under the [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) license from the [twemoji](https://github.com/twitter/twemoji) project.