"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

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
  extended: true
}));
app.use(_bodyParser["default"].json());
(0, _routes["default"])(app);
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
app.get('/api/v1', function (req, res, next) {
  res.send('<div style=\'text-align: center;\'><h1>Welcome to Teamwork</h1><h3>... where teams actually WORK!</h3></div>');
});
app.get('/', function (req, res, next) {
  res.send("<div style='text-align: center;'>\n                <h1>Looking for Teamwork ?</h1>\n                <h3> <a href='/api/v1'>Click here!</a></h3>\n            </div>");
});
var port = process.env.PORT || 3000; // (async function() {
// // await db.query('delete from team where id=1 returning *')
// await db.query('select * from team')
// .then(res => console.log(res.rows));
// })();

app.listen(port, function () {
  console.log("Server running on ".concat(port));
});
var _default = app;
exports["default"] = _default;