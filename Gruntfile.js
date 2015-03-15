module.exports = function(grunt) {
	grunt.initConfig({
		assemble: {
			options: {
				layoutdir: 'src/layout',
				partials: 'src/includes/**/*.hbs'
			},
			watch: {
				expand: true,
				cwd: 'src/page',
				src: ['**/*.hbs'],
				dest: './'
			}
		},
		watch: {
			options: {
				livereload: true,
				spawn: false
			},
			sass: {
				files: 'scss/*.scss',
				tasks: ['compass']
			},
			html: {
				files: '*.html'
			},
			assemble: {
				files: ['src/**/*.hbs'],
				tasks: 'assemble'
			}
		},
		compass: {
			dist: {
				options: {
					config: 'config.rb'
				}
			}
		},
		connect: {
			livereload: {
				options: {
					port: 9001,
					livereload: true
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('assemble');

	grunt.registerTask('default', ['assemble','compass','connect','watch']);

};