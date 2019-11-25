import express from 'express';
import path from 'path';
import parser from 'body-parser';
import routeHandler from './routes';
import regenerator from 'regenerator-runtime';
import migrate from './db/migrations';

regenerator;


const app = express();


// app.use(require('connect-livereload'));

app.use(express.static(path.join(__dirname, 'public')));
app.use('images', express.static(path.join(__dirname, 'images')));
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());
 

routeHandler(app);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE');

    next();
});

// app.use((error, req, res, next) => {
//     res.status(error.status || 500);
//     res.json({error: { message: error.message }});
//     next();
// });

app.use((error, req, res, next) => {
    console.error(error.stack);
    res.status(500).send('Something broke!');
    next();
}); 

app.get('/api/v1', (req, res, next) => {
    
    res.send('<div style=\'text-align: center;\'><h1>Welcome to Teamwork</h1><h3>... where teams actually WORK!</h3><img src=\'https://res.cloudinary.com/thevetdoctor/image/upload/v1574600900/teamwork/Penguins.jpg\' alt=\'Team Bond Image\'/></div>');
});
 
app.get('/', (req, res, next) => {
    
    res.send(`<div style='text-align: center;'>
                <h1>Looking for Teamwork ?</h1>
                <h3> <a href='/api/v1'>Click here!</a></h3>
            </div>`);
});

const port = process.env.PORT || 8000;

// (async function() {
// // await db.query('delete from team where id=1 returning *')
// await db.query('select * from team')
// .then(res => console.log(res.rows));
// })();


app.listen(port, () => {
    console.log(`Server running on ${port}`);
});

export default app;