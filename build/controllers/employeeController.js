"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _employeeModel = _interopRequireDefault(require("../models/employeeModel"));

var _missingValue = _interopRequireDefault(require("../helpers/missingValue"));

var _response = _interopRequireDefault(require("../helpers/response"));

require("dotenv/config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var EmployeeController =
/*#__PURE__*/
function () {
  function EmployeeController() {
    _classCallCheck(this, EmployeeController);
  }

  _createClass(EmployeeController, null, [{
    key: "createUser",
    value: function createUser(req, res) {
      var _req$body, firstName, lastName, email, password, gender, jobRole, department, address, employee, emailExist, newemployee, tokenDetails, token;

      return regeneratorRuntime.async(function createUser$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _req$body = req.body, firstName = _req$body.firstName, lastName = _req$body.lastName, email = _req$body.email, password = _req$body.password, gender = _req$body.gender, jobRole = _req$body.jobRole, department = _req$body.department, address = _req$body.address;
              employee = new _employeeModel["default"](firstName, lastName, email, password, gender, jobRole, department, address);

              _missingValue["default"].values(res, firstName, lastName, email, password, gender, jobRole, department, address);

              _context.next = 5;
              return regeneratorRuntime.awrap(_employeeModel["default"].find("email=".concat(employee.email)));

            case 5:
              emailExist = _context.sent;

              if (!emailExist) {
                _context.next = 11;
                break;
              }

              if (!(emailExist.indexOf('not') >= 0)) {
                _context.next = 9;
                break;
              }

              return _context.abrupt("return", _response["default"].values(res, 400, 'Some error found with email'));

            case 9:
              if (!(emailExist.length > 0)) {
                _context.next = 11;
                break;
              }

              return _context.abrupt("return", _response["default"].values(res, 400, 'Email already used'));

            case 11:
              employee.password = _bcrypt["default"].hashSync(employee.password, 10);
              _context.next = 14;
              return regeneratorRuntime.awrap(employee.save());

            case 14:
              newemployee = _context.sent;
              if (newemployee.indexOf('not') >= 0) _response["default"].values(res, 400, 'Some error found with storing data');
              tokenDetails = {
                id: newemployee[0].userid,
                firstName: newemployee[0].firstname,
                lastName: newemployee[0].lastname,
                email: newemployee[0].email,
                isAdmin: newemployee[0].isadmin
              };
              token = _jsonwebtoken["default"].sign({
                tokenDetails: tokenDetails
              }, process.env.SECRET, {
                expiresIn: '2h'
              });
              return _context.abrupt("return", _response["default"].values(res, 201, {
                message: 'User account successfully created',
                token: token,
                userId: newemployee[0].userid
              }));

            case 19:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  }, {
    key: "signIn",
    value: function signIn(req, res) {
      var _req$body2, email, password, emailExist, compared, tokenDetails, token;

      return regeneratorRuntime.async(function signIn$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;

              _missingValue["default"].values(res, email, password);

              _context2.next = 4;
              return regeneratorRuntime.awrap(_employeeModel["default"].find("email=".concat(email)));

            case 4:
              emailExist = _context2.sent;

              if (!emailExist) {
                _context2.next = 10;
                break;
              }

              if (!(emailExist.indexOf('not') >= 0)) {
                _context2.next = 8;
                break;
              }

              return _context2.abrupt("return", _response["default"].values(res, 400, 'Some error found with email'));

            case 8:
              if (!(emailExist.length < 1)) {
                _context2.next = 10;
                break;
              }

              return _context2.abrupt("return", _response["default"].values(res, 400, 'User not registered'));

            case 10:
              compared = _bcrypt["default"].compareSync(password, emailExist[0].password);

              if (compared) {
                _context2.next = 13;
                break;
              }

              return _context2.abrupt("return", _response["default"].values(res, 400, 'Password is Invalid'));

            case 13:
              tokenDetails = {
                id: emailExist[0].userid,
                firstName: emailExist[0].firstname,
                lastName: emailExist[0].lastname,
                email: emailExist[0].email,
                isAdmin: emailExist[0].isadmin
              };
              token = _jsonwebtoken["default"].sign({
                tokenDetails: tokenDetails
              }, process.env.SECRET, {
                expiresIn: '2h'
              });
              return _context2.abrupt("return", _response["default"].values(res, 200, {
                token: token,
                userId: emailExist[0].userid
              }));

            case 16:
            case "end":
              return _context2.stop();
          }
        }
      });
    }
  }]);

  return EmployeeController;
}();

var _default = EmployeeController;
exports["default"] = _default;