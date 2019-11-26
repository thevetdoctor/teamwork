import db from '../db';
import { findQuery, updateQuery, deleteQuery, searchQuery } from '../db/query';
import 'regenerator-runtime';

export default class BaseModel {
    // constructor() {
    // this.name = name;
    // } 


  static async find(position, order) {
    let obj = this.name;
    obj = obj.replace('Model', 's').toLowerCase();
    // console.log(obj, position, order);
    const res = await db.query(...findQuery(obj, position, order))
      .then(result => result.rows)
      .catch(err => {
        return 'Error found here!', err.message;
      });
    return res;
  }

  static async findByJoin(joinTable, on, position) {
    let obj = this.name;
    obj = obj.replace('Model', 's').toLowerCase();
    // console.log(obj, on, position);
    let joinQuery = `SELECT * FROM ${obj} INNER JOIN ${joinTable} ON ${on} WHERE ${position}`;
    const res = await db.query(joinQuery)
      .then(result => result.rows)
      .catch(err => {
        return 'Error found here!', err.message;
      });
    // console.log('join query', joinQuery, 'result', res);
    return res;
  }

 
  static async delete(position) {
    let obj = this.name;
    obj = obj.replace('Model', 's').toLowerCase();
    // console.log(obj);
    const res = await db.query(...deleteQuery(obj, position))
      .then(result => result.rows)
      .catch(err => {
        return 'Error found here!', err.message;
      });
    return res;
  }

  static async update(position, condition, by) {
    let obj = this.name;
    obj = obj.replace('Model', 's').toLowerCase();
    // console.log(obj);
    const res = await db.query(...updateQuery(obj, position, condition, by))
      .then(result => result.rows)
      .catch(err => {
        return 'Error found here!', err.message;
      });
    return res;
  }

  static async search(position, order) {
    let obj = this.name;
    obj = obj.replace('Model', 's').toLowerCase();
    // console.log(obj, position, order);
    const res = await db.query(...searchQuery(obj, position, order))
      .then(result => result.rows)
      .catch(err => {
        return 'Error found here!', err.message;
      });
    
    return res;
  }


  
}