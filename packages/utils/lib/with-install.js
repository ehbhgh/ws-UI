"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const withInstall = (comp) => {
    comp.install = (app) => {
        app.component(comp.__name, comp);
    };
    return comp;
};
exports.default = withInstall;
