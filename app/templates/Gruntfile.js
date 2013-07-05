'use strict';

module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    // Task configuration.
    qunit: {
      files: ['test/**/*.html']
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-qunit');
  
  // Default task.
  grunt.registerTask('default', ['qunit']);
  grunt.registerTask('test', ['qunit']);
  
};