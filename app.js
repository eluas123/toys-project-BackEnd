const express = require("express");
const path = require("path");
const http = require("http");
require("./db/mongoConnect");
require('dotenv').config();
const { routesInit } = require("./routes/config_routes");

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

routesInit(app);

const server = http.createServer(app);
console.log(process.env.USER_DB)
let port = process.env.PORT || "3001";
server.listen(port);