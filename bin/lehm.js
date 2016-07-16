#!/usr/bin/env node
'use strict'

const vorpal = require('vorpal')()

vorpal
  .command('foo', 'Outputs "bar".')
  .action(function(args, callback) {
    this.log('bar')
    callback()
  })

vorpal
  .command('eat [food]')
  .autocomplete(['corn', 'steak', 'pasta'])
  .action(function(args, callback) {
    this.log(args)
    callback()
  })

vorpal
  .delimiter('lehm$')
  .show()
