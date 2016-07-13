'use strict'

const _ = require('lodash')
const traverse = require('traverse')

module.exports = class Traverse {
  transform (obj, transformFunc) {
    return traverse(obj).map(function (item) {
      if (_.isString(item)) {
        this.update(transformFunc(item))
      }
    })
  }
}
