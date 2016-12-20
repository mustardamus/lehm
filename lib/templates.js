'use strict'

const _ = require('lodash')
const fs = require('fs-extra')
const path = require('path')
const glob = require('glob')
const minimatch = require('minimatch')

module.exports = class Templates {
  constructor (templatesPath) {
    this.templatesPath = templatesPath
  }

  getTemplates () {
    if (!fs.existsSync(this.templatesPath)) {
      return null
    }

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
    let retObj = { path: templatePath, files: [] }
    let metaPath = path.join(templatePath, templateName + '.js')
    let globPattern = path.join(templatePath, '**/*')

    if (fs.existsSync(metaPath)) {
      _.assign(retObj, require(metaPath))
    }

    for (let partPath of glob.sync(globPattern)) {
      let skip = false
      let basename = path.basename(partPath)
      let shortPath = partPath.replace(templatePath + '/', '')

      if (_.isArray(retObj.ignore)) {
        for (let ignoreMatch of retObj.ignore) {
          if (minimatch(basename, ignoreMatch)) {
            skip = true
            break
          }
        }
      }

      if (fs.lstatSync(partPath).isDirectory() ||
          shortPath === `${templateName}.js`
      ) {
        skip = true
      }

      if (!skip) {
        retObj.files.push(shortPath)
      }
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
