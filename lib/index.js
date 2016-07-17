'use strict'

const commander = require('commander')
const Commands = require('./commands')

const commands = new Commands()

commander.version(require('../package.json').version)

commander
  .command('list')
  .description('List all available templates')
  .action(commands.list)

commander
  .command('create')
  .description('Create files from a template')
  .action(commands.create)

commander.parse(process.argv)

if (!process.argv.slice(2).length) {
  commander.outputHelp()
}
