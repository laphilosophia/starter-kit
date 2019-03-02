exports.pages = function (env) {
    const HtmlWebpackPlugin = require('html-webpack-plugin')
    const fs = require('fs')
    const path = require('path')
    const viewsFolder = path.resolve(__dirname, './views')
    const pkg = require('../package.json')

    let pages = []

    fs.readdirSync(viewsFolder).forEach(view => {
        const viewName = view.split('.')[0];

        const options = {
            title: pkg.title,
            description: pkg.description,
            keywords: pkg.keywords,
            author: pkg.author,
            filename: `${viewName}.html`,
            template: `./sources/views/${view}`,
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
