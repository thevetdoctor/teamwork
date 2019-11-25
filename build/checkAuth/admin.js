"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _response = _interopRequireDefault(require("../helpers/response"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var admin = function admin(req, res, next) {
  if (!req.token) return _response["default"].values(res, 403, 'No credentials');
  if (!req.token.isAdmin) return _response["default"].values(res, 403, 'No permissions');
  console.log('Permission granted');
  next();
};

var _default = admin;
exports["default"] = _default;