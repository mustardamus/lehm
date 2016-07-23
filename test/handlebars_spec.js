/* global describe, it */

'use strict'

const assert = require('assert')
const HandlebarsFunc = require('../lib/handlebars')

describe('Handlebars Proxy', () => {
  it('should use the default delimiters', () => {
    let Handlebars = HandlebarsFunc()
    let template = Handlebars.compile('{{ check }}')

    assert.equal(template({ check: 'yes' }), 'yes')
  })

  it('should use the custom delimiters', () => {
    let Handlebars = HandlebarsFunc('<% %>')
    let template = Handlebars.compile('<% check %>')

    assert.equal(template({ check: 'yes' }), 'yes')
  })
})
