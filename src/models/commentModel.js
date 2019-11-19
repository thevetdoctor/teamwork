import BaseModel from './index';
import db from '../db';
import { saveQuery } from '../db/query';


class CommentModel extends BaseModel {
  constructor(authorId, articleId, comment) {
    super();
    this.authorId = authorId;
    this.articleId = articleId;
    this.comment = comment;
  }

  async save() {
    let obj = CommentModel.name;
    obj = obj.replace('Model', 's').toLowerCase();
    // console.log(obj);
    const objKeys = Object.keys(this);
    const objValues = Object.values(this);
    let valuesCount = [];
    for (let i = 1; i <= objKeys.length; i++) {
      valuesCount.push(`$${i}`);
    }
    // console.log(objKeys, objValues, valuesCount);

    const queryStr = `${saveQuery(obj)} (${objKeys}) values (${valuesCount}) RETURNING *`;
    if (objValues === undefined) {
      console.log('Values not supplied');
      return;
    }

    const res = await db.query(queryStr, objValues)
      .then(result => result.rows)
      .catch(err => {
        return 'Error found here!', err.message;
      });
    return res;
  }
}


export default CommentModel;
