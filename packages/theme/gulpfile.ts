import { series, src, dest } from "gulp";
import gulpSass from "gulp-sass";
import dartSass from "sass";
// import gulpAutoprefixer from "gulp-autoprefixer"
import cleanCss from "gulp-clean-css";
import path from "path";

function compile() {
  const sass = gulpSass(dartSass);
  return src(path.resolve(__dirname, "./src/*.scss"))
    .pipe(sass.sync())
    .pipe(cleanCss())
    .pipe(dest(path.resolve(__dirname, "./dist")));
}

function copyfont() {
  return src(path.resolve(__dirname, "./src/fonts/**"))
    .pipe(cleanCss())
    .pipe(dest("./dist/fonts"));
}

function copyfullStyle() {
  return src(path.resolve(__dirname, "./dist/**")).pipe(
    dest(path.resolve(__dirname, "../../dist/theme"))
  );
}
export default series(compile, copyfont,copyfullStyle);
