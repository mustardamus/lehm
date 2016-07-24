'use strict'

const path = require('path')
const fs = require('fs')
const rc = require('rc')

module.exports = class Config {
  defaults () {
    return {
      templatesPath: path.join(this.homePath, 'templates'),
      handlebarsDelimiters: '{{ }}'
    }
  }

  constructor (config) {
    this.homePath = process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME']

    if (config) {
      this.config = config
    } else {
      this.config = rc('lehm', this.defaults())
    }

    if (this.config.templatesPath.charAt(0) === '.') {
      this.config.templatesPath = path.resolve(process.cwd(), this.config.templatesPath)
    }
  }

  save (obj) {
    let rcPath = path.join(this.homePath, '.lehmrc')
    let json = JSON.stringify(obj, null, 2)

    fs.writeFileSync(rcPath, json, 'utf8')
  }
}
