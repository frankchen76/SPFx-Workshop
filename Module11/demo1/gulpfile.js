'use strict';
var run = require('gulp-run');

const build = require('@microsoft/sp-build-web');

build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);

//Deployment
let subTaskDeploy = build.subTask('deploy-solution-subtask', function (gulp, buildOptions, done) {
  run('./deployment/Deploy-SPFxPackage.ps1', {
    usePowerShell: true
  }).exec();
});
let taskDeploy = build.task('deploy-solution', subTaskDeploy);

//remove solution
let subTaskRemove = build.subTask('remove-solution-subtask', function (gulp, buildOptions, done) {
  run('./deployment/Remove-SPFxPackage.ps1', {
    usePowerShell: true
  }).exec();
});
let taskRemove = build.task('remove-solution', subTaskRemove);

var getTasks = build.rig.getTasks;
build.rig.getTasks = function () {
  var result = getTasks.call(build.rig);

  result.set('serve', result.get('serve-deprecated'));

  return result;
};

build.initialize(require('gulp'));
