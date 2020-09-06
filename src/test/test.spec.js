import chai, { should } from 'chai';
import chaiHttp from 'chai-http';
import server from '../main';
import TestController from '../controllers';
import EmployeeController from '../controllers/employeeController';
import ArticleController from '../controllers/articleController';
import GifController from '../controllers/gifController';

chai.use(chaiHttp);
should();

const count = Math.floor(Math.random() * 1000);
const gender = true;
console.log('count', count);


let adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbkRldGFpbHMiOnsiaWQiOjEsImZpcnN0TmFtZSI6InRlYW0iLCJsYXN0TmFtZSI6ImFjY2VzcyIsImVtYWlsIjoidGVhbWFjY2Vzc0B0ZWFtd29yay5jb20iLCJpc0FkbWluIjp0cnVlfSwiaWF0IjoxNTc0NzYwNjc3LCJleHAiOjE1NzQ3Njc4Nzd9.ZDou4wMaw_lCvSj6_BnAVGzmHd1X5DZiAotJhNouFAA';

describe('Test Endpoints', () => {
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


  describe('Test Endpoints', () => {
    it('TestController should exist', () => {
      TestController.should.exist;
    });

    it('test method (GET) should exist', () => {
      TestController.test.should.exist;
    });

    it('test method (GET) should exist', (done) => {
      chai.request(server)
        .get('/api/v1/test')
        .end((err, res) => {
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

  // Test Employee Endpoints
  describe('Employee Endpoints', () => {
    it('EmployeeController should exist', () => {
      EmployeeController.should.exist;
    });


    // Test signIn Endpoints
    it('signIn  method (POST) should exist', () => {
      EmployeeController.signIn.should.exist;
    });

    it('signIn method (POST) should sign in a registered user', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signin')
        .send({
          email: 'teamaccess@teamwork.com',
          password: 'teampass01',
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.status.should.be.a('string');
          res.body.should.have.property('data');
          res.body.data.should.be.a('object');
          // res.body.data.should.have.property('message');
          res.body.data.should.have.property('token');
          res.body.data.should.have.property('userId');
          const { token } = res.body.data;
          console.log(res.body.data);
          adminToken = token;
        });
      done();
    });

    it('signIn method (POST) should return ERROR for input errors', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signin')
        .send({
          email: '',
          password: `password${count}`,
        })
        .end((err, res) => {
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

    it('signIn method (POST) should return ERROR if any value is missing', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signin')
        .send({
          email: '',
          password: `password${count}`,
        })
        .end((err, res) => {
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

    it('signIn method (POST) should return ERROR if password is INVALID', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signin')
        .send({
          email: `email${count}@email.com`,
          password: 'password',
        })
        .end((err, res) => {
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


    // Test createUser Endpoints
    it('createUser  method (POST) should exist', () => {
      EmployeeController.createUser.should.exist;
    });

    it('createUser method (POST) should create a new employee user account', (done) => {
      chai.request(server)
        // chai.request('http://localhost:3000')
        .post('/api/v1/auth/create-user')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          firstName: `firstname${count}`,
          lastName: `lastname${count}`,
          email: `email${count}@email.com`,
          password: `password${count}`,
          gender: `${!gender ? 'M' : 'F'}`,
          jobRole: 'staff',
          department: 'production',
          address: 'Lagos',
        })
        .end((err, res) => {
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

    it('createUser method (POST) should return ERROR for input errors', (done) => {
      chai.request(server)
        .post('/api/v1/auth/create-user')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          firstName: `firstname${count}`,
          lastName: `lastname${count}`,
          email: `email${count}@email.com`,
          password: `password${count}`,
          gender: `${!gender ? 'M' : 'F'}`,
          jobRole: '',
          department: 'production',
          address: 'Lagos',
        })
        .end((err, res) => {
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

    it('createUser method (POST) should return ERROR if any value is missing', (done) => {
      chai.request(server)
        .post('/api/v1/auth/create-user')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          firstName: '',
          lastName: `lastname${count}`,
          email: `email${count}@email.com`,
          password: `password${count}`,
          gender: `${!gender ? 'M' : 'F'}`,
          jobRole: 'staff',
          department: 'production',
          address: 'Lagos',
        })
        .end((err, res) => {
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

    it('createUser method (POST) should return ERROR if user already exist', (done) => {
      chai.request(server)
        .post('/api/v1/auth/create-user')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          firstName: `firstname${count}`,
          lastName: `lastname${count}`,
          email: `email${count}@email.com`,
          password: `password${count}`,
          gender: `${!gender ? 'M' : 'F'}`,
          jobRole: 'staff',
          department: 'production',
          address: 'Lagos',
        })
        .end((err, res) => {
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

    // // Test signIn Endpoints
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
  });
  // Test Article Endpoints
  describe('Article Endpoints', () => {
    it('ArticleController should exist', () => {
      ArticleController.should.exist;
    });

    // Test createArticle Endpoints
    it('createArticle  method (POST) should exist', () => {
      ArticleController.createArticle.should.exist;
    });

    it('createArticle method (POST) should create article with title & article', (done) => {
      chai.request(server)
        .post('/api/v1/articles')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          title: `Test Edition${count}`,
          article: 'This is one of the test edition articles, published by @animalworldng',
        })
        .end((err, res) => {
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

    it('createArticle method (POST) should return ERROR if any value is missing', (done) => {
      chai.request(server)
        .post('/api/v1/articles')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          title: '',
          article: 'This is one of the test edition articles, published by @animalworldng',
        })
        .end((err, res) => {
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

    it('createArticle method (POST) should return ERROR if author NOT FOUND', (done) => {
      chai.request(server)
        .post('/api/v1/articles')
        .set('Authorization', `Bearer ${adminToken}0`)
        .send({
          title: `Test Edition${count + 1}`,
          article: 'This is one of the test edition articles, published by @animalworldng',
        })
        .end((err, res) => {
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

    it('createArticle method (POST) should return ERROR if article already exists', (done) => {
      chai.request(server)
        .post('/api/v1/articles')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          title: `Test Edition${count}`,
          article: 'This is one of the test edition articles, published by @animalworldng',
        })
        .end((err, res) => {
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


    // Test updateArticle Endpoints
    it('updateArticle method (PATCH) should exist', () => {
      ArticleController.updateArticle.should.exist;
    });

    it('updateArticle method (PATCH) should update article with title & article', (done) => {
      chai.request(server)
        .patch('/api/v1/articles/1')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          title: `Test Update Edition${count}`,
          article: 'This is one of the test update edition articles, published by @animalworldng',
        })
        .end((err, res) => {
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

    it('updateArticle method (PATCH) should return ERROR if articleId is not a number', (done) => {
      chai.request(server)
        .patch('/api/v1/articles/a')
        .set('Authorization', `Bearer ${adminToken}0`)
        .send({
          title: `Test Update Edition${count}`,
          article: 'This is one of the test edition articles, published by @animalworldng',
        })
        .end((err, res) => {
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

    it('updateArticle method (PATCH) should return ERROR if authorId is not a number', (done) => {
      chai.request(server)
        .patch('/api/v1/articles/1')
        .set('Authorization', `Bearer ${adminToken}0`)
        .send({
          title: `Test Update Edition${count}`,
          article: 'This is one of the test edition articles, published by @animalworldng',
        })
        .end((err, res) => {
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

    it('updateArticle method (PATCH) should return ERROR if any value is missing', (done) => {
      chai.request(server)
        .patch('/api/v1/articles/1')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          title: '',
          article: 'This is one of the test edition articles, published by @animalworldng',
        })
        .end((err, res) => {
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

    it('updateArticle method (PATCH) should return ERROR if article is NOT FOUND', (done) => {
      chai.request(server)
        .patch('/api/v1/articles/100000')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          title: 'Test Edition',
          article: 'This is one of the test edition articles, published by @animalworldng',
        })
        .end((err, res) => {
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

    // Test deleteArticle Endpoints
    it('deleteArticle method (DELETE) should exist', () => {
      ArticleController.deleteArticle.should.exist;
    });

    it('deleteArticle method (DELETE) should delete an article', (done) => {
      chai.request(server)
        .delete('/api/v1/articles/1')
        .set('Authorization', `Bearer ${adminToken}`)
        .end((err, res) => {
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

    it('deleteArticle method (DELETE) should return ERROR if articleId is not a number', (done) => {
      chai.request(server)
        .delete('/api/v1/articles/a')
        .set('Authorization', `Bearer ${adminToken}`)
        .end((err, res) => {
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

    it('deleteArticle method (DELETE) should return ERROR if authorId is not a number', (done) => {
      chai.request(server)
        .delete('/api/v1/articles/1')
        .set('Authorization', `Bearer ${adminToken}0`)
        .end((err, res) => {
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

    it('deleteArticle method (DELETE) should return ERROR if any value is missing', (done) => {
      chai.request(server)
        .delete('/api/v1/articles/1')
        .set('Authorization', `Bearer ${adminToken}0`)
        .end((err, res) => {
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

    it('deleteArticle method (DELETE) should return ERROR if article is NOT FOUND', (done) => {
      chai.request(server)
        .delete('/api/v1/articles/100000')
        .set('Authorization', `Bearer ${adminToken}`)
        .end((err, res) => {
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

    // Test createComment on articles Endpoints
    it('createComment method (POST) should exist', () => {
      ArticleController.createComment.should.exist;
    });

    it('createComment method (POST) should create a comment for a specific article', (done) => {
      chai.request(server)
        .post('/api/v1/articles/1/comment')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          comment: 'latest comment',
        })
        .end((err, res) => {
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

    it('createComment method (POST) should return ERROR if articleId is not a number', (done) => {
      chai.request(server)
        .post('/api/v1/articles/a/comment')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          comment: 'latest comment',
        })
        .end((err, res) => {
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

    it('createComment method (POST) should return ERROR if authorId is not a number', (done) => {
      chai.request(server)
        .post('/api/v1/articles/1/comment')
        .set('Authorization', `Bearer ${adminToken}0`)
        .send({
          comment: 'latest comment',
        })
        .end((err, res) => {
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

    it('createComment method (POST) should return ERROR if any value is missing', (done) => {
      chai.request(server)
        .post('/api/v1/articles/1/comment')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          comment: '',
        })
        .end((err, res) => {
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

    it('createComment method (POST) should return ERROR if article is NOT FOUND', (done) => {
      chai.request(server)
        .post('/api/v1/articles/100000/comment')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          comment: 'latest comment',
        })
        .end((err, res) => {
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


    // Test getArticleById Endpoints
    it('getArticleById method (GET) should exist', () => {
      ArticleController.getArticleById.should.exist;
    });

    it('getArticleById method (GET) should get a specific article', (done) => {
      chai.request(server)
        .get('/api/v1/articles/1')
        .set('Authorization', `Bearer ${adminToken}`)
        .end((err, res) => {
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


    it('getArticleById method (GET) should return ERROR if authorId is not a number', (done) => {
      chai.request(server)
        .get('/api/v1/articles/1')
        .set('Authorization', `Bearer ${adminToken}0`)
        .end((err, res) => {
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

    it('getArticleById method (GET) should return ERROR if any value is missing', (done) => {
      chai.request(server)
        .get('/api/v1/articles/1')
        .set('Authorization', `Bearer ${adminToken}0`)
        .end((err, res) => {
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

    it('getArticleById method (GET) should return ERROR if article is NOT FOUND', (done) => {
      chai.request(server)
        .get('/api/v1/articles/100000')
        .set('Authorization', `Bearer ${adminToken}`)
        .end((err, res) => {
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


  // Test createGif Endpoints
  describe('GIF Endpoints', () => {
    it('GifController should exist', () => {
      GifController.should.exist;
    });

    // Test createGif Endpoints
    it('createGif method (POST) should exist', () => {
      GifController.createGif.should.exist;
    });

    it('createGif method (POST) should create gif post with title & image(Url)', (done) => {
      chai.request(server)
        .post('/api/v1/gifs')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          title: `Test Edition${count}`,
          imageUrl: 'testimage',
        })
        .end((err, res) => {
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

    it('createGif method (POST) should return ERROR if any value is missing', (done) => {
      chai.request(server)
        .post('/api/v1/gifs')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          title: '',
          imageUrl: '',
        })
        .end((err, res) => {
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

    it('createGif method (POST) should return ERROR if author NOT FOUND', (done) => {
      chai.request(server)
        .post('/api/v1/gifs')
        .set('Authorization', `Bearer ${adminToken}0`)
        .send({
          title: `Test Edition${count + 1}`,
          imageUrl: 'testimage',
        })
        .end((err, res) => {
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

    it('createGif method (POST) should return ERROR if gif post already exists', (done) => {
      chai.request(server)
        .post('/api/v1/gifs')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          title: `Test Edition${count}`,
          imageUrl: 'testimage',
        })
        .end((err, res) => {
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

    // Test deleteGif Endpoints
    it('deleteGif method (DELETE) should exist', () => {
      GifController.deleteGif.should.exist;
    });

    it('deleteGif method (DELETE) should delete an article', (done) => {
      chai.request(server)
        .delete('/api/v1/gifs/1')
        .set('Authorization', `Bearer ${adminToken}`)
        .end((err, res) => {
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

    it('deleteGif method (DELETE) should return ERROR if gifId is not a number', (done) => {
      chai.request(server)
        .delete('/api/v1/gifs/a')
        .set('Authorization', `Bearer ${adminToken}`)
        .end((err, res) => {
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

    it('deleteGif method (DELETE) should return ERROR if authorId is not a number', (done) => {
      chai.request(server)
        .delete('/api/v1/gifs/1')
        .set('Authorization', `Bearer ${adminToken}0`)
        .end((err, res) => {
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

    it('deleteGif method (DELETE) should return ERROR if any value is missing', (done) => {
      chai.request(server)
        .delete('/api/v1/gifs/1')
        .set('Authorization', `Bearer ${adminToken}0`)
        .end((err, res) => {
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

    it('deleteGif method (DELETE) should return ERROR if GIF is NOT FOUND', (done) => {
      chai.request(server)
        .delete('/api/v1/gifs/100000')
        .set('Authorization', `Bearer ${adminToken}`)
        .end((err, res) => {
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

    // Test createComment on GIF Endpoints
    it('createComment method (POST) should exist', () => {
      GifController.createComment.should.exist;
    });

    it('createComment method (POST) should create a comment for a specific gif post', (done) => {
      chai.request(server)
        .post('/api/v1/gifs/1/comment')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          comment: 'latest gif comment',
        })
        .end((err, res) => {
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

    it('createComment method (POST) should return ERROR if gifId is not a number', (done) => {
      chai.request(server)
        .post('/api/v1/gifs/a/comment')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          comment: 'latest comment',
        })
        .end((err, res) => {
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

    it('createComment method (POST) should return ERROR if authorId is not a number', (done) => {
      chai.request(server)
        .post('/api/v1/gifs/1/comment')
        .set('Authorization', `Bearer ${adminToken}0`)
        .send({
          comment: 'latest comment',
        })
        .end((err, res) => {
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

    it('createComment method (POST) should return ERROR if any value is missing', (done) => {
      chai.request(server)
        .post('/api/v1/gifs/1/comment')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          comment: '',
        })
        .end((err, res) => {
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

    it('createComment method (POST) should return ERROR if gif post is NOT FOUND', (done) => {
      chai.request(server)
        .post('/api/v1/gifs/100000/comment')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          comment: 'latest comment',
        })
        .end((err, res) => {
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


    // Test getGifById Endpoints
    it('getGifById method (GET) should exist', () => {
      GifController.getGifById.should.exist;
    });

    it('getGifById method (GET) should get a specific GIF post', (done) => {
      chai.request(server)
        .get('/api/v1/gifs/1')
        .set('Authorization', `Bearer ${adminToken}`)
        .end((err, res) => {
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


    it('getGifById method (GET) should return ERROR if authorId is not a number', (done) => {
      chai.request(server)
        .get('/api/v1/gifs/1')
        .set('Authorization', `Bearer ${adminToken}0`)
        .end((err, res) => {
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

    it('getGifById method (GET) should return ERROR if any value is missing', (done) => {
      chai.request(server)
        .get('/api/v1/gifs/1')
        .set('Authorization', `Bearer ${adminToken}0`)
        .end((err, res) => {
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

    it('getGifById method (GET) should return ERROR if GIF post is NOT FOUND', (done) => {
      chai.request(server)
        .get('/api/v1/gifs/100000')
        .set('Authorization', `Bearer ${adminToken}`)
        .end((err, res) => {
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
});
// done();
//   }); // End of before hook function
// });
