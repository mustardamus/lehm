'use strict'

const _ = require('lodash')
const fs = require('fs-extra')
const path = require('path')
const glob = require('glob')

module.exports = class Templates {
  constructor (templatesPath) {
    this.templatesPath = templatesPath
  }

  getTemplates () {
    let retObj = {}
    let paths = fs.readdirSync(this.templatesPath)

    for (let templateName of paths) {
      let templatePath = path.join(this.templatesPath, templateName)

      if (fs.lstatSync(templatePath).isDirectory()) {
        retObj[templateName] = this.getTemplateObj(templateName, templatePath)
      }
    }

    return retObj
  }

  getTemplateObj (templateName, templatePath) {
    let retObj = { files: [] }
    let metaPath = path.join(templatePath, templateName + '.js')
    let globPattern = path.join(templatePath, '**/*')

    if (fs.existsSync(metaPath)) {
      _.assign(retObj, require(metaPath))
    }

    for (let partPath of glob.sync(globPattern)) {
      let basename = path.basename(partPath)
      let shortPath = partPath.replace(templatePath + '/', '')

      if (_.includes(retObj.ignore, basename) ||
        fs.lstatSync(partPath).isDirectory() ||
        shortPath === templateName + '.js'
      ) {
        continue
      }

      retObj.files.push(shortPath)
    }

    return retObj
  }

  findTemplateName (name) {
    let templatesObj = this.getTemplates()

    for (let templateName in templatesObj) {
      if (templateName === name || templatesObj[templateName].name === name) {
        return templateName
      }
    }

    return null
  }
}
