/* global describe, it */

'use strict'

const assert = require('assert')
const Traverse = require('../lib/traverse')

const fixture = {
  boolean: true,
  number: 13,
  string: 'some string XXX',
  array_strings: [
    'a array of',
    'strings XXX'
  ],
  array_objects: [
    {
      id: 1,
      name: 'object 1 XXX'
    },
    {
      id: 2,
      name: 'object 2'
    }
  ]
}
const transformFunc = function (val) {
  return val.replace('XXX', 'YYY')
}

const traverse = new Traverse()

describe('Traverse Class', () => {
  it('should traverse a object and transform strings', () => {
    let obj = traverse.transform(fixture, transformFunc)

    assert.equal(obj.boolean, true)
    assert.equal(obj.number, 13)
    assert.equal(obj.string, 'some string YYY')
    assert.equal(obj.array_strings[0], 'a array of')
    assert.equal(obj.array_strings[1], 'strings YYY')
    assert.equal(obj.array_objects[0].name, 'object 1 YYY')
    assert.equal(obj.array_objects[1].name, 'object 2')
  })
})
