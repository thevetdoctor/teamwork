"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _controllers = _interopRequireDefault(require("../controllers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.get('/test', _controllers["default"].test);
router.get('/', function (req, res, next) {
  res.send('<div style=\'text-align: center;\'><h1>Welcome to Teamwork</h1><h3>... where teams actually WORK!</h3></div>');
});
var _default = router;
exports["default"] = _default;