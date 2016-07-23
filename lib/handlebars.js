'use strict'

let _ = require('lodash')
let HandlebarsOrg = require('handlebars')

module.exports = class Handlebars {
  constructor (delimiters) {
    this.delimiters = delimiters || '{{ }}'
    this.delimitersArr = this.delimiters.split(' ')
  }

  proxy (funcOrg, args) {
    if (this.delimiters !== '{{ }}') {
      args[0] = _.replace(args[0], '{{', '____hbso____')
      args[0] = _.replace(args[0], '}}', '____hbsc____')
      args[0] = args[0].split(this.delimitersArr[0]).join('{{')
      args[0] = args[0].split(this.delimitersArr[1]).join('}}')
    }

    return funcOrg.apply(null, args)
  }

  compile () {
    return this.proxy(HandlebarsOrg.compile, [].slice.call(arguments))
  }

  parse () {
    return this.proxy(HandlebarsOrg.parse, [].slice.call(arguments))
  }

  transform (str, data) {
    let template = this.compile(str)
    let transformed = template(data)
    transformed = _.replace(transformed, '____hbso____', '{{')
    transformed = _.replace(transformed, '____hbsc____', '}}')

    return transformed
  }
}
