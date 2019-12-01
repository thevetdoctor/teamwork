"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _articleController = _interopRequireDefault(require("../controllers/articleController"));

var _checkAuth = _interopRequireDefault(require("../checkAuth"));

var _authUser = _interopRequireDefault(require("../checkAuth/authUser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post('/', _checkAuth["default"], _authUser["default"], _articleController["default"].createArticle);
router.patch('/:articleId', _checkAuth["default"], _authUser["default"], _articleController["default"].updateArticle);
router["delete"]('/:articleId', _checkAuth["default"], _authUser["default"], _articleController["default"].deleteArticle);
router.post('/:articleId/comment', _checkAuth["default"], _authUser["default"], _articleController["default"].createComment);
router.get('/:articleId', _checkAuth["default"], _authUser["default"], _articleController["default"].getArticleById);
router.get('/category?searchQuery', _checkAuth["default"], _authUser["default"], _articleController["default"].getArticleById);
var _default = router;
exports["default"] = _default;