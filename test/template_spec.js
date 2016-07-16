/* global describe, it */

'use strict'

const assert = require('assert')
const path = require('path')
const fs = require('fs-extra')
const Template = require('../lib/template')

const template = new Template()

describe('Template Class', () => {
  it('should get all variable names', () => {
    let fixturePath = path.join(__dirname, 'fixtures/init-project/template.txt')
    let jsonPath = path.join(__dirname, 'fixtures/compare/variables.json')
    let content = fs.readFileSync(fixturePath, 'utf8')
    let variables = template.parseVariables(content)
    let json = require(jsonPath)

    assert.deepEqual(variables, json)
  })
})
