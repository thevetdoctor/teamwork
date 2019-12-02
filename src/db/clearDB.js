import db from '.';
import migrate from './migrations';

const clearDBQuery = `DROP TABLE IF EXISTS comments;
                      DROP TABLE IF EXISTS articles;
                      DROP TABLE IF EXISTS gifs;
                      DROP TABLE IF EXISTS employees;`;

const clearDB = async() => {
    try {
        const clear = await db.query(clearDBQuery);
        return clear;
    } catch(e) {
        console.log(e);
    }
};

    clearDB().then(result => console.log('DB cleared')).catch(e => console.log(e));
    migrate().then(result => console.log('Tables created')).catch(e => console.log(e));

export default clearDB;