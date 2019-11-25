"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _gifController = _interopRequireDefault(require("../controllers/gifController"));

var _multerConfig = _interopRequireDefault(require("../helpers/multerConfig"));

var _checkAuth = _interopRequireDefault(require("../checkAuth"));

var _authUser = _interopRequireDefault(require("../checkAuth/authUser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router(); // router.post('/', multer, GifController.createGif);


router.post('/', _checkAuth["default"], _authUser["default"], _gifController["default"].createGif);
router["delete"]('/:gifId', _checkAuth["default"], _authUser["default"], _gifController["default"].deleteGif);
router.post('/:gifId/comment', _checkAuth["default"], _authUser["default"], _gifController["default"].createComment);
router.get('/:gifId', _checkAuth["default"], _authUser["default"], _gifController["default"].getGifById);
var _default = router;
exports["default"] = _default;