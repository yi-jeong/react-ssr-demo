import * as React from "react";
import express from "express";
import * as ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";

import { readFileSync } from "fs";
import path from "path";
import App from "../src/App";
import Html from "../src/html";

const PORT = 3000;
const app = express();
app.use(express.static("./dist/static"));

// load manifest
const manifest = readFileSync(
    path.join(process.cwd(), "dist", "static", "manifest.json"),
    { encoding: "utf-8" }
);
const assets = JSON.parse(manifest);

app.get("/*", (req, res) => {
    const entryPoint = assets[Object.keys(assets)[0]];

    const { pipe, abort: _abort } = ReactDOMServer.renderToPipeableStream(
        <StaticRouter location={req.url}>
            <Html>
                <App />
            </Html>
        </StaticRouter>,
    {
        bootstrapScripts: [entryPoint],
            onAllReady() {
                res.statusCode = 200;
                res.setHeader("Content-type", "text/html");
                pipe(res);
            },
            onShellError() {
                res.statusCode = 500;
                res.send("<!doctype html><p>Loading...</p>");
            },
    }
);
});

app.listen(PORT, () => {
    console.log(`Listening at ${PORT}...`);
});
