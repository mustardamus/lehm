'use strict'

module.exports = function (delimiters) {
  const Handlebars = require('handlebars')
  const useDelims = require('handlebars-delimiters')

  if (!delimiters) {
    const Config = require('./config')
    const config = new Config()

    delimiters = config.read().handlebarsDelimiters
  }

  // Handlebars.parse(content).body is not overwritten with new delimiters
  // either extend handlebars-delimiters, or copy functionality in here

  if (delimiters !== '{{ }}') { // hangs if using default delimns with useDelims
    useDelims(Handlebars, delimiters.split(' '))
  }

  return Handlebars
}
