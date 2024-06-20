//专门打包hooks,utils,指令

import { series, parallel, src, dest } from "gulp";
import { buildconfig } from "./utils/config";
import path from "path";
import { outDir, projectPath } from "./utils/paths";
import ts from "gulp-typescript";
import { withTaskName } from "./utils";
export const buidPackages = (dirname: string, name: string) => {
  const tasks = Object.entries(buildconfig).map(([_module, config]) => {
    // D:\学习\vues\wsUI-plus\packages\utils\es
    //D:\学习\vues\wsUI-plus\packages\utils\lib
    const output = path.resolve(dirname, config.output.name);
    const inputs = ["**/*.ts", "!gulpfile.ts", "!node_modules/**/*"];
    return series(
      withTaskName(`build:${dirname}`,  () => {
        const tsconfig = path.resolve(projectPath, "tsconfig.json"); //ts配置文件路径
        return src(inputs)
          .pipe(
            ts.createProject(tsconfig, {
              declaration: true,
              strict: false,
              module: config.module,
            })()
          )
          .pipe(dest(output));
      }),
      withTaskName(`copy:${dirname}`,  () => {
        //放到es和lib下的utils下
        return src(`${output}/**`).pipe(
          dest(path.resolve(outDir, config.output.name, name))
        );
      })
    );
  });
  //打包的模块规范，cjs和es规范
  return parallel(...tasks);
};
