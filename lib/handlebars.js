'use strict'

const Handlebars = require('handlebars')
const useDelims = require('handlebars-delimiters')
const Config = require('./config')

const config = new Config()

useDelims(Handlebars, config.read().handlebarsDelimiters)

module.exports = Handlebars
