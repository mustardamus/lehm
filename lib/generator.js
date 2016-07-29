'use strict'

const _ = require('lodash')
const Fs = require('fs-extra')
const path = require('path')
const Inquirer = require('inquirer')
const Shell = require('shelljs')
const Chalk = require('chalk')
const Handlebars = require('./handlebars')
const async = require('async')
const isBinaryFile = require('isbinaryfile')

module.exports = class Generator {
  constructor (templateObj, data, delimiters, distPath) {
    this.templateObj = templateObj
    this.srcPath = templateObj.path
    this.distPath = distPath || process.cwd()
    this.filesArr = templateObj.files
    this.beforeHook = templateObj.before
    this.afterHook = templateObj.after
    this.data = data
    this.utils = { _, Fs, Inquirer, Shell, Chalk }
    this.utils.Handlebars = new Handlebars(delimiters)
  }

  run () {
    if (_.isFunction(this.beforeHook)) {
      try {
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
      } catch (err) {
        console.log(Chalk.red('Error in "before" hook:\n' + err))
      }
    } else {
      this.process()
    }
  }

  askForFileAction (shortDistPath, cb) {
    Inquirer.prompt([{
      type: 'list',
      message: Chalk.red('File already exists: ') + Chalk.yellow(shortDistPath),
      name: 'action',
      choices: [
        {
          name: 'Overwrite existing file',
          value: 'overwrite'
        },
        {
          name: 'Skip and leave file alone',
          value: 'skip'
        }
      ]
    }]).then(cb)
  }

  writeFile (fileSrcPath, fileDistPath, cb) {
    if (isBinaryFile.sync(fileSrcPath)) {
      Fs.copySync(fileSrcPath, fileDistPath)
    } else {
      let srcContent = Fs.readFileSync(fileSrcPath, 'utf8')
      let transformed = this.utils.Handlebars.transform(srcContent, this.data)
      let distContent = _.trim(transformed) + '\n'

      Fs.ensureFileSync(fileDistPath)
      Fs.writeFileSync(fileDistPath, distContent, 'utf8')
    }

    cb()
  }

  processFile (fileSrcPath, fileDistPath, cb) {
    let shortSrcPath = fileSrcPath.replace(this.srcPath + '/', '')
    let shortDistPath = fileDistPath.replace(this.distPath + '/', '')
    let moveLog = Chalk.yellow(shortSrcPath) + Chalk.grey(' -> ') + Chalk.yellow(shortDistPath)

    if (!Fs.existsSync(fileDistPath)) {
      console.log(Chalk.green('Create'), moveLog)
      this.writeFile(fileSrcPath, fileDistPath, cb)
    } else {
      this.askForFileAction(shortDistPath, (answer) => {
        if (answer.action === 'overwrite') {
          console.log(Chalk.green('Overwrite'), moveLog)
          this.writeFile(fileSrcPath, fileDistPath, cb)
        } else {
          console.log(Chalk.green('Skip'), moveLog)
          cb()
        }
      })
    }
  }

  process () {
    Fs.ensureDirSync(this.distPath)

    async.eachSeries(this.filesArr, (filePath, cb) => {
      let fileSrcPath = path.join(this.srcPath, filePath)
      let fileDistPath = this.utils.Handlebars.transform(filePath, this.data)
      let fullDistPath = path.join(this.distPath, fileDistPath)

      this.processFile(fileSrcPath, fullDistPath, cb)
    }, () => {
      console.log(Chalk.green('File-generation done.'))

      if (_.isFunction(this.afterHook)) {
        try {
          this.afterHook.call(
            this.templateObj, this.srcPath, this.distPath, this.data, this.utils
          )
        } catch (err) {
          console.log(Chalk.red('Error in "after" hook:\n' + err))
        }
      }
    })
  }
}
