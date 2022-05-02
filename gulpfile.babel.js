import gulp from "gulp";
import del from "del";
import fileInclude from "gulp-file-include";
import webserver from "gulp-webserver";
import GulpImage from "gulp-image";

const includeFile = () => {
  return gulp
    .src(["./src/html/**/*"])
    .pipe(
      fileInclude({
        prefix: "@@",
        basepath: "./src/assets/front/include",
      })
    )
    .pipe(gulp.dest("./dist/html"));
};

const ws = () =>
  gulp.src("./dist").pipe(
    webserver({
      livereload: true,
      open: true,
    })
  );

const watch = () => {
  gulp.watch("./src/**/*", includeFile);
};

const image = () =>
  gulp.src("./src/assets/front/images/**/*").pipe(GulpImage()).pipe(gulp.dest("./dist/assets/front/images"));

const clean = () => del(["dist"]);

const prepare = gulp.series([clean, image]);
const includes = gulp.series([includeFile]);
const postDev = gulp.series([ws, watch]);

export const dev = gulp.series([prepare, includes, postDev]);
