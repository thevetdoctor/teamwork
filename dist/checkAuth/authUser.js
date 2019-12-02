"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _employeeModel = _interopRequireDefault(require("../models/employeeModel"));

var _response = _interopRequireDefault(require("../helpers/response"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var authUser = function authUser(req, res, next) {
  var userIsRegistered;
  return regeneratorRuntime.async(function authUser$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (req.token) {
            _context.next = 2;
            break;
          }

          return _context.abrupt("return", _response["default"].values(res, 403, 'No credentials'));

        case 2:
          _context.next = 4;
          return regeneratorRuntime.awrap(_employeeModel["default"].find("userid=".concat(req.token.id)));

        case 4:
          userIsRegistered = _context.sent;

          if (userIsRegistered) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", _response["default"].values(res, 403, 'User not registered'));

        case 7:
          console.log('Permission granted');
          next();

        case 9:
        case "end":
          return _context.stop();
      }
    }
  });
};

var _default = authUser;
exports["default"] = _default;