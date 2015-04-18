module.exports = function (grunt) {

    grunt.initConfig({
        concat_css: {
            options: {
                // Task-specific options go here.
            },
            all: {
                src: ["blocks/**/*.css"],
                dest: "public_html/css/styles.css"
            }
        },
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
                    atBegin: true
                }
            },
            concat_css: {
                files: ['blocks/**/*.css'],
                tasks: ['concat_css'],
                options: {
                    interrupt: true,
                    atBegin: true
                }
            }
        },
        concurrent: {
            target: ['watch', 'shell:runServer'],
            options: {
                logConcurrentOutput: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-concat-css');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-fest');

    grunt.registerTask('default', ['concurrent']);
    grunt.registerTask('buildAllAndRun', ['shell:buildServer', 'concurrent']);
    grunt.registerTask('buildAndRun', ['shell:buildServer', 'shell:runServer']);
};
