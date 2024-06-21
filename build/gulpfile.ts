import { series, parallel } from "gulp";
import { withTaskName, run } from "./utils";
//1.打包样式
//2.打包所有组件
//3.打包每个组件
//4.生成一个组件库
export default series(
  withTaskName("clean", () => run("rm -rf ./dist")),
  parallel(
    withTaskName("buildPackages", () =>
      run("pnpm run --filter ./packages/** --parallel build")
    ),
    withTaskName(
      "buildComponents",
      //执行build命令时会调用gulp,给gulp传递参数,参数为buildFullComponent
      //等价于 gulp -f build/gulpfile.ts "buildFullComponent"
      () => run("pnpm run build buildFullComponent")
    ),
    withTaskName("components", () => run("pnpm run build components"))
  )
);

//执行对应任务
export * from "./build-full-comoponets";

export * from "./components";
