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
            sass: {
				files: ['blocks/**/*.scss'],
				tasks: ['sass'],
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
					src: ['styles.scss'],
					dest: 'public_html/css/',
					ext: '.css'
				}]
			}
		}
    });

    
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-fest');
	grunt.loadNpmTasks('grunt-contrib-sass');

    grunt.registerTask('default', ['concurrent']);
    grunt.registerTask('buildAllAndRun', ['shell:buildServer', 'concurrent']);
    grunt.registerTask('buildAndRun', ['shell:buildServer', 'shell:runServer']);
};
