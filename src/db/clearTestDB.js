import db from '../db';

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

    clearDB().then(result => console.log('TestDB cleared')).catch(e => console.log(e));

export default clearDB;