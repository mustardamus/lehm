/* global describe, it */

'use strict'

const assert = require('assert')
const Handlebars = require('../lib/handlebars')

describe('Handlebars Class', () => {
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
    let template = handlebars.transform('{{ check }}', { check: 'yes' })

    assert.equal(template, 'yes')
  })

  it('should use the custom delimiters', () => {
    let handlebars = new Handlebars('<% %>')
    let template = handlebars.transform('<% check %> <% check %> {{ dontTouchMe }}', { check: 'yes' })

    assert.equal(template, 'yes yes {{ dontTouchMe }}')
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

  it('should register a custom helper', () => {
    let handlebars = new Handlebars('<% %>')

    handlebars.registerHelper('loud', (val) => {
      return val.toUpperCase() + '!'
    })

    let template = handlebars.transform('<% loud check %>', { check: 'yes' })

    assert.equal(template, 'YES!')
  })

  it('should have extended with basic helpers', () => {
    let h = new Handlebars()

    assert.equal(h.transform('{{ lowerCase "LOWERCASE" }}'), 'lowercase')
    assert.equal(h.transform('{{ upperCase "uppercase" }}'), 'UPPERCASE')
    assert.equal(h.transform('{{ snakeCase "snake-case" }}'), 'snake_case')
    assert.equal(h.transform('{{ camelCase "camel-case" }}'), 'camelCase')
    assert.equal(h.transform('{{ kebabCase "kebabCase" }}'), 'kebab-case')
    assert.equal(h.transform('{{ capitalize "capitalize" }}'), 'Capitalize')
    assert.equal(h.transform('{{ pluralize "user" }}'), 'users')
    assert.equal(h.transform('{{ singularize "users" }}'), 'user')
    assert.equal(h.transform('{{ combine "singularize,capitalize" "users" }}'), 'User')
  })
})
