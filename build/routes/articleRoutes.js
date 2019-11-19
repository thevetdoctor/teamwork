"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _articleController = _interopRequireDefault(require("../controllers/articleController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post('/', _articleController["default"].createArticle);
router.patch('/:articleId', _articleController["default"].updateArticle);
router["delete"]('/:articleId', _articleController["default"].deleteArticle);
router.post('/:articleId/comment', _articleController["default"].createComment);
var _default = router;
exports["default"] = _default;