import { Client } from 'pg';
import 'dotenv/config';


// const elephantSql = 'postgres://aikuwuqy:VwJSaP-pOdEc--_ZNpS-g2zHekiTgLJK@raja.db.elephantsql.com:5432/aikuwuqy';
// const elephantSqlTest = 'postgres://ujkhiehs:JLm9XTjoF7_cyAP48mKgiGO_Hlxt6b-0@salt.db.elephantsql.com:5432/ujkhiehs';

const dbUrl = {
  host: process.env.HOST,
  user: process.env.USER,
  database: process.env.DB_NAME,
  password: process.env.PASS,
  port: process.env.DB_PORT,
};

const dbUrlTest = {
  host: process.env.TEST_HOST,
  user: process.env.TEST_USER,
  database: process.env.TEST_DB_NAME,
  password: process.env.TEST_PASS,
  port: process.env.TEST_DB_PORT,
};

 
console.log('NODE_ENV', process.env.NODE_ENV, process.env.COMPUTERNAME);

let db;

if (process.env.NODE_ENV === 'test ') {
   if(process.env.COMPUTERNAME === 'ACER-PC') {
      db = new Client(dbUrlTest);
      console.log('Environment => Testing Local');
    } else {
      db = new Client(process.env.DB_CLOUD_TEST);
      console.log('Environment => Testing Cloud');
    }
} else {
   if(process.env.COMPUTERNAME !== 'ACER-PC') {
      db = new Client(dbUrl);
      console.log('Environment => Development');
    } else {
      db = new Client(process.env.DB_CLOUD);
      console.log('Environment => Production');
    }
}

db.connect((err, res) => {
  if (err) {
    console.log(`Some error in connection to: ${process.env.DB_NAME} DB`);
    return;
  }
  console.log('Connected to', res.database);
});

export default db;