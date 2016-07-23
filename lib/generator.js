'use strict'

const _ = require('lodash')
const Fs = require('fs-extra')
const path = require('path')
const Inquirer = require('inquirer')
const Shell = require('shelljs')
const Chalk = require('chalk')
const Handlebars = require('./handlebars')

module.exports = class Generator {
  constructor (templateObj, data, delimiters, distPath) {
    this.templateObj = templateObj
    this.srcPath = templateObj.path
    this.distPath = distPath || process.cwd()
    this.filesArr = templateObj.files
    this.beforeHook = templateObj.before
    this.afterHook = templateObj.after
    this.data = data
    this.Handlebars = new Handlebars(delimiters)
    this.utils = { Fs, Inquirer, Shell, Chalk, Handlebars }
  }

  run () {
    if (_.isFunction(this.beforeHook)) {
      this.beforeHook.call(
        this.templateObj, this.srcPath, this.distPath, this.data, this.utils,
        (err, data) => {
          if (err) {
            console.log(Chalk.red(err))
          } else {
            this.process()
          }
        }
      )
    } else {
      this.process()
    }
  }

  process () {
    Fs.ensureDirSync(this.distPath)

    for (let filePath of this.filesArr) {
      let fileSrcPath = path.join(this.srcPath, filePath)
      let srcContent = Fs.readFileSync(fileSrcPath, 'utf8')
      let fileDistPath = this.Handlebars.transform(filePath, this.data)
      let fullDistPath = path.join(this.distPath, fileDistPath)
      let distContent = this.Handlebars.transform(srcContent, this.data)

      Fs.ensureFileSync(fullDistPath)
      Fs.writeFileSync(fullDistPath, _.trim(distContent) + '\n', 'utf8')
    }

    if (_.isFunction(this.afterHook)) {
      this.afterHook.call(
        this.templateObj, this.srcPath, this.distPath, this.data, this.utils
      )
    }
  }
}
