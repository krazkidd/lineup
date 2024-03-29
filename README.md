# lineup

Plan your softball team's batting order and field positions. Then share a live scoreboard through a URL!

[Try the live app now!](https://krazkidd.github.io/lineup/)

Project hosted at: https://github.com/krazkidd/lineup

License: AGPLv3 (see LICENSE.md file)

## Features

* Set player jersey numbers and field positions
* Drag-and-drop to reorder players
* Lock the lineup
  * Only field positions can be changed after locking
* Live (real time) scoreboard which can be accessed by friends through a URL
  * React with emojis!
* Customizable team colors
* Dark mode

## Development

### Setup

To install dependencies:

```bash
npm install
```

Google provides emulators of their cloud services for dev builds. You do not need a Firebase project to run the emulators. To install the Firebase CLI, [follow these instructions](https://www.npmjs.com/package/firebase-tools#installation) or simply run:

```bash
npm install -g firebase-tools
```

Then, to start the emulators and the app in dev mode:

```bash
npm run firebase:emulators
npm run dev
```

The server listens on http://localhost:3000/.

## Deployment

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

### Publish Firestore Indexes and Security Rules

If the Firestore indexes or security rules have changed, they will need to be pushed during deployment of the app.

Automating this is not so easy (see [#21](https://github.com/krazkidd/lineup/issues/21)), but it can be done through the Firebase CLI.

```bash
firebase login
npm run firebase:deploy
```

> **Warning**<br>
By deploying the app and Firestore configuration separately, there is no way to avoid a race condition. Index builds are ["long-running operations"](https://firebase.google.com/docs/firestore/query-data/indexing#index_build_time) and security rules can take [several minutes to propagate](https://firebase.google.com/docs/rules/manage-deploy).

## Hosting

### GitHub Pages (free)

A workflow is available under `.github/workflows/` which will run the SSG command and publish `.output/public/` to your repository's Pages site. A `gh-pages` branch is therefore not required.

### DigitalOcean App Platform (free)

An app spec is available under `.do/` which will run the SSG command and publish `.output/public/` to DigitalOcean's App Platform. Some modification will be required to point to your repository (rather than this one). Additional configuration of the App Platform may be necessary. (Make sure you have the free plan selected.)

## Attributions

The softball favicon (`public/favicon/favicon.ico`) is used under the [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) license from the [twemoji](https://github.com/twitter/twemoji) project.

The react emojis (`assets/images/fluentui-emoji`) are used under the [MIT license](https://opensource.org/license/mit/) from the [Fluent Emoji](https://github.com/microsoft/fluentui-emoji) project.