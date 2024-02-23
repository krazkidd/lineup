# TODO.md

- use a bundler for DO function
  https://docs.digitalocean.com/products/functions/reference/runtimes/node-js/

- for documenting GH deployment workflow, https://github.com/krazkidd/lineup/issues/13
  see these:
  - https://duckduckgo.com/?t=ftsa&q=NITRO_PRESET+digital-ocean+github_pages&atb=v337-1&ia=web
  - https://nitro.unjs.io/deploy/providers/digitalocean
  - https://www.nitropack.org/deploy/providers/github-pages

- specify typescript takeover *option* rather than unwanted extension

try using useQRCode (still uses qrcode package)
- https://vueuse.org/integrations/useQRCode/

- primeicons should be regular dependency (only required if using outside of prime components?)
  https://primevue.org/icons

- use build setting to copy emoji assets and remove the images from the repo
  - this doesn't appear to be a desirable option anymore. there is no npm package for the icons and git submodules don't appear to be very popular. also, what if something happens to the source project? it's better to keep a copy of the icons
- try using NuxtImg module
  https://image.nuxt.com/get-started/installation
  - images may have to go in assets/ folder
  - this probably has no benefit when used with SVGs

- try importing constants/defaults as json
  https://vitejs.dev/guide/features.html#json

- global PrimeVue config in nuxt.config
  - improve popup dialogs (i.e. content padding)
  
- enable stricter type checking
  https://nuxt.com/docs/guide/concepts/typescript

- review missing _payload.json errors in console (lineup page)
  - the app seems to run fine despite it
  - is related to SSG in nitro or possibly vue router
    - review menu hacks!
    - maybe its the `<ClientOnly>` element?
  - possibly can be worked around with experimental payload extraction and build manifest flags
  - can we get any info from nuxt dev tools?

- clean up uses of `!` in typescript
  https://stackoverflow.com/questions/71186657/is-it-possible-for-firestore-document-snapshot-data-to-be-undefined
- clean up uses of `!` in tailwind css
- review Lineup type alias

- use `<style scoped lang="postcss">` but have to find better language support for syntax highlighting in VS CODE

- add note on configuring firestore admin
  https://vuefire.vuejs.org/nuxt/getting-started.html#Configuring-the-Admin-SDK
- remove firebase config from source control (and change it)

- review nuxt 3.8 release notes (and watch nuxt nation video?)
  https://github.com/nuxt/nuxt/releases/tag/v3.8.0
