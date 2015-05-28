module.exports = function (grunt) {

    grunt.initConfig({
     
        shell: {
            options: {
                stdout: true,
                stderr: true
            },
            buildServer: {
                command: 'sh build_server.sh'
            },
            runServer: {
                command: 'java -cp kurve-server.jar main.Main 8080'
            }
        },
        fest: {
            templates: {
                files: [{
                    expand: true,
                    cwd: 'templates',
                    src: ['**/*.xml'],
                    dest: 'public_html/js/tmpl'
                }],
                options: {
                    template: function (data) {
                        return grunt.template.process(
                            'define(function () { return <%= contents %> ; });',
                            {data: data}
                        );
                    }
                }
            }
        },
        requirejs: {
            build: {
                options: {
                    almond: true,
                    baseUrl: "public_html/js",                    
                    mainConfigFile: "public_html/js/config.js",
                    name: "main",
                    optimize: "none",
                    out: "public_html/js/build/build-requirejs.js"
                }
            }
        },
        concat: {
            build: {
                separator: ';\n',
                src: [
                      'public_html/js/lib/almond.js',
                      'public_html/js/build/build-requirejs.js'
                ],
                dest: 'public_html/js/build/build-concat.js'
            }
        },
        uglify: {
            build: {
                files: {
                    'public_html/js/build/build.min.js': ['public_html/js/build/build-concat.js']
                }
            }
        },
        watch: {
            fest: {
                files: ['templates/**/*.xml'],
                tasks: ['fest'],
                options: {
                    interrupt: true,
                    livereload: true,
                    atBegin: true
                }
            },

            css: {
				files: ['blocks/**/*.scss'],
				tasks: ['sass', 'concat_css', 'cssmin'],
				options: {
                    interrupt: true,
                    livereload: true,
                    atBegin: true
                }
			},

            js: {
                files: ['public_html/**/*.js'],
                tasks: ['requirejs', 'concat', 'uglify'],
                options: {
                    interrupt: true,
                    livereload: true,
                    atBegin: true
                }
            },

            livereload: {
                files: ['public_html/**/*.js'],                
                options: {                    
                    livereload: true         
                }  
            }
            
        },
        concurrent: {
            target: ['watch', 'shell:runServer'],
            options: {
                logConcurrentOutput: true
            }
        },
        sass: {
			dist: {
				options: {
					update: true
				},
				files: [{
					expand: true,
					cwd: 'blocks',
					src: ['project-styles.scss'],
					dest: 'public_html/css/',
					ext: '.css'
				}]
			}
		},

        concat_css: {
            all: {
                src: ["public_html/css/**/*.css"],
                dest: "public_html/css/style.css"
            }
        },
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'public_html/css/build/style.min.css': ['public_html/css/style.css']
                }
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-fest');
	grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-concat-css');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['concurrent']);
    grunt.registerTask('buildAllAndRun', ['shell:buildServer', 'concurrent']);
    grunt.registerTask('buildAndRun', ['shell:buildServer', 'shell:runServer']);
};
