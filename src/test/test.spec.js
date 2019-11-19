import chai, { should } from 'chai';
import chaiHttp from 'chai-http';
import server from '../main';
import TestController from '../controllers';
import EmployeeController from '../controllers/employeeController'; 
import ArticleController from '../controllers/articleController';

chai.use(chaiHttp);
should();

const count = Math.floor(Math.random() * 1000);
let gender = true;
console.log('count', count);

describe('Test Endpoints', () => {
  it('TestController should exist', () => {
    TestController.should.exist;
  });

  it('test method (GET) should exist', () => {
    TestController.test.should.exist;
  });
});

describe('Employee Endpoints', () => {
  it('EmployeeController should exist', () => {
    EmployeeController.should.exist;
  });

  it('createUser  method (POST) should exist', () => {
    EmployeeController.createUser.should.exist;
  });

  it('createUser method (POST) should create a new employee user account', (done) => {
    chai.request(server)
    // chai.request('http://localhost:3000')
      .post('/api/v1/auth/create-user')
      .send({
        firstName: `firstname${count}`,
        lastName: `lastname${count}`,
        email: `email${count}@email.com`,
        password: `password${count}`,
        gender: `${!gender ? 'M' : 'F'}`,
        jobRole: 'staff',
        department: 'production',
        address: 'Lagos'
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
      .send({
        firstName: `firstname${count}`,
        lastName: `lastname${count}`,
        email: `email${count}@email.com`,
        password: `password${count}`,
        gender: `${!gender ? 'M' : 'F'}`,
        jobRole: 'staff',
        department: 'production',
        address: 'Lagos'
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
      .send({
        firstName: '',
        lastName: `lastname${count}`,
        email: `email${count}@email.com`,
        password: `password${count}`,
        gender: `${!gender ? 'M' : 'F'}`,
        jobRole: 'staff',
        department: 'production',
        address: 'Lagos'
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
      .send({
        firstName: `firstname${count}`,
        lastName: `lastname${count}`,
        email: `email${count}@email.com`,
        password: `password${count}`,
        gender: `${!gender ? 'M' : 'F'}`,
        jobRole: 'staff',
        department: 'production',
        address: 'Lagos'
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

  it('signIn  method (POST) should exist', () => {
    EmployeeController.signIn.should.exist;
  });

  it('signIn method (POST) should sign in a registered user', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signin')
      .send({
        email: `email${count}@email.com`,
        password: `password${count}`,
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
      });
    done();
  });

  it('signIn method (POST) should return ERROR for input errors', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signin')
      .send({
        email: `email@email.com`,
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
        password: `password`,
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


  describe('Article Endpoints', () => {
    it('ArticleController should exist', () => {
      ArticleController.should.exist;
    });
  
    it('createArticle  method (POST) should exist', () => {
      ArticleController.createArticle.should.exist;
    });
  
    it('createArticle method (POST) should create a new employee user account', (done) => {
      chai.request(server)
        .post('/api/v1/articles')
        .send({
          authorId: 1,
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
        .send({
          authorId: 1,
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
        .send({
          authorId: 0,
          title: `Test Edition${count + 1}`,
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
    it('createArticle method (POST) should return ERROR if article already exists', (done) => {
      chai.request(server)
        .post('/api/v1/articles')
        .send({
          authorId: 1,
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
    
  });

});