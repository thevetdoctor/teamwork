"use strict";

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _db = _interopRequireDefault(require("./db"));

var _routes = _interopRequireDefault(require("./routes"));

var _regeneratorRuntime = _interopRequireDefault(require("regenerator-runtime"));

var _migrations = _interopRequireDefault(require("./db/migrations"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_regeneratorRuntime["default"];
var app = (0, _express["default"])(); // app.use(require('connect-livereload'));

app.use(_express["default"]["static"](_path["default"].join(__dirname, 'public')));
app.use(_bodyParser["default"].urlencoded({
  extended: false
}));
app.use(_bodyParser["default"].json());
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE');
  next();
}); // app.use((error, req, res, next) => {
//     res.status(error.status || 500);
//     res.json({error: { message: error.message }});
//     next();
// });

app.use(function (error, req, res, next) {
  console.error(error.stack);
  res.status(500).send('Something broke!');
  next();
});
app.use('/api/v1', _routes["default"]);
app.get('/', function (req, res, next) {
  res.send("<div style='text-align: center;'>\n                <h1>Looking for Teamwork ?</h1>\n                <h3> <a href='/api/v1'>Click here!</a></h3>\n            </div>");
});
var port = process.env.PORT || 3000;

(function _callee() {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(_db["default"].query('select * from team').then(function (res) {
            return console.log(res.rows);
          }));

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
})();

app.listen(port, function () {
  console.log("Server running on ".concat(port));
});