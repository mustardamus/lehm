/* global describe, it */

'use strict'

const assert = require('assert')
const FrontMatter = require('../lib/front_matter')

const frontMatter = new FrontMatter()

describe('Front Matter Class', () => {
  it('should do', () => {
    assert.equal(frontMatter.works(), true)
  })
})
