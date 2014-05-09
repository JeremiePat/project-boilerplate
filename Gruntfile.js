/*global module*/

module.exports = function(grunt) {
  "use strict";

  // Initialize grunt
  grunt.initConfig({
    // Read meta-data from the package.json file
    pkg: grunt.file.readJSON('package.json'),

    // Define the "clean" tasks
    clean: {
      dev : {
        src : ['build/dev']
      },
      prod : {
        src : ['build/prod']
      }
    },

    // Define the "copy" tasks
    copy: {
      // copy:scripts roughly copy js source into the build/dev directory
      scripts : {
        expand: true,
        cwd : 'src/scripts/',
        src : ['**/*.js'],
        dest: 'build/dev/js'
      },

      // copy:img copy images assets into the build/dev directory
      img : {
        expand: true,
        cwd : 'src/assets/img',
        src : ['**/*.{jpg,png,gif,svg}'],
        dest: 'build/dev/img'
      },

      // copy:fonts copy fonts assets into the build/dev directory
      fonts : {
        expand: true,
        cwd : 'src/assets/fonts',
        src : ['**/*'],
        dest: 'build/dev/fonts'
      },

      // copy:prod copy elements that require to be push "as is" in production
      prod : {
        files : [
          { // SCRIPTS
            expand: true,
            cwd : 'src/scripts/',
            // Plugins will be concatenated and uglified
            src : ['**/*.js','!plugins/**/*.js'],
            dest: 'build/prod/js'
          },
          { // IMAGES
            expand: true,
            cwd : 'src/assets/img',
            // Binary images will be optimized
            src : ['**/*.svg'],
            dest: 'build/prod/img'
          },
          { // FONTS
            expand: true,
            cwd : 'src/assets/fonts',
            src : ['**/*'],
            dest: 'build/prod/fonts'
          }
        ]
      }
    },

          }
      }
    },

    // Define the "uglify" tasks
    uglify: {
      // Allows to minify JS files for the production build
      prod: {
        options:{
          mangle: false // We do not change the variable names
        },
        src : ['src/scripts/**/*.js','!src/scripts/_dev/**/*.js'],
        dest: 'build/prod/js/scripts.js'
      }
    },

    // Define the "compass" tasks
    compass: {
      dev: {
        options: {
          config: 'config.rb',
          force: true
        }
      }
    },

    // Define the "assemble" tasks
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

    imagemin: {
      html: {
        options: {
          optimizationLevel: 2,
          progressive: true,
          interlaced: true
        },
        files: [{
          expand: true,
          cwd: 'src/html/img/',
          src: ['**/*.{jpg,png,gif}'],
          dest: 'build/img/'
        }]
      },
      css: {
        options: {
          optimizationLevel: 9,
          pngquant: true
        },
        files: [{
          expand: true,
          cwd: 'src/sass/img/',
          src: ['**/*.{jpg,png,gif}'],
          dest: 'build/css/img/'
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
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Define some extra task for command line usage
  grunt.registerTask('html', ['clean:html','assemble:html','copy:html','imagemin:html']);
  grunt.registerTask('docs', ['clean:docs','assemble:docs']);
  grunt.registerTask('css', ['clean:css','compass:dev','copy:css','imagemin:css']);
  grunt.registerTask('scripts', ['clean:scripts','copy:scripts','concat:scripts']);
  grunt.registerTask('build', ['css','scripts','html','docs']);
  grunt.registerTask('live', ['connect:basic','watch']);
};