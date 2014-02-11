module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      files: ['js/*'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    githooks: {
      all: {
        'pre-commit': 'jshint'
      }
    }
  });

  // Load tasks
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-githooks');

  // Register tasks
  grunt.registerTask('default', ['githooks', 'jshint']);
}