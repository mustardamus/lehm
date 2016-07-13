/* global describe, it */

'use strict'

const assert = require('assert')
const path = require('path')
const FrontMatter = require('../lib/front_matter')

const frontMatter = new FrontMatter()

describe('Front Matter Class', () => {
  it('should extract the front matter from a string', () => {
    let matter = '---\n' +
                 'boolean: true\n' +
                 '---'
    let obj = frontMatter.extractFromString(matter)

    assert.equal(obj.boolean, true)
  })

  it('should extract the front matter from a file', () => {
    let fixturePath = path.join(__dirname, 'fixtures/front_matter.txt')
    let jsonPath = path.join(__dirname, 'fixtures/front_matter.json')
    let obj = frontMatter.extractFromFile(fixturePath)
    let json = require(jsonPath)

    assert.deepEqual(obj, json)
  })
})
