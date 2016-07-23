/* global describe, it */

'use strict'

const assert = require('assert')
const Handlebars = require('../lib/handlebars')

describe('Handlebars Proxy', () => {
  it('should set default delimiters if none passed', () => {
    let handlebars = new Handlebars()
    assert.equal(handlebars.delimiters, '{{ }}')
  })

  it('should set custom delimiters if passed', () => {
    let handlebars = new Handlebars('<% %>')
    assert.equal(handlebars.delimiters, '<% %>')
  })

  it('should use the default delimiters', () => {
    let handlebars = new Handlebars()
    let template = handlebars.compile('{{ check }}')

    assert.equal(template({ check: 'yes' }), 'yes')
  })

  it('should use the custom delimiters', () => {
    let handlebars = new Handlebars('<% %>')
    let template = handlebars.compile('<% check %>')

    assert.equal(template({ check: 'yes' }), 'yes')
  })

  it('should parse the template with default delimiters', () => {
    let handlebars = new Handlebars()
    let ast = handlebars.parse('{{ check }}').body

    assert.equal(ast[0].type, 'MustacheStatement')
    assert.equal(ast[0].path.original, 'check')
  })

  it('should parse the template with custom delimiters', () => {
    let handlebars = new Handlebars('<% %>')
    let ast = handlebars.parse('<% check %>').body

    assert.equal(ast[0].type, 'MustacheStatement')
    assert.equal(ast[0].path.original, 'check')
  })
})
