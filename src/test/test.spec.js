import chai, { should } from 'chai';
import chaiHttp from 'chai-http';
import server from '../main';
import TestController from '../controllers';


chai.use(chaiHttp);
should();


describe('Testing Endpoints', () => {
  it('TestController should exist', () => {
    TestController.should.exist;
  });

  it('test method (GET) should exist', () => {
    TestController.test.should.exist;
  });
});