'use strict'

const _ = require('lodash')
const inquirer = require('inquirer')
const chalk = require('chalk')

module.exports = class Prompt {
  ask (questions, cb) {
    inquirer.prompt(questions).then((answers) => {
      cb(this.normalizeAnswerValues(answers))
    })
  }

  questionsFromVariables (variables) {
    let retArr = []

    for (let variableName in variables) {
      let variable = variables[variableName]

      let question = {
        type: 'input',
        name: variableName
      }

      if (_.isNull(variable.description)) {
        question.message = variableName
      } else {
        question.message = variable.description
      }

      if (!_.isNull(variable.value)) {
        question.default = variable.value
      }

      if (_.isBoolean(variable.value)) {
        question.type = 'list'
        question.choices = ['true', 'false']
        question.default = variable.value === true ? 0 : 1
      }

      retArr.push(question)
    }

    return retArr
  }

  questionsFromTemplates (templates) {
    let retObj = {
      type: 'list',
      name: 'template',
      message: 'Choose Template',
      choices: []
    }

    for (let templateName in templates) {
      let template = templates[templateName]
      let obj = {
        value: templateName,
        name: chalk.green(templateName)
      }

      if (template.name) {
        obj.name = chalk.green(template.name) +
          chalk.yellow(' (' + templateName + ')')
      }

      if (template.description) {
        obj.name += chalk.grey(' - ' + template.description)
      }

      retObj.choices.push(obj)
    }

    return [retObj]
  }

  normalizeAnswerValues (answers) {
    for (let answerName in answers) {
      let value = answers[answerName]

      if (value === 'true') {
        answers[answerName] = true
      } else if (value === 'false') {
        answers[answerName] = false
      }

      if (!isNaN(value) && !_.isBoolean(value)) {
        answers[answerName] = _.toNumber(value)
      }
    }

    return answers
  }
}
