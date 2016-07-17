'use strict'

const path = require('path')
const fs = require('fs-extra')

module.exports = class Config {
  constructor (configPath) {
    if (!configPath) {
      configPath = path.join(__dirname, '../config.json')
    }

    this.configPath = configPath
  }

  read () {
    let homePath = process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME']
    let config = require(this.configPath)
    config.templatesPath = config.templatesPath.replace('~', homePath)

    return config
  }

  save (obj) {
    fs.writeFileSync(this.configPath, JSON.stringify(obj, null, 2), 'utf8')
  }
}
