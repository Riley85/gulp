import gulp from "gulp";
import del from "del";

const routes = {};

export const clean = () => del(["build"]);

export const dev = gulp.series([clean]);
