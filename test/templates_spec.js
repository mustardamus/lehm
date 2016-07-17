/* global describe, it */

'use strict'

const assert = require('assert')
const path = require('path')
const Templates = require('../lib/templates')

const templatesPath = path.join(__dirname, 'fixtures')
const templates = new Templates(templatesPath)

describe('Templates Class', () => {
  it('should have set the templates path', () => {
    assert.equal(templates.templatesPath, templatesPath)
  })

  it('should generate a object of all templates', () => {
    let fixturePath = path.join(__dirname, 'fixtures/compare/templates.json')
    let fixture = require(fixturePath)
    let templatesObj = templates.getTemplates()

    assert.deepEqual(templatesObj, fixture)
  })
})
