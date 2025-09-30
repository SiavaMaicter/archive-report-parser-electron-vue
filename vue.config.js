const path = require("path");

module.exports = {
    publicPath: "./",
    chainWebpack: config => {
        config.entry('app').clear().add("./ui/main.js").end()
        config.resolve.alias.set("@", path.join(__dirname, "ui"))
    },
    pluginOptions: {
        electronBuilder: {
            mainProcessFile: './app/app.js',
            builderOptions: {
                appId: 'com.yourname.yourapp',
                productName: 'MyApp',
                directories: {
                    output: 'dist_electron'
                },
                files: [
                    '**/*'
                ],
                // Дополнительные опции сборки
                win: {
                    target: 'nsis' // или portable, или другие
                },
                mac: {
                    target: 'dmg'
                },
                linux: {
                    target: 'AppImage'
                }
            }
        }
    }
}