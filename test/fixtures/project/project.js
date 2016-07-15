// if the file has the same name as the parent folder (project template name),
// it is considered as a post-processor where you can do certain changes
// the exported function will be executed after all templates have been processed

'use strict'

module.exports = function (projectPath, variables) {
  // projectPath = root directory of the project that has been generated
  // variables = the extracted variables from the templates, answered by the user

  console.log('projectPath', projectPath)
  console.log('variables', variables)
}
