'use strict'

const chalk = require('chalk')
const Templates = require('./templates')
const Prompt = require('./prompt')
const Parser = require('./parser')

const templates = new Templates(__dirname + '/../test/fixtures')
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
      console.log('parse all files', templatesObj[templateName]);
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
