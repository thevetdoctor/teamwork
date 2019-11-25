"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _employeeController = _interopRequireDefault(require("../controllers/employeeController"));

var _checkAuth = _interopRequireDefault(require("../checkAuth"));

var _authUser = _interopRequireDefault(require("../checkAuth/authUser"));

var _admin = _interopRequireDefault(require("../checkAuth/admin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post('/create-user', _checkAuth["default"], _authUser["default"], _admin["default"], _employeeController["default"].createUser);
router.post('/signin', _employeeController["default"].signIn);
var _default = router;
exports["default"] = _default;