"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _feedController = _interopRequireDefault(require("../controllers/feedController"));

var _checkAuth = _interopRequireDefault(require("../checkAuth"));

var _admin = _interopRequireDefault(require("../checkAuth/admin"));

var _authUser = _interopRequireDefault(require("../checkAuth/authUser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.get('/', _checkAuth["default"], _authUser["default"], _feedController["default"].getFeed);
router.patch('/like', _checkAuth["default"], _authUser["default"], _feedController["default"].likeEntity);
router.patch('/flag', _checkAuth["default"], _authUser["default"], _feedController["default"].flagEntity);
router["delete"]('/', _checkAuth["default"], _authUser["default"], _admin["default"], _feedController["default"].deleteFlaggedEntity);
var _default = router;
exports["default"] = _default;