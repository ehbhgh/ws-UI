import { series } from "gulp";
import { sync } from "fast-glob";
import { componentsPath } from "./utils/paths";
import path from "path";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import vue from "rollup-plugin-vue";
import typescript from "rollup-plugin-typescript2";
const buildEachComponents = async () => {
  const files = sync("*", {
    cwd: componentsPath,
    onlyDirectories: true,
  });

  const builds = files.map(async (file) => {
    const entry = path.resolve(componentsPath, file, "index.ts");
    const config = {
      entry,
      plugins: [
        nodeResolve(),
        vue(),
        typescript(),
        commonjs(),
      ],
      external: (id: string) => /^vue/.test(id) || /^@wsUI-plus/.test(id), //排除依赖
    };
  });
};

export const components = series(buildEachComponents);
