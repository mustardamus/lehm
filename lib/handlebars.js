'use strict'

const Handlebars = require('handlebars')
const useDelims = require('handlebars-delimiters')
const Config = require('./config')

const config = new Config()
const delims = config.read().handlebarsDelimiters.split(' ')

useDelims(Handlebars, delims)

module.exports = Handlebars
