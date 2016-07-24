'use strict'

let HandlebarsOrg = require('handlebars')

module.exports = class Handlebars {
  constructor (delimiters) {
    this.delimiters = delimiters || '{{ }}'
    this.delimitersArr = this.delimiters.split(' ')
  }

  proxy (funcName, args) {
    return HandlebarsOrg[funcName].apply(HandlebarsOrg, [].slice.call(args))
  }

  parseDelimiters (delimiters) {
    if (this.delimiters !== '{{ }}') {
      delimiters = delimiters.split('{{').join('____hbso____')
      delimiters = delimiters.split('}}').join('____hbsc____')
      delimiters = delimiters.split(this.delimitersArr[0]).join('{{')
      delimiters = delimiters.split(this.delimitersArr[1]).join('}}')
    }

    return delimiters
  }

  compile () {
    arguments[0] = this.parseDelimiters(arguments[0])
    return this.proxy('compile', arguments)
  }

  parse () {
    arguments[0] = this.parseDelimiters(arguments[0])
    return this.proxy('parse', arguments)
  }

  registerHelper () {
    return this.proxy('registerHelper', arguments)
  }

  transform (str, data) {
    let template = this.compile(str)
    let transformed = template(data)
    transformed = transformed.split('____hbso____').join('{{')
    transformed = transformed.split('____hbsc____').join('}}')

    return transformed
  }
}
