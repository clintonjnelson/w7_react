'use strict';

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jscs: {
      src: ['./*.js', './test/**/*.js', './lib/**/*.js'],
      options: {
        requireCurlyBraces: null,
        verbose: true
      }
    },
    jshint: {
      dev: {
        src: ['Gruntfile.js', 'test/**/*.js', 'bmx.js', '/lib/*.js']
      },
      options: {
        jshintrc: true
      }
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          captureFile: false,
          quiet: false,
          clearRequireCache: false
        },
        src: ['test/**/*_test.js']
      }
    }
  });

  // Custom Task Chains
  grunt.registerTask('test', ['jshint:dev', 'mochaTest', 'jscs']);
  grunt.registerTask('default', ['test']);
};
