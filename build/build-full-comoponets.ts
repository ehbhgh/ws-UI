import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import vue from "rollup-plugin-vue";
import typescript from "rollup-plugin-typescript2";
import { parallel } from "gulp";
import path from "path";
import { compInputPath, outDir } from "./utils/paths";
import { rollup, OutputOptions } from "rollup";
const buildFull = async () => {

  
  const config = {
    input: path.resolve(compInputPath, "index.ts"), //打包入口
    plugins: [
      nodeResolve(),
      vue(),
      typescript({
        clean: true,
        verbosity: 3, // 增加详细度
      }),
      commonjs()
    ],
    external: (id: string) => /^vue/.test(id), //排除依赖
  };

  const buildConfig = [
    {
      format: "umd", //打包格式
      file: path.resolve(outDir, "index.js"), //打包路径
      name: "wsUI-Plus", //全局的名字
      exports: "named", //导出的名字，以命名的方式导出
      globals: {
        //表示vue时全局的
        vue: "Vue",
      },
    },
    {
      format: "esm",
      file: path.resolve(outDir, "index.esm.js")
    }
  ];
  let bundle = await rollup(config);


  return Promise.all(
    buildConfig.map((config) => bundle.write(config as OutputOptions))
  );
};
//这是一个任务打包所有组件
//buildFullComponent是任务名
export const buildFullComponent = parallel(buildFull);
