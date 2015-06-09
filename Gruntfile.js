var pkg = require('./package.json');

module.exports = function (grunt) {

    grunt.initConfig({
        watch: {
            browserify: {
                files: ['lib/**/*.js'],
                tasks: ['browserify:lib']
            },
            example: {
                files: [grunt.option('src-file')],
                tasks: ['browserify:example']
            },
            options: {
                nospawn: true,
                livereload: true
            }
        },

        bower: {
            install: {
                options: {
                    targetDir: 'vendor',
                    cleanTargetDir: true,
                    cleanBowerDir: true                    
               }
            }
        },

        browserify: {
            lib: {
                src: './lib/'+pkg.main,
                dest: './dist/'+pkg.main,
                options: {
                    debug: true,
                    extensions: ['.js'],
                    transform: [
                        ['reactify', {
                            'es6': true
                        }]
                    ]
                }
            },
            example: {
                src: grunt.option('src-file'),
                dest: './example/dist/'+grunt.option('src-file'),
                options: {
                    debug: true,
                    extensions: ['.js'],
                    transform: [
                        ['reactify', {
                            'es6': true
                        }] 
                    ]
                }
            }
        },

        jscs: {
            files: {
                src: ['src/**/*.js']
            },
            options: {
                config: '.jscsrc',
                esprima: 'esprima-fb',
                esnext: true
            }
        },

        test: {
            options: {
              reporter: 'spec',
              captureFile: pkg.testResultMain, // Optionally capture the reporter output to a file
              quiet: false, // Optionally suppress output to standard out (defaults to false) 
              clearRequireCache: false // Optionally clear the require cache before running tests (defaults to false) 
            },
            src: ['test/**/*.js']
        }
    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks("grunt-jscs");
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-bower-task');

    grunt.registerTask('default', ['bower', 'test', 'browserify:lib', 'watch']);
    grunt.registerTask('build', ['bower', 'browserify:lib']);
    grunt.registerTask('test', ['jscs']);
};