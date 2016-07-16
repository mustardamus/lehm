'use strict'

let hogan = require('hogan.js')
let Handlebars = require('handlebars')

Handlebars.registerHelper('variable', (desc, options) => {
  console.log('XXX', options, desc);
})

module.exports = class Template {
  getVariableNames (str) {
    let retArr = []
    let ast = Handlebars.parse(str).body

    for (let node of ast) {
      let name = null
      let type = null

      switch (node.type) {
        case 'MustacheStatement':
          name = node.path.original
          type = 'string'
          break
        case 'BlockStatement':
          console.log(JSON.stringify(node, null, 2));
          break
      }
    }

    var template = Handlebars.compile(str)
    console.log(template({}))
    console.log(retArr);
  }
}
