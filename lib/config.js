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
    return require(this.configPath)
  }
}
