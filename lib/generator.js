'use strict'

const _ = require('lodash')
const Fs = require('fs-extra')
const path = require('path')
const Inquirer = require('inquirer')
const Shell = require('shelljs')
const Chalk = require('chalk')
const Handlebars = require('./handlebars')
const async = require('async')

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

  askForFileAction (shortDistPath, cb) {
    Inquirer.prompt([{
      type: 'list',
      message: Chalk.red('File already exists: ') + Chalk.yellow(shortDistPath),
      name: 'action',
      choices: [
        {
          name: 'Append to existing file',
          value: 'append'
        },
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

  processFile (fileSrcPath, fileDistPath, cb) {
    let shortSrcPath = fileSrcPath.replace(this.srcPath + '/', '')
    let shortDistPath = fileDistPath.replace(this.distPath + '/', '')
    let srcContent = Fs.readFileSync(fileSrcPath, 'utf8')
    let transformed = this.utils.Handlebars.transform(srcContent, this.data)
    let distContent = _.trim(transformed) + '\n'
    let moveLog = Chalk.yellow(shortSrcPath) + Chalk.grey(' -> ') + Chalk.yellow(shortDistPath)
    let writeDistFile = function () {
      Fs.ensureFileSync(fileDistPath)
      Fs.writeFileSync(fileDistPath, distContent, 'utf8')
      cb()
    }

    if (!Fs.existsSync(fileDistPath)) {
      console.log(Chalk.green('Create'), moveLog)
      writeDistFile()
    } else {
      this.askForFileAction(shortDistPath, (answer) => {
        switch (answer.action) {
          case 'append':
            distContent = srcContent + '\n' + distContent
            console.log(Chalk.green('Append'), moveLog)
            writeDistFile()
            break
          case 'overwrite':
            console.log(Chalk.green('Overwrite'), moveLog)
            writeDistFile()
            break
          default:
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
      if (_.isFunction(this.afterHook)) {
        this.afterHook.call(
          this.templateObj, this.srcPath, this.distPath, this.data, this.utils
        )
      }

      console.log(Chalk.green('Done.'))
    })
  }
}
