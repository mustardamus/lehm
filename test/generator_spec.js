/* global describe, it */

'use strict'

const assert = require('assert')
const path = require('path')
const fs = require('fs-extra')
const Generator = require('../lib/generator')

const templateObj = require('./fixtures/generator/template.json')
const data = require('./fixtures/generator/data.json')
const distPath = path.join(__dirname, '../temp')
templateObj.path = path.join(__dirname, 'fixtures/generator/files')

const generator = new Generator(templateObj, data, '{{ }}', distPath)

describe('Generator Class', () => {
  it('should set the distPath to current working directory if not set', () => {
    let gen = new Generator(templateObj, data)

    assert(gen.distPath, process.cwd())
  })

  it('should set the passed in configs', () => {
    assert.equal(generator.srcPath, templateObj.path)
    assert.equal(generator.distPath, distPath)
    assert.deepEqual(generator.filesArr, templateObj.files)
    assert.deepEqual(generator.data, data)
  })

  it('should transform and generate the files', () => {
    let distFile1 = path.join(distPath, 'boolean.txt')
    let fixFile1 = path.join(__dirname, 'fixtures/generator/compare/boolean.txt')
    let distFile2 = path.join(distPath, 'number.txt')
    let fixFile2 = path.join(__dirname, 'fixtures/generator/compare/number.txt')
    let distFile3 = path.join(distPath, 'some-module-name/some-module-name.txt')
    let fixFile3 = path.join(__dirname, 'fixtures/generator/compare/some-module-name/some-module-name.txt')

    fs.removeSync(distPath)
    assert.equal(fs.existsSync(distPath), false)

    generator.run()

    assert.equal(fs.existsSync(distPath), true)
    assert.equal(fs.existsSync(distFile1), true)
    assert.equal(fs.existsSync(distFile2), true)
    assert.equal(fs.existsSync(distFile3), true)
    assert.equal(fs.readFileSync(distFile1, 'utf8'), fs.readFileSync(fixFile1, 'utf8'))
    assert.equal(fs.readFileSync(distFile2, 'utf8'), fs.readFileSync(fixFile2, 'utf8'))
    assert.equal(fs.readFileSync(distFile3, 'utf8'), fs.readFileSync(fixFile3, 'utf8'))
  })
})
