"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _articleModel = _interopRequireDefault(require("../models/articleModel"));

var _employeeModel = _interopRequireDefault(require("../models/employeeModel"));

var _commentModel = _interopRequireDefault(require("../models/commentModel"));

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
    // create articles
    value: function createArticle(req, res) {
      var _req$body, title, article, authorId, newArticle, missingValue, authorExist, articleExist, createdArticle, data;

      return regeneratorRuntime.async(function createArticle$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _req$body = req.body, title = _req$body.title, article = _req$body.article; // console.log(req.body);

              authorId = parseInt(req.body.authorId, 10);
              newArticle = new _articleModel["default"](authorId, title, article); // console.log(newArticle, ArticleModel);

              missingValue = Object.keys(newArticle).filter(function (item) {
                return newArticle[item] === undefined || newArticle[item] === '';
              }); // console.log(missingValue);

              if (!(missingValue.length > 0)) {
                _context.next = 6;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                status: 'error',
                error: "".concat(missingValue, " not supplied")
              }));

            case 6:
              _context.next = 8;
              return regeneratorRuntime.awrap(_employeeModel["default"].find("userid=".concat(newArticle.authorId)));

            case 8:
              authorExist = _context.sent;

              if (!authorExist) {
                _context.next = 14;
                break;
              }

              if (!(authorExist.indexOf('not') >= 0)) {
                _context.next = 12;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                status: 'error',
                error: 'Some error found with author'
              }));

            case 12:
              if (!(authorExist.length < 1)) {
                _context.next = 14;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                status: 'error',
                error: 'Author not found'
              }));

            case 14:
              _context.next = 16;
              return regeneratorRuntime.awrap(_articleModel["default"].find("title=".concat(newArticle.title)));

            case 16:
              articleExist = _context.sent;

              if (!articleExist) {
                _context.next = 22;
                break;
              }

              if (!(articleExist.indexOf('not') >= 0)) {
                _context.next = 20;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                status: 'error',
                error: 'Some error found with article'
              }));

            case 20:
              if (!(articleExist.length > 0)) {
                _context.next = 22;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                status: 'error',
                error: 'Article already exists'
              }));

            case 22:
              _context.next = 24;
              return regeneratorRuntime.awrap(newArticle.save());

            case 24:
              createdArticle = _context.sent;

              if (!(createdArticle.indexOf('not') >= 0)) {
                _context.next = 27;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                status: 'error',
                error: 'Some error found with new article'
              }));

            case 27:
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

            case 29:
            case "end":
              return _context.stop();
          }
        }
      });
    } // Update articles by ID

  }, {
    key: "updateArticle",
    value: function updateArticle(req, res) {
      var _req$body2, title, article, authorId, articleId, articleToBeUpdated, missingValue, articleExist, updatedArticle, data;

      return regeneratorRuntime.async(function updateArticle$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _req$body2 = req.body, title = _req$body2.title, article = _req$body2.article;
              authorId = req.body.authorId; // authorId = parseInt(authorId, 10);

              articleId = parseInt(req.params.articleId, 10); // console.log(authorId, req.body, req.params);

              articleToBeUpdated = new _articleModel["default"](authorId, title, article); // console.log(articleToBeUpdated);

              missingValue = Object.keys(articleToBeUpdated).filter(function (item) {
                return articleToBeUpdated[item] === undefined || articleToBeUpdated[item] === '';
              }); // console.log('missing value', missingValue);

              if (!isNaN(articleId)) {
                _context2.next = 7;
                break;
              }

              return _context2.abrupt("return", res.status(400).json({
                status: 'error',
                error: 'ArticleId must be a number'
              }));

            case 7:
              if (!isNaN(authorId)) {
                _context2.next = 9;
                break;
              }

              return _context2.abrupt("return", res.status(400).json({
                status: 'error',
                error: 'AuthorId must be a number'
              }));

            case 9:
              if (!(missingValue.length > 0)) {
                _context2.next = 11;
                break;
              }

              return _context2.abrupt("return", res.status(400).json({
                status: 'error',
                error: "".concat(missingValue, " not supplied")
              }));

            case 11:
              _context2.next = 13;
              return regeneratorRuntime.awrap(_articleModel["default"].findByJoin('employees', "articles.authorid=employees.userid", "articleid=".concat(articleId, " AND authorid=").concat(authorId)));

            case 13:
              articleExist = _context2.sent;

              if (!articleExist) {
                _context2.next = 19;
                break;
              }

              if (!(articleExist.indexOf('not') >= 0)) {
                _context2.next = 17;
                break;
              }

              return _context2.abrupt("return", res.status(400).json({
                status: 'error',
                error: 'Some error found with article'
              }));

            case 17:
              if (!(articleExist.length < 1)) {
                _context2.next = 19;
                break;
              }

              return _context2.abrupt("return", res.status(400).json({
                status: 'error',
                error: 'Article not found'
              }));

            case 19:
              _context2.next = 21;
              return regeneratorRuntime.awrap(_articleModel["default"].update("title=".concat(title, "&article=").concat(article), "articleid=".concat(articleId)));

            case 21:
              updatedArticle = _context2.sent;

              if (!(updatedArticle.indexOf('not') >= 0)) {
                _context2.next = 24;
                break;
              }

              return _context2.abrupt("return", res.status(400).json({
                error: 'Some error found with updated answer'
              }));

            case 24:
              data = {
                message: 'Article successfully updated',
                title: updatedArticle[0].title,
                article: updatedArticle[0].article,
                lastUpdated: updatedArticle[0].lastupdated
              };
              return _context2.abrupt("return", res.status(200).json({
                status: 'success',
                data: data
              }));

            case 26:
            case "end":
              return _context2.stop();
          }
        }
      });
    } // Delete articles by ID

  }, {
    key: "deleteArticle",
    value: function deleteArticle(req, res) {
      var articleId, authorId, articleExist, articleDeleted;
      return regeneratorRuntime.async(function deleteArticle$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              articleId = req.params.articleId;
              authorId = req.body.authorId;

              if (!(authorId === undefined)) {
                _context3.next = 4;
                break;
              }

              return _context3.abrupt("return", res.status(400).json({
                status: 'error',
                error: 'authorId not supplied'
              }));

            case 4:
              authorId = parseInt(authorId, 10);

              if (!isNaN(articleId)) {
                _context3.next = 7;
                break;
              }

              return _context3.abrupt("return", res.status(400).json({
                status: 'error',
                error: 'ArticleId must be a number'
              }));

            case 7:
              if (!isNaN(authorId)) {
                _context3.next = 9;
                break;
              }

              return _context3.abrupt("return", res.status(400).json({
                status: 'error',
                error: 'AuthorId must be a number'
              }));

            case 9:
              _context3.next = 11;
              return regeneratorRuntime.awrap(_articleModel["default"].findByJoin('employees', "articles.authorid=employees.userid", "articleid=".concat(articleId, " AND authorid=").concat(authorId)));

            case 11:
              articleExist = _context3.sent;

              if (!articleExist) {
                _context3.next = 17;
                break;
              }

              if (!(articleExist.indexOf('not') >= 0)) {
                _context3.next = 15;
                break;
              }

              return _context3.abrupt("return", res.status(400).json({
                status: 'error',
                error: 'Some error found with article'
              }));

            case 15:
              if (!(articleExist.length < 1)) {
                _context3.next = 17;
                break;
              }

              return _context3.abrupt("return", res.status(400).json({
                status: 'error',
                error: 'Article not found'
              }));

            case 17:
              _context3.next = 19;
              return regeneratorRuntime.awrap(_articleModel["default"]["delete"]("articleid=".concat(articleId)));

            case 19:
              articleDeleted = _context3.sent;
              return _context3.abrupt("return", res.status(200).json({
                status: 'success',
                data: {
                  message: 'Article successfully deleted'
                }
              }));

            case 21:
            case "end":
              return _context3.stop();
          }
        }
      });
    } // Create comment on articles

  }, {
    key: "createComment",
    value: function createComment(req, res) {
      var _req$body3, authorId, comment, articleId, commentToBeCreated, missingValue, articleExist, commentExist, newComment, data;

      return regeneratorRuntime.async(function createComment$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _req$body3 = req.body, authorId = _req$body3.authorId, comment = _req$body3.comment;
              articleId = req.params.articleId;
              commentToBeCreated = new _commentModel["default"](authorId, articleId, comment); // console.log(commentToBeCreated);

              missingValue = Object.keys(commentToBeCreated).filter(function (item) {
                return commentToBeCreated[item] === undefined || commentToBeCreated[item] === '';
              }); // console.log(missingValue);

              if (!(missingValue.length > 0)) {
                _context4.next = 6;
                break;
              }

              return _context4.abrupt("return", res.status(400).json({
                status: 'error',
                error: "".concat(missingValue, " not supplied")
              }));

            case 6:
              if (!isNaN(articleId)) {
                _context4.next = 8;
                break;
              }

              return _context4.abrupt("return", res.status(400).json({
                status: 'error',
                error: 'ArticleId must be a number'
              }));

            case 8:
              if (!isNaN(authorId)) {
                _context4.next = 10;
                break;
              }

              return _context4.abrupt("return", res.status(400).json({
                status: 'error',
                error: 'AuthorId must be a number'
              }));

            case 10:
              _context4.next = 12;
              return regeneratorRuntime.awrap(_articleModel["default"].findByJoin('employees', "articles.authorid=employees.userid", "articleid=".concat(articleId, " AND authorid=").concat(authorId)));

            case 12:
              articleExist = _context4.sent;

              if (!articleExist) {
                _context4.next = 18;
                break;
              }

              if (!(articleExist.indexOf('not') >= 0)) {
                _context4.next = 16;
                break;
              }

              return _context4.abrupt("return", res.status(400).json({
                status: 'error',
                error: 'Some error found with article'
              }));

            case 16:
              if (!(articleExist.length < 1)) {
                _context4.next = 18;
                break;
              }

              return _context4.abrupt("return", res.status(400).json({
                status: 'error',
                error: 'Article not found'
              }));

            case 18:
              _context4.next = 20;
              return regeneratorRuntime.awrap(_commentModel["default"].findByJoin('articles', "comments.articleid=articles.articleid", "articles.articleid=".concat(articleId, " AND comments.comment='").concat(comment, "'")));

            case 20:
              commentExist = _context4.sent;

              if (!commentExist) {
                _context4.next = 26;
                break;
              }

              if (!(commentExist.indexOf('not') >= 0)) {
                _context4.next = 24;
                break;
              }

              return _context4.abrupt("return", res.status(400).json({
                status: 'error',
                error: 'Some error found'
              }));

            case 24:
              if (!(commentExist.length > 0)) {
                _context4.next = 26;
                break;
              }

              return _context4.abrupt("return", res.status(400).json({
                status: 'error',
                error: 'Same comment already given'
              }));

            case 26:
              _context4.next = 28;
              return regeneratorRuntime.awrap(commentToBeCreated.save());

            case 28:
              newComment = _context4.sent;

              if (!(newComment.indexOf('not') >= 0)) {
                _context4.next = 31;
                break;
              }

              return _context4.abrupt("return", res.status(400).json({
                error: 'Some error found with new comment'
              }));

            case 31:
              data = {
                message: 'Comment successfully created',
                createdOn: newComment[0].createdon,
                articleTitle: articleExist[0].title,
                article: articleExist[0].article,
                comment: comment
              };
              return _context4.abrupt("return", res.status(201).json({
                data: data
              }));

            case 33:
            case "end":
              return _context4.stop();
          }
        }
      });
    }
  }]);

  return ArticleController;
}();

var _default = ArticleController;
exports["default"] = _default;