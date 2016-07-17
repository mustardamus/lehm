'use strict'

const Handlebars = require('handlebars')
const useDelims = require('handlebars-delimiters')
const config = require('../config.json')

useDelims(Handlebars, config.handlebarsDelimiters)

module.exports = Handlebars
