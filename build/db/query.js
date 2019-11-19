"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteQuery = exports.pageQuery = exports.listQuery = exports.searchQuery = exports.findQuery = exports.saveQuery = exports.updateQuery = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/* eslint-disable object-curly-newline */
var saveQuery = function saveQuery(obj) {
  var queryStr = "INSERT INTO ".concat(obj);
  return queryStr;
};

exports.saveQuery = saveQuery;

var updateQuery = function updateQuery(obj, position, condition, by) {
  var splitPosition = position.split('&');
  var splitTitle = splitPosition[0].split('=');
  var splitArticle = splitPosition[1].split('=');
  var set = "".concat(splitTitle[0], "=$1, ").concat(splitArticle[0], "=$2");
  var splitCondition = condition.split('=');
  var where = "".concat(splitCondition[0], "=$3");
  var valueOne = splitTitle[1];
  var valueTwo = splitArticle[1];
  var valueThree = splitCondition[1];
  var str = ["UPDATE ".concat(obj, " SET ").concat(set, ", lastUpdated=now() WHERE ").concat(where, " RETURNING *"), [valueOne, valueTwo, valueThree]];
  console.log(str);
  var queryStr = [].concat(str);
  return queryStr;
};

exports.updateQuery = updateQuery;

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

var searchQuery = function searchQuery(obj) {
  var position = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var order = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var count = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '*';

  if (position !== '') {
    var split = position.split('='); // split[1] = (split[0] !== 'id') ? split[1] : parseInt(split[1], 10);
    // console.log(typeof split[0], typeof split[1]);

    var where = "".concat(split[0], " ILIKE '%").concat(split[1], "%'");
    var str = '';

    if (order !== '') {
      str = ["SELECT ".concat(count, " FROM ").concat(obj, " WHERE ").concat(where, " ORDER BY ").concat(order, " DESC")];
    } else {
      str = ["SELECT ".concat(count, " FROM ").concat(obj, " WHERE ").concat(where)];
    } // console.log(str, order);


    var _queryStr2 = _toConsumableArray(str);

    return _queryStr2;
  }

  var queryStr = "SELECT ".concat(count, " FROM ").concat(obj);
  return [queryStr];
};

exports.searchQuery = searchQuery;

var listQuery = function listQuery(obj) {
  var count = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '*';
  var queryStr = "SELECT ".concat(count, " FROM ").concat(obj, " ORDER BY id DESC");
  return [queryStr];
};

exports.listQuery = listQuery;

var pageQuery = function pageQuery(obj) {
  var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var perPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var order = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
  var count = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '*';
  var queryStr = "SELECT ".concat(count, " FROM ").concat(obj, " ORDER BY id ").concat(order, " LIMIT ").concat(perPage, " OFFSET ").concat(page); // console.log(queryStr);

  return [queryStr];
};

exports.pageQuery = pageQuery;

var deleteQuery = function deleteQuery(obj, position) {
  var split = position.split('=');
  var where = "".concat(split[0], "=$1");
  var values = split[0] !== 'id' ? split[1] : parseInt(split[1], 10);
  var str = ["DELETE FROM ".concat(obj, " WHERE ").concat(where, " RETURNING *"), [values]]; // console.log(str);

  var queryStr = [].concat(str);
  return queryStr;
};

exports.deleteQuery = deleteQuery;