/* global describe, it */

'use strict'

const assert = require('assert')
const path = require('path')
const fs = require('fs-extra')
const Template = require('../lib/template')

const fixturePath = path.join(__dirname, 'fixtures/templates/all.txt')

const template = new Template()

describe('Template Class', () => {
  it('should get all variable names', () => {
    let str = fs.readFileSync(fixturePath, 'utf8')
    let variables = template.getVariableNames(str)
  })
})
