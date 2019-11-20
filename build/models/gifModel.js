"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = _interopRequireDefault(require("./index"));

var _db = _interopRequireDefault(require("../db"));

var _query = require("../db/query");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var GifModel =
/*#__PURE__*/
function (_BaseModel) {
  _inherits(GifModel, _BaseModel);

  function GifModel(authorId, title, imageUrl) {
    var _this;

    _classCallCheck(this, GifModel);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(GifModel).call(this));
    _this.authorId = authorId;
    _this.title = title;
    _this.imageUrl = imageUrl;
    return _this;
  }

  _createClass(GifModel, [{
    key: "save",
    value: function save() {
      var obj, objKeys, objValues, valuesCount, i, queryStr, res;
      return regeneratorRuntime.async(function save$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              obj = GifModel.name;
              obj = obj.replace('Model', 's').toLowerCase(); // console.log(obj);

              objKeys = Object.keys(this);
              objValues = Object.values(this);
              valuesCount = [];

              for (i = 1; i <= objKeys.length; i++) {
                valuesCount.push("$".concat(i));
              } // console.log(objKeys, objValues, valuesCount);


              queryStr = "".concat((0, _query.saveQuery)(obj), " (").concat(objKeys, ") values (").concat(valuesCount, ") RETURNING *"); // console.log(queryStr);

              if (!(objValues === undefined)) {
                _context.next = 10;
                break;
              }

              console.log('Values not supplied');
              return _context.abrupt("return");

            case 10:
              _context.next = 12;
              return regeneratorRuntime.awrap(_db["default"].query(queryStr, objValues).then(function (result) {
                return result.rows;
              })["catch"](function (err) {
                return 'Error found here!', err.message;
              }));

            case 12:
              res = _context.sent;
              return _context.abrupt("return", res);

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }]);

  return GifModel;
}(_index["default"]);

var _default = GifModel;
exports["default"] = _default;