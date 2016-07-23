'use strict'

let HandlebarsOrg = require('handlebars')

module.exports = class Handlebars {
  constructor (delimiters) {
    this.delimiters = delimiters || '{{ }}'
    this.delimitersArr = this.delimiters.split(' ')
  }

  proxy (funcOrg, args) {
    args[0] = args[0].split(this.delimitersArr[0]).join('{{')
    args[0] = args[0].split(this.delimitersArr[1]).join('}}')

    return funcOrg.apply(null, args)
  }

  compile () {
    return this.proxy(HandlebarsOrg.compile, [].slice.call(arguments))
  }

  parse () {
    return this.proxy(HandlebarsOrg.parse, [].slice.call(arguments))
  }
}
