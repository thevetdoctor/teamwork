import auth from './employeeRoutes';
import articles from './articleRoutes';
import test from './testRoutes';


export default (app) => {
  app.use('/api/v1/auth', auth);
  app.use('/api/v1/articles', articles);
  app.use('/api/v1/test', test);
};