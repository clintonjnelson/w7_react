'use strict';

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-clean' );
  grunt.loadNpmTasks('grunt-contrib-copy'  );
  // grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jsxhint'       );
  grunt.loadNpmTasks('grunt-jscs'          );
  grunt.loadNpmTasks('grunt-mocha-test'    );
  grunt.loadNpmTasks('grunt-webpack'       );

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      dev: {
        src: 'build/'
      }
    },
    copy: {
      html: {
        cwd: 'app/',
        expand: true,
        flatten: false,
        src: '**/*.html',
        dest: 'build/',
        filter: 'isFile'
      }
    },
    jscs: {
      src: ['Gruntfile.js',
              '*.js',
              'models/**/*.js',
              'routes/**/*.js',
              'test/**/*.js'
               ],
      options: {
        requireCurlyBraces: [false],
        verbose: false,
        ignores: [],
        additionalSuffixes: ['.js']
      }
    },
    jshint: {
      dev: {
        src: ['Gruntfile.js',
              'package.json',
              '*.js',
              'app/**/*.jsx',
              'models/**/*.js',
              'routes/**/*.js',
              'test/**/*.js'
               ]
      },
      options: {
        jshintrc: true,
        additionalSuffixes: ['.js']
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
    },
    webpack: {
      client: {
        entry: __dirname + '/app/js/client.jsx',
        output: {
          path: 'build/',
          file: 'bundle.js'
        },
        module: {
          loaders: [
            {
              test:   /\.jsx$/,
              loader: 'jsx-loader'
            }
          ]
        },
        stats: {
          colors: true
        },
        failOnError: false,
        watch: true,
        keepalive: true
      },
    }
  });

  // Custom Task Chains
  grunt.registerTask('keepDB', ['jshint:dev', 'copy:html', 'webpack:client']);
  grunt.registerTask('test', ['jshint:dev', 'mochaTest', 'copy:html', 'webpack:client']);
  grunt.registerTask('default', ['test']);
};
