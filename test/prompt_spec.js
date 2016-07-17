/* global describe, it */

'use strict'

const assert = require('assert')
const path = require('path')
const fs = require('fs-extra')
const Prompt = require('../lib/prompt')

const prompt = new Prompt()

describe('Prompt Class', () => {
  it('should create the correct inquirer prompt object', () => {
    let fixturePath = path.join(__dirname, 'fixtures/compare/variables.json')
    let jsonPath = path.join(__dirname, 'fixtures/compare/prompt.json')
    let fixture = require(fixturePath)
    let promptObj = prompt.questionsFromVariables(fixture)
    let json = require(jsonPath)

    assert.deepEqual(promptObj, json)
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
