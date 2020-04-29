const presetEnv = require.resolve('@babel/preset-env');
const presetReact = require.resolve('@babel/preset-react');
const classPropPlugin = require.resolve('@babel/plugin-proposal-class-properties');
const webpack = require('webpack');

module.exports = (settings) => ({
    mode: "production",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [presetEnv, presetReact],
                        plugins: [classPropPlugin]
                    }
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name(fileName) {
                                return fileName.replace(/(^[A-Z]:\\[^\\]*|^\/[^/]*)/, settings.appName);
                            },
                            emitFile: false
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            BASENAME: JSON.stringify(`/webapp/${settings.appName}`)
        }),
    ]
});
