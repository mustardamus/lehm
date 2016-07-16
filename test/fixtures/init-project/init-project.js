module.exports = {
  before: function (distPath, handlebars) {
    // this function is called before the process starts

    // distPath - is the path where the files will be written
    // handlebars - is handlebars instance, useful for writing helpers
  },

  after: function (distPath, variables) {
    // this function is called after the process is completed and all files
    // have been generated. useful for running 'npm i' etc.

    // distPath - is the path where the files have been written
    // varialbles - an object of variables parsed from the templates and
    //              entered by the user via commandline
  }
}
