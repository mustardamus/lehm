'use strict'

const _ = require('lodash')
const fs = require('fs-extra')
const path = require('path')
const Handlebars = require('./handlebars')

module.exports = class Generator {
  constructor (templateObj, data, delimiters, distPath) {
    this.srcPath = templateObj.path
    this.distPath = distPath || process.cwd()
    this.filesArr = templateObj.files
    this.data = data
    this.Handlebars = new Handlebars(delimiters)
  }

  run () {
    fs.ensureDirSync(this.distPath)

    for (let filePath of this.filesArr) {
      let fileSrcPath = path.join(this.srcPath, filePath)
      let srcContent = fs.readFileSync(fileSrcPath, 'utf8')
      let fileDistPath = this.Handlebars.compile(filePath)(this.data)
      let fullDistPath = path.join(this.distPath, fileDistPath)
      let distContent = this.Handlebars.compile(srcContent)(this.data)

      fs.ensureFileSync(fullDistPath)
      fs.writeFileSync(fullDistPath, _.trim(distContent) + '\n', 'utf8')
    }
  }
}
