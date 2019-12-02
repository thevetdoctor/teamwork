"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _swaggerJsdoc = _interopRequireDefault(require("swagger-jsdoc"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var swaggerDefinition = {
  info: {
    title: 'Teamwork REST API',
    // Title of the documentation
    version: '1.0.0',
    // Version of the app
    description: 'Back-End API for Teamwork App' // short description of the app

  },
  host: 'localhost:8000',
  // the host or url of the app
  basePath: '/api/v1/' // the basepath of your endpoint

};

if (process.env.NODE_ENV === 'production') {
  swaggerDefinition.host = 'obateamwork.herokuapp.com';
} // options for the swagger docs


var options = {
  // import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // path to the API docs
  apis: ['./docs/**/*.yaml']
}; // initialize swagger-jsdoc

var swaggerSpec = (0, _swaggerJsdoc["default"])(options);
var _default = swaggerSpec;
exports["default"] = _default;