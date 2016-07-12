/*
'use strict'

let fs = require('fs')
let Hogan = require('hogan.js')
let yamlFront = require('yaml-front-matter')

let templatesPath = __dirname + '/../templates'

for(let path of fs.readdirSync(templatesPath)) {
  let fullPath = templatesPath + '/' + path
  let content = fs.readFileSync(fullPath, 'utf8')
  let yaml = yamlFront.loadFront(content)
  let tree = Hogan.parse(Hogan.scan(yaml.target))

  for(let node of tree) {
    if(node.tag === '_v') {
      console.log('ask for', node.n);
    }
  }
}

---
target: src/components/{{name}}{{version}}.vue
---

und hier so der content {{sgeht}}

*/
