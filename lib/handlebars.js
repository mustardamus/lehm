// based on https://github.com/jonschlinkert/handlebars-delimiters

'use strict'

let HandlebarsOrg = require('handlebars')

module.exports = class Handlebars {
  constructor (delimiters) {
    this.delimiters = delimiters || '{{ }}'
    this.delimitersArr = this.parseDelimiters()
  }

  parseDelimiters () {
    let retArr = this.delimiters.split(' ')

    if (retArr[0].indexOf('=') === -1) {
      retArr[0] = retArr[0] + '(?!=)'
    }

    return retArr
  }

  escapeDelimiters (str) {
    let defaults = /\{{([\s\S]+?)}}/ig
    let match

    while (match = defaults.exec(str)) {
      str = str.replace(match[0], '\\{{' + match[1] + '}}')
    }

    return str
  }

  proxy (funcOrg, args) {
    let re = new RegExp(this.delimitersArr[0] + '([\\s\\S]+?)' + this.delimitersArr[1], 'g')
    let match

    if(this.delimiters !== '{{ }}') {
      args[0] = this.escapeDelimiters(args[0])

      while (match = re.exec(args[0])) {
        args[0] = args[0].replace(re, '{{' + match[1] + '}}')
      }
    }

    return funcOrg.apply(null, args)
  }

  compile () {
    return this.proxy(HandlebarsOrg.compile, [].slice.call(arguments))
  }

  parse () {
    return this.proxy(HandlebarsOrg.parse, [].slice.call(arguments))
  }
}
