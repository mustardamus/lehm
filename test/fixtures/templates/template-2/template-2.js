'use strict'

module.exports = {
  name: 'Template 2',
  description: 'Template 2 Description',
  delimiters: '<% %>',
  ignore: ['node_modules', 'file1.txt'],
  before: function (srcPath, distPath, utils, cb) {
    cb()
  },
  after: function (srcPath, distPath, utils, variables, cb) {
    cb()
  }
}
