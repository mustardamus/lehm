/* global describe, it */

'use strict'

const assert = require('assert')
const path = require('path')
const Content = require('../lib/content')

const content = new Content()
const fixturePath = path.join(__dirname, 'fixtures/project/front_matter.txt')

describe('Front Matter Class', () => {
  it('should extract the content from a string', () => {
    let matter = '---\nboolean: true\n---\n\nthe content'
    let noMatter = 'the content'

    assert.equal(content.extractFromString(matter), 'the content')
    assert.equal(content.extractFromString(noMatter), 'the content')
  })

  it('should extract the content from a file', () => {
    assert.notEqual(content.extractFromFile(fixturePath).length, 0)
  })
})
