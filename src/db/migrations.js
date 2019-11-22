import db from './index';
import tableQuery from './tables';

// console.log(tableQuery);

const migrate = async() => {
    try {
        const tables = await db.query(tableQuery);
        // console.log(tables);
        return tables; 
    } catch(e) {
        console.log(e);
    }
};

    migrate().then(result => console.log('Tables created')).catch(e => console.log(e));

export default migrate;