'use strict'

const chalk = require('chalk')
const Templates = require('./templates')

const templates = new Templates(__dirname + '/../test/fixtures')

module.exports = class Commands {
  list () {
    let templatesObj = templates.getTemplates()
    let templatesLog = []

    for (let templateName in templatesObj) {
      let template = templatesObj[templateName]
      let meta = chalk.green(templateName)
      let files = chalk.grey(template.files.join(' | '))

      if (template.description) {
        meta += chalk.yellow(' - ' + template.description)
      }

      templatesLog.push(meta + '\n' + files)
    }

    console.log(templatesLog.join('\n\n'))
  }

  create () {
    console.log('Create files from a template')
  }
}
