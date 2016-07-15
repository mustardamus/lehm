/* global describe, it */

'use strict'

const assert = require('assert')
const path = require('path')
const FrontMatter = require('../lib/front_matter')

const frontMatter = new FrontMatter()
const fixturePath = path.join(__dirname, 'fixtures/project/front_matter.txt')
const jsonPath = path.join(__dirname, 'fixtures/compare/front_matter.json')

describe('Front Matter Class', () => {
  it('should extract the front matter from a string', () => {
    let matter = '---\nboolean: true\n---'
    let obj = frontMatter.extractFromString(matter)

    assert.equal(obj.boolean, true)
  })

  it('should extract the front matter from a file', () => {
    let obj = frontMatter.extractFromFile(fixturePath)
    let json = require(jsonPath)

    assert.deepEqual(obj, json)
  })
})
