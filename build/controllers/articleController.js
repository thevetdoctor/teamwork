"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _articleModel = _interopRequireDefault(require("../models/articleModel"));

var _employeeModel = _interopRequireDefault(require("../models/employeeModel"));

var _commentModel = _interopRequireDefault(require("../models/commentModel"));

var _missingValue = _interopRequireDefault(require("../helpers/missingValue"));

var _response = _interopRequireDefault(require("../helpers/response"));

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
      var _req$body, title, article, id, authorId, newArticle, authorExist, articleExist, createdArticle, data;

      return regeneratorRuntime.async(function createArticle$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _req$body = req.body, title = _req$body.title, article = _req$body.article;
              id = req.token.id;
              authorId = parseInt(id, 10);
              newArticle = new _articleModel["default"](authorId, title, article);

              _missingValue["default"].values(res, authorId, title, article);

              _context.next = 7;
              return regeneratorRuntime.awrap(_employeeModel["default"].find("userid=".concat(newArticle.authorId)));

            case 7:
              authorExist = _context.sent;

              if (!authorExist) {
                _context.next = 13;
                break;
              }

              if (!(authorExist.indexOf('not') >= 0)) {
                _context.next = 11;
                break;
              }

              return _context.abrupt("return", _response["default"].values(res, 400, 'Some error found with author'));

            case 11:
              if (!(authorExist.length < 1)) {
                _context.next = 13;
                break;
              }

              return _context.abrupt("return", _response["default"].values(res, 400, 'Author not found'));

            case 13:
              _context.next = 15;
              return regeneratorRuntime.awrap(_articleModel["default"].find("title=".concat(newArticle.title)));

            case 15:
              articleExist = _context.sent;

              if (!articleExist) {
                _context.next = 21;
                break;
              }

              if (!(articleExist.indexOf('not') >= 0)) {
                _context.next = 19;
                break;
              }

              return _context.abrupt("return", _response["default"].values(res, 400, 'Some error found with article'));

            case 19:
              if (!(articleExist.length > 0)) {
                _context.next = 21;
                break;
              }

              return _context.abrupt("return", _response["default"].values(res, 400, 'Article already exists'));

            case 21:
              _context.next = 23;
              return regeneratorRuntime.awrap(newArticle.save());

            case 23:
              createdArticle = _context.sent;

              if (!(createdArticle.indexOf('not') >= 0)) {
                _context.next = 26;
                break;
              }

              return _context.abrupt("return", _response["default"].values(res, 400, 'Some error found with new article'));

            case 26:
              data = {
                message: 'Article successfully posted',
                articleId: createdArticle[0].articleid,
                createdOn: createdArticle[0].createdon,
                title: createdArticle[0].title
              };
              return _context.abrupt("return", _response["default"].values(res, 201, data));

            case 28:
            case "end":
              return _context.stop();
          }
        }
      });
    } // Update articles by ID

  }, {
    key: "updateArticle",
    value: function updateArticle(req, res) {
      var _req$body2, title, article, id, authorId, articleId, articleExist, updatedArticle, data;

      return regeneratorRuntime.async(function updateArticle$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _req$body2 = req.body, title = _req$body2.title, article = _req$body2.article;
              id = req.token.id;
              authorId = id;
              articleId = parseInt(req.params.articleId, 10);

              _missingValue["default"].values(res, authorId, title, article);

              if (!isNaN(articleId)) {
                _context2.next = 7;
                break;
              }

              return _context2.abrupt("return", _response["default"].values(res, 400, 'ArticleId must be a number'));

            case 7:
              if (!isNaN(authorId)) {
                _context2.next = 9;
                break;
              }

              return _context2.abrupt("return", _response["default"].values(res, 400, 'AuthorId must be a number'));

            case 9:
              _context2.next = 11;
              return regeneratorRuntime.awrap(_articleModel["default"].findByJoin('employees', "articles.authorid=employees.userid", "articleid=".concat(articleId, " AND authorid=").concat(authorId)));

            case 11:
              articleExist = _context2.sent;

              if (!articleExist) {
                _context2.next = 17;
                break;
              }

              if (!(articleExist.indexOf('not') >= 0)) {
                _context2.next = 15;
                break;
              }

              return _context2.abrupt("return", _response["default"].values(res, 400, 'Some error found with article'));

            case 15:
              if (!(articleExist.length < 1)) {
                _context2.next = 17;
                break;
              }

              return _context2.abrupt("return", _response["default"].values(res, 400, 'Article not found'));

            case 17:
              _context2.next = 19;
              return regeneratorRuntime.awrap(_articleModel["default"].update("title=".concat(title, "&article=").concat(article), "articleid=".concat(articleId)));

            case 19:
              updatedArticle = _context2.sent;

              if (!(updatedArticle.indexOf('not') >= 0)) {
                _context2.next = 22;
                break;
              }

              return _context2.abrupt("return", _response["default"].values(res, 400, 'Some error found with updated answer'));

            case 22:
              data = {
                message: 'Article successfully updated',
                title: updatedArticle[0].title,
                article: updatedArticle[0].article,
                lastUpdated: updatedArticle[0].lastupdated
              };
              return _context2.abrupt("return", _response["default"].values(res, 200, data));

            case 24:
            case "end":
              return _context2.stop();
          }
        }
      });
    } // Delete articles by ID

  }, {
    key: "deleteArticle",
    value: function deleteArticle(req, res) {
      var articleId, id, authorId, articleExist, articleDeleted;
      return regeneratorRuntime.async(function deleteArticle$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              articleId = req.params.articleId;
              id = req.token.id;
              authorId = id;

              _missingValue["default"].values(res, authorId);

              authorId = parseInt(authorId, 10);

              if (!isNaN(articleId)) {
                _context3.next = 7;
                break;
              }

              return _context3.abrupt("return", _response["default"].values(res, 400, 'ArticleId must be a number'));

            case 7:
              if (!isNaN(authorId)) {
                _context3.next = 9;
                break;
              }

              return _context3.abrupt("return", _response["default"].values(res, 400, 'AuthorId must be a number'));

            case 9:
              _context3.next = 11;
              return regeneratorRuntime.awrap(_articleModel["default"].findByJoin('employees', "articles.authorid=employees.userid", "articleid=".concat(articleId, " AND authorid=").concat(authorId)));

            case 11:
              articleExist = _context3.sent;
              console.log(articleExist);

              if (!(articleExist.length < 0)) {
                _context3.next = 18;
                break;
              }

              if (!(articleExist.indexOf('not') >= 0)) {
                _context3.next = 16;
                break;
              }

              return _context3.abrupt("return", _response["default"].values(res, 400, 'Some error found with article'));

            case 16:
              if (!(articleExist.length < 1)) {
                _context3.next = 18;
                break;
              }

              return _context3.abrupt("return", _response["default"].values(res, 400, 'Article not found'));

            case 18:
              _context3.next = 20;
              return regeneratorRuntime.awrap(_articleModel["default"]["delete"]("articleid=".concat(articleId)));

            case 20:
              articleDeleted = _context3.sent;
              return _context3.abrupt("return", _response["default"].values(res, 200, {
                message: 'Article successfully deleted'
              }));

            case 22:
            case "end":
              return _context3.stop();
          }
        }
      });
    } // Create comment on articles

  }, {
    key: "createComment",
    value: function createComment(req, res) {
      var id, comment, articleId, authorId, commentToBeCreated, articleExist, commentExist, newComment, data;
      return regeneratorRuntime.async(function createComment$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              id = req.token.id;
              comment = req.body.comment;
              articleId = req.params.articleId;
              authorId = id;
              commentToBeCreated = new _commentModel["default"](authorId, articleId, comment);

              _missingValue["default"].values(res, authorId, articleId, comment);

              if (!isNaN(articleId)) {
                _context4.next = 8;
                break;
              }

              return _context4.abrupt("return", _response["default"].values(res, 400, 'ArticleId must be a number'));

            case 8:
              if (!isNaN(authorId)) {
                _context4.next = 10;
                break;
              }

              return _context4.abrupt("return", _response["default"].values(res, 400, 'AuthorId must be a number'));

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

              return _context4.abrupt("return", _response["default"].values(res, 400, 'Some error found with article'));

            case 16:
              if (!(articleExist.length < 1)) {
                _context4.next = 18;
                break;
              }

              return _context4.abrupt("return", _response["default"].values(res, 400, 'Article not found'));

            case 18:
              _context4.next = 20;
              return regeneratorRuntime.awrap(_commentModel["default"].findByJoin('articles', "comments.gifarticleid=articles.articleid", "articles.articleid=".concat(articleId, " AND comments.comment='").concat(comment, "'")));

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

              return _context4.abrupt("return", _response["default"].values(res, 400, 'Some error found'));

            case 24:
              if (!(commentExist.length > 0)) {
                _context4.next = 26;
                break;
              }

              return _context4.abrupt("return", _response["default"].values(res, 400, 'Same comment already given'));

            case 26:
              _context4.next = 28;
              return regeneratorRuntime.awrap(commentToBeCreated.save());

            case 28:
              newComment = _context4.sent;

              if (!(newComment.indexOf('not') >= 0)) {
                _context4.next = 31;
                break;
              }

              return _context4.abrupt("return", _response["default"].values(res, 400, 'Some error found with new comment'));

            case 31:
              data = {
                message: 'Comment successfully created',
                createdOn: newComment[0].createdon,
                articleTitle: articleExist[0].title,
                article: articleExist[0].article,
                comment: comment
              };
              return _context4.abrupt("return", _response["default"].values(res, 201, data));

            case 33:
            case "end":
              return _context4.stop();
          }
        }
      });
    }
  }, {
    key: "getArticleById",
    value: function getArticleById(req, res) {
      var id, articleId, authorId, searchQuery, searchResult, articleFound, commentsByArticle, comments, data;
      return regeneratorRuntime.async(function getArticleById$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              id = req.token.id;
              articleId = req.params.articleId;
              authorId = id;

              _missingValue["default"].values(res, authorId);

              if (!(articleId === 'category')) {
                _context5.next = 13;
                break;
              }

              searchQuery = req.query.searchQuery;

              _missingValue["default"].values(res, searchQuery);

              _context5.next = 9;
              return regeneratorRuntime.awrap(_articleModel["default"].search("article=".concat(searchQuery)));

            case 9:
              searchResult = _context5.sent;
              return _context5.abrupt("return", _response["default"].values(res, 200, searchResult));

            case 13:
              if (!isNaN(articleId)) {
                _context5.next = 15;
                break;
              }

              return _context5.abrupt("return", _response["default"].values(res, 400, 'Invalid article ID'));

            case 15:
              _context5.next = 17;
              return regeneratorRuntime.awrap(_articleModel["default"].find("articleid=".concat(articleId)));

            case 17:
              articleFound = _context5.sent;

              if (!(articleFound.length < 1)) {
                _context5.next = 20;
                break;
              }

              return _context5.abrupt("return", _response["default"].values(res, 400, 'Article not found'));

            case 20:
              _context5.next = 22;
              return regeneratorRuntime.awrap(_commentModel["default"].find("gifarticleid=".concat(articleId, "&type=article"), 'createdon'));

            case 22:
              commentsByArticle = _context5.sent;
              comments = commentsByArticle.map(function (item) {
                return {
                  commentId: item.commentid,
                  comment: item.comment,
                  authorId: item.authorid
                };
              });
              data = {
                id: articleFound[0].articleid,
                createdOn: articleFound[0].createdon,
                title: articleFound[0].title,
                article: articleFound[0].article,
                comments: comments
              };
              return _context5.abrupt("return", _response["default"].values(res, 200, data));

            case 26:
            case "end":
              return _context5.stop();
          }
        }
      });
    }
  }]);

  return ArticleController;
}();

var _default = ArticleController;
exports["default"] = _default;