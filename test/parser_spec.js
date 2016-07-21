/* global describe, it */

'use strict'

const assert = require('assert')
const path = require('path')
const fs = require('fs-extra')
const Parser = require('../lib/parser')

const parser = new Parser()

describe('Parser Class', () => {
  it('should get all variable names from content', () => {
    let fixturePath = path.join(__dirname, 'fixtures/init-project/spec.txt')
    let jsonPath = path.join(__dirname, 'fixtures/compare/variables.json')
    let content = fs.readFileSync(fixturePath, 'utf8')
    let variables = parser.parseVariables(content)
    let json = require(jsonPath)

    assert.deepEqual(variables, json)
  })

  it('should get all variable names from files', () => {
    let jsonPath = path.join(__dirname, 'fixtures/compare/variables.json')
    let json = require(jsonPath)

    json.declaredInSub = { value: null, description: null }
    json.sampleString.value = 'works'

    let basePath = path.join(__dirname, 'fixtures/init-project')
    let filesArr = ['spec.txt', 'sub/sub.txt', '{{ folderVar }}/{{ fileVar }}.txt']
    let variables = parser.parseFiles(basePath, filesArr)

    assert.deepEqual(variables, json)
  })
})
