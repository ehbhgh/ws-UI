import path from "path";
import { outDir } from "./paths";
export const buildconfig = {
  esm: {
    module: "ESNext",//tsconfig输出的是es6模块
    format: "esm",
    output: {
      name: "es",//打包到哪个目录下
      path: path.resolve(outDir, "es"),
    },
    bundle:{
        path:"wsUI-plus/es"
    }
  },
  cjs: {
    module: "CommonJs",
    format: "cjs",
    output: {
      name: "lib",
      path: path.resolve(outDir, "lib"),
    },
    bundle:{
        path:"wsUI-plus/lib"
    }
  },
};

export type BuildConfig=typeof buildconfig