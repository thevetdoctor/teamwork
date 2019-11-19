"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _employeeRoutes = _interopRequireDefault(require("./employeeRoutes"));

var _articleRoutes = _interopRequireDefault(require("./articleRoutes"));

var _testRoutes = _interopRequireDefault(require("./testRoutes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default(app) {
  app.use('/api/v1/auth', _employeeRoutes["default"]);
  app.use('/api/v1/articles', _articleRoutes["default"]);
  app.use('/api/v1/test', _testRoutes["default"]);
};

exports["default"] = _default;