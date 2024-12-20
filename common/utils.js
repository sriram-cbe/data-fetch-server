var config = require("../config/dev.json");
var jwt = require("jsonwebtoken");

var generateJwtToken = (data) => {
  var token = jwt.sign(data, config.project.jwtSecret, { expiresIn: "1d" });
  return token;
};

var verifyJwtToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.project.jwtSecret, function (err, decoded) {
      if (err) {
        reject(err);
      }
      console.log(decoded);
      resolve(decoded);
    });
  });
};

// var getConectionString = () => {
//     var userOption = "";
//     if (config.database.username) {
//         userOption = config.database.username + ":" + config.database.password + "@";
//     }

//     return "mongodb://"
//         + userOption
//         + config.database.host + ":"
//         + config.database.port + "/"
//         + config.database.database;
// }

var getConectionString = () => {
  var userOption = process.env.CONNECTION_STRING;
  return userOption;
};

var generatePassword = function () {
  var retVal = "";
  retVal = generatePasswordWithType(3, "ABCDEFGHIJKLMNOPQRSTUVWXYZ", retVal);
  retVal = generatePasswordWithType(3, "abcdefghijklmnopqrstuvwxyz", retVal);
  retVal = generatePasswordWithType(1, "!@#$*^_~&", retVal);
  retVal = generatePasswordWithType(1, "1234567890", retVal);

  return retVal;
};

var generatePasswordWithType = function (length, charset, retVal) {
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }

  return retVal;
};

function getDayByDate(date) {
  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  var date = new Date(date);
  var day = days[date.getDay()];
  return day;
}

function getDateAndTime(dateTime) {
  var dateTimeObj = {
    date: moment(dateTime).utc().format("MM/DD/YYYY"),
    time: moment(dateTime).utc().format("LT"),
  };
  return dateTimeObj;
}

function getFormattedDateTime(dateTime) {
  return moment(dateTime).format("MM/DD/YYYY hh:MM a").toUpperCase();
}

module.exports = {
  generateJwtToken,
  verifyJwtToken,
  getConectionString,
  generatePassword,
  getDayByDate,
  getDateAndTime,
  getFormattedDateTime,
};
