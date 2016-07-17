'use strict'

const _ = require('lodash')

module.exports = class Prompt {
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

      if (_.isBoolean(variable.value)) {
        question.type = 'list'
        question.choices = ['true', 'false']
        question.default = variable.value === true ? 0 : 1
      }

      retArr.push(question)
    }

    return retArr
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
