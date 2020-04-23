'use strict';

const PARAMETER_VERSION = 'version'
const gulp = require('gulp');
const build = require('@microsoft/sp-build-web');
var jeditor = require("gulp-json-editor");
var runSequence = require('run-sequence');
var run = require('gulp-run');

build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);

let subTaskUpdateVersion = build.subTask('update-version-subtask', function (gulp, buildOptions, done) {
  var self = this;
  self.log(`build parameter: ${buildOptions.args[PARAMETER_VERSION]}`);
  return gulp.src('./config/package-solution.json')
    .pipe(jeditor(function (json) {
      let currentVersion = json.solution.version;
      let versionStrings = [];
      //find the major and minor version and replace patch version with input
      if (currentVersion.indexOf('.') != -1) {
        versionStrings = currentVersion.split('.');
      }
      if (versionStrings != null && versionStrings.length > 2) {
        //check if input version includes "_"
        let inputVersion = buildOptions.args[PARAMETER_VERSION];
        if (inputVersion.indexOf('_') != -1) {
          const inputVersionArray = inputVersion.split('_');
          inputVersion = inputVersionArray[inputVersionArray.length - 1];
          //get last mmdd.ref
          inputVersion = inputVersion.substring(4, inputVersion.length);
          self.log(`buildOptions parameter '${buildOptions.args[PARAMETER_VERSION]}' include '_' and use last segment ${inputVersion}`);
        }

        json.solution.version = `${versionStrings[0]}.${versionStrings[1]}.${inputVersion}`;
        self.log(`version: ${json.solution.version}`);
      } else {
        self.log(`version entry is either empty or not as "major.minor.pathch" format. currentVersion: ${currentVersion}`);
      }

      return json;
    }, {
      'indent_char': '\t',
      'indent_size': 4
    }))
    .pipe(gulp.dest('./config'));
});

let taskUpdateVersionTask = build.task('update-version', subTaskUpdateVersion);

//task - ExecPowerShell
let subTaskExecPowerShell = build.subTask('exec-powershell-subtask', function (gulp, buildOptions, done) {
  // return run('write-host "Hello World"', {
  //   usePowerShell: true
  // }).exec();
  return run('o365 version').exec();
});
let taskExecPowerShellTask = build.task('exec-powershell', subTaskExecPowerShell);

//Deployment
let subTaskDeploy = build.subTask('deploy-subtask', function (gulp, buildOptions, done) {
  run('./deploy.ps1', {
    usePowerShell: true
  }).exec();
  // run('write-host "Hello World"', {
  //   usePowerShell: true
  // }).exec();
  // run('write-host "Hello World"', {
  //   usePowerShell: true
  // }).exec();
  // run('write-host "Hello World"', {
  //   usePowerShell: true
  // }).exec();
});
let taskDeploy = build.task('deploy', subTaskDeploy);

gulp.task('custom-serve', function (done) {
  runSequence('update-version', 'serve', function () {
    done();
  })
});

//WebPack
build.configureWebpack.mergeConfig({
  additionalConfiguration: (generatedConfiguration) => {
    generatedConfiguration.module.rules.push({
      test: /\.md$/,
      use: [{
          loader: 'html-loader'
        },
        {
          loader: 'markdown-loader'
        }
      ]
    });

    return generatedConfiguration;
  }
});

build.initialize(gulp);
