const {shareAll, withModuleFederationPlugin} = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

    name: 'assets',
    exposes: {
        './Component': './apps/assets/src/app/app.component.ts',
    },

    shared: {
        ...shareAll({singleton: true, strictVersion: true, requiredVersion: 'auto'}),
    },

});
