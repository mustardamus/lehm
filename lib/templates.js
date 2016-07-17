'use strict'

const _ = require('lodash')
const fs = require('fs-extra')
const path = require('path')
const glob = require('glob')

module.exports = class Templates {
  constructor (templatesPath) {
    let homePath = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'] // this should be in config class
    this.templatesPath = templatesPath.replace('~', homePath)
  }

  getTemplates () {
    let retObj = {}

    for (let templateName of fs.readdirSync(this.templatesPath)) {
      let templatePath = path.join(this.templatesPath, templateName)
      retObj[templateName] = this.getTemplateObj(templateName, templatePath)
    }

    return retObj
  }

  getTemplateObj (templateName, templatePath) {
    let retObj = { files: [] }
    let metaPath = path.join(templatePath, templateName + '.js')
    let globPattern = path.join(templatePath, '**/*')
    let ignoreArr = []

    if (fs.existsSync(metaPath)) {
      let meta = require(metaPath)

      if (meta.description) {
        retObj.description = meta.description
      }

      if (meta.ignore) {
        ignoreArr = meta.ignore
      }
    }

    for (let partPath of glob.sync(globPattern)) {
      let basename = path.basename(partPath)
      let shortPath = partPath.replace(templatePath + '/', '')

      if (_.includes(ignoreArr, basename) ||
        fs.lstatSync(partPath).isDirectory() ||
        shortPath === templateName + '.js'
      ) {
        continue
      }

      retObj.files.push(shortPath)
    }

    return retObj
  }
}
