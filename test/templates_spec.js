/* global describe, it */

'use strict'

const assert = require('assert')
const path = require('path')
const Templates = require('../lib/templates')

const fixturePath = path.join(__dirname, 'fixtures/compare/templates.json')
const fixture = require(fixturePath)
const templatesPath = path.join(__dirname, 'fixtures')
const templates = new Templates(templatesPath)

describe('Templates Class', () => {
  it('should have set the templates path', () => {
    assert.equal(templates.templatesPath, templatesPath)
  })

  it('should generate a object of all templates', () => {
    assert.deepEqual(templates.getTemplates(), fixture)
  })

  it('should find template by folder-name or meta-name', () => {
    assert.equal(templates.findTemplateName('compare'), 'compare')
    assert.equal(templates.findTemplateName('Project Init'), 'init-project')
    assert.equal(templates.findTemplateName('not-there'), null)
  })
})
