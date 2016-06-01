// Include gulp
var gulp = require('gulp');
// Include plugins
var plugins = require("gulp-load-plugins")({
	pattern: ['gulp-*', 'gulp.*', 'main-bower-files'],
	replaceString: /\bgulp[\-.]/
});

// bower install
gulp.task('bower', function() { 
    return plugins.bower();
});

// move *.min.js
gulp.task('js', function() {
  //TODO: implement logic to move bower_components into ./www/lib

});

// move css
gulp.task('css', function() {
  //TODO: implement logic to move css files to ./www/css

});

// move data
gulp.task('data', function() {
  //TODO: implement logic to move, concat and min data .js files to ./www/data

});


// Default Task
gulp.task('default', ['bower','js', 'css']);
