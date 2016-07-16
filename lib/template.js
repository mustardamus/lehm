'use strict'

const _ = require('lodash')
const Handlebars = require('handlebars')

module.exports = class Template {
  parseVariables (content) {
    let retObj = {}
    let ast = Handlebars.parse(content).body

    for (let node of ast) {
      let variable = null

      switch (node.type) {
        case 'CommentStatement':
          variable = this.parseComment(node.value)
          break
        case 'MustacheStatement':
          break
        case 'BlockStatement':
          break
      }

      if (variable) {
        if (!retObj[variable.name]) {
          retObj[variable.name] = {}
        }

        if (!retObj[variable.name].value) {
          retObj[variable.name].value = variable.value
        }

        if (!retObj[variable.name].description) {
          retObj[variable.name].description = variable.description
        }
      }
    }

    return retObj
  }

  parseComment (str) {
    let value = null
    let description = null

    if (_.includes(str, '#')) {
      let split = str.split('#')
      description = _.trim(_.last(split))
      str = _.first(split)
    }

    if (_.includes(str, '=')) {
      let split = str.split('=')
      value = _.trim(_.last(split))
      str = _.first(split)

      if (value.toLowerCase() === 'true') {
        value = true
      } else if (value.toLowerCase() === 'false') {
        value = false
      }

      if (!isNaN(value) && !_.isBoolean(value)) {
        value = _.toNumber(value)
      }
    }

    if (value || description) {
      return { name: _.trim(str), value, description }
    } else {
      return null
    }
  }
}
