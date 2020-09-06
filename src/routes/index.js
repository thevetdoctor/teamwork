import auth from './employeeRoutes';
import articles from './articleRoutes';
import gifs from './gifRoutes';
import feed from './feedRoute';
import test from './testRoutes';


export default (app) => {
  app.use('/api/v1/auth', auth);
  app.use('/api/v1/articles', articles);
  app.use('/api/v1/gifs', gifs);
  app.use('/api/v1/feed', feed);
  app.use('/api/v1/test', test);
};
