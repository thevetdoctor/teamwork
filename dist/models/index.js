"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _db = _interopRequireDefault(require("../db"));

var _query = require("../db/query");

require("regenerator-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var BaseModel =
/*#__PURE__*/
function () {
  function BaseModel() {
    _classCallCheck(this, BaseModel);
  }

  _createClass(BaseModel, null, [{
    key: "find",
    // constructor() {
    // this.name = name;
    // } 
    value: function find(position, order) {
      var obj, res;
      return regeneratorRuntime.async(function find$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              obj = this.name;
              obj = obj.replace('Model', 's').toLowerCase(); // console.log(obj, position, order);
              // try {

              _context.next = 4;
              return regeneratorRuntime.awrap(_db["default"].query.apply(_db["default"], _toConsumableArray((0, _query.findQuery)(obj, position, order))).then(function (result) {
                return result.rows;
              })["catch"](function (err) {
                return 'Error found here!', err.message;
              }));

            case 4:
              res = _context.sent;
              return _context.abrupt("return", res);

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "findByJoin",
    value: function findByJoin(joinTable, on, position) {
      var obj, joinQuery, res;
      return regeneratorRuntime.async(function findByJoin$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              obj = this.name;
              obj = obj.replace('Model', 's').toLowerCase(); // console.log(obj, on, position);

              joinQuery = "SELECT * FROM ".concat(obj, " INNER JOIN ").concat(joinTable, " ON ").concat(on, " WHERE ").concat(position);
              _context2.next = 5;
              return regeneratorRuntime.awrap(_db["default"].query(joinQuery).then(function (result) {
                return result.rows;
              })["catch"](function (err) {
                return 'Error found here!', err.message;
              }));

            case 5:
              res = _context2.sent;
              return _context2.abrupt("return", res);

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "delete",
    value: function _delete(position) {
      var obj, res;
      return regeneratorRuntime.async(function _delete$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              obj = this.name;
              obj = obj.replace('Model', 's').toLowerCase(); // console.log(obj);

              _context3.next = 4;
              return regeneratorRuntime.awrap(_db["default"].query.apply(_db["default"], _toConsumableArray((0, _query.deleteQuery)(obj, position))).then(function (result) {
                return result.rows;
              })["catch"](function (err) {
                return 'Error found here!', err.message;
              }));

            case 4:
              res = _context3.sent;
              return _context3.abrupt("return", res);

            case 6:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "update",
    value: function update(position, condition, by) {
      var obj, res;
      return regeneratorRuntime.async(function update$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              obj = this.name;
              obj = obj.replace('Model', 's').toLowerCase(); // console.log(obj);

              _context4.next = 4;
              return regeneratorRuntime.awrap(_db["default"].query.apply(_db["default"], _toConsumableArray((0, _query.updateQuery)(obj, position, condition, by))).then(function (result) {
                return result.rows;
              })["catch"](function (err) {
                return 'Error found here!', err.message;
              }));

            case 4:
              res = _context4.sent;
              return _context4.abrupt("return", res);

            case 6:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "search",
    value: function search(position, order) {
      var obj, res;
      return regeneratorRuntime.async(function search$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              obj = this.name;
              obj = obj.replace('Model', 's').toLowerCase(); // console.log(obj, position, order);

              _context5.next = 4;
              return regeneratorRuntime.awrap(_db["default"].query.apply(_db["default"], _toConsumableArray((0, _query.searchQuery)(obj, position, order))).then(function (result) {
                return result.rows;
              })["catch"](function (err) {
                return 'Error found here!', err.message;
              }));

            case 4:
              res = _context5.sent;
              return _context5.abrupt("return", res);

            case 6:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this);
    }
  }]);

  return BaseModel;
}();

exports["default"] = BaseModel;