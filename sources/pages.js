exports.pages = function (env) {
    const HtmlWebpackPlugin = require('html-webpack-plugin')
    const fs = require('fs')
    const path = require('path')
    const viewsFolder = path.resolve(__dirname, './views')

    var pages = []

    fs.readdirSync(viewsFolder).forEach(view => {
        const viewName = view.split('.')[0];

        const options = {
            filename: `${viewName}.html`,
            template: `./views/${view}`,
            inject: true
        };

        if (env === 'development') {
            options.minify = {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            };
        }

        pages.push(new HtmlWebpackPlugin(options));
    })

    return pages;
}
