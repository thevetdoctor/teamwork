import db from '../db';
import { findQuery, updateQuery } from '../db/query';
import 'regenerator-runtime';

export default class BaseModel {
    // constructor() {
    // this.name = name;
    // }


  static async find(position, order) {
    let obj = this.name;
    obj = obj.replace('Model', 's').toLowerCase();
    console.log(obj, position, order);
    // try {
    const res = await db.query(...findQuery(obj, position, order))
      .then(result => result.rows)
      .catch(err => {
        return 'Error found here!', err.message;
      });
    // console.log('fantastic', res);
    // return res;
    // } catch(err) {
    // console.log('Error with try catch');
    // }
    return res;
  }

  static async findByJoinEmployees(on, position) {
    let obj = this.name;
    obj = obj.replace('Model', 's').toLowerCase();
    console.log(obj, on, position);
    // try {
    // const res = await db.query(...findQuery(obj, position, order))
    let joinQuery = `SELECT * FROM ${obj} INNER JOIN employees ON ${on} WHERE ${position}`;
    const res = await db.query(joinQuery)
      .then(result => result.rows)
      .catch(err => {
        return 'Error found here!', err.message;
      });
    console.log('join query', joinQuery, 'result', res);
    // return res;
    // } catch(err) {
    // console.log('Error with try catch');
    // }
    return res;
  }

 
  // static async delete(position) {
  //   let obj = this.name;
  //   obj = obj.replace('Model', 's').toLowerCase();
  //   // console.log(obj);
  //   // try {
  //   const res = await db.query(...deleteQuery(obj, position))
  //     .then(result => result.rows)
  //     .catch(err => {
  //       return 'Error found here!', err.message;
  //     });
  //   // console.log(res);
  //   // return res;
  //   // } catch(err) {
  //   // console.log('Error with try catch');
  //   // }
  //   return res;
  // }

  static async update(position, condition, by) {
    let obj = this.name;
    obj = obj.replace('Model', 's').toLowerCase();
    // console.log(obj);
    // try {
    const res = await db.query(...updateQuery(obj, position, condition, by))
      .then(result => result.rows)
      .catch(err => {
        return 'Error found here!', err.message;
      });
    // console.log(res);
    // return res;
    // } catch (err) {
    // console.log('Error with try catch');
    // }
    return res;
  }

  
}