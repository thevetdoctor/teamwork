import db from '../db';
import { findQuery, listQuery } from '../db/query';
import 'regenerator-runtime';

export default class BaseModel {
    // constructor() {
    // this.name = name;
    // }

  // static async listAll() {
  //   let obj = this.name;
  //   obj = obj.replace('Model', 's').toLowerCase();
  //   // console.log(obj);
  //   // try {
  //   const res = await db.query(...listQuery(obj))
  //     .then(result => result.rows)
  //     .catch(err => {
  //       return 'Error found here!', err.message;
  //     });
  //   // console.log(res);
  //   // return res;
  //   // } catch (err) {
  //   // console.log('Error with try catch');
  //   // }
  //   return res;
  // }

  static async find(position, order) {
    let obj = this.name;
    obj = obj.replace('Model', 's').toLowerCase();
    // console.log(obj, position, order);
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

  // static async search(position, order) {
  //   let obj = this.name;
  //   obj = obj.replace('Model', 's').toLowerCase();
  //   // console.log(obj, position, order);
  //   // try {
  //   const res = await db.query(...searchQuery(obj, position, order))
  //     .then(result => result.rows)
  //     .catch(err => {
  //       return 'Error found here!', err.message;
  //     });
  //   // console.log('fantastic', res);
  //   // return res;
  //   // } catch(err) {
  //   // console.log('Error with try catch');
  //   // }
  //   return res;
  // }


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

  // static async update(position, condition, by) {
  //   let obj = this.name;
  //   obj = obj.replace('Model', 's').toLowerCase();
  //   // console.log(obj);
  //   // try {
  //   const res = await db.query(...updateQuery(obj, position, condition, by))
  //     .then(result => result.rows)
  //     .catch(err => {
  //       return 'Error found here!', err.message;
  //     });
  //   // console.log(res);
  //   // return res;
  //   // } catch (err) {
  //   // console.log('Error with try catch');
  //   // }
  //   return res;
  // }

  // static async pageSearch(page, perPage = 5, order) {
  //   let obj = this.name;
  //   obj = obj.replace('Model', 's').toLowerCase();
  //   // console.log(obj, position, order);
  //   // try {
  //   const pageNew = page === 0 ? 1 : page;
  //   const res = await db.query(...pageQuery(obj, (pageNew - 1) * perPage, perPage, order))
  //     .then(result => result.rows)
  //     .catch(err => {
  //       return 'Error found here!', err.message;
  //     });
  //   // console.log('fantastic', res);
  //   // return res;
  //   // } catch(err) {
  //   // console.log('Error with try catch');
  //   // }
  //   return res;
  // }
}