"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _employeeModel = _interopRequireDefault(require("../models/employeeModel"));

var _index = _interopRequireDefault(require("./index"));

var _tables = _interopRequireDefault(require("./tables"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// console.log(tableQuery);
var migrate = function migrate() {
  var tables, access, employee, newemployee;
  return regeneratorRuntime.async(function migrate$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_index["default"].query(_tables["default"]));

        case 3:
          tables = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(_employeeModel["default"].find('lastname=access'));

        case 6:
          access = _context.sent;

          if (!(access.length < 1)) {
            _context.next = 13;
            break;
          }

          employee = new _employeeModel["default"]('team', 'access', 'teamaccess@teamwork.com', 'teampass01', 'F', 'admin', 'admindept', 'hqtrs', true);
          employee.password = _bcrypt["default"].hashSync(employee.password, 10);
          _context.next = 12;
          return regeneratorRuntime.awrap(employee.save());

        case 12:
          newemployee = _context.sent;

        case 13:
          return _context.abrupt("return", tables);

        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 16]]);
}; // migrate().then(result => console.log('Tables created')).catch(e => console.log(e));


var _default = migrate;
exports["default"] = _default;