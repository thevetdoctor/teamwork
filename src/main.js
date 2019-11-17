import express from 'express';
import path from 'path';
import parser from 'body-parser';
import db from './db';
import route from './routes';
import regenerator from 'regenerator-runtime';
import migrate from './db/migrations';

regenerator;


const app = express();

// app.use(require('connect-livereload'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(parser.urlencoded({ extended: false }));
app.use(parser.json());
 
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

app.use('/api/v1', route);
app.get('/', (req, res, next) => {
    
    res.send(`<div style='text-align: center;'>
                <h1>Looking for Teamwork ?</h1>
                <h3> <a href='/api/v1'>Click here!</a></h3>
            </div>`);
});

const port = process.env.PORT || 3000;

(async function() {
// await db.query('delete from team where id=1 returning *')
await db.query('select * from team')
.then(res => console.log(res.rows));
})();


app.listen(port, () => {
    console.log(`Server running on ${port}`);
});