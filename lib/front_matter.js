'use strict'

const _ = require('lodash')
const fs = require('fs-extra')
const yamlFront = require('yaml-front-matter')

module.exports = class FrontMatter {
  extractFromString (str) {
    let obj = yamlFront.loadFront(str)

    delete obj.__content

    if (_.size(obj) !== 0) {
      return obj
    } else {
      return false
    }
  }

  extractFromFile (path) {
    let content = fs.readFileSync(path, 'utf8')

    return this.extractFromString(content)
  }
}
