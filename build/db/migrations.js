"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = _interopRequireDefault(require("./index"));

var _tables = _interopRequireDefault(require("./tables"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// console.log(tableQuery);
var migrate = function migrate() {
  var tables;
  return regeneratorRuntime.async(function migrate$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_index["default"].query(_tables["default"]));

        case 3:
          tables = _context.sent;
          return _context.abrupt("return", tables);

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

migrate().then(function (result) {
  return console.log('Tables created');
})["catch"](function (e) {
  return console.log(e);
});
var _default = migrate;
exports["default"] = _default;