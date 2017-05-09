/**
 * Created by me on 2017/04/06.
 */

var gulp = require("gulp");


/**********1 browser-sync 浏览器同步组件*******************/

var browserSync = require("browser-sync").create();

gulp.task("browser-sync",function(){
    browserSync.init({
        files:"src",
        port:"8080",
        server:{
            baseDir:["src","./"]
        }
    })
});


/***********2 htmlmin 网页 压缩*/

var htmlMin = require("gulp-htmlmin");

gulp.task("htmlmin",function(){
    gulp.src(["src/*.html","src/*.htm"])
        .pipe(htmlMin(
            {
                removeComments:true,//清除html注释
                collapseWhitespace:true,//压缩 html
                collapseBooleanAttributes:true,//省略布尔属性的值
                removeEmptyAttributes:true,//删除所有空格作属性的值
                removeScriptTypeAttributes:true,
                removeStyleLinkTypeAttributes:true,
                minifyJS:true,
                minifyCSS:true
            }
        ))
        .pipe(gulp.dest("dist"));
});


/******3 images 压缩*/
var imageMin = require("gulp-imagemin");
gulp.task("imagemin", function () {
    gulp.src('src/images/*.{jpg,png,gif,ico}')
        .pipe(imageMin(
            {
                optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
                progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
                interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
                multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
            }
        ))
        .pipe(gulp.dest('dist/images'))

});
//******************4.gulp-minify-css*****************
var cssmin = require('gulp-minify-css');
//确保已本地安装gulp-make-css-url-version [cnpm install gulp-make-css-url-version --save-dev]
var cssver = require('gulp-make-css-url-version');

gulp.task('Cssmin', function () {
    gulp.src('src/css/*.css')
        .pipe(cssver()) //给css文件里引用文件加版本号（文件MD5）
        .pipe(cssmin())
        .pipe(gulp.dest('dist/css'));
});
//****************5.gulp-uglify*******************
var uglify = require('gulp-uglify');

gulp.task('jsmin', function () {
    //压缩src/js目录下的所有js文件
    //除了test1.js和test2.js（**匹配src/js的0个或多个子文件夹）
    gulp.src(['src/js/*.js', '!src/js/**/{test1,test2}.js'])
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});


//***************6.gulp-less********************
var less = require('gulp-less'),
    livereload = require('gulp-livereload');

gulp.task('less', function () {
    gulp.src('src/less/*.less')
        .pipe(less())//编译less
        .pipe(gulp.dest('src/css'))// 生成目录
        .pipe(livereload());// 编译重新加载
});

//特别注意：若编译less的时候，同时执行其他操作，有可能引起页面刷新，而不是将样式植入页面
//例如下面任务同时生成sourcemap：
//var sourcemaps = require('gulp-sourcemaps');
//gulp.task('less', function () {
//    gulp.src(['src/less/*.less'])
//        .pipe(sourcemaps.init())
//        .pipe(less())
//        .pipe(sourcemaps.write('./'))
//        .pipe(gulp.dest('src/css'))
//        .pipe(livereload());
//});

gulp.task('watch', function () {
    livereload.listen();//监听，重新加载
    gulp.watch('src/less/**/*.less', ['less', 'browser-sync']);
});

//***************7.gulp-connect********************
var connect = require('gulp-connect'); //包含服务器插件1
gulp.task('server', function () {
    connect.server({
        root: 'dist',//服务器的根目录
        livereload: true //启用实时刷新的功能
    });
});


gulp.task('default', ['browser-sync', 'htmlmin', 'imagemin', 'Cssmin', 'less', 'jsmin','server']); //定义默认任务


