"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _response = _interopRequireDefault(require("../helpers/response"));

require("dotenv/config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var checkAuth = function checkAuth(req, res, next) {
  var bearerHeader = req.headers.authorization;

  if (typeof bearerHeader !== 'undefined') {
    var token = bearerHeader.split(' ')[1];
    req.token = token;

    _jsonwebtoken["default"].verify(req.token, process.env.SECRET, function (err, decoded) {
      if (err) return _response["default"].values(res, 403, 'Error with credentials');
      req.token = decoded.tokenDetails;
      next();
    });
  } else {
    return _response["default"].values(res, 403, 'Not authorised');
  }
};

var _default = checkAuth;
exports["default"] = _default;