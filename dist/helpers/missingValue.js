"use strict";

var _response = _interopRequireDefault(require("../helpers/response"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

exports.values = function (res) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  var argumentsObj = {
    args: args
  };
  var missingValue = Object.keys(argumentsObj).filter(function (item) {
    return argumentsObj[item] === undefined || argumentsObj[item] === '';
  }); // console.log('missing value(s)', missingValue, args);

  if (missingValue.length < 0) return _response["default"].values(res, 400, "".concat(missingValue, " not supplied"));
};