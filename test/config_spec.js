/* global describe, it */

'use strict'

const assert = require('assert')
const path = require('path')
const fs = require('fs-extra')
const Config = require('../lib/config')

const fixturePath = path.join(__dirname, 'fixtures/compare/config.json')
const config = new Config(fixturePath)

describe('Config Class', () => {
  it('should set the config file path', () => {
    assert.equal(config.configPath, fixturePath)
  })

  it('should return the configs from the config file', () => {
    let cfg = config.read()
    let fixture = require(fixturePath)

    assert.equal(cfg.templatesPath, fixture.templatesPath)
    assert.deepEqual(cfg.handlebarsDelimiters, fixture.handlebarsDelimiters)
  })
})
