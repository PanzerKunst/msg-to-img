module.exports = function (grunt) {

    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            dist: [
                'Gruntfile.js',
                'javascripts/**/*.js'
            ],
            options: {
                globals: {
                    debug: true,
                    forin: true,
                    eqnul: true,
                    noarg: true,
                    noempty: true,
                    eqeqeq: true,
                    boss: true,
                    loopfunc: true,
                    evil: true,
                    laxbreak: true,
                    bitwise: true,
                    undef: true,
                    curly: true,
                    nonew: true,
                    browser: true,
                    devel: true,
                    jquery: true,
                    mootools: true
                }
            }
        },

        concat: {
            options: {
                separator:';'
            },
            dist: {
                src: [
                    // Libs
                    "libs/h5bp/modernizr-custom.js",
                    "libs/jquery-2.0.3.min.js",
                    "javascripts/common/jquery.no-conflict.js",
                    "libs/mootools/mootools-core-1.4.5-full-nocompat-yc.js",
                    "libs/mootools/mootools-more-1.4.0.1.js",
                    "libs/bootstrap/js/bootstrap.min.js",
                    "libs/fastclick.js",

                    // Global
                    "javascripts/global.js",

                    // Common
                    "javascripts/common/jquery.plugin.animations.js",
                    "javascripts/common/json-util.js",

                    // Services
                    "javascripts/services/validator.js",

                    // Models

                    // Controllers
                    "javascripts/controllers/base-controller.js",
                    "javascripts/controllers/index.js"
                ],
                dest: 'public/<%= pkg.name %>.js'
            }
        },

        sass: {
            build: {
                files: {
                    'public/<%= pkg.name %>.css': 'sass/main.scss'
                }
            }
        },

        /* Task fails
        cssc: {
            build: {
                options: {
                    consolidateViaDeclarations: true,
                    consolidateViaSelectors: true,
                    consolidateMediaQueries: true
                },
                files: {
                    'public/<%= pkg.name %>.css': 'public/<%= pkg.name %>.css'
                }
            }
        }, */

        cssmin: {
            build: {
                src: [
                    // Libs
                    'libs/bootstrap/css/bootstrap.css',

                    // Rest
                    'public/<%= pkg.name %>.css'
                ],
                dest: 'public/<%= pkg.name %>-v1.css'
            }
        },

        watch: {
            js: {
                files: ['<%= concat.dist.src %>'],
                tasks: ['buildjs']
            },

            css: {
                files: ['sass/**/*.scss'],
                tasks: ['buildcss']
            }
        }
    });

    grunt.registerTask('default', ['buildjs', 'buildcss']);
    grunt.registerTask('buildjs',  ['jshint', 'concat']);
    grunt.registerTask('buildcss',  ['sass', 'cssmin']);
};
