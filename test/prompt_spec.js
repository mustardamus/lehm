/* global describe, it */

'use strict'

const assert = require('assert')
const path = require('path')
const Prompt = require('../lib/prompt')

const prompt = new Prompt()

describe('Prompt Class', () => {
  it('should create the correct inquirer prompt array from variables', () => {
    let fixturePath = path.join(__dirname, 'fixtures/prompt/variables.json')
    let jsonPath = path.join(__dirname, 'fixtures/prompt/questions-variables.json')
    let fixture = require(fixturePath)
    let questions = prompt.questionsFromVariables(fixture)
    let json = require(jsonPath)

    assert.deepEqual(questions, json)
  })

  it('should create the correct inquirer prompt array from templates', () => {
    let fixturePath = path.join(__dirname, 'fixtures/prompt/templates.json')
    let jsonPath = path.join(__dirname, 'fixtures/prompt/questions-templates.json')
    let fixture = require(fixturePath)
    let questions = prompt.questionsFromTemplates(fixture)
    let json = require(jsonPath)

    assert.equal(questions[0].filter('name'), 'name')
    assert.equal(questions[0].filter('name - desc'), 'name')
    questions[0].filter = 'callback'
    assert.deepEqual(questions, json)
  })

  it('should normalize boolean and number answer values', () => {
    let answers = {
      booleanTrue: 'true',
      booleanFalse: 'false',
      numberAsString: '13'
    }
    let normalized = prompt.normalizeAnswerValues(answers)

    assert.equal(normalized.booleanTrue, true)
    assert.equal(normalized.booleanFalse, false)
    assert.equal(normalized.numberAsString, 13)
  })
})
