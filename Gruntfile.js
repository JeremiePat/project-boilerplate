/*global module*/

module.exports = function(grunt) {
  "use strict";

  // Initialize grunt
  grunt.initConfig({
    // Read meta-data from the package.json file
    pkg: grunt.file.readJSON('package.json'),

    // Define the clean task
    clean: {
      // clean:scripts clean scripts from build
      scripts : {
        src : ['build/js']
      },
      // clean:css clean scripts from build
      css : {
        src : ['build/css']
      },
      // clean:html clean everything that is not docs, css or js
      html : {
        src : ['build/**/*','!build/{docs,js,css}**','!build/{docs,js,css}**/**/*']
      },
      // clean:css clean scripts from build
      docs : {
        src : ['build/docs']
      }
    },

    // Define the copy task
    copy: {
      // copy:scripts roughly copy js source into the build directory
      scripts : {
        files : [
          {
            expand: true,
            cwd : 'src/js/',
            src : ['**/*.js','!plugins/**/*.js'],
            dest: 'build/js/'
          }
        ]
      },

      // copy:css copy assets for CSS
      css : {
        files: [
          {
            expand: true,
            cwd : 'src/sass/',
            src : ['{img,fonts}/**/*'],
            dest: 'build/css'
          }
        ]
      }
    },

    // Define the concat task
    concat: {
      scripts: {
        src : ['src/js/plugins/**/*.js'],
        dest: 'build/js/jquery.plugins.js'
      }
    },

    // Define the compass task
    compass: {
      dev: {
        options: {
          config: 'config.rb',
          force: true
        }
      }
    },

    assemble: {
      options: {
        prettify: {
          indent: 2,
          condense: true,
          newlines: true
        },
        assets: 'build/',
        helpers: 'src/html/_helpers/*.js',
        partials: 'src/html/_inc/*.html',
        layoutdir: 'src/html/_layouts',
        layout: 'default.html'
      },

      html: {
        files:[{
          expand: true,
          cwd:'src/html/',
          src:['**/*.html','!_**/*.html'],
          dest: 'build/'
        }]
      },

      docs: {
        options: {
          layout: 'documentation.html'
        },
        files:[{
          expand: true,
          cwd : 'src/html/_docs/',
          src : ['**/*.md'],
          dest: 'build/docs/'
        },
        {
          src : ['readme.md'],
          dest: 'build/docs/readme.html'
        }]
      }
    },

    // define the "connect" task
    connect: {
      options: {
        base: 'build'
      },
      basic : {
        options: {
          livereload: true,
        }
      },
      server: {
        options : {
          keepalive : true
        }
      }
    },

    // Define the "watch" task
    watch: {
      options: {
        livereload: true,
      },
      html : {
        files: ['src/html/**/*.html','!src/html/_layouts/documentation.html'],
        tasks: ['html']
      },
      css : {
        files: 'src/sass/**/*.scss',
        tasks: ['css']
      },
      scripts : {
        files: 'src/js/**/*.js',
        tasks: ['scripts']
      },
      docs: {
        files: ['readme.md','src/html/_docs/**/*.md','src/html/_layouts/documentation.html'],
        tasks: ['docs']
      }
    }
  });

  // Load relevant grunt task (available as NPM plug-in)
  grunt.loadNpmTasks('assemble' );
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Define some extra task for command line usage
  grunt.registerTask('html', ['clean:html','assemble:html']);
  grunt.registerTask('docs', ['clean:docs','assemble:docs']);
  grunt.registerTask('css', ['clean:css','compass:dev','copy:css']);
  grunt.registerTask('scripts', ['clean:scripts','copy:scripts','concat:scripts']);
  grunt.registerTask('build', ['css','scripts','html','docs']);
  grunt.registerTask('live', ['connect:basic','watch']);
};