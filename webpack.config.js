// webpack.config.js

module.exports = {
    // ...
    devServer: {
        // ...
        setupMiddlewares: (middlewares) => {
            // Add your custom middleware here
            middlewares.use((req, res, next) => {
                console.log(`Request URL: ${req.url}`);
                next();
            });
        },
    },
};
