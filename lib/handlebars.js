'use strict'

const Handlebars = require('handlebars')
const useDelims = require('handlebars-delimiters')
const Config = require('./config')

const config = (new Config()).read()

useDelims(Handlebars, config.handlebarsDelimiters)

module.exports = Handlebars
