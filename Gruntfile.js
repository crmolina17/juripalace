const sass = require('node-sass');
const webpackConfig = require('./webpack.config.js');

module.exports = function (grunt) {

    // Mostrar el tiempo de ejecución transcurrido de las tareas de grunt
    // la instrucción se requiere en la parte superior
    require('time-grunt')(grunt);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            sass: {
                files: ['dev/sass/*.scss'],
                tasks: ['dev/sass', 'cssmin']
            }
        },

        autoprefixer: {
            dist: {
                options: {
                    map: true
                },
                files: {
                    './public/stylesheets/style.css': './public/stylesheets/style.css'
                }
            }
        },

        imagemin: {
            png: {
                options: {
                    optimizationLevel: 7
                },
                files: [
                    {
                        expand: true,
                        cwd: 'img/', //current working directory
                        src: ['**/*.png'],
                        dest: 'compressed/',  // destination -- will be created
                        ext: '.png'
                    }
                ]
            },
            jpg: {
                options: {
                    progressive: true
                },
                files: [
                    {
                        expand: true,
                        cwd: 'img/',
                        src: ['**/*.JPG'],
                        dest: 'compressed/',
                        ext: '.jpg'
                    }
                ]
            }
        },


        copy: {
            webfonts: {
                expand: true,
                cwd: './node_modules',
                dest: './public/stylesheets/webfonts/',
                flatten: true,
                filter: 'isFile',
                src: [
                    './@fortawesome/fontawesome-free/webfonts/*'
                ]
            },
            flags: {
                expand: true,
                cwd: './node_modules/flag-icon-css/flags/',
                dest: './public/stylesheets/flags/',
                src: '**'
            }
        },


        sass: {
            options: {
                implementation: sass,
                sourceMap: true
            },
            dist: {
                files: {
                    'public/stylesheets/style.css': 'dev/sass/style.scss'
                }
            }
        },


        concat: {
            options: {
                separator: ';',
                stripBanners: true,
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },

            dist: {
                src: ['dev/js/*.js'],
                dest: 'public/javascripts/main.js'
            }
        },


        uglify: {
            options: {
                manage: false,
                preserveComments: 'all' // preservar todos los comentarios en archivos JS
            },
            my_target: {
                files: {
                    'public/javascripts/main.min.js': ['public/javascripts/*.js']  // ' dest / output.min.js ' : [ ' src / input1.js ' , ' src / input2.js ' ]
                }
            }
        },

        webpack: {
            options: {
                stats: !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
            },
            prod: webpackConfig,
            dev: Object.assign({ watch: true }, webpackConfig)
        },


        uncss: {
            dist: {
                files: [{
                    nonull: true,
                    src: ['http://localhost:3000/'],
                    dest: './public/stylesheets/tidy.css'
                }]
            }
        },


        cssmin: {
            my_target: {
                files: [{
                    expand: true,
                    cwd: 'public/stylesheets/',     // Directorio de trabajo
                    src: ['*.css', '!*.min.css'],   // Extenciones de archivos con que se va a trabajar 
                    dest: 'public/stylesheets/',    // Directorio Destino
                    ext: '.min.css'                 // Extención con que se grabaran los archivos finales

                }]
            }
        }

    });

    // Load the plugin that provides the "imagemin" task.
    grunt.loadNpmTasks('grunt-contrib-imagemin');

    // Load the plugin that provides the "watch" task.
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Carga el complemento que proporciona la tarea "copy".
    // Esta tarea de se usa para copiar archivos.
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Carga el complemento que proporciona la tarea "sass".
    // Esta tarea de se usa para compilar Sass a CSS.
    grunt.loadNpmTasks('grunt-sass');

    // Carga el complemento que proporciona la tarea "uglify".
    // Esta tarea se usa para minimizar archivos .JS.
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Carga el complemento que proporciona la tarea "concat".
    // Concatena todos los archivos que están presentes en la carpeta src / y 
    // almacena el archivo .js concatenado en la carpeta dist / .
    grunt.loadNpmTasks('grunt-contrib-concat');

    // Carga el complemento que proporciona la tarea "autoprefixer".
    // Esta tarea se usa para validar la compativilidad archivos .CSS 
    // con versiones anteriores de los navegadores.
    grunt.loadNpmTasks('grunt-autoprefixer');

    // Carga el complemento que proporciona la tarea "cssmin".
    // Esta tarea se usa para minimizar archivos .CSS.
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // Carga el complemento que proporciona la tarea "webpack".
    grunt.loadNpmTasks('grunt-webpack');

    // Carga el complemento que proporciona la tarea "uncss".
    grunt.loadNpmTasks('grunt-uncss');

    // Default task(s).
    grunt.registerTask('default', ['copy', 'sass', 'autoprefixer', 'cssmin', 'webpack:prod']);
};