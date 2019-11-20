import BaseModel from './index';
import db from '../db';
import { saveQuery } from '../db/query';

class GifModel extends BaseModel {
  constructor(authorId, title, imageUrl) {
    super();
    this.authorId = authorId;
    this.title = title;
    this.imageUrl = imageUrl;
  }


  async save() {
    let obj = GifModel.name;
    obj = obj.replace('Model', 's').toLowerCase();
    // console.log(obj);
    const objKeys = Object.keys(this);
    const objValues = Object.values(this);
    const valuesCount = [];
    for (let i = 1; i <= objKeys.length; i++) {
      valuesCount.push(`$${i}`);
    }
    // console.log(objKeys, objValues, valuesCount);

    const queryStr = `${saveQuery(obj)} (${objKeys}) values (${valuesCount}) RETURNING *`;
    // console.log(queryStr);
    if (objValues === undefined) {
      console.log('Values not supplied');
      return;
    }
    // console.log(queryStr, objValues);

    const res = await db.query(queryStr, objValues)
      .then(result => result.rows)
      .catch(err => ('Error found here!', err.message));
    // console.log(res[0]);
    return res;
  }
}


export default GifModel;