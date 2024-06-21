vue3+typescript搭建组件库
# 1.目录结构
- build负责打包的文件夹，gulp编译ts，打包样式，打包单文件组件
- dist最终打包的结果
- packages 存放组件代码
- play用来测试代码，测试编写的组件，用于调试
- typings 存放类型的声明文件、
- .npmrc 需要增加文件安装依赖才会正常
- tsconfig ts的配置文件

# 2.packages
- comoponents存放组件代码，每个组件一个文件夹，最终由index.ts导出
- theme 存放样式，使用BEM命名规范
- utils 存放公共工具类库

将三个模块直接创造一个软连接放在根模块下
```json
    "@wsui-plus/components": "workspace:^",
    "@wsui-plus/theme": "workspace:^",
    "@wsui-plus/utils": "workspace:^"
```

# 3.build打包模块
- 安装模块
> pnpm add gulp @types/gulp sucrase rimraf @types/rimraf -w -D
> pnpm install gulp-sass @types/gulp-sass @types/sass @types/gulp-clean-css gulp-clean-css sass -D -w
- 创建gulpfile.ts
```ts 
import { series, parallel } from "gulp";
import {withTaskName,run} from "./utils";
export default series(
  withTaskName("clean", async() => await run("rm -rf ./dist")),
  withTaskName("buildPackages",async ()=>await run('pnpm run --filter ./packages/** --parallel build')),
);

```

# 4.dist目录打包出来的整体结构
- es 打包出来的js文件，遵循es6规范
- lib 打包出来的js文件,遵循commonjs规范
- theme 打包出来的样式文件
- 最终发布模块就是dist模块（发布到npm上）

# 5.组件打包
- 1.componeents存放全部组件，配置一个index.ts作为组件入口
```ts
export * from "./Icon"
```
- 2.最终组件最后到ws-plus下使用
```ts
import { wsIcon } from "@wsui-plus/components";
import type { App } from "vue";

//组件数组
const components = [wsIcon];
//通过install方法，将组件注册到vue实例中，用户可以使用use方法注册，就会自动调用当前的install方法
const install = (app: App) => {
  components.forEach((component) => {
    //有的是组件，有的是指令
    app.use(component);
  });
};

//全部导入
export default {
  install,
};

//引入单独导入
export * from "@wsui-plus/components";

```
## 5.1 rollup打包
>  pnpm add rollup @rollup/plugin-node-resolve @rollup/plugin-commonjs rollup-plugin-typescript2 rollup-plugin-vue -D -w