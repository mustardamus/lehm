// This .js file will not be treated as a template if it has the same name as
// the parent directory.

'use strict'

module.exports = {
  // name will be showed in the 'lehm list' command, as well as in the list
  // when the 'lehm create' command when no template-name is provided
  // if no name is set, the parent folder name will be used as name
  // the tempate-name passed in to the 'lehm create' command can be either the
  // parent direcory name or this name field
  name: 'Template 2',

  // the description will be showed in the 'lehm list' command
  description: 'Template 2 Description',

  // these folders/files will be ignored and not treated as templates
  ignore: ['node_modules', 'file1.txt'],

  before: function (srcPath, distPath, inquirer, shell, handlebars, cb) {
    // this function is called before the process starts

    // srcPath - is the path where all the templates lie, ie __dirname
    // distPath - is the path where the files will be written
    // inquirer - a inquirer instance, so you can ask users questions
    // shell - a shell.js instance (ie execute system commands)
    // handlebars - is handlebars instance, useful for writing helpers
    // cb - execute this callback to kick of the process, it has two arguments:
    //      err: null if everthing is good, String if the process should be halted
    //      data: Object that is merged with the variables/answers by the user
    //            and passed to the handlebar template function
  },

  after: function (srcPath, distPath, inquirer, shell, variables, cb) {
    // srcPath - is the path where all the templates lie, ie __dirname
    // this function is called after the process is completed and all files
    // have been generated. useful for running 'npm i' etc.

    // distPath - is the path where the files have been written
    // inquirer - a inquirer instance, so you can ask users questions
    // shell - a shell.js instance (ie execute system commands)
    // varialbles - an object of variables parsed from the templates and
    //              entered by the user via commandline, merged with the data
    //              Object from the callback in before() (see above)
    // cb - execute this callback to finish the process, no arguments
  }
}
