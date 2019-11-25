"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _gifModel = _interopRequireDefault(require("../models/gifModel"));

var _commentModel = _interopRequireDefault(require("../models/commentModel"));

var _employeeModel = _interopRequireDefault(require("../models/employeeModel"));

var _missingValue = _interopRequireDefault(require("../helpers/missingValue"));

var _response = _interopRequireDefault(require("../helpers/response"));

var _cloudinary = _interopRequireDefault(require("../helpers/cloudinary"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var GifController =
/*#__PURE__*/
function () {
  function GifController() {
    _classCallCheck(this, GifController);
  }

  _createClass(GifController, null, [{
    key: "createGif",
    // create GIFs
    value: function createGif(req, res) {
      var _req$body, title, imageUrl, id, authorId, newGif, authorExist, gifExist, multipleUpload, upload, createdGif, data;

      return regeneratorRuntime.async(function createGif$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _req$body = req.body, title = _req$body.title, imageUrl = _req$body.imageUrl;
              id = req.token.id;
              authorId = id;
              newGif = new _gifModel["default"](authorId, title, imageUrl);

              _missingValue["default"].values(res, authorId, title, imageUrl);

              _context2.next = 7;
              return regeneratorRuntime.awrap(_employeeModel["default"].find("userid=".concat(newGif.authorId)));

            case 7:
              authorExist = _context2.sent;

              if (!authorExist) {
                _context2.next = 13;
                break;
              }

              if (!(authorExist.indexOf('not') >= 0)) {
                _context2.next = 11;
                break;
              }

              return _context2.abrupt("return", _response["default"].values(res, 400, 'Some error found with author'));

            case 11:
              if (!(authorExist.length < 1)) {
                _context2.next = 13;
                break;
              }

              return _context2.abrupt("return", _response["default"].values(res, 400, 'Author not found'));

            case 13:
              _context2.next = 15;
              return regeneratorRuntime.awrap(_gifModel["default"].find("title=".concat(newGif.title)));

            case 15:
              gifExist = _context2.sent;

              if (!gifExist) {
                _context2.next = 21;
                break;
              }

              if (!(gifExist.indexOf('not') >= 0)) {
                _context2.next = 19;
                break;
              }

              return _context2.abrupt("return", _response["default"].values(res, 400, 'Some error found with GIF'));

            case 19:
              if (!(gifExist.length > 0)) {
                _context2.next = 21;
                break;
              }

              return _context2.abrupt("return", res.status(res, 400, 'GIF already exists'));

            case 21:
              multipleUpload = new Promise(function _callee(resolve, reject) {
                return regeneratorRuntime.async(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.prev = 0;
                        _context.next = 3;
                        return regeneratorRuntime.awrap(_cloudinary["default"].v2.uploader.upload(imageUrl, {
                          folder: 'teamwork/',
                          use_filename: true,
                          unique_filename: false
                        }, function (error, result) {
                          if (result) {
                            resolve(result);
                          } else {
                            console.log('error with upload');
                            reject(error);
                          }
                        }));

                      case 3:
                        _context.next = 8;
                        break;

                      case 5:
                        _context.prev = 5;
                        _context.t0 = _context["catch"](0);
                        return _context.abrupt("return", _context.t0);

                      case 8:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, null, null, [[0, 5]]);
              }).then(function (result) {
                return result;
              })["catch"](function (error) {
                return console.log('error found in catch');
              });
              _context2.next = 24;
              return regeneratorRuntime.awrap(multipleUpload);

            case 24:
              upload = _context2.sent;

              if (!upload) {
                _context2.next = 29;
                break;
              }

              newGif.imageUrl = upload.url;
              _context2.next = 30;
              break;

            case 29:
              return _context2.abrupt("return", _response["default"].values(res, 400, {
                message: 'Error with getting URL'
              }));

            case 30:
              _context2.next = 32;
              return regeneratorRuntime.awrap(newGif.save());

            case 32:
              createdGif = _context2.sent;

              if (!(createdGif.indexOf('not') >= 0)) {
                _context2.next = 35;
                break;
              }

              return _context2.abrupt("return", _response["default"].values(res, 400, 'Some error found with new GIF'));

            case 35:
              data = {
                gifId: createdGif[0].gifid,
                message: 'GIF image successfully posted',
                createdOn: createdGif[0].createdon,
                title: createdGif[0].title,
                imageUrl: createdGif[0].imageurl
              };
              return _context2.abrupt("return", _response["default"].values(res, 201, data));

            case 37:
            case "end":
              return _context2.stop();
          }
        }
      });
    } // Delete GIFs by ID

  }, {
    key: "deleteGif",
    value: function deleteGif(req, res) {
      var gifId, id, authorId, gifExist, gifDeleted;
      return regeneratorRuntime.async(function deleteGif$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              gifId = req.params.gifId;
              id = req.token.id;
              authorId = id;

              _missingValue["default"].values(res, authorId);

              authorId = parseInt(authorId, 10);

              if (!isNaN(gifId)) {
                _context3.next = 7;
                break;
              }

              return _context3.abrupt("return", _response["default"].values(res, 400, 'gifId must be a number'));

            case 7:
              if (!isNaN(authorId)) {
                _context3.next = 9;
                break;
              }

              return _context3.abrupt("return", _response["default"].values(res, 400, 'authorId must be a number'));

            case 9:
              _context3.next = 11;
              return regeneratorRuntime.awrap(_gifModel["default"].findByJoin('employees', "gifs.authorid=employees.userid", "gifid=".concat(gifId, " AND authorid=").concat(authorId)));

            case 11:
              gifExist = _context3.sent;

              if (!gifExist) {
                _context3.next = 17;
                break;
              }

              if (!(gifExist.indexOf('not') >= 0)) {
                _context3.next = 15;
                break;
              }

              return _context3.abrupt("return", _response["default"].values(res, 400, 'Some error found with GIF'));

            case 15:
              if (!(gifExist.length < 1)) {
                _context3.next = 17;
                break;
              }

              return _context3.abrupt("return", _response["default"].values(res, 400, 'GIF not found'));

            case 17:
              _context3.next = 19;
              return regeneratorRuntime.awrap(_gifModel["default"]["delete"]("gifid=".concat(gifId)));

            case 19:
              gifDeleted = _context3.sent;
              return _context3.abrupt("return", _response["default"].values(res, 200, {
                message: 'gif post successfully deleted'
              }));

            case 21:
            case "end":
              return _context3.stop();
          }
        }
      });
    } // Create comment on gif posts by ID

  }, {
    key: "createComment",
    value: function createComment(req, res) {
      var comment, id, gifId, authorId, commentToBeCreated, gifExist, commentExist, newComment, data;
      return regeneratorRuntime.async(function createComment$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              comment = req.body.comment;
              id = req.token.id;
              gifId = req.params.gifId;
              authorId = id;
              commentToBeCreated = new _commentModel["default"](authorId, gifId, comment);
              commentToBeCreated.type = 'gif';

              _missingValue["default"].values(res, authorId, gifId, comment);

              if (!isNaN(gifId)) {
                _context4.next = 9;
                break;
              }

              return _context4.abrupt("return", _response["default"].values(res, 400, 'gifId must be a number'));

            case 9:
              if (!isNaN(authorId)) {
                _context4.next = 11;
                break;
              }

              return _context4.abrupt("return", _response["default"].values(res, 400, 'authorId must be a number'));

            case 11:
              _context4.next = 13;
              return regeneratorRuntime.awrap(_gifModel["default"].findByJoin('employees', "gifs.authorid=employees.userid", "gifid=".concat(gifId, " AND authorid=").concat(authorId)));

            case 13:
              gifExist = _context4.sent;

              if (!gifExist) {
                _context4.next = 19;
                break;
              }

              if (!(gifExist.indexOf('not') >= 0)) {
                _context4.next = 17;
                break;
              }

              return _context4.abrupt("return", _response["default"].values(res, 400, 'Some error found with gif post'));

            case 17:
              if (!(gifExist.length < 1)) {
                _context4.next = 19;
                break;
              }

              return _context4.abrupt("return", _response["default"].values(res, 400, 'gif post not found'));

            case 19:
              _context4.next = 21;
              return regeneratorRuntime.awrap(_commentModel["default"].findByJoin('gifs', "comments.gifarticleid=gifs.gifid", "gifs.gifid=".concat(gifId, " AND comments.comment='").concat(comment, "'")));

            case 21:
              commentExist = _context4.sent;

              if (!commentExist) {
                _context4.next = 27;
                break;
              }

              if (!(commentExist.indexOf('not') >= 0)) {
                _context4.next = 25;
                break;
              }

              return _context4.abrupt("return", _response["default"].values(res, 400, 'Some error found with exisitng comment'));

            case 25:
              if (!(commentExist.length > 0)) {
                _context4.next = 27;
                break;
              }

              return _context4.abrupt("return", _response["default"].values(res, 400, 'Same comment already given'));

            case 27:
              _context4.next = 29;
              return regeneratorRuntime.awrap(commentToBeCreated.save());

            case 29:
              newComment = _context4.sent;

              if (!(newComment.indexOf('not') >= 0)) {
                _context4.next = 32;
                break;
              }

              return _context4.abrupt("return", _response["default"].values(res, 400, 'Some error found with new comment'));

            case 32:
              data = {
                message: 'Comment successfully created',
                createdOn: newComment[0].createdon,
                gifTitle: gifExist[0].title,
                comment: comment
              };
              return _context4.abrupt("return", _response["default"].values(res, 201, data));

            case 34:
            case "end":
              return _context4.stop();
          }
        }
      });
    }
  }, {
    key: "getGifById",
    value: function getGifById(req, res) {
      var id, authorId, gifId, gifFound, commentsByGif, comments, data;
      return regeneratorRuntime.async(function getGifById$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              id = req.token.id;
              authorId = id;
              gifId = req.params.gifId;

              _missingValue["default"].values(res, authorId);

              if (!isNaN(gifId)) {
                _context5.next = 6;
                break;
              }

              return _context5.abrupt("return", _response["default"].values(res, 400, 'Invalid gif post ID'));

            case 6:
              _context5.next = 8;
              return regeneratorRuntime.awrap(_gifModel["default"].find("gifid=".concat(gifId)));

            case 8:
              gifFound = _context5.sent;

              if (!(gifFound.length < 1)) {
                _context5.next = 11;
                break;
              }

              return _context5.abrupt("return", _response["default"].values(res, 400, 'Gif post not found'));

            case 11:
              _context5.next = 13;
              return regeneratorRuntime.awrap(_commentModel["default"].find("gifarticleid=".concat(gifId, "&type=gif"), 'createdon'));

            case 13:
              commentsByGif = _context5.sent;
              comments = commentsByGif.map(function (item) {
                return {
                  commentId: item.commentid,
                  comment: item.comment,
                  authorId: item.authorid
                };
              });
              data = {
                id: gifFound[0].gifid,
                createdOn: gifFound[0].createdon,
                title: gifFound[0].title,
                url: gifFound[0].imageurl,
                comments: comments
              };
              return _context5.abrupt("return", _response["default"].values(res, 200, data));

            case 17:
            case "end":
              return _context5.stop();
          }
        }
      });
    }
  }]);

  return GifController;
}();

var _default = GifController;
exports["default"] = _default;