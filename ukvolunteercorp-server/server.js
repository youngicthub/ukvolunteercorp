const express = require("express");
require("events").EventEmitter.prototype._maxListeners = 500;
const http = require("http");
const app = express();
const server = http.createServer(app);
const socketIo = require("socket.io");
const io = socketIo(server);
const compression = require("compression");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const port = process.env.PORT || 3000;
const nodemailer = require("nodemailer");

const publicDirPath = path.join(__dirname, "/web-server/web-folder/public");

app.use(express.static(publicDirPath));
app.use(express.json());
app.use(cookieParser());
app.use(
  compression({
    level: 9,
  })
);
app.use(
  cors({
    origin: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Example routes, replace these with your actual routes
app.get("/", (req, res) => {
  res.send("<h1>Server is up and running</h1>");
});

// Example usage of Product and Admin routes
const Products = require("./web-server/routes/Product.routes");
const Admin = require("./web-server/routes/Admin/Admin.routes");
app.use("/products", Products);
app.use("/admin", Admin);

app.get("*", (req, res) => {
  res.status(404).send(JSON.stringify("404"));
});

server.listen(port, () => {
  console.log("Server runs on " + port);
});
