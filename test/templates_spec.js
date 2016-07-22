/* global describe, it */

'use strict'

const assert = require('assert')
const path = require('path')
const Templates = require('../lib/templates')

const fixturePath = path.join(__dirname, 'fixtures/templates/compare.json')
const fixture = require(fixturePath)
const templatesPath = path.join(__dirname, 'fixtures/templates')
const templates = new Templates(templatesPath)

describe('Templates Class', () => {
  it('should have set the templates path', () => {
    assert.equal(templates.templatesPath, templatesPath)
  })

  it('should generate a object of all templates', () => {
    assert.deepEqual(templates.getTemplates(), fixture)
  })

  it('should find template by folder-name or meta-name', () => {
    assert.equal(templates.findTemplateName('template-1'), 'template-1')
    assert.equal(templates.findTemplateName('Template 2'), 'template-2')
    assert.equal(templates.findTemplateName('not-there'), null)
  })
})
