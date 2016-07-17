'use strict'

const path = require('path')
const chalk = require('chalk')
const Config = require('./config')
const Templates = require('./templates')
const Prompt = require('./prompt')
const Parser = require('./parser')

const config = new Config()
const templatesPath = config.read().templatesPath
const templates = new Templates(templatesPath)
const templatesObj = templates.getTemplates()
const prompt = new Prompt()
const parser = new Parser()

module.exports = class Commands {
  list () {
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

  create (templateName) {
    const parseTemplate = function (templateName) {
      let templatePath = path.join(templatesPath, templateName)
      let filesArr = templatesObj[templateName].files
      let variables = parser.parseFiles(templatePath, filesArr)
      let questions = prompt.questionsFromVariables(variables)

      prompt.ask(questions, (answers) => {
        console.log(answers)
      })
    }

    if (templateName) {
      if (templatesObj[templateName]) {
        parseTemplate(templateName)
      } else {
        console.log(
          chalk.red('Can not find template "' + templateName + '".\n') +
          chalk.yellow('List templates with: ') +
          'lehm list'
        )
      }
    } else {
      let questions = prompt.questionsFromTemplates(templatesObj)

      prompt.ask(questions, (answers) => {
        parseTemplate(answers.template)
      })
    }
  }
}
