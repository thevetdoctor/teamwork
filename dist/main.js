"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _routes = _interopRequireDefault(require("./routes"));

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _swagger = _interopRequireDefault(require("./swagger"));

var _regeneratorRuntime = _interopRequireDefault(require("regenerator-runtime"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// regenerator;
var app = (0, _express["default"])();
app.use(_express["default"]["static"](_path["default"].join(__dirname, 'public')));
app.use('images', _express["default"]["static"](_path["default"].join(__dirname, 'images')));
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use(_bodyParser["default"].json()); // use swagger-Ui-express for your app documentation endpoint

app.use('/api/v1/docs', _swaggerUiExpress["default"].serve, _swaggerUiExpress["default"].setup(_swagger["default"]));
(0, _routes["default"])(app);
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE');
  next();
});
app.use(function (error, req, res, next) {
  console.error(error.stack);
  res.status(500).send('Something broke!');
  next();
});

var tag = __dirname.slice(__dirname.lastIndexOf('\\') + 1);

console.log('Directory: ', tag);
app.get('/api/v1', function (req, res, next) {
  res.sendFile(__dirname.replace("".concat(tag), '\\page.html'));
});
app.get('/', function (req, res, next) {
  res.sendFile(__dirname.replace("".concat(tag), '\\index.html'));
});
var port = process.env.PORT || 8000;
app.listen(port, function () {
  console.log("Server running on ".concat(port));
});
var _default = app;
exports["default"] = _default;