import chai, { should } from 'chai';
import chaiHttp from 'chai-http';
import server from '../main';
import TestController from '../controllers';
import EmployeeController from '../controllers/employeeController';

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
    console.log(EmployeeController);
    console.log(EmployeeController.createUser);
  });

  it('createUser  method (POST) should exist', () => {
    EmployeeController.createUser.should.exist;
  });

  it('Create User method (POST) should create a new employee user account', (done) => {
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

  it('Create User method (POST) should return ERROR for input errors', (done) => {
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

  it('Create User method (POST) should return ERROR if any value is missing', (done) => {
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

  it('Create User method (POST) should return ERROR if user already exist', (done) => {
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

  it('Sign In method (POST) should sign in a registered user', (done) => {
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
        res.body.data.should.have.property('userid');
      });
    done();
  });

  it('Sign In method (POST) should return ERROR for input errors', (done) => {
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

  it('Sign In method (POST) should return ERROR if any value is missing', (done) => {
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

  it('Sign In method (POST) should return ERROR if password is INVALID', (done) => {
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

});