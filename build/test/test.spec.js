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
var adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbkRldGFpbHMiOnsiaWQiOjEsImZpcnN0TmFtZSI6InRlYW0iLCJsYXN0TmFtZSI6ImFjY2VzcyIsImVtYWlsIjoidGVhbWFjY2Vzc0B0ZWFtd29yay5jb20iLCJpc0FkbWluIjp0cnVlfSwiaWF0IjoxNTc0NzYwNjc3LCJleHAiOjE1NzQ3Njc4Nzd9.ZDou4wMaw_lCvSj6_BnAVGzmHd1X5DZiAotJhNouFAA';
describe('Test Endpoints', function () {
  // before((done) => {
  //   chai.request(server)
  //     .post('/api/v1/auth/signin')
  //     .send({
  //       email: 'teamaccess@teamwork.com',
  //       password: 'teampass01',
  //     })
  //     .end((err, res) => {
  //       res.should.have.status(200);
  //       res.should.be.json;
  //       res.body.should.be.a('object');
  //       res.body.should.be.have.property('status');
  //       res.body.should.be.have.property('data');
  //       res.body.status.should.equal(200);
  //       res.body.data.should.be.a('object');
  //       const { token } = res.body.data;
  //       console.log(res.body.data);
  //       adminToken = token;
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
  }); // Test Employee Endpoints

  describe('Employee Endpoints', function () {
    it('EmployeeController should exist', function () {
      _employeeController["default"].should.exist;
    }); // Test signIn Endpoints

    it('signIn  method (POST) should exist', function () {
      _employeeController["default"].signIn.should.exist;
    });
    it('signIn method (POST) should sign in a registered user', function (done) {
      _chai["default"].request(_main["default"]).post('/api/v1/auth/signin').send({
        email: "teamaccess@teamwork.com",
        password: 'teampass01'
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
        var token = res.body.data.token;
        console.log(res.body.data);
        adminToken = token;
      });

      done();
    });
    it('signIn method (POST) should return ERROR for input errors', function (done) {
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
    }); // Test createUser Endpoints

    it('createUser  method (POST) should exist', function () {
      _employeeController["default"].createUser.should.exist;
    });
    it('createUser method (POST) should create a new employee user account', function (done) {
      _chai["default"].request(_main["default"]) // chai.request('http://localhost:3000')
      .post('/api/v1/auth/create-user').set('Authorization', "Bearer ".concat(adminToken)).send({
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
      _chai["default"].request(_main["default"]).post('/api/v1/auth/create-user').set('Authorization', "Bearer ".concat(adminToken)).send({
        firstName: "firstname".concat(count),
        lastName: "lastname".concat(count),
        email: "email".concat(count, "@email.com"),
        password: "password".concat(count),
        gender: "".concat(!gender ? 'M' : 'F'),
        jobRole: '',
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
      _chai["default"].request(_main["default"]).post('/api/v1/auth/create-user').set('Authorization', "Bearer ".concat(adminToken)).send({
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
      _chai["default"].request(_main["default"]).post('/api/v1/auth/create-user').set('Authorization', "Bearer ".concat(adminToken)).send({
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
    }); // // Test signIn Endpoints
    // it('signIn  method (POST) should exist', () => {
    //   EmployeeController.signIn.should.exist;
    // });
    // it('signIn method (POST) should sign in a registered user', (done) => {
    //   chai.request(server)
    //     .post('/api/v1/auth/signin')
    //     .send({
    //       email: `email${count}@email.com`,
    //       password: `password${count}`,
    //     })
    //     .end((err, res) => {
    //       res.should.have.status(200);
    //       res.should.be.json;
    //       res.body.should.be.a('object');
    //       res.body.should.have.property('status');
    //       res.body.status.should.be.a('string');
    //       res.body.should.have.property('data');
    //       res.body.data.should.be.a('object');
    //       // res.body.data.should.have.property('message');
    //       res.body.data.should.have.property('token');
    //       res.body.data.should.have.property('userId');
    //     });
    //   done();
    // });
    // it('signIn method (POST) should return ERROR for input errors', (done) => {
    //   chai.request(server)
    //     .post('/api/v1/auth/signin')
    //     .send({
    //       email: `email@email.com`,
    //       password: `password${count}`,
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
    // it('signIn method (POST) should return ERROR if any value is missing', (done) => {
    //   chai.request(server)
    //     .post('/api/v1/auth/signin')
    //     .send({
    //       email: '',
    //       password: `password${count}`,
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
    // it('signIn method (POST) should return ERROR if password is INVALID', (done) => {
    //   chai.request(server)
    //     .post('/api/v1/auth/signin')
    //     .send({
    //       email: `email${count}@email.com`,
    //       password: `password`,
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
  }); // Test Article Endpoints

  describe('Article Endpoints', function () {
    it('ArticleController should exist', function () {
      _articleController["default"].should.exist;
    }); // Test createArticle Endpoints

    it('createArticle  method (POST) should exist', function () {
      _articleController["default"].createArticle.should.exist;
    });
    it('createArticle method (POST) should create article with title & article', function (done) {
      _chai["default"].request(_main["default"]).post('/api/v1/articles').set('Authorization', "Bearer ".concat(adminToken)).send({
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
      _chai["default"].request(_main["default"]).post('/api/v1/articles').set('Authorization', "Bearer ".concat(adminToken)).send({
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
      _chai["default"].request(_main["default"]).post('/api/v1/articles').set('Authorization', "Bearer ".concat(adminToken, "0")).send({
        title: "Test Edition".concat(count + 1),
        article: 'This is one of the test edition articles, published by @animalworldng'
      }).end(function (err, res) {
        res.should.have.status(403);
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
      _chai["default"].request(_main["default"]).post('/api/v1/articles').set('Authorization', "Bearer ".concat(adminToken)).send({
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
      _chai["default"].request(_main["default"]).patch('/api/v1/articles/1').set('Authorization', "Bearer ".concat(adminToken)).send({
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
      _chai["default"].request(_main["default"]).patch('/api/v1/articles/a').set('Authorization', "Bearer ".concat(adminToken, "0")).send({
        title: "Test Update Edition".concat(count),
        article: 'This is one of the test edition articles, published by @animalworldng'
      }).end(function (err, res) {
        res.should.have.status(403);
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
      _chai["default"].request(_main["default"]).patch('/api/v1/articles/1').set('Authorization', "Bearer ".concat(adminToken, "0")).send({
        title: "Test Update Edition".concat(count),
        article: 'This is one of the test edition articles, published by @animalworldng'
      }).end(function (err, res) {
        res.should.have.status(403);
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
      _chai["default"].request(_main["default"]).patch('/api/v1/articles/1').set('Authorization', "Bearer ".concat(adminToken)).send({
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
      _chai["default"].request(_main["default"]).patch('/api/v1/articles/100000').set('Authorization', "Bearer ".concat(adminToken)).send({
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
      _chai["default"].request(_main["default"])["delete"]('/api/v1/articles/1').set('Authorization', "Bearer ".concat(adminToken)).end(function (err, res) {
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
      _chai["default"].request(_main["default"])["delete"]('/api/v1/articles/a').set('Authorization', "Bearer ".concat(adminToken)).end(function (err, res) {
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
      _chai["default"].request(_main["default"])["delete"]('/api/v1/articles/1').set('Authorization', "Bearer ".concat(adminToken, "0")).end(function (err, res) {
        res.should.have.status(403);
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
      _chai["default"].request(_main["default"])["delete"]('/api/v1/articles/1').set('Authorization', "Bearer ".concat(adminToken, "0")).end(function (err, res) {
        res.should.have.status(403);
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
      _chai["default"].request(_main["default"])["delete"]('/api/v1/articles/100000').set('Authorization', "Bearer ".concat(adminToken)).end(function (err, res) {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.be.a('string');
        res.body.should.have.property('error');
        res.body.error.should.be.a('string');
      });

      done();
    }); // Test createComment on articles Endpoints

    it('createComment method (POST) should exist', function () {
      _articleController["default"].createComment.should.exist;
    });
    it('createComment method (POST) should create a comment for a specific article', function (done) {
      _chai["default"].request(_main["default"]).post('/api/v1/articles/1/comment').set('Authorization', "Bearer ".concat(adminToken)).send({
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
        res.body.data.should.have.property('createdOn');
        res.body.data.should.have.property('articleTitle');
        res.body.data.should.have.property('article');
      });

      done();
    });
    it('createComment method (POST) should return ERROR if articleId is not a number', function (done) {
      _chai["default"].request(_main["default"]).post('/api/v1/articles/a/comment').set('Authorization', "Bearer ".concat(adminToken)).send({
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
      _chai["default"].request(_main["default"]).post('/api/v1/articles/1/comment').set('Authorization', "Bearer ".concat(adminToken, "0")).send({
        comment: 'latest comment'
      }).end(function (err, res) {
        res.should.have.status(403);
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
      _chai["default"].request(_main["default"]).post('/api/v1/articles/1/comment').set('Authorization', "Bearer ".concat(adminToken)).send({
        comment: ''
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
      _chai["default"].request(_main["default"]).post('/api/v1/articles/100000/comment').set('Authorization', "Bearer ".concat(adminToken)).send({
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
    }); // Test getArticleById Endpoints

    it('getArticleById method (GET) should exist', function () {
      _articleController["default"].getArticleById.should.exist;
    });
    it('getArticleById method (GET) should get a specific article', function (done) {
      _chai["default"].request(_main["default"]).get('/api/v1/articles/1').set('Authorization', "Bearer ".concat(adminToken)).end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.be.a('string');
        res.body.should.have.property('data');
        res.body.data.should.be.a('object');
      });

      done();
    });
    it('getArticleById method (GET) should return ERROR if authorId is not a number', function (done) {
      _chai["default"].request(_main["default"]).get('/api/v1/articles/1').set('Authorization', "Bearer ".concat(adminToken, "0")).end(function (err, res) {
        res.should.have.status(403);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.be.a('string');
        res.body.should.have.property('error');
        res.body.error.should.be.a('string');
      });

      done();
    });
    it('getArticleById method (GET) should return ERROR if any value is missing', function (done) {
      _chai["default"].request(_main["default"]).get('/api/v1/articles/1').set('Authorization', "Bearer ".concat(adminToken, "0")).end(function (err, res) {
        res.should.have.status(403);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.be.a('string');
        res.body.should.have.property('error');
        res.body.error.should.be.a('string');
      });

      done();
    });
    it('getArticleById method (GET) should return ERROR if article is NOT FOUND', function (done) {
      _chai["default"].request(_main["default"]).get('/api/v1/articles/100000').set('Authorization', "Bearer ".concat(adminToken)).end(function (err, res) {
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
    }); // Test createGif Endpoints

    it('createGif method (POST) should exist', function () {
      _gifController["default"].createGif.should.exist;
    });
    it('createGif method (POST) should create gif post with title & image(Url)', function (done) {
      _chai["default"].request(_main["default"]).post('/api/v1/gifs').set('Authorization', "Bearer ".concat(adminToken)).send({
        title: "Test Edition".concat(count),
        imageUrl: 'testimage'
      }).end(function (err, res) {
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.be.a('string');
        res.body.should.have.property('data');
        res.body.data.should.be.a('object');
        res.body.data.should.have.property('gifId');
        res.body.data.should.have.property('message');
        res.body.data.should.have.property('createdOn');
        res.body.data.should.have.property('title');
        res.body.data.should.have.property('imageUrl');
      });

      done();
    });
    it('createGif method (POST) should return ERROR if any value is missing', function (done) {
      _chai["default"].request(_main["default"]).post('/api/v1/gifs').set('Authorization', "Bearer ".concat(adminToken)).send({
        title: '',
        imageUrl: ''
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
    it('createGif method (POST) should return ERROR if author NOT FOUND', function (done) {
      _chai["default"].request(_main["default"]).post('/api/v1/gifs').set('Authorization', "Bearer ".concat(adminToken, "0")).send({
        title: "Test Edition".concat(count + 1),
        imageUrl: 'testimage'
      }).end(function (err, res) {
        res.should.have.status(403);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.be.a('string');
        res.body.should.have.property('error');
        res.body.error.should.be.a('string');
      });

      done();
    });
    it('createGif method (POST) should return ERROR if gif post already exists', function (done) {
      _chai["default"].request(_main["default"]).post('/api/v1/gifs').set('Authorization', "Bearer ".concat(adminToken)).send({
        title: "Test Edition".concat(count),
        imageUrl: 'testimage'
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
    }); // Test deleteGif Endpoints

    it('deleteGif method (DELETE) should exist', function () {
      _gifController["default"].deleteGif.should.exist;
    });
    it('deleteGif method (DELETE) should delete an article', function (done) {
      _chai["default"].request(_main["default"])["delete"]('/api/v1/gifs/1').set('Authorization', "Bearer ".concat(adminToken)).end(function (err, res) {
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
      _chai["default"].request(_main["default"])["delete"]('/api/v1/gifs/a').set('Authorization', "Bearer ".concat(adminToken)).end(function (err, res) {
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
      _chai["default"].request(_main["default"])["delete"]('/api/v1/gifs/1').set('Authorization', "Bearer ".concat(adminToken, "0")).end(function (err, res) {
        res.should.have.status(403);
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
      _chai["default"].request(_main["default"])["delete"]('/api/v1/gifs/1').set('Authorization', "Bearer ".concat(adminToken, "0")).end(function (err, res) {
        res.should.have.status(403);
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
      _chai["default"].request(_main["default"])["delete"]('/api/v1/gifs/100000').set('Authorization', "Bearer ".concat(adminToken)).end(function (err, res) {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.be.a('string');
        res.body.should.have.property('error');
        res.body.error.should.be.a('string');
      });

      done();
    }); // Test createComment on GIF Endpoints

    it('createComment method (POST) should exist', function () {
      _gifController["default"].createComment.should.exist;
    });
    it('createComment method (POST) should create a comment for a specific gif post', function (done) {
      _chai["default"].request(_main["default"]).post('/api/v1/gifs/1/comment').set('Authorization', "Bearer ".concat(adminToken)).send({
        comment: 'latest gif comment'
      }).end(function (err, res) {
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.be.a('string');
        res.body.should.have.property('data');
        res.body.data.should.be.a('object');
        res.body.data.should.have.property('message');
        res.body.data.should.have.property('createdOn');
        res.body.data.should.have.property('gifTitle');
        res.body.data.should.have.property('comment');
      });

      done();
    });
    it('createComment method (POST) should return ERROR if gifId is not a number', function (done) {
      _chai["default"].request(_main["default"]).post('/api/v1/gifs/a/comment').set('Authorization', "Bearer ".concat(adminToken)).send({
        comment: 'latest comment'
      }).end(function (err, res) {
        res.should.have.status(403);
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
      _chai["default"].request(_main["default"]).post('/api/v1/gifs/1/comment').set('Authorization', "Bearer ".concat(adminToken, "0")).send({
        comment: 'latest comment'
      }).end(function (err, res) {
        res.should.have.status(403);
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
      _chai["default"].request(_main["default"]).post('/api/v1/gifs/1/comment').set('Authorization', "Bearer ".concat(adminToken)).send({
        comment: ''
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
    it('createComment method (POST) should return ERROR if gif post is NOT FOUND', function (done) {
      _chai["default"].request(_main["default"]).post('/api/v1/gifs/100000/comment').set('Authorization', "Bearer ".concat(adminToken)).send({
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
    }); // Test getGifById Endpoints

    it('getGifById method (GET) should exist', function () {
      _gifController["default"].getGifById.should.exist;
    });
    it('getGifById method (GET) should get a specific GIF post', function (done) {
      _chai["default"].request(_main["default"]).get('/api/v1/gifs/1').set('Authorization', "Bearer ".concat(adminToken)).end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.be.a('string');
        res.body.should.have.property('data');
        res.body.data.should.be.a('object');
      });

      done();
    });
    it('getGifById method (GET) should return ERROR if authorId is not a number', function (done) {
      _chai["default"].request(_main["default"]).get('/api/v1/gifs/1').set('Authorization', "Bearer ".concat(adminToken, "0")).end(function (err, res) {
        res.should.have.status(403);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.be.a('string');
        res.body.should.have.property('error');
        res.body.error.should.be.a('string');
      });

      done();
    });
    it('getGifById method (GET) should return ERROR if any value is missing', function (done) {
      _chai["default"].request(_main["default"]).get('/api/v1/gifs/1').set('Authorization', "Bearer ".concat(adminToken, "0")).end(function (err, res) {
        res.should.have.status(403);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.be.a('string');
        res.body.should.have.property('error');
        res.body.error.should.be.a('string');
      });

      done();
    });
    it('getGifById method (GET) should return ERROR if GIF post is NOT FOUND', function (done) {
      _chai["default"].request(_main["default"]).get('/api/v1/gifs/100000').set('Authorization', "Bearer ".concat(adminToken)).end(function (err, res) {
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
  }); // End of top level 'describe' function
}); // done();
//   }); // End of before hook function
// });