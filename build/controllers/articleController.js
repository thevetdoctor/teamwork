"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _articleModel = _interopRequireDefault(require("../models/articleModel"));

var _employeeModel = _interopRequireDefault(require("../models/employeeModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ArticleController =
/*#__PURE__*/
function () {
  function ArticleController() {
    _classCallCheck(this, ArticleController);
  }

  _createClass(ArticleController, null, [{
    key: "createArticle",
    value: function createArticle(req, res) {
      var _req$body, title, article, authorId, newArticle, missingValue, authorExist, articleExist, createdArticle, data;

      return regeneratorRuntime.async(function createArticle$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _req$body = req.body, title = _req$body.title, article = _req$body.article;
              console.log(req.body);
              authorId = parseInt(req.body.authorId, 10);
              newArticle = new _articleModel["default"](authorId, title, article); // console.log(newArticle, ArticleModel);

              missingValue = Object.keys(newArticle).filter(function (item) {
                return newArticle[item] === undefined && isNaN(newArticle[item]);
              });
              console.log(missingValue);

              if (!(missingValue.length > 0)) {
                _context.next = 8;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                status: 'error',
                error: "".concat(missingValue, " not supplied")
              }));

            case 8:
              _context.next = 10;
              return regeneratorRuntime.awrap(_employeeModel["default"].find("userid=".concat(newArticle.authorId)));

            case 10:
              authorExist = _context.sent;

              if (!authorExist) {
                _context.next = 16;
                break;
              }

              if (!(authorExist.indexOf('not') >= 0)) {
                _context.next = 14;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                status: 'error',
                error: 'Some error found with author'
              }));

            case 14:
              if (!(authorExist.length < 1)) {
                _context.next = 16;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                status: 'error',
                error: 'Author not found'
              }));

            case 16:
              _context.next = 18;
              return regeneratorRuntime.awrap(_articleModel["default"].find("title=".concat(newArticle.title)));

            case 18:
              articleExist = _context.sent;

              if (!articleExist) {
                _context.next = 24;
                break;
              }

              if (!(articleExist.indexOf('not') >= 0)) {
                _context.next = 22;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                status: 'error',
                error: 'Some error found with article'
              }));

            case 22:
              if (!(articleExist.length > 0)) {
                _context.next = 24;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                status: 'error',
                error: 'Article already exists'
              }));

            case 24:
              _context.next = 26;
              return regeneratorRuntime.awrap(newArticle.save());

            case 26:
              createdArticle = _context.sent;

              if (!(createdArticle.indexOf('not') >= 0)) {
                _context.next = 29;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                status: 'error',
                error: 'Some error found with new article'
              }));

            case 29:
              data = {
                message: 'Article successfully posted',
                articleId: createdArticle[0].articleid,
                createdOn: createdArticle[0].createdon,
                title: createdArticle[0].title
              };
              return _context.abrupt("return", res.status(201).json({
                status: 'success',
                data: data
              }));

            case 31:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  }]);

  return ArticleController;
}();

var _default = ArticleController;
exports["default"] = _default;