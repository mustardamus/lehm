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
    this.config = config
  }

  read () {
    if (this.config) {
      return this.config
    } else {
      return rc('lehm', this.defaults())
    }
  }

  save (obj) {
    let rcPath = path.join(this.homePath, '.lehmrc')
    let json = JSON.stringify(obj, null, 2)

    fs.writeFileSync(rcPath, json, 'utf8')
  }
}
