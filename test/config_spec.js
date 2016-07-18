/* global describe, it */

'use strict'

const assert = require('assert')
const path = require('path')
const fs = require('fs-extra')
const Config = require('../lib/config')

const homePath = process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME']
const rcPath = path.join(homePath, '.lehmrc')
const fixture = {
  templatesPath: '/templates',
  handlebarsDelimiters: '{{ }}'
}
const config = new Config(fixture)

describe('Config Class', () => {
  it('should set the passed in configs', () => {
    assert.deepEqual(config.config, fixture)
  })

  it('should return the configs from the config file', () => {
    assert.deepEqual(config.read(), fixture)
  })

  it('should save new configs to a config file in the home path', () => {
    let oldContent = null

    if (fs.existsSync(rcPath)) {
      oldContent = fs.readFileSync(rcPath, 'utf8')
      fs.removeSync(rcPath)
    }

    config.save(fixture)
    let content = fs.readFileSync(rcPath, 'utf8')

    assert.equal(fs.existsSync(rcPath), true)
    assert.equal(content, JSON.stringify(fixture, null, 2))

    if (oldContent) {
      fs.writeFileSync(rcPath, oldContent, 'utf8')
    }
  })
})
