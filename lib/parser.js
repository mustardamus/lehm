'use strict'

const _ = require('lodash')
const path = require('path')
const fs = require('fs-extra')

module.exports = class Parser {
  constructor (delimiters) {
    this.Handlebars = require('./handlebars')(delimiters)
  }

  parseFiles (basePath, filesArr) {
    let retObj = {}

    for (let filePath of filesArr) {
      let fullPath = path.join(basePath, filePath)
      let content = fs.readFileSync(fullPath, 'utf8')
      let variables = this.parseVariables(fullPath + content)

      for (let variableName in variables) {
        if (!retObj[variableName]) {
          retObj[variableName] = variables[variableName]
        }

        if (_.isNull(retObj[variableName].value)) {
          retObj[variableName].value = variables[variableName].value
        }

        if (_.isNull(retObj[variableName].description)) {
          retObj[variableName].description = variables[variableName].description
        }
      }
    }

    return retObj
  }

  parseVariables (content) {
    return this.parseAst(this.Handlebars.parse(content).body)
  }

  storeVariable (obj, variable) {
    if (!obj[variable.name]) {
      obj[variable.name] = {
        value: null,
        description: null
      }
    }

    if (_.isNull(obj[variable.name].value)) {
      obj[variable.name].value = variable.value
    }

    if (_.isNull(obj[variable.name].description)) {
      obj[variable.name].description = variable.description
    }
  }

  parseAst (ast) {
    let retObj = {}

    for (let node of ast) {
      let variable = null

      switch (node.type) {
        case 'CommentStatement':
          variable = this.parseComment(node)
          break
        case 'MustacheStatement':
          variable = this.parseMustache(node)
          break
        case 'BlockStatement':
          variable = this.parseBlock(node)
          break
      }

      if (variable) {
        this.storeVariable(retObj, variable)
      }

      if (node.program && node.program.body.length) {
        let subAst = this.parseAst(node.program.body)

        for (let variableName in subAst) {
          this.storeVariable(retObj, {
            name: variableName,
            value: subAst[variableName].value,
            description: subAst[variableName].description
          })
        }
      }
    }

    return retObj
  }

  parseComment (node) {
    let str = node.value
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

  parseMustache (node) {
    let name = node.path.original

    if (node.params.length) { // has a helper(s) in front of the variable name
      name = _.last(node.params).original
    }

    return { name, value: null, description: null }
  }

  parseBlock (node) {
    let name = node.params[0].original
    let value = null

    switch (node.path.original.toLowerCase()) {
      case 'if':
        value = true
        break
      case 'unless':
        value = false
        break
      default:
        return null
    }

    return { name, value, description: null }
  }
}
