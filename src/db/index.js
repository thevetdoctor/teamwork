import { Client } from 'pg';
import 'dotenv/config';

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


console.log('NODE_ENV', process.env.NODE_ENV);

let db;

if (process.env.NODE_ENV === 'test') {
  db = new Client(dbUrlTest);
  console.log('Environment => Testing');
} else {
  db = new Client(dbUrl);
  // db = new Client(process.env.DATABASE_URL);
  console.log('Environment => Development');
}

db.connect((err, res) => {
  if (err) {
    console.log(`Some error in connection to: ${process.env.DB_NAME} DB`);
    return;
  }
  console.log('Connected to', res.database);
});

export default db;