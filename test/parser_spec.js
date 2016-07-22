/* global describe, it */

'use strict'

const assert = require('assert')
const path = require('path')
const fs = require('fs-extra')
const Parser = require('../lib/parser')

const parser = new Parser()
const fixturePath = path.join(__dirname, 'fixtures/parser/spec.txt')
const jsonPath = path.join(__dirname, 'fixtures/parser/compare.json')

describe('Parser Class', () => {
  it('should get all variable names from content', () => {
    let content = fs.readFileSync(fixturePath, 'utf8')
    let variables = parser.parseVariables(content)
    let json = require(jsonPath)

    assert.deepEqual(variables, json)
  })

  it('should get all variable names from files', () => {
    let json = require(jsonPath)
    json.folderVar = { value: null, description: 'folderVar description' }
    json.fileVar = { value: null, description: 'fileVar description' }

    let basePath = path.join(__dirname, 'fixtures/parser')
    let filesArr = ['spec.txt', '{{ folderVar }}/{{ fileVar }}.txt']
    let variables = parser.parseFiles(basePath, filesArr)

    assert.deepEqual(variables, json)
  })
})
