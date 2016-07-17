// This .js file will not be treated as a template if it has the same name as
// the parent directory.

'use strict'

module.exports = {
  description: 'A description what will be generated, requirements, etc',

  // these folders/files will be ignored and not treated as templates
  ignore: ['ignore', 'ignore.txt'],

  before: function (distPath, vorpal, shell, handlebars) {
    // this function is called before the process starts

    // distPath - is the path where the files will be written
    // vorpal - reference to the vorpal command instance (ie use vorpal.log)
    // shell - a shell.js instance (ie execute system commands)
    // handlebars - is handlebars instance, useful for writing helpers
  },

  after: function (distPath, vorpal, shell, variables) {
    // this function is called after the process is completed and all files
    // have been generated. useful for running 'npm i' etc.

    // distPath - is the path where the files have been written
    // vorpal - reference to the vorpal command instance (ie use vorpal.log)
    // shell - a shell.js instance (ie execute system commands)
    // varialbles - an object of variables parsed from the templates and
    //              entered by the user via commandline
  }
}
