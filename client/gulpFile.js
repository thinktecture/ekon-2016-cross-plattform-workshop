'use strict';

const gulp = require('gulp'),
    del = require('del'),
    sourceMaps = require('gulp-sourcemaps'),
    inlineNg2Template = require('gulp-inline-ng2-template'),
    tsc = require('gulp-typescript'),
    runSequence = require('run-sequence'),
    browserSync = require('browser-sync').create(),
    inject = require('gulp-inject'),
    path = require('path'),
    watch = require('gulp-watch');

const targetDir = 'build',
    sourceDir = 'src',
    typescript = {
        target: 'ES5',
        module: 'system',
        moduleResolution: 'node',
        declaration: false,
        emitDecoratorMetadata: true,
        experimentalDecorators: true,
        removeComments: false,
        noImplicitAny: false
    },
    nodeModules = [
        '@angular',
        'rxjs'
    ],
    vendorScripts = [
        'node_modules/core-js/client/shim.js',
        'node_modules/zone.js/dist/zone.js',
        'node_modules/reflect-metadata/Reflect.js',
        'node_modules/systemjs/dist/system.src.js'
    ];

const injectables = [
    ...vendorScripts.map(v => path.join(path.join(targetDir, 'lib'), v.split('/').slice(-1)[0])),
    path.join(targetDir, 'systemSetup.js'),
    path.join(targetDir, '**/*.css'),
];


gulp.task('clean', () => del(targetDir));

gulp.task('scripts', () => {
    const ts = gulp.src(path.join(sourceDir, '**', '*.ts'))
        .pipe(inlineNg2Template({
            useRelativePaths: true
        }))
        .pipe(sourceMaps.init())
        .pipe(tsc(typescript));

    return ts.js
        .pipe(sourceMaps.write('.'))
        .pipe(gulp.dest(targetDir))
        .on('end', () => browserSync.reload());
});

gulp.task('nodeModules', () => {
    return gulp.src(
        nodeModules.map(m =>
            path.join('node_modules', m, '**/*.+(js|map)')),
        { base: 'node_modules' })
        .pipe(gulp.dest(path.join(targetDir, 'lib')));
});

gulp.task('index', () => {
    const injectablesSrc = gulp.src(injectables, { read: false });

    return gulp.src(path.join('src', 'index.html'))
        .pipe(inject(injectablesSrc, {
            addRootSlash: false,
            ignorePath: targetDir
        }))
        .pipe(gulp.dest(targetDir))
        .on('end', () => browserSync.reload());
});

gulp.task('systemJs', () => {
    return gulp.src(path.join('src', 'systemSetup.js'))
        .pipe(gulp.dest(targetDir))
        .on('end', () => browserSync.reload());
});

gulp.task('css', () => {
    return gulp.src(
        [
            path.join('node_modules', 'bootstrap', 'dist', 'css', 'bootstrap.min.css'),
            path.join('node_modules', 'font-awesome', 'css', 'font-awesome.css'),
            path.join(sourceDir, 'css', '*.css')
        ])
        .pipe(gulp.dest(path.join(targetDir, 'css')))
        .on('end', () => browserSync.reload());
});

gulp.task('vendorScripts', () => {
    return gulp.src(vendorScripts)
        .pipe(gulp.dest(path.join(targetDir, 'lib')));
});


gulp.task('browser', (done) => {
    browserSync.init({
        ghostMode: false,
        open: true,
        server: {
            baseDir: './build',
            middleware: {}
        },
        port: 8020
    }, done);
});

gulp.task('index:watch', () => {
    watch(path.join(sourceDir, 'index.html'), () =>
        runSequence('index'));
});

gulp.task('css:watch', () => {
    watch(path.join(sourceDir, 'css', '*.css'), () => {
        runSequence('css');
    });
});

gulp.task('templates:watch', () => {
    watch(path.join(sourceDir, '**', '*.html'), () => {
        runSequence('scripts');
    })
});

gulp.task('scripts:watch', () => {
    watch(path.join(sourceDir, '**', '*.ts'), () => {
        runSequence('scripts');
    })
});

gulp.task('fonts', () => {
    gulp.src(path.join('node_modules', 'font-awesome', 'fonts', '*.*'))
        .pipe(gulp.dest(path.join(targetDir, 'fonts')));
});

// TODO: Watch-Tasks

gulp.task('build', (done) => {
    runSequence('clean',
        'scripts',
        'nodeModules',
        'systemJs',
        'fonts',
        'css',
        'vendorScripts',
        'index',
        done);
});

gulp.task('watch', (done) => {
    runSequence(
        'browser',
        [
            'index:watch',
            'css:watch',
            'templates:watch',
            'scripts:watch'
        ],
        done
    );
});

gulp.task('default', (done) => {
    runSequence(
        'build',
        'watch',
        done
    );
});
