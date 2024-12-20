var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
bodyParser = require("body-parser");
var dotenv = require("dotenv");
dotenv.config();

mongoose = require("mongoose");

utils = require("./common/utils");

var app = express();

var cors = require("cors");
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "5mb" }));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

var connStr = utils.getConectionString();
mongoose.connect(connStr, {});
var db = mongoose.connection;
db.on(
  "error",
  console.error.bind(console, "Connecting to DB " + connStr + " failed")
);
db.once("open", function () {
  console.log(
    "\n" + "\x1b[35m",
    "** Connected to Mongo Atlas - " + connStr + " **\n"
  );
});
messagesModel = require("./models/messagesModel");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var messagesRouter = require("./routes/messages");

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/messages", messagesRouter);

module.exports = app;
