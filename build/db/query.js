"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listQuery = exports.findQuery = exports.saveQuery = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var saveQuery = function saveQuery(obj) {
  var queryStr = "INSERT INTO ".concat(obj);
  return queryStr;
};

exports.saveQuery = saveQuery;

var findQuery = function findQuery(obj) {
  var position = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var order = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var count = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '*';

  if (position !== '') {
    var split = position.split('=');
    var where = "".concat(split[0], "=$1");
    var values = split[0] !== 'id' ? split[1] : parseInt(split[1], 10);
    var str = '';

    if (order !== '') {
      str = ["SELECT ".concat(count, " FROM ").concat(obj, " WHERE ").concat(where, " ORDER BY ").concat(order, " DESC"), [values]];
    } else {
      str = ["SELECT ".concat(count, " FROM ").concat(obj, " WHERE ").concat(where), [values]];
    } // console.log(str, order);


    var _queryStr = _toConsumableArray(str);

    return _queryStr;
  }

  var queryStr = "SELECT ".concat(count, " FROM ").concat(obj);
  return [queryStr];
};

exports.findQuery = findQuery;

var listQuery = function listQuery(obj) {
  var count = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '*';
  var queryStr = "SELECT ".concat(count, " FROM ").concat(obj, " ORDER BY id DESC");
  return [queryStr];
};

exports.listQuery = listQuery;