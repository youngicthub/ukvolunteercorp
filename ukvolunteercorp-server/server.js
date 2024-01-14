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
var cors = require("cors");
const path = require("path");
const fs = require("fs");
const port = process.env.PORT;
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

// SQL Password: }M0!mW]4,1*P

// app.use(cors());
app.use(
  cors({
    origin: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE'], // Specify the allowed methods
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  express.urlencoded({
    extended: true,
  })
);

// const users = require("./web-server/routes/users.routes.js");
const Products = require("./web-server/routes/Product.routes");
const Admin = require("./web-server/routes/Admin/Admin.routes");
// const Category = require("./web-server/routes/Category.routes");
// const Order = require("./web-server/routes/Orders.routes");
// const BillingAddress = require("./web-server/routes/BillingAddress.routes");

app.use(Products);
// app.use(users, Products, Category, Order, BillingAddress);
app.use("/admin", Admin);

app.get("/", (req, res) => {
  res.send("<h1>Server is up and running</h1>");
});

app.get("*", (req, res) => {
  res.status(404).send(JSON.stringify("404"));
});



server.listen(port, () => {
  console.log("Server runs on " + port);
});