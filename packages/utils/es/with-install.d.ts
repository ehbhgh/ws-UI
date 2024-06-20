import type { App } from "vue";
declare const withInstall: <T extends {
    __name: string;
    install: (app: App) => void;
}>(comp: T) => T;
export default withInstall;
