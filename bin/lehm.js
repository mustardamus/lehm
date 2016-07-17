#!/usr/bin/env node
'use strict'

const vorpal = require('vorpal')()
const inquirer = require('inquirer')
const Prompt = require('../lib/prompt')

const prompt = new Prompt()

vorpal
  .command('checker', 'Tests by monkeys')
  .action(function (args, cb) {
    let variables = require('../test/fixtures/compare/variables.json')
    let questions = prompt.questionsFromVariables(variables)

    inquirer.prompt(questions).then((answers) => {
      console.log(answers)
      cb()
    })
  })

vorpal
  .delimiter('lehm$')
  .show()
