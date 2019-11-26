"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _db = _interopRequireDefault(require("../db"));

var _migrations = _interopRequireDefault(require("../db/migrations"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var clearDBQuery = "DROP TABLE IF EXISTS comments;\n                      DROP TABLE IF EXISTS articles;\n                      DROP TABLE IF EXISTS gifs;\n                      DROP TABLE IF EXISTS employees;";

var clearDB = function clearDB() {
  var clear;
  return regeneratorRuntime.async(function clearDB$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_db["default"].query(clearDBQuery));

        case 3:
          clear = _context.sent;
          return _context.abrupt("return", clear);

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

clearDB().then(function (result) {
  return console.log('TestDB cleared');
})["catch"](function (e) {
  return console.log(e);
});
(0, _migrations["default"])().then(function (result) {
  return console.log('Tables created');
})["catch"](function (e) {
  return console.log(e);
});
var _default = clearDB;
exports["default"] = _default;