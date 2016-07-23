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
    let obj = templates.getTemplates()
    
    fixture['template-1'].path = path.join(templatesPath, 'template-1')
    fixture['template-2'].path = path.join(templatesPath, 'template-2')
    obj['template-2'].before = 'function'
    obj['template-2'].after = 'function'

    assert.deepEqual(obj, fixture)
  })

  it('should find template by folder-name or meta-name', () => {
    assert.equal(templates.findTemplateName('template-1'), 'template-1')
    assert.equal(templates.findTemplateName('Template 2'), 'template-2')
    assert.equal(templates.findTemplateName('not-there'), null)
  })
})
