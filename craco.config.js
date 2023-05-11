/*
const myMiddleware = (req, res, next) => {
    // ... do something
    next();
};
*/

module.exports = {
    webpack: {
        // ... your webpack config
        plugins: [
            // ... your other plugins
        ],
        devServer: {
            // ... other options
            port: 3000,
            open: true,

        },
    },
};