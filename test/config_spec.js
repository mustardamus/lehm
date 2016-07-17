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
    assert.deepEqual(config.read(), require(fixturePath))
  })

  it('should save new configs to the config file', () => {
    let oldCfg = config.read()
    let newCfg = {
      templatesPath: 'works',
      handlebarsDelimiters: 'good'
    }

    config.save(newCfg)
    assert.deepEqual(config.read(), require(fixturePath))
    fs.writeFileSync(config.configPath, JSON.stringify(oldCfg, null, 2))
    assert.deepEqual(oldCfg, require(fixturePath))
  })
})
