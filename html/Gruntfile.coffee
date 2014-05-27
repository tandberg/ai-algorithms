module.exports = (grunt) ->
    grunt.initConfig
        pkg: grunt.file.readJSON("package.json")

        watch:
            options:
                livereload: true
                interrupt: true

            javascript:
                files: ['backbone/**/*.js', 'backbone/**/*.jst']
                tasks: ['jst:main', 'concat:main', 'copy:data', 'jshint:main']

            css:
                files: ['dist/css/styles.css']

            sass:
                files: ['sass/**/*.scss']
                tasks: ['sass:dev']
                options:
                    livereload: false

        clean:
            dist: ['dist/']
            tmp: ['_tmp/']

        sass:
            dev:
                files:
                    'dist/css/styles.css': 'sass/styles.scss'
                # options:
                #     loadPath: ['vendor']

        concat:
            main:
                dest: 'dist/main.js'
                nonull: true
                src: @file.readYAML('build.yaml').files

        jshint:
            options:
                jshintrc: '.jshintrc'
                force: true

            main: 
                files:
                    app: 'backbone/**/*.js'

        jst:
            main:
                files:
                    '_tmp/templates.js': ['backbone/**/*.jst']
                namespace: 'JST'
                options:
                    processName: (path) ->
                        return path

        connect:
            server:
                options:
                    port: 9000

        copy:
            data:
                files: [
                    {
                        expand: true,
                        cwd: 'backbone/entities/data',
                        src: '**',
                        dest: 'dist/data'
                    }
                ]

    grunt.loadNpmTasks("grunt-contrib-watch")
    grunt.loadNpmTasks("grunt-contrib-clean")
    grunt.loadNpmTasks("grunt-contrib-copy")
    grunt.loadNpmTasks('grunt-contrib-concat')
    grunt.loadNpmTasks("grunt-contrib-jshint")
    grunt.loadNpmTasks("grunt-contrib-jst")
    grunt.loadNpmTasks("grunt-contrib-sass")
    grunt.loadNpmTasks("grunt-contrib-uglify")
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks("grunt-livereload")

    tasks = 
        default: ['clean:dist', 'sass:dev', 'copy:data', 'jst:main', 'concat:main', 'connect:server', 'watch']

    grunt.registerTask("default",
        "Build for development"
        tasks.default)

