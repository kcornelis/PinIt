module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		watch: {
			ts: {
				files: [ 'app/**/*.ts' ],
				tasks: [ 'build' ],
				options: { reload: false }
			},
			js: {
				files: [ 'dist/app.js' ],
				options: { livereload: true }
			},
			html: {
				files: [ 'views/**/*.html' ],
				options: { livereload: true }
			}
		},
		typescript: {
			base: {
				src: ['app/config.ts', 'app/bootstrap.ts', 'app/config/**/*.ts', 'app/controllers/**/*.ts', 'app/directives/**/*.ts'],
				dest: 'dist/app.js',
				options: {
					target: 'es5',
					sourceMap: true
				}
			}
		},
		nodemon: {
			dev: {
				script: 'server.js',
				options: {
					nodeArgs: [ '--debug' ]
				}
			}
		},
		concurrent: {
			default: [ 'nodemon', 'watch' ],
			debug: [ 'nodemon', 'watch' ],
			options: {
				logConcurrentOutput: true
			}
		},
	});
	
	grunt.registerTask('build', [ 'typescript' ]);
	grunt.registerTask('default', [ 'build', 'concurrent' ]);
};
