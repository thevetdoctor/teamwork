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
  var split1 = splitPosition[0].split('=');
  var split2 = splitPosition[1].split('=');
  var set = "".concat(split1[0], "=$1, ").concat(split2[0], "=$2");
  var splitCondition = condition.split('=');
  var where = "".concat(splitCondition[0], "=$3");
  var valueOne = split1[1];
  var valueTwo = split2[1];
  var valueThree = splitCondition[1];
  var str = ["UPDATE ".concat(obj, " SET ").concat(set, ", lastUpdated=now() WHERE ").concat(where, " RETURNING *"), [valueOne, valueTwo, valueThree]]; // console.log(str);

  var queryStr = [].concat(str);
  return queryStr;
};

exports.updateQuery = updateQuery;

var findQuery = function findQuery(obj) {
  var position = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var order = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var count = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '*';

  if (position !== '') {
    if (position.includes('&')) {
      // console.log(position);
      var positionTwo = position.split('&');
      var split1 = positionTwo[0].split('=');
      var split2 = positionTwo[1].split('=');
      var where = "".concat(split1[0], "=$1 AND ").concat(split2[0], "=$2");
      var values1 = split1[1];
      var values2 = split2[1]; // console.log(split1, split2);

      var str = '';

      if (order !== '') {
        str = ["SELECT ".concat(count, " FROM ").concat(obj, " WHERE ").concat(where, " ORDER BY ").concat(order, " DESC"), [values1, values2]];
      } else {
        str = ["SELECT ".concat(count, " FROM ").concat(obj, " WHERE ").concat(where), [values]];
      } // console.log(str, order);


      var _queryStr = _toConsumableArray(str);

      return _queryStr;
    } else {
      var split = position.split('=');

      var _where = "".concat(split[0], "=$1");

      var _values = split[0] !== 'id' ? split[1] : parseInt(split[1], 10);

      var _str = '';

      if (order !== '') {
        _str = ["SELECT ".concat(count, " FROM ").concat(obj, " WHERE ").concat(_where, " ORDER BY ").concat(order, " DESC"), [_values]];
      } else {
        _str = ["SELECT ".concat(count, " FROM ").concat(obj, " WHERE ").concat(_where), [_values]];
      } // console.log(str, order);


      var _queryStr2 = _toConsumableArray(_str);

      return _queryStr2;
    }
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


    var _queryStr3 = _toConsumableArray(str);

    return _queryStr3;
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