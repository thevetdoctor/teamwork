"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _db = _interopRequireDefault(require("../db"));

var _missingValue = _interopRequireDefault(require("../helpers/missingValue"));

var _response = _interopRequireDefault(require("../helpers/response"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var FeedController =
/*#__PURE__*/
function () {
  function FeedController() {
    _classCallCheck(this, FeedController);
  }

  _createClass(FeedController, null, [{
    key: "getFeed",
    // get feed of articles & gif posts
    value: function getFeed(req, res) {
      var id, authorId, gifarticles, data;
      return regeneratorRuntime.async(function getFeed$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              id = req.token.id;
              authorId = id;

              _missingValue["default"].values(res, authorId);

              _context.next = 5;
              return regeneratorRuntime.awrap(_db["default"].query('SELECT * FROM articles UNION SELECT  * FROM gifs ORDER BY lastupdated DESC').then(function (result) {
                return result.rows;
              })["catch"](function (err) {
                return 'Error found here!', err.message;
              }));

            case 5:
              gifarticles = _context.sent;
              data = gifarticles.map(function (item) {
                return {
                  id: item.articleid,
                  lastUpdated: item.lastupdated,
                  createdOn: item.createdon,
                  title: item.title,
                  articleOrUrl: item.article,
                  authorId: item.authorid
                };
              });
              return _context.abrupt("return", _response["default"].values(res, 200, data));

            case 8:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  }, {
    key: "flagEntity",
    value: function flagEntity(req, res) {
      var _req$body, entityId, type, id, authorId, entityToFlag, flaggedEntity;

      return regeneratorRuntime.async(function flagEntity$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _req$body = req.body, entityId = _req$body.entityId, type = _req$body.type;
              id = req.token.id;
              authorId = id;

              _missingValue["default"].values(res, authorId, entityId, type);

              _context2.next = 6;
              return regeneratorRuntime.awrap(_db["default"].query("SELECT * FROM ".concat(type, "s WHERE ").concat(type, "id=").concat(entityId)).then(function (result) {
                return result.rows;
              })["catch"](function (err) {
                return _response["default"].values(res, 400, "".concat(type, " not found"));
              }));

            case 6:
              entityToFlag = _context2.sent;

              if (!(entityToFlag.length < 1)) {
                _context2.next = 9;
                break;
              }

              return _context2.abrupt("return", _response["default"].values(res, 400, "".concat(type, " not found")));

            case 9:
              _context2.next = 11;
              return regeneratorRuntime.awrap(_db["default"].query("UPDATE ".concat(type, "s SET flagged=").concat(entityToFlag[0].flagged ? false : true, " WHERE ").concat(type, "id=").concat(entityId, " RETURNING *")).then(function (result) {
                return result.rows;
              })["catch"](function (err) {
                return _response["default"].values(res, 400, "".concat(type, " could not be FLAGGED"));
              }));

            case 11:
              flaggedEntity = _context2.sent;
              return _context2.abrupt("return", _response["default"].values(res, 200, flaggedEntity));

            case 13:
            case "end":
              return _context2.stop();
          }
        }
      });
    }
  }, {
    key: "deleteFlaggedEntity",
    value: function deleteFlaggedEntity(req, res) {
      var id, _req$body2, entityId, type, authorId, entityToDelete, deletedEntity;

      return regeneratorRuntime.async(function deleteFlaggedEntity$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              id = req.token.id;
              _req$body2 = req.body, entityId = _req$body2.entityId, type = _req$body2.type;
              authorId = id;

              _missingValue["default"].values(res, authorId, entityId, type);

              _context3.next = 6;
              return regeneratorRuntime.awrap(_db["default"].query("SELECT * FROM ".concat(type, "s WHERE ").concat(type, "id=").concat(entityId)).then(function (result) {
                return result.rows;
              })["catch"](function (err) {
                return _response["default"].values(res, 400, "".concat(type, " not found"));
              }));

            case 6:
              entityToDelete = _context3.sent;

              if (!(entityToDelete.length < 1)) {
                _context3.next = 9;
                break;
              }

              return _context3.abrupt("return", _response["default"].values(res, 400, "".concat(type, " not found")));

            case 9:
              if (entityToDelete[0].flagged) {
                _context3.next = 11;
                break;
              }

              return _context3.abrupt("return", _response["default"].values(res, 400, "".concat(type, " should be FLAGGED before DELETION")));

            case 11:
              _context3.next = 13;
              return regeneratorRuntime.awrap(_db["default"].query("DELETE FROM ".concat(type, "s WHERE ").concat(type, "id=").concat(entityId, " RETURNING *")).then(function (result) {
                return result.rows;
              })["catch"](function (err) {
                return _response["default"].values(res, 400, "".concat(type, " could not be DELETED"));
              }));

            case 13:
              deletedEntity = _context3.sent;

              if (deletedEntity) {
                _context3.next = 16;
                break;
              }

              return _context3.abrupt("return", _response["default"].values(res, 400, "".concat(type, " could not be deleted")));

            case 16:
              return _context3.abrupt("return", _response["default"].values(res, 200, {
                message: "".concat(type, " successfully deleted"),
                deletedEntity: deletedEntity
              }));

            case 17:
            case "end":
              return _context3.stop();
          }
        }
      });
    }
  }, {
    key: "likeEntity",
    value: function likeEntity(req, res) {
      var _req$body3, entityId, type, id, authorId, entityToLike, likedEntity;

      return regeneratorRuntime.async(function likeEntity$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _req$body3 = req.body, entityId = _req$body3.entityId, type = _req$body3.type;
              id = req.token.id;
              authorId = id;

              _missingValue["default"].values(res, authorId, entityId, type);

              _context4.next = 6;
              return regeneratorRuntime.awrap(_db["default"].query("SELECT * FROM ".concat(type, "s WHERE ").concat(type, "id=").concat(entityId)).then(function (result) {
                return result.rows;
              })["catch"](function (err) {
                return _response["default"].values(res, 400, "".concat(type, " not found"));
              }));

            case 6:
              entityToLike = _context4.sent;

              if (!(entityToLike.length < 1)) {
                _context4.next = 9;
                break;
              }

              return _context4.abrupt("return", _response["default"].values(res, 400, "".concat(type, " not found")));

            case 9:
              _context4.next = 11;
              return regeneratorRuntime.awrap(_db["default"].query("UPDATE ".concat(type, "s SET liked=liked + 1 WHERE ").concat(type, "id=").concat(entityId, " RETURNING *")).then(function (result) {
                return result.rows;
              })["catch"](function (err) {
                return _response["default"].values(res, 400, "".concat(type, " could not be LIKED"));
              }));

            case 11:
              likedEntity = _context4.sent;
              return _context4.abrupt("return", _response["default"].values(res, 200, likedEntity));

            case 13:
            case "end":
              return _context4.stop();
          }
        }
      });
    }
  }]);

  return FeedController;
}();

var _default = FeedController;
exports["default"] = _default;