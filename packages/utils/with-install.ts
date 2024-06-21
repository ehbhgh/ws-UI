import type { App } from "vue";

const withInstall = <T extends { __name: string; install: (app: App) => void } >(
  comp: T
) => {
  comp.install = (app: App) => {
    app.component(comp.__name, comp);
  };
  return comp;
};

export default withInstall;
