const withInstall = (comp) => {
    comp.install = (app) => {
        app.component(comp.__name, comp);
    };
    return comp;
};
export default withInstall;
