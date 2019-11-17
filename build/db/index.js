"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _pg = require("pg");

require("dotenv/config");

var dbUrl = {
  host: process.env.HOST,
  user: process.env.USER,
  database: process.env.DB_NAME,
  password: process.env.PASS,
  port: process.env.DB_PORT
};
var dbUrlTest = {
  host: process.env.TEST_HOST,
  user: process.env.TEST_USER,
  database: process.env.TEST_DB_NAME,
  password: process.env.TEST_PASS,
  port: process.env.TEST_DB_PORT
};
console.log('NODE_ENV', process.env.NODE_ENV);
var db;

if (process.env.NODE_ENV === 'test') {
  db = new _pg.Client(dbUrlTest);
  console.log('Environment => Testing');
} else {
  db = new _pg.Client(dbUrl); // db = new Client(process.env.DATABASE_URL);

  console.log('Environment => Development');
}

db.connect(function (err, res) {
  if (err) {
    console.log("Some error in connection to: ".concat(process.env.DB_NAME, " DB"));
    return;
  }

  console.log('Connected to', res.database);
});
var _default = db;
exports["default"] = _default;