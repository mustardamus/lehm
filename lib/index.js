'use strict'

const commander = require('commander')
const Commands = require('./commands')

const commands = new Commands()

commander.version(require('../package.json').version)

commander.option('--verbose', 'display verbose information', Boolean)

commander
  .command('config')
  .description('Configure templates path and Handlebars delimiters')
  .action(commands.config)

commander
  .command('list')
  .description('List all available templates')
  .action(commands.list)

commander
  .command('create [template-name]')
  .description('Create files from a template, leave template-name blank to choose from a list')
  .action(commands.create)

commander.parse(process.argv)

if (!process.argv.slice(2).length) {
  commander.outputHelp()
}
