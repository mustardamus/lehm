'use strict'

const fs = require('fs-extra')
const yamlFront = require('yaml-front-matter')

module.exports = class FrontMatter {
  extractFromString (str) {
    let obj = yamlFront.loadFront(str)

    delete obj.__content
    return obj
  }

  extractFromFile (path) {
    let content = fs.readFileSync(path, 'utf8')

    return this.extractFromString(content)
  }
}
