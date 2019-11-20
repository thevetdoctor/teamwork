"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _gifModel = _interopRequireDefault(require("../models/gifModel"));

var _employeeModel = _interopRequireDefault(require("../models/employeeModel"));

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
    key: "deleteGif",
    // create GIFs
    // static async createGif(req, res) {
    //     const { title, imageUrl } = req.body;
    //     // const authorId = parseInt(req.body.authorId, 10);
    //     let authorId = req.body.authorId;
    //     const newGif = new GifModel(authorId, title, imageUrl);
    //     // console.log(newGif);
    // const missingValue = Object.keys(newGif)
    //                            .filter(item => ((newGif[item] === undefined) || (newGif[item] === '')));
    // // console.log(missingValue);
    // if (missingValue.length > 0) {
    //       return res.status(400).json({
    //         status: 'error',  
    //         error: `${missingValue} not supplied`,
    //     });
    // }
    //     const authorExist = await EmployeeModel.find(`userid=${newGif.authorId}`);
    //     if (authorExist) {
    //       if (authorExist.indexOf('not') >= 0) return res.status(400).json({ status: 'error', error: 'Some error found with author' });
    //       if (authorExist.length < 1) return res.status(400).json({ status: 'error', error: 'Author not found' });
    //     }
    //     const gifExist = await GifModel.find(`title=${newGif.title}`);
    //     // console.log('gif exist', gifExist);
    //     if (gifExist) {
    //       if (gifExist.indexOf('not') >= 0) return res.status(400).json({ status: 'error', error: 'Some error found with GIF' });
    //       if (gifExist.length > 0) return res.status(400).json({ status: 'error', error: 'GIF already exists' });
    //     }
    //     const createdGif = await newGif.save();
    //     if (createdGif.indexOf('not') >= 0) {
    //       return res.status(400).json({ status: 'error', error: 'Some error found with new GIF' });
    //     }
    //     const data = {
    //         gifId: createdGif[0].gifId,
    //         message: 'GIF image successfully posted',
    //         createdOn: createdGif[0].createdon,
    //         title: createdGif[0].title,
    //         imageUrl: createdGif[0].imageurl,
    //     }
    //     return res.status(201).json({
    //         status: 'success',
    //         data,
    //      });
    //   }
    // Delete GIFs by ID
    value: function deleteGif(req, res) {
      var gifId, authorId, gifExist, gifDeleted;
      return regeneratorRuntime.async(function deleteGif$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              gifId = req.params.gifId;
              authorId = req.body.authorId;

              if (!(authorId === undefined)) {
                _context.next = 4;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                status: 'error',
                error: 'authorId not supplied'
              }));

            case 4:
              authorId = parseInt(authorId, 10);

              if (!isNaN(gifId)) {
                _context.next = 7;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                status: 'error',
                error: 'gifId must be a number'
              }));

            case 7:
              if (!isNaN(authorId)) {
                _context.next = 9;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                status: 'error',
                error: 'authorId must be a number'
              }));

            case 9:
              _context.next = 11;
              return regeneratorRuntime.awrap(_gifModel["default"].findByJoin('employees', "gifs.authorid=employees.userid", "gifid=".concat(gifId, " AND authorid=").concat(authorId)));

            case 11:
              gifExist = _context.sent;

              if (!gifExist) {
                _context.next = 17;
                break;
              }

              if (!(gifExist.indexOf('not') >= 0)) {
                _context.next = 15;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                status: 'error',
                error: 'Some error found with GIF'
              }));

            case 15:
              if (!(gifExist.length < 1)) {
                _context.next = 17;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                status: 'error',
                error: 'GIF not found'
              }));

            case 17:
              _context.next = 19;
              return regeneratorRuntime.awrap(_gifModel["default"]["delete"]("gifid=".concat(gifId)));

            case 19:
              gifDeleted = _context.sent;
              return _context.abrupt("return", res.status(200).json({
                status: 'success',
                data: {
                  message: 'gif post successfully deleted'
                }
              }));

            case 21:
            case "end":
              return _context.stop();
          }
        }
      });
    } // Create comment on gif posts by ID
    // static async createComment(req, res) {
    //     const { authorId, comment } = req.body;
    //     const { articleId } = req.params;
    //         const commentToBeCreated = new CommentModel(authorId, gifId, comment);
    //         // console.log(commentToBeCreated);
    //         const missingValue = Object.keys(commentToBeCreated)
    //                                   .filter(item => ((commentToBeCreated[item] === undefined) || (commentToBeCreated[item] === '')));
    //         // console.log(missingValue);
    //         if (missingValue.length > 0) {
    //               return res.status(400).json({
    //                 status: 'error',  
    //                 error: `${missingValue} not supplied`,
    //             });
    //         }
    //       if (isNaN(gifId)) return res.status(400).json({ status: 'error', error: 'gifId must be a number'});
    //       if (isNaN(authorId)) return res.status(400).json({ status: 'error', error: 'authorId must be a number'});
    //       const gifExist = await GifModel.findByJoin('employees', `articles.authorid=employees.userid`, `gifarticleid=${gifarticleId} AND authorid=${authorId}`);
    //       if (gifExist) {
    //         if (gifExist.indexOf('not') >= 0) return res.status(400).json({ status: 'error', error: 'Some error found with gif post' });
    //         if (gifExist.length < 1) return res.status(400).json({ status: 'error', error: 'gif post not found' });
    //       }
    //       // console.log('GIF exist', gifExist[0]);
    //       const commentExist = await CommentModel.findByJoin('gifs', `comments.gifid=gifs.gifid`, `gifs.gifid=${gifId} AND comments.comment='${comment}'`);
    //       // console.log('comment exist', commentExist);
    //       if (commentExist) {
    //         if (commentExist.indexOf('not') >= 0) return res.status(400).json({ status: 'error', error: 'Some error found' });
    //         if (commentExist.length > 0) return res.status(400).json({ status: 'error', error: 'Same comment already given' });
    //       }
    //       const newComment = await commentToBeCreated.save();
    //       if (newComment.indexOf('not') >= 0) {
    //         return res.status(400).json({ error: 'Some error found with new comment' });
    //       }
    //       const data = {
    //         message: 'Comment successfully created',
    //         createdOn: newComment[0].createdon,
    //         gifTitle: gifExist[0].title,
    //         comment,
    //       }
    //       return res.status(201).json({
    //         data,
    //       });
    //   }

  }]);

  return GifController;
}();

var _default = GifController;
exports["default"] = _default;