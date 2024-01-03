const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");

module.exports = {
    name: "client",
    entry: {
        client: path.resolve(process.cwd(), "src/index.tsx"),
    },
    mode: "production",
    output: {
        path: path.resolve(process.cwd() + "/dist/static"),
        filename: "[name].[contenthash].js",
        publicPath: "",
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
    },
    target: "web",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                options: {
                    configFile: path.resolve(
                        process.cwd(),
                        "tsconfig.json"
                    ),
                },
            },
            {
                test:  /\.(sass|css|scss)$/,
                use: ['style-loader', 'css-loader', 'postcss-loader']
            }
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new WebpackManifestPlugin(),
    ],
};
