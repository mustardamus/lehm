/* global describe, it */

'use strict'

const assert = require('assert')
const path = require('path')
const fs = require('fs-extra')
const sinon = require('sinon')
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
    assert.deepEqual(generator.templateObj, templateObj)
    assert.equal(generator.srcPath, templateObj.path)
    assert.equal(generator.distPath, distPath)
    assert.deepEqual(generator.filesArr, templateObj.files)
    assert.deepEqual(generator.data, data)
    assert.equal(generator.beforeHook, 'function')
    assert.equal(generator.afterHook, 'function')
  })

  it('should transform and generate or copy the files', () => {
    let distFile1 = path.join(distPath, 'boolean.txt')
    let fixFile1 = path.join(__dirname, 'fixtures/generator/compare/boolean.txt')
    let distFile2 = path.join(distPath, 'number.txt')
    let fixFile2 = path.join(__dirname, 'fixtures/generator/compare/number.txt')
    let distFile3 = path.join(distPath, 'some-module-name/some-module-name.txt')
    let fixFile3 = path.join(__dirname, 'fixtures/generator/compare/some-module-name/some-module-name.txt')
    let distFile4 = path.join(distPath, 'favicon.png')

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
    assert.equal(fs.existsSync(distFile4), true)
  })

  it('should run the before hook', (done) => {
    fs.removeSync(distPath)
    assert.equal(fs.existsSync(distPath), false)

    let hook = function ({ srcPath, distPath, variables, utils }, cb) {
      utils.extendedBefore = true

      assert.deepEqual(this, templateObj)
      assert.equal(fs.existsSync(distPath), false)
      assert.deepEqual(variables, data)

      cb()
      done()
    }

    generator.beforeHook = sinon.spy(hook)
    generator.run()

    let obj = generator.beforeHook.getCall(0).args[0]

    assert.equal(generator.beforeHook.calledOnce, true)
    assert.equal(obj.srcPath, templateObj.path)
    assert.equal(obj.distPath, distPath)
    assert.ok(obj.utils._)
    assert.ok(obj.utils.Fs)
    assert.ok(obj.utils.Inquirer)
    assert.ok(obj.utils.Shell)
    assert.ok(obj.utils.Chalk)
    assert.ok(obj.utils.Handlebars)
    assert.ok(obj.utils.extendedBefore)
  })

  it('should run the after hook', (done) => {
    return done()
    fs.removeSync(distPath)
    assert.equal(fs.existsSync(distPath), false)

    let hook = function (srcPath, distPath, variables, utils) {
      assert.deepEqual(this, templateObj)
      assert.equal(fs.existsSync(distPath), true)
      assert.equal(utils.extendedBefore, true)
      assert.deepEqual(variables, data)

      done()
    }
    generator.beforeHook = null
    generator.afterHook = sinon.spy(hook)
    generator.run()

    let args = generator.afterHook.getCall(0).args

    assert.equal(generator.afterHook.calledOnce, true)
    assert.equal(args[0], templateObj.path)
    assert.equal(args[1], distPath)
    assert.ok(args[3]._)
    assert.ok(args[3].Fs)
    assert.ok(args[3].Inquirer)
    assert.ok(args[3].Shell)
    assert.ok(args[3].Chalk)
    assert.ok(args[3].Handlebars)
  })
})
