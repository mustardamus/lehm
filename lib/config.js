'use strict'

const path = require('path')

module.exports = class Config {
  constructor (configPath) {
    if (!configPath) {
      configPath = path.join(__dirname, '../config.json')
    }

    this.configPath = configPath
  }

  read () {
    let homePath = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME']
    let config = require(this.configPath)
    config.templatesPath = config.templatesPath.replace('~', homePath)

    return config
  }
}
