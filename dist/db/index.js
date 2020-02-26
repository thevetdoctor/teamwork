"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _pg = require("pg");

require("dotenv/config");

// const elephantSql = 'postgres://aikuwuqy:VwJSaP-pOdEc--_ZNpS-g2zHekiTgLJK@raja.db.elephantsql.com:5432/aikuwuqy';
// const elephantSqlTest = 'postgres://ujkhiehs:JLm9XTjoF7_cyAP48mKgiGO_Hlxt6b-0@salt.db.elephantsql.com:5432/ujkhiehs';
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
console.log('NODE_ENV', process.env.NODE_ENV, process.env.COMPUTERNAME);
var db;

if (process.env.NODE_ENV === 'test ') {
  if (process.env.COMPUTERNAME === 'ACER-PC') {
    db = new _pg.Client(dbUrlTest);
    console.log('Environment => Testing Local');
  } else {
    db = new _pg.Client(process.env.DB_CLOUD_TEST);
    console.log('Environment => Testing Cloud');
  }
} else {
  if (process.env.COMPUTERNAME !== 'ACER-PC') {
    db = new _pg.Client(dbUrl);
    console.log('Environment => Development');
  } else {
    db = new _pg.Client(process.env.DB_CLOUD);
    console.log('Environment => Production');
  }
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