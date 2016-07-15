'use strict'

const _ = require('lodash')
const fs = require('fs-extra')
const yamlFront = require('yaml-front-matter')

module.exports = class Content {
  extractFromString (str) {
    let content = yamlFront.loadFront(str).__content

    return _.trim(content)
  }

  extractFromFile (path) {
    let content = fs.readFileSync(path, 'utf8')

    return this.extractFromString(content)
  }
}
