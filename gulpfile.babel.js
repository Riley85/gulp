import gulp from "gulp";
import del from "del";
import fileInclude from "gulp-file-include";

export const includeFile = () => {
  return gulp
    .src(["./src/html/*"])
    .pipe(
      fileInclude({
        prefix: "@@",
        basepath: "./src/assets/front/include",
      })
    )
    .pipe(gulp.dest("./dest/html"));
};
export const clean = () => del(["build"]);

export const dev = gulp.series([clean, includeFile]);
