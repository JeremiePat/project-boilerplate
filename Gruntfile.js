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

    // Define the "bower" tasks
    bower: {
      // Manages to copy only main files from bower to be used.
      copy : {
        dest: 'src/scripts',
        options: {
          packageSpecific: {
            hashgrid : {
              dest: 'src/scripts/_dev'
            }
          }
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

    // Define the "compass" tasks to compile scss files
    compass: {
      dev: {
        options: {
          config: 'config.dev.rb',
          bundleExec: true,
          force: true
        }
      },
      prod: {
        options: {
          config: 'config.rb',
          bundleExec: true,
          force: true
        }
      }
    },

    // Define the "assemble" tasks
    assemble: {
      options: {
        prettify: {
          indent  : 2,
          condense: true,
          newlines: true
        },
        helpers  : 'src/tpl/_helpers/*.js',
        partials : 'src/tpl/_inc/*.html',
        data     : 'src/tpl/_data/*.json',
        layoutdir: 'src/tpl/_layouts',
          layout : 'default.html'
      },

      dev: {
        options: {
          assets : 'build/dev/',
          data   :['src/tpl/_data/*.json','src/tpl/_data/dev/*.json']
        },
        expand: true,
        cwd   : 'src/tpl/',
        src   :['index.html','pages/**/*.html'],
        dest  : 'build/dev'
      },

      prod: {
        options: {
          assets : 'build/prod/',
          data   :['src/tpl/_data/*.json','src/tpl/_data/prod/*.json']
        },
        expand: true,
        cwd   : 'src/tpl/',
        src   :['index.html','pages/**/*.html'],
        dest  : 'build/prod'
      },

      docs: {
        options: {
          assets: 'build/dev/',
          layout: 'documentation.html'
        },
        expand: true,
        cwd   : 'src/tpl/_docs/',
        src   : ['**/*.md'],
        dest  : 'build/dev/docs'
      },

      readme: {
        options: {
          assets: 'build/dev/',
          layout: 'documentation.html'
        },
        src : ['readme.md'],
        dest: 'build/dev/readme.html'
      }
    },

    // Define the "imagemin" tasks to optimize image for production
    imagemin: {
      prod: {
        options: {
          optimizationLevel: 9,
          pngquant: true
        },
        files: [{
          expand: true,
          cwd: 'src/assets/img/',
          src: ['**/*.{jpg,png,gif}'],
          dest: 'build/prod/img/'
        }]
      }
    },

    // define the "connect" task
    connect: {
      // Provide a live static web server to use 
      // with the "watch" tasks for development
      basic : {
        options: {
          base: 'build/dev',
          livereload: true
        }
      },

      // Provide a static web server to use standalone for development
      dev: {
        options : {
          base: 'build/dev',
          keepalive : true
        }
      },

      // Provide a static web server to use standalone for production
      prod: {
        options : {
          base: 'build/prod',
          keepalive : true
        }
      }
    },

    // Define the "watch" task
    // This is only used to update the dev build
    // To update the prod build, run `$ grunt build` manualy
    watch: {
      options: {
        spawn: false
      },
      html : {
        files: [
          'src/tpl/index.html',
          'src/tpl/pages/**/*.html',
          'src/tpl/_inc/**/*.html',
          'src/tpl/_layouts/default.html'
        ],
        tasks: ['assemble:dev']
      },
      css : {
        files: 'src/sass/**/*.scss',
        tasks: ['compass:dev']
      },
      scripts : {
        files: 'src/scripts/**/*.js',
        tasks: ['copy:scripts']
      },
      img : {
        files: 'src/assets/img/**/*.{svg,jpg,png,gif}',
        tasks: ['copy:img']
      },
      fonts : {
        files: 'src/assets/fonts/**/*',
        tasks: ['copy:fonts']
      },
      docs: {
        files: ['readme.md','src/tpl/_docs/**/*.md','src/tpl/_layouts/documentation.html'],
        tasks: ['assemble:doc']
      },
      // Perform livereload only when a build file has changed
      livereload: {
        options: {
          livereload: true
        },
        files: ['build/dev/**/*'],
      }
    }
  });

  // Load relevant grunt task (available as NPM plug-in)
  grunt.loadNpmTasks('assemble' );
  grunt.loadNpmTasks('grunt-bower');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Define some extra task for command line usage
  grunt.registerTask('build', ['clean','bower','copy','uglify','imagemin','compass','assemble']);
  grunt.registerTask('live', ['connect:basic','watch']);

  // Handle watch compiling action only on changed files when possible
  grunt.event.on('watch', function(action, filepath, target) {
    
    // Assemble only the relevant html files
    if (target === 'html' &&
        filepath.indexOf('src/tpl/index') === 0 &&
        filepath.indexOf('src/tpl/pages') === 0) {
      grunt.config('assemble.dev.src', filepath.replace('src/tpl/',''));
    }

    // Copy only the script that has changed
    if (target === 'scripts') {
      grunt.config('copy.scripts.src', filepath.replace('src/scripts/',''));
    }

    // Copy only the images that has changed
    else if (target === 'img'){
      grunt.config('copy.img.src', filepath.replace('src/assets/img/',''));
    }

    // Copy only the fonts that has changed
    else if (target === 'fonts'){
      grunt.config('copy.fonts.src', filepath.replace('src/assets/fonts/',''));
    }
  });
};