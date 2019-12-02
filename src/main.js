import express from 'express';
import path from 'path';
import parser from 'body-parser';
import routeHandler from './routes';
import swaggerUI from 'swagger-ui-express';
import swaggerSpec from './swagger';
import regeneratorRuntime from 'regenerator-runtime';

// regenerator;

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use('images', express.static(path.join(__dirname, 'images')));
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

// use swagger-Ui-express for your app documentation endpoint
app.use('/api/v1/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

routeHandler(app);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE');

    next();
});


app.use((error, req, res, next) => {
    console.error(error.stack);
    res.status(500).send('Something broke!');
    next();
}); 

    const tag = __dirname.slice(__dirname.lastIndexOf('\\') + 1);
    console.log('Directory: ', tag);

app.get('/api/v1', (req, res, next) => {
    
    // res.sendFile(path.join(__dirname.replace(`${tag}`,'\\page.html'))); 
    res.sendFile(path.join(__dirname.replace('dist','\page.html'))); 
});
 
app.get('/', (req, res, next) => { 
    
//   res.sendFile(path.join(__dirname.replace(`${tag}`,'\\index.html'))); 
  res.sendFile(path.join(__dirname.replace('dist','\index.html'))); 
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server running on ${port}`);
});

export default app;