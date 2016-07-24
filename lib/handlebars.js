'use strict'

const _ = require('lodash')
const HandlebarsOrg = require('handlebars')
const pluralize = require('pluralize')

module.exports = class Handlebars {
  constructor (delimiters) {
    this.delimiters = delimiters || '{{ }}'
    this.delimitersArr = this.delimiters.split(' ')

    this.extendHelpers()
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

  extendHelpers () {
    let lodashHelpers = {
      lowerCase: _.toLower,
      upperCase: _.toUpper,
      snakeCase: _.snakeCase,
      camelCase: _.camelCase,
      kebabCase: _.kebabCase,
      capitalize: _.capitalize
    }

    for (let helperName in lodashHelpers) {
      this.registerHelper(helperName, (str) => {
        return lodashHelpers[helperName](str)
      })
    }

    this.registerHelper('pluralize', (str) => {
      return pluralize(str, 2)
    })

    this.registerHelper('singularize', (str) => {
      return pluralize(str, 1)
    })

    this.registerHelper('combine', (helpers, str) => {
      for (let helperName of helpers.split(',')) {
        let i = _.trim(helperName) + ' "' + str + '"'
        str = this.transform(this.delimitersArr[0] + i + this.delimitersArr[1])
      }

      return str
    })
  }
}
