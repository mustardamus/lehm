#!/usr/bin/env node
'use strict'

const vorpal = require('vorpal')()
const inquirer = require('inquirer')
const Prompt = require('../lib/prompt')

const prompt = new Prompt()

vorpal
  .command('parser', 'Tests by monkeys')
  .action(function (args, cb) {
    let variables = require('../test/fixtures/compare/variables.json')
    let questions = prompt.questionsFromVariables(variables)

    inquirer.prompt(questions).then((answers) => {
      console.log(answers)
      cb()
    })
  })

vorpal
  .command('templates', 'Tests by monkeys')
  .action(function (args, cb) {
    let templates = require('../test/fixtures/compare/templates.json')
    let questions = prompt.questionsFromTemplates(templates)

    inquirer.prompt(questions).then((answers) => {
      console.log(answers)
      cb()
    })
  })

vorpal
  .delimiter('lehm$')
  .show()
