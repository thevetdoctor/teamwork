"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _chai = _interopRequireWildcard(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _main = _interopRequireDefault(require("../main"));

var _controllers = _interopRequireDefault(require("../controllers"));

var _employeeController = _interopRequireDefault(require("../controllers/employeeController"));

var _articleController = _interopRequireDefault(require("../controllers/articleController"));

var _gifController = _interopRequireDefault(require("../controllers/gifController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

_chai["default"].use(_chaiHttp["default"]);

(0, _chai.should)();
var count = Math.floor(Math.random() * 1000);
var gender = true;
console.log('count', count);
describe('Test Endpoints', function () {
  it('TestController should exist', function () {
    _controllers["default"].should.exist;
  });
  it('test method (GET) should exist', function () {
    _controllers["default"].test.should.exist;
  });
  it('test method (GET) should exist', function (done) {
    _chai["default"].request(_main["default"]).get('/api/v1/test').end(function (err, res) {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.status.should.be.a('string');
      res.body.should.have.property('data');
      res.body.data.should.be.a('object');
      res.body.data.should.have.property('test');
    });

    done();
  });
});
describe('Employee Endpoints', function () {
  it('EmployeeController should exist', function () {
    _employeeController["default"].should.exist;
  });
  it('createUser  method (POST) should exist', function () {
    _employeeController["default"].createUser.should.exist;
  });
  it('createUser method (POST) should create a new employee user account', function (done) {
    _chai["default"].request(_main["default"]) // chai.request('http://localhost:3000')
    .post('/api/v1/auth/create-user').send({
      firstName: "firstname".concat(count),
      lastName: "lastname".concat(count),
      email: "email".concat(count, "@email.com"),
      password: "password".concat(count),
      gender: "".concat(!gender ? 'M' : 'F'),
      jobRole: 'staff',
      department: 'production',
      address: 'Lagos'
    }).end(function (err, res) {
      res.should.have.status(201);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.status.should.be.a('string');
      res.body.should.have.property('data');
      res.body.data.should.be.a('object');
      res.body.data.should.have.property('message');
      res.body.data.should.have.property('token');
      res.body.data.should.have.property('userId');
    });

    done();
  });
  it('createUser method (POST) should return ERROR for input errors', function (done) {
    _chai["default"].request(_main["default"]).post('/api/v1/auth/create-user').send({
      firstName: "firstname".concat(count),
      lastName: "lastname".concat(count),
      email: "email".concat(count, "@email.com"),
      password: "password".concat(count),
      gender: "".concat(!gender ? 'M' : 'F'),
      jobRole: 'staff',
      department: 'production',
      address: 'Lagos'
    }).end(function (err, res) {
      res.should.have.status(400);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.status.should.be.a('string');
      res.body.should.have.property('error');
      res.body.error.should.be.a('string');
    });

    done();
  });
  it('createUser method (POST) should return ERROR if any value is missing', function (done) {
    _chai["default"].request(_main["default"]).post('/api/v1/auth/create-user').send({
      firstName: '',
      lastName: "lastname".concat(count),
      email: "email".concat(count, "@email.com"),
      password: "password".concat(count),
      gender: "".concat(!gender ? 'M' : 'F'),
      jobRole: 'staff',
      department: 'production',
      address: 'Lagos'
    }).end(function (err, res) {
      res.should.have.status(400);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.status.should.be.a('string');
      res.body.should.have.property('error');
      res.body.error.should.be.a('string');
    });

    done();
  });
  it('createUser method (POST) should return ERROR if user already exist', function (done) {
    _chai["default"].request(_main["default"]).post('/api/v1/auth/create-user').send({
      firstName: "firstname".concat(count),
      lastName: "lastname".concat(count),
      email: "email".concat(count, "@email.com"),
      password: "password".concat(count),
      gender: "".concat(!gender ? 'M' : 'F'),
      jobRole: 'staff',
      department: 'production',
      address: 'Lagos'
    }).end(function (err, res) {
      res.should.have.status(400);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.status.should.be.a('string');
      res.body.should.have.property('error');
      res.body.error.should.be.a('string');
    });

    done();
  });
  it('signIn  method (POST) should exist', function () {
    _employeeController["default"].signIn.should.exist;
  });
  it('signIn method (POST) should sign in a registered user', function (done) {
    _chai["default"].request(_main["default"]).post('/api/v1/auth/signin').send({
      email: "email".concat(count, "@email.com"),
      password: "password".concat(count)
    }).end(function (err, res) {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.status.should.be.a('string');
      res.body.should.have.property('data');
      res.body.data.should.be.a('object'); // res.body.data.should.have.property('message');

      res.body.data.should.have.property('token');
      res.body.data.should.have.property('userId');
    });

    done();
  });
  it('signIn method (POST) should return ERROR for input errors', function (done) {
    _chai["default"].request(_main["default"]).post('/api/v1/auth/signin').send({
      email: "email@email.com",
      password: "password".concat(count)
    }).end(function (err, res) {
      res.should.have.status(400);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.status.should.be.a('string');
      res.body.should.have.property('error');
      res.body.error.should.be.a('string');
    });

    done();
  });
  it('signIn method (POST) should return ERROR if any value is missing', function (done) {
    _chai["default"].request(_main["default"]).post('/api/v1/auth/signin').send({
      email: '',
      password: "password".concat(count)
    }).end(function (err, res) {
      res.should.have.status(400);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.status.should.be.a('string');
      res.body.should.have.property('error');
      res.body.error.should.be.a('string');
    });

    done();
  });
  it('signIn method (POST) should return ERROR if password is INVALID', function (done) {
    _chai["default"].request(_main["default"]).post('/api/v1/auth/signin').send({
      email: "email".concat(count, "@email.com"),
      password: "password"
    }).end(function (err, res) {
      res.should.have.status(400);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.status.should.be.a('string');
      res.body.should.have.property('error');
      res.body.error.should.be.a('string');
    });

    done();
  });
});
describe('Article Endpoints', function () {
  it('ArticleController should exist', function () {
    _articleController["default"].should.exist;
  });
  it('createArticle  method (POST) should exist', function () {
    _articleController["default"].createArticle.should.exist;
  });
  it('createArticle method (POST) should create article with title & article', function (done) {
    _chai["default"].request(_main["default"]).post('/api/v1/articles').send({
      authorId: 1,
      title: "Test Edition".concat(count),
      article: 'This is one of the test edition articles, published by @animalworldng'
    }).end(function (err, res) {
      res.should.have.status(201);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.status.should.be.a('string');
      res.body.should.have.property('data');
      res.body.data.should.be.a('object');
      res.body.data.should.have.property('message');
      res.body.data.should.have.property('articleId');
      res.body.data.should.have.property('createdOn');
      res.body.data.should.have.property('title');
    });

    done();
  });
  it('createArticle method (POST) should return ERROR if any value is missing', function (done) {
    _chai["default"].request(_main["default"]).post('/api/v1/articles').send({
      authorId: 1,
      title: '',
      article: 'This is one of the test edition articles, published by @animalworldng'
    }).end(function (err, res) {
      res.should.have.status(400);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.status.should.be.a('string');
      res.body.should.have.property('error');
      res.body.error.should.be.a('string');
    });

    done();
  });
  it('createArticle method (POST) should return ERROR if author NOT FOUND', function (done) {
    _chai["default"].request(_main["default"]).post('/api/v1/articles').send({
      authorId: 0,
      title: "Test Edition".concat(count + 1),
      article: 'This is one of the test edition articles, published by @animalworldng'
    }).end(function (err, res) {
      res.should.have.status(400);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.status.should.be.a('string');
      res.body.should.have.property('error');
      res.body.error.should.be.a('string');
    });

    done();
  });
  it('createArticle method (POST) should return ERROR if article already exists', function (done) {
    _chai["default"].request(_main["default"]).post('/api/v1/articles').send({
      authorId: 1,
      title: "Test Edition".concat(count),
      article: 'This is one of the test edition articles, published by @animalworldng'
    }).end(function (err, res) {
      res.should.have.status(400);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.status.should.be.a('string');
      res.body.should.have.property('error');
      res.body.error.should.be.a('string');
    });

    done();
  }); // Test updateArticle Endpoints

  it('updateArticle method (PATCH) should exist', function () {
    _articleController["default"].updateArticle.should.exist;
  });
  it('updateArticle method (PATCH) should update article with title & article', function (done) {
    _chai["default"].request(_main["default"]).patch('/api/v1/articles/1').send({
      authorId: 1,
      title: "Test Update Edition".concat(count),
      article: 'This is one of the test update edition articles, published by @animalworldng'
    }).end(function (err, res) {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.status.should.be.a('string');
      res.body.should.have.property('data');
      res.body.data.should.be.a('object');
      res.body.data.should.have.property('message');
      res.body.data.should.have.property('title');
      res.body.data.should.have.property('article');
      res.body.data.should.have.property('lastUpdated');
    });

    done();
  });
  it('updateArticle method (PATCH) should return ERROR if articleId is not a number', function (done) {
    _chai["default"].request(_main["default"]).patch('/api/v1/articles/a').send({
      authorId: 1,
      title: "Test Update Edition".concat(count),
      article: 'This is one of the test edition articles, published by @animalworldng'
    }).end(function (err, res) {
      res.should.have.status(400);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.status.should.be.a('string');
      res.body.should.have.property('error');
      res.body.error.should.be.a('string');
    });

    done();
  });
  it('updateArticle method (PATCH) should return ERROR if authorId is not a number', function (done) {
    _chai["default"].request(_main["default"]).patch('/api/v1/articles/1').send({
      authorId: 'a',
      title: "Test Update Edition".concat(count),
      article: 'This is one of the test edition articles, published by @animalworldng'
    }).end(function (err, res) {
      res.should.have.status(400);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.status.should.be.a('string');
      res.body.should.have.property('error');
      res.body.error.should.be.a('string');
    });

    done();
  });
  it('updateArticle method (PATCH) should return ERROR if any value is missing', function (done) {
    _chai["default"].request(_main["default"]).patch('/api/v1/articles/1').send({
      authorId: 1,
      title: '',
      article: 'This is one of the test edition articles, published by @animalworldng'
    }).end(function (err, res) {
      res.should.have.status(400);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.status.should.be.a('string');
      res.body.should.have.property('error');
      res.body.error.should.be.a('string');
    });

    done();
  });
  it('updateArticle method (PATCH) should return ERROR if article is NOT FOUND', function (done) {
    _chai["default"].request(_main["default"]).patch('/api/v1/articles/100000').send({
      authorId: 1,
      title: "Test Edition",
      article: 'This is one of the test edition articles, published by @animalworldng'
    }).end(function (err, res) {
      res.should.have.status(400);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.status.should.be.a('string');
      res.body.should.have.property('error');
      res.body.error.should.be.a('string');
    });

    done();
  }); // Test deleteArticle Endpoints

  it('deleteArticle method (DELETE) should exist', function () {
    _articleController["default"].deleteArticle.should.exist;
  });
  it('deleteArticle method (DELETE) should delete an article', function (done) {
    _chai["default"].request(_main["default"])["delete"]('/api/v1/articles/1').send({
      authorId: 1
    }).end(function (err, res) {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.status.should.be.a('string');
      res.body.should.have.property('data');
      res.body.data.should.be.a('object');
      res.body.data.should.have.property('message');
    });

    done();
  });
  it('deleteArticle method (DELETE) should return ERROR if articleId is not a number', function (done) {
    _chai["default"].request(_main["default"])["delete"]('/api/v1/articles/a').send({
      authorId: 1
    }).end(function (err, res) {
      res.should.have.status(400);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.status.should.be.a('string');
      res.body.should.have.property('error');
      res.body.error.should.be.a('string');
    });

    done();
  });
  it('deleteArticle method (DELETE) should return ERROR if authorId is not a number', function (done) {
    _chai["default"].request(_main["default"])["delete"]('/api/v1/articles/1').send({
      authorId: 'a'
    }).end(function (err, res) {
      res.should.have.status(400);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.status.should.be.a('string');
      res.body.should.have.property('error');
      res.body.error.should.be.a('string');
    });

    done();
  });
  it('deleteArticle method (DELETE) should return ERROR if any value is missing', function (done) {
    _chai["default"].request(_main["default"])["delete"]('/api/v1/articles/1').send({
      authorId: ''
    }).end(function (err, res) {
      res.should.have.status(400);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.status.should.be.a('string');
      res.body.should.have.property('error');
      res.body.error.should.be.a('string');
    });

    done();
  });
  it('deleteArticle method (DELETE) should return ERROR if article is NOT FOUND', function (done) {
    _chai["default"].request(_main["default"])["delete"]('/api/v1/articles/100000').send({
      authorId: 1
    }).end(function (err, res) {
      res.should.have.status(400);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.status.should.be.a('string');
      res.body.should.have.property('error');
      res.body.error.should.be.a('string');
    });

    done();
  }); // Test createComment Endpoints

  it('createComment method (POST) should exist', function () {
    _articleController["default"].createComment.should.exist;
  });
  it('createComment method (POST) should create a comment for a specific article', function (done) {
    _chai["default"].request(_main["default"]).post('/api/v1/articles/1/comment').send({
      authorId: 1,
      comment: 'latest comment'
    }).end(function (err, res) {
      res.should.have.status(201);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.status.should.be.a('string');
      res.body.should.have.property('data');
      res.body.data.should.be.a('object');
      res.body.data.should.have.property('message');
    });

    done();
  });
  it('createComment method (POST) should return ERROR if articleId is not a number', function (done) {
    _chai["default"].request(_main["default"]).post('/api/v1/articles/a/comment').send({
      authorId: 1,
      comment: 'latest comment'
    }).end(function (err, res) {
      res.should.have.status(400);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.status.should.be.a('string');
      res.body.should.have.property('error');
      res.body.error.should.be.a('string');
    });

    done();
  });
  it('createComment method (POST) should return ERROR if authorId is not a number', function (done) {
    _chai["default"].request(_main["default"]).post('/api/v1/articles/1/comment').send({
      authorId: 'a',
      comment: 'latest comment'
    }).end(function (err, res) {
      res.should.have.status(400);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.status.should.be.a('string');
      res.body.should.have.property('error');
      res.body.error.should.be.a('string');
    });

    done();
  });
  it('createComment method (POST) should return ERROR if any value is missing', function (done) {
    _chai["default"].request(_main["default"]).post('/api/v1/articles/1/comment').send({
      authorId: '',
      comment: 'latest comment'
    }).end(function (err, res) {
      res.should.have.status(400);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.status.should.be.a('string');
      res.body.should.have.property('error');
      res.body.error.should.be.a('string');
    });

    done();
  });
  it('createComment method (POST) should return ERROR if article is NOT FOUND', function (done) {
    _chai["default"].request(_main["default"]).post('/api/v1/articles/100000/comment').send({
      authorId: 1,
      comment: 'latest comment'
    }).end(function (err, res) {
      res.should.have.status(400);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.status.should.be.a('string');
      res.body.should.have.property('error');
      res.body.error.should.be.a('string');
    });

    done();
  });
}); // Test createGif Endpoints

describe('GIF Endpoints', function () {
  it('GifController should exist', function () {
    _gifController["default"].should.exist;
  }); // it('createGif method (POST) should exist', () => {
  //   GifController.createGif.should.exist;
  // });
  // it('createGif method (POST) should create gif post with title & image(Url)', (done) => {
  //   chai.request(server)
  //     .post('/api/v1/gifs')
  //     .send({
  //       authorId: 1,
  //       title: `Test Edition${count}`,
  //       image: '',
  //     })
  //     .end((err, res) => {
  //       res.should.have.status(201);
  //       res.should.be.json;
  //       res.body.should.be.a('object');
  //       res.body.should.have.property('status');
  //       res.body.status.should.be.a('string');
  //       res.body.should.have.property('data');
  //       res.body.data.should.be.a('object');
  //       res.body.data.should.have.property('gifId');
  //       res.body.data.should.have.property('message');
  //       res.body.data.should.have.property('createdOn');
  //       res.body.data.should.have.property('title');
  //       res.body.data.should.have.property('imageUrl');
  //     });
  //   done();
  // });
  // it('createGif method (POST) should return ERROR if any value is missing', (done) => {
  //   chai.request(server)
  //     .post('/api/v1/gifs')
  //     .send({
  //       authorId: 1,
  //       title: '',
  //       image: '',
  //     })
  //     .end((err, res) => {
  //       res.should.have.status(400);
  //       res.should.be.json;
  //       res.body.should.be.a('object');
  //       res.body.should.have.property('status');
  //       res.body.status.should.be.a('string');
  //       res.body.should.have.property('error');
  //       res.body.error.should.be.a('string');
  //     });
  //   done();
  // });
  // it('createGif method (POST) should return ERROR if author NOT FOUND', (done) => {
  //   chai.request(server)
  //     .post('/api/v1/gifs')
  //     .send({
  //       authorId: 0,
  //       title: `Test Edition${count + 1}`,
  //       image: '',
  //     })
  //     .end((err, res) => {
  //       res.should.have.status(400);
  //       res.should.be.json;
  //       res.body.should.be.a('object');
  //       res.body.should.have.property('status');
  //       res.body.status.should.be.a('string');
  //       res.body.should.have.property('error');
  //       res.body.error.should.be.a('string');
  //     });
  //   done();
  // });
  // it('createGif method (POST) should return ERROR if gif post already exists', (done) => {
  //   chai.request(server)
  //     .post('/api/v1/gifs')
  //     .send({
  //       authorId: 1,
  //       title: `Test Edition${count}`,
  //       image: '',
  //     })
  //     .end((err, res) => {
  //       res.should.have.status(400);
  //       res.should.be.json;
  //       res.body.should.be.a('object');
  //       res.body.should.have.property('status');
  //       res.body.status.should.be.a('string');
  //       res.body.should.have.property('error');
  //       res.body.error.should.be.a('string');
  //     });
  //   done();
  // });
  // Test deleteGif Endpoints

  it('deleteGif method (DELETE) should exist', function () {
    _gifController["default"].deleteGif.should.exist;
  });
  it('deleteGif method (DELETE) should delete an article', function (done) {
    _chai["default"].request(_main["default"])["delete"]('/api/v1/gifs/1').send({
      authorId: 1
    }).end(function (err, res) {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.status.should.be.a('string');
      res.body.should.have.property('data');
      res.body.data.should.be.a('object');
      res.body.data.should.have.property('message');
    });

    done();
  });
  it('deleteGif method (DELETE) should return ERROR if gifId is not a number', function (done) {
    _chai["default"].request(_main["default"])["delete"]('/api/v1/gifs/a').send({
      authorId: 1
    }).end(function (err, res) {
      res.should.have.status(400);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.status.should.be.a('string');
      res.body.should.have.property('error');
      res.body.error.should.be.a('string');
    });

    done();
  });
  it('deleteGif method (DELETE) should return ERROR if authorId is not a number', function (done) {
    _chai["default"].request(_main["default"])["delete"]('/api/v1/gifs/1').send({
      authorId: 'a'
    }).end(function (err, res) {
      res.should.have.status(400);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.status.should.be.a('string');
      res.body.should.have.property('error');
      res.body.error.should.be.a('string');
    });

    done();
  });
  it('deleteGif method (DELETE) should return ERROR if any value is missing', function (done) {
    _chai["default"].request(_main["default"])["delete"]('/api/v1/gifs/1').send({
      authorId: ''
    }).end(function (err, res) {
      res.should.have.status(400);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.status.should.be.a('string');
      res.body.should.have.property('error');
      res.body.error.should.be.a('string');
    });

    done();
  });
  it('deleteGif method (DELETE) should return ERROR if GIF is NOT FOUND', function (done) {
    _chai["default"].request(_main["default"])["delete"]('/api/v1/gifs/100000').send({
      authorId: 1
    }).end(function (err, res) {
      res.should.have.status(400);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.status.should.be.a('string');
      res.body.should.have.property('error');
      res.body.error.should.be.a('string');
    });

    done();
  });
});