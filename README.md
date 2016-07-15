Wie könnte das aussehen? Einmal für nen gesamtes Projekt, und dann auch für
Componenten.

## Project

./templates/projects/vue-frontend = hier sind alle templates drin, und init file
./templates/projects/vue-frontend/vue-frontend.js = diese init wird aufgerufen nachdem templates generiert und alle variablen gesammelt sind

./templates/projects/vue-frontend/package.json = template:

      {
        "normal": true
        [[if debug]]"debug: true"[[endif]]
      }

(project templates müssen keinen front-matter haben, dann werden sie einfach so
geparsed und an den gleichen path kopiert)


./templates/projects/vue-frontend/client/index.js = template:

      ---
      target: client/[[entryName]].js
      ---

      [[if debug]]console.log('debug')[[endif]]
