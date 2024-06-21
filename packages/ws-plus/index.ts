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
