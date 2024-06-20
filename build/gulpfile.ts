import { series, parallel } from "gulp";
import {withTaskName,run} from "./utils";

//1.打包样式
//2.打包所有组件
//3.打包每个组件
//4.生成一个组件库
export default series(
  withTaskName("clean", async() => await run("rm -rf ./dist")),
  withTaskName("buildPackages",async ()=>await run('pnpm run --filter ./packages/** --parallel build')),
);
