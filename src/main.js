import express from 'express';
import path from 'path';
import parser from 'body-parser';
import swaggerUI from 'swagger-ui-express';
import regeneratorRuntime from 'regenerator-runtime';
import routeHandler from './routes';
import swaggerSpec from './swagger';

const logger = require('morgan');

// regenerator;

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
// app.use('images', express.static(path.join(__dirname, 'images')));
app.use('/uploads', express.static('uploads'));
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());
app.use(logger('dev'));

// use swagger-Ui-express for your app documentation endpoint
app.use('/api/v1/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE');

  next();
});

routeHandler(app);


app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).send('Something broke!');
  next();
});

const tag = __dirname.slice(__dirname.lastIndexOf('\\') + 1);
console.log('Directory: ', tag);

app.get('/api/v1', (req, res, next) => {
  res.sendFile(path.join(__dirname.replace(`${tag}`, '\\page.html')));
  // res.sendFile(path.join(__dirname.replace('dist','\page.html')));
});

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname.replace(`${tag}`, '\\index.html')));
//   res.sendFile(path.join(__dirname.replace('dist','\index.html')));
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server running on ${process.env.NODE_ENV}`);
  console.log(`Server running on ${port}`);
});

  
export default app;
