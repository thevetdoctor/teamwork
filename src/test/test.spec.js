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
let gender = true;
console.log('count', count);

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
  
});


describe('Article Endpoints', () => {
  it('ArticleController should exist', () => {
    ArticleController.should.exist;
  });

  it('createArticle  method (POST) should exist', () => {
    ArticleController.createArticle.should.exist;
  });

  it('createArticle method (POST) should create article with title & article', (done) => {
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
  

    // Test updateArticle Endpoints
  it('updateArticle method (PATCH) should exist', () => {
    ArticleController.updateArticle.should.exist;
  });

  it('updateArticle method (PATCH) should update article with title & article', (done) => {
    chai.request(server)
      .patch('/api/v1/articles/1')
      .send({
        authorId: 1,
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
      .send({
        authorId: 1,
        title: `Test Update Edition${count}`,
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

  it('updateArticle method (PATCH) should return ERROR if authorId is not a number', (done) => {
    chai.request(server)
      .patch('/api/v1/articles/1')
      .send({
        authorId: 'a',
        title: `Test Update Edition${count}`,
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

  it('updateArticle method (PATCH) should return ERROR if any value is missing', (done) => {
    chai.request(server)
      .patch('/api/v1/articles/1')
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
  
  it('updateArticle method (PATCH) should return ERROR if article is NOT FOUND', (done) => {
    chai.request(server)
      .patch('/api/v1/articles/100000')
      .send({
        authorId: 1,
        title: `Test Edition`,
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
      .send({
        authorId: 1,
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
      });
    done();
  });

  it('deleteArticle method (DELETE) should return ERROR if articleId is not a number', (done) => {
    chai.request(server)
      .delete('/api/v1/articles/a')
      .send({
        authorId: 1,
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

  it('deleteArticle method (DELETE) should return ERROR if authorId is not a number', (done) => {
    chai.request(server)
      .delete('/api/v1/articles/1')
      .send({
        authorId: 'a',
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

  it('deleteArticle method (DELETE) should return ERROR if any value is missing', (done) => {
    chai.request(server)
      .delete('/api/v1/articles/1')
      .send({
        authorId: '',
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
  
  it('deleteArticle method (DELETE) should return ERROR if article is NOT FOUND', (done) => {
    chai.request(server)
      .delete('/api/v1/articles/100000')
      .send({
        authorId: 1,
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

    // Test createComment on articles Endpoints
  it('createComment method (POST) should exist', () => {
    ArticleController.createComment.should.exist;
  });

  it('createComment method (POST) should create a comment for a specific article', (done) => {
    chai.request(server)
      .post('/api/v1/articles/1/comment')
      .send({
        authorId: 1,
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
      .send({
        authorId: 1,
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
      .send({
        authorId: 'a',
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

  it('createComment method (POST) should return ERROR if any value is missing', (done) => {
    chai.request(server)
      .post('/api/v1/articles/1/comment')
      .send({
        authorId: '',
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
  
  it('createComment method (POST) should return ERROR if article is NOT FOUND', (done) => {
    chai.request(server)
      .post('/api/v1/articles/100000/comment')
      .send({
        authorId: 1,
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
  
});


    // Test createGif Endpoints

describe('GIF Endpoints', () => {
  it('GifController should exist', () => {
    GifController.should.exist;
  });

  // it('createGif method (POST) should exist', () => {
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
   it('deleteGif method (DELETE) should exist', () => {
    GifController.deleteGif.should.exist;
  });

  it('deleteGif method (DELETE) should delete an article', (done) => {
    chai.request(server)
      .delete('/api/v1/gifs/1')
      .send({
        authorId: 1,
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
      });
    done();
  });

  it('deleteGif method (DELETE) should return ERROR if gifId is not a number', (done) => {
    chai.request(server)
      .delete('/api/v1/gifs/a')
      .send({
        authorId: 1,
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

  it('deleteGif method (DELETE) should return ERROR if authorId is not a number', (done) => {
    chai.request(server)
      .delete('/api/v1/gifs/1')
      .send({
        authorId: 'a',
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

  it('deleteGif method (DELETE) should return ERROR if any value is missing', (done) => {
    chai.request(server)
      .delete('/api/v1/gifs/1')
      .send({
        authorId: '',
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
  
  it('deleteGif method (DELETE) should return ERROR if GIF is NOT FOUND', (done) => {
    chai.request(server)
      .delete('/api/v1/gifs/100000')
      .send({
        authorId: 1,
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

    // Test createComment on GIF Endpoints
    it('createComment method (POST) should exist', () => {
      GifController.createComment.should.exist;
    });
  
    it('createComment method (POST) should create a comment for a specific gif post', (done) => {
      chai.request(server)
        .post('/api/v1/gifs/1/comment')
        .send({
          authorId: 1,
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
        .send({
          authorId: 1,
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
        .post('/api/v1/gifs/1/comment')
        .send({
          authorId: 'a',
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
  
    it('createComment method (POST) should return ERROR if any value is missing', (done) => {
      chai.request(server)
        .post('/api/v1/gifs/1/comment')
        .send({
          authorId: '',
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
    
    it('createComment method (POST) should return ERROR if gif post is NOT FOUND', (done) => {
      chai.request(server)
        .post('/api/v1/gifs/100000/comment')
        .send({
          authorId: 1,
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
    
});