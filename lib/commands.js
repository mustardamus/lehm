'use strict'

const chalk = require('chalk')
const fs = require('fs')
const Config = require('./config')
const Templates = require('./templates')
const Prompt = require('./prompt')
const Parser = require('./parser')
const Generator = require('./generator')

const config = new Config()
const templatesPath = config.config.templatesPath
const handlebarsDelimiters = config.config.handlebarsDelimiters
const templates = new Templates(templatesPath)
const prompt = new Prompt()

module.exports = class Commands {
  config () {
    let questions = [
      {
        name: 'templatesPath',
        message: 'Templates Path',
        default: templatesPath,
        validate: function (val) {
          if (fs.existsSync(val)) {
            return true
          } else {
            return 'Directory "' + val + '" does not exist'
          }
        }
      },
      {
        name: 'handlebarsDelimiters',
        message: 'Handlebars Delimiters',
        default: handlebarsDelimiters,
        validate: function (val) {
          if (val.split(' ').length !== 2) {
            return 'Must have format "open[SPACE]close", for example "<% %>"'
          }

          return true
        }
      }
    ]

    prompt.ask(questions, (answers) => {
      config.save(answers)
      console.log(chalk.green('Saved.'))
    })
  }

  list () {
    let templatesObj = templates.getTemplates()
    let templatesLog = []

    if (!templatesObj) {
      console.log(chalk.red('Templates folder does not exist:'), templatesPath)
      return
    }

    for (let templateName in templatesObj) {
      let template = templatesObj[templateName]
      let meta = chalk.green(templateName)

      if (template.name) {
        meta = chalk.green(template.name) + chalk.yellow(' (' + templateName + ')')
      }

      if (template.description) {
        meta += chalk.grey(' - ' + template.description)
      }

      templatesLog.push(chalk.yellow('- ') + meta)
    }

    console.log(chalk.cyan('Templates Path:'), templatesPath + '\n')
    console.log(templatesLog.join('\n'))
  }

  create (templateName) {
    let templatesObj = templates.getTemplates()

    if (!templatesObj) {
      console.log(chalk.red('Templates folder does not exist:'), templatesPath)
      return
    }

    let parseTemplate = function (templateName) {
      let templateObj = templatesObj[templateName]
      let delimiters = templateObj.delimiters || handlebarsDelimiters
      let parser = new Parser(delimiters)
      let variables = parser.parseFiles(templateObj)
      let questions = prompt.questionsFromVariables(variables)

      prompt.ask(questions, (answers) => {
        let generator = new Generator(templateObj, answers, delimiters)

        generator.run()
      })
    }

    if (templateName) {
      let name = templates.findTemplateName(templateName)

      if (name && templatesObj[name]) {
        parseTemplate(name)
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
