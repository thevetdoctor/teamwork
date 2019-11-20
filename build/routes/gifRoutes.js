"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _gifController = _interopRequireDefault(require("../controllers/gifController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router(); // router.post('/', GifController.createGif);


router["delete"]('/:gifId', _gifController["default"].deleteGif);
var _default = router;
exports["default"] = _default;