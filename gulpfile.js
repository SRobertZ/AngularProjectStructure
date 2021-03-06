/**
 * Created by rsabiryanov on 19.02.2015.
 */
var gulp = require('gulp');
var runSequence = require('run-sequence');
var bowerFiles = require('main-bower-files');
var nib = require('nib');

$ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'main-bower-files'],
    rename: {
        'gulp-rev-all': 'revall'
    }
});

require('colors');

/** Config variables **/
var path = require('path'),
    tmpDir = './.tmp',
    destPathName = 'dist',
    destDir = './' + destPathName,
    appDir = './app',
    bowerDir = appDir + '/bower_components';
expressSrc = path.join(__dirname, destDir),
    port = 9009,
    lrPort = 4009,

// Allows gulp <target> --dev to be run for a non-minified output
    isProduction = $.util.env.production === true
isDev = !isProduction;


function log(error) {
    console.log([
        '',
        "----------ERROR MESSAGE START----------".bold.red.underline,
        ("[" + error.name + " in " + error.plugin + "]").red.bold.inverse,
        error.message,
        error.stack,
        "----------ERROR MESSAGE END----------".bold.red.underline,
        ''
    ].join('\n'));
    this.end();
}

/** express server & lr & watch **/
var tinylr;

gulp.task('express', function (cb) {
    var express = require('express');
    var app = express();
    console.log(('start express in ' + expressSrc).green);
    app.use(require('connect-livereload')({port: lrPort}));
    app.use(express.static(expressSrc, {
        setHeaders: function (res, path, stat) {
            res.set('cache-control', "no-cache")
        }
    }));
    app.listen(port);
    cb();
});

gulp.task('livereload', function (cb) {
    tinylr = require('tiny-lr')();
    tinylr.listen(lrPort);
    cb();
});

gulp.task('open', function (cb) {
    var url = 'http://localhost:' + port + '/';
    console.log('Open ' + url.bold.green);
    require('opn')(url);
    cb();
});

gulp.task('watch', function (cb) {
    gulp.watch([expressSrc + '/**/*.*'], notifyLiveReload);
    gulp.watch([appDir + '/js/**'], ['js', 'html', 'inject']);
    gulp.watch([appDir + '/index.html'], ['js', 'html', 'inject']);
    cb();
});

function notifyLiveReload(event) {
    console.log('notifyLiveReload'.yellow);

    var fileName = require('path').relative(__dirname, event.path);
    tinylr.changed({
        body: {
            files: [fileName]
        }
    });
}

gulp.task('serve', function () {
    isDev = true;
    isProduction = false;
    runSequence('build', ['express', 'livereload'], ['watch', 'open']);
});
/**********************/

gulp.task('clean', require('del').bind(null, [tmpDir, destDir]));


gulp.task('afterBuild', function () {
    $.util.log('----------------'.green);
    $.util.log('Build finished:');
    $.util.log('IsDev:', isDev);
    $.util.log('isProduction:', isProduction);
    $.util.log('----------------'.green);
});
gulp.task('jsTemplates', function () {
    return gulp.src([appDir + '/js/**/*.html'])
        .pipe(gulp.dest(destDir + '/js/'))
});

gulp.task('js', function () {
    return gulp.src([appDir + '/js/**/*.js'])
        .pipe($.if(isProduction, $.angularFilesort()))
        .pipe($.if(isProduction, $.concat('app.min.js')))
        .pipe($.if(isProduction, $.sourcemaps.init()))
        .pipe($.if(isProduction, $.uglify()))
        .pipe($.if(isProduction, $.sourcemaps.write()))
        .pipe(gulp.dest(destDir + '/js/'))
});

gulp.task('scripts', function (cb) {
    return runSequence('js','jsTemplates', cb);
});

gulp.task('css', function () {
    return gulp.src([appDir + '/css/*.css'])
        .pipe(gulp.dest(destDir + '/css/'))
});
gulp.task('img', function () {
    return gulp.src([appDir + '/img/**/*.*'])
        .pipe(gulp.dest(destDir + '/img/'))
});
gulp.task('static', ['css', 'img']);

gulp.task('html', function () {
    return gulp.src([appDir + '/index.html'])
        .pipe(gulp.dest(destDir))
});

gulp.task('rev', function () {
    return gulp.src(destDir + '/**/*.{js,css,png,jpg,jpeg,gif,ico,html,woff,ttf,eot,svg}')
        .pipe($.if(isProduction, $.revall({
            transformFilename: function (file, hash) {
                var ext = path.extname(file.path);
                if (ext === '.html') {
                    return path.basename(file.path, ext) + ext;
                }
                return hash.substr(0, 8) + '.' + path.basename(file.path, ext) + ext;
            },
            prefix: ''
        })))
        .pipe(gulp.dest(destDir));
});

gulp.task('bower_components', function () {
    return gulp.src([appDir + '/bower_components/**/*.*'])
        .pipe(gulp.dest(destDir + '/bower_components/'))
});

gulp.task('yuidoc', function () {
    return gulp.src([appDir + "/js/**/*.js"])
        .pipe($.yuidoc.parser())
        .pipe($.yuidoc.generator())
        .pipe(gulp.dest('./documentation-output'))
});


gulp.task('inject', function (cb) {
    gulp.src([destDir + '/index.html'])
        .pipe($.inject(gulp.src(bowerFiles({
                bowerDirectory: destDir,
                bowerJson: './bower.json'
            }), {
                read: false
            }
        ), {
            ignorePath: 'app',
            name: 'bower'
        }))
        .pipe($.inject(gulp.src([destDir + '/css/*.css']), {
            name: 'customCss',
            ignorePath: destPathName
        }))
        .pipe($.inject(
            gulp.src([destDir + '/js/**/*.js'])
                .pipe($.angularFilesort())
            ,
            {
                ignorePath: destPathName
            }
        ))
        .pipe(gulp.dest(destDir));
    cb();
});

gulp.task('stylus', function (cb) {
    gulp.src([appDir + '/stylus/*.styl'])
        .pipe($.sourcemaps.init())
        .pipe($.stylus({use: nib()}))
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest(destDir + '/css'));
    cb();
});

gulp.task('build', function (cb) {
    runSequence('clean', ['scripts', 'static'], 'stylus', 'bower_components', 'html', 'inject', 'rev', 'afterBuild', cb);
});