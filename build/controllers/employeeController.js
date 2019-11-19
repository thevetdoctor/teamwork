"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _employeeModel = _interopRequireDefault(require("../models/employeeModel"));

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
      var _req$body, firstName, lastName, email, password, gender, jobRole, department, address, employee, missingValue, emailExist, newemployee, tokenDetails, token;

      return regeneratorRuntime.async(function createUser$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              // console.log(req.body);
              _req$body = req.body, firstName = _req$body.firstName, lastName = _req$body.lastName, email = _req$body.email, password = _req$body.password, gender = _req$body.gender, jobRole = _req$body.jobRole, department = _req$body.department, address = _req$body.address;
              employee = new _employeeModel["default"](firstName, lastName, email, password, gender, jobRole, department, address); // console.log(Object.keys(employee).filter(item => employee[item] === undefined));

              missingValue = Object.keys(employee).filter(function (item) {
                return employee[item] === undefined;
              });

              if (!(missingValue.length > 0)) {
                _context.next = 5;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                status: 'error',
                error: "".concat(missingValue, " not supplied")
              }));

            case 5:
              _context.next = 7;
              return regeneratorRuntime.awrap(_employeeModel["default"].find("email=".concat(employee.email)));

            case 7:
              emailExist = _context.sent;

              if (!emailExist) {
                _context.next = 13;
                break;
              }

              if (!(emailExist.indexOf('not') >= 0)) {
                _context.next = 11;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                status: 'error',
                error: 'Some error found with email'
              }));

            case 11:
              if (!(emailExist.length > 0)) {
                _context.next = 13;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                status: 'error',
                error: 'Email already used'
              }));

            case 13:
              employee.password = _bcrypt["default"].hashSync(employee.password, 10);
              _context.next = 16;
              return regeneratorRuntime.awrap(employee.save());

            case 16:
              newemployee = _context.sent;

              if (!(newemployee.indexOf('not') >= 0)) {
                _context.next = 19;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                error: 'Some error found with storing data'
              }));

            case 19:
              tokenDetails = {
                id: newemployee[0].userid,
                firstName: newemployee[0].firstname,
                lastName: newemployee[0].lastname,
                email: newemployee[0].email,
                isadmin: newemployee[0].isadmin
              };
              token = _jsonwebtoken["default"].sign({
                tokenDetails: tokenDetails
              }, process.env.SECRET, {
                expiresIn: '2h'
              }); // console.log('token details', tokenDetails);

              return _context.abrupt("return", res.status(201).json({
                status: 'success',
                data: {
                  message: 'User account successfully created',
                  token: token,
                  userId: newemployee[0].userid
                }
              }));

            case 22:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  }, {
    key: "signIn",
    value: function signIn(req, res) {
      var _req$body2, email, password, signinDetails, missingValue, emailExist, compared, tokenDetails, token;

      return regeneratorRuntime.async(function signIn$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
              signinDetails = {
                email: email,
                password: password
              };
              missingValue = Object.keys(signinDetails).filter(function (item) {
                return signinDetails[item] === undefined;
              }); // console.log('missing value', missingValue);

              if (!(missingValue.length > 0)) {
                _context2.next = 5;
                break;
              }

              return _context2.abrupt("return", res.status(400).json({
                status: 'error',
                error: "".concat(missingValue, " not supplied")
              }));

            case 5:
              _context2.next = 7;
              return regeneratorRuntime.awrap(_employeeModel["default"].find("email=".concat(email)));

            case 7:
              emailExist = _context2.sent;

              if (!emailExist) {
                _context2.next = 13;
                break;
              }

              if (!(emailExist.indexOf('not') >= 0)) {
                _context2.next = 11;
                break;
              }

              return _context2.abrupt("return", res.status(400).json({
                status: 'error',
                error: 'Some error found with email'
              }));

            case 11:
              if (!(emailExist.length < 1)) {
                _context2.next = 13;
                break;
              }

              return _context2.abrupt("return", res.status(400).json({
                status: 'error',
                error: 'User not registered'
              }));

            case 13:
              compared = _bcrypt["default"].compareSync(password, emailExist[0].password);

              if (compared) {
                _context2.next = 16;
                break;
              }

              return _context2.abrupt("return", res.status(400).json({
                status: 'error',
                error: 'Password is Invalid'
              }));

            case 16:
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
              return _context2.abrupt("return", res.status(200).json({
                status: 'success',
                data: {
                  token: token,
                  userId: emailExist[0].userid
                }
              }));

            case 19:
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