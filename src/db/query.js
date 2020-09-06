/* eslint-disable object-curly-newline */
const saveQuery = (obj) => {
  const queryStr = `INSERT INTO ${obj}`;
  return queryStr;
};


const updateQuery = (obj, position, condition, by) => {
  const splitPosition = position.split('&');
  const split1 = splitPosition[0].split('=');
  const split2 = splitPosition[1].split('=');
  const set = `${split1[0]}=$1, ${split2[0]}=$2`;


  const splitCondition = condition.split('=');
  const where = `${splitCondition[0]}=$3`;

  const valueOne = split1[1];
  const valueTwo = split2[1];
  const valueThree = splitCondition[1];

  const str = [`UPDATE ${obj} SET ${set}, lastUpdated=now() WHERE ${where} RETURNING *`, [valueOne, valueTwo, valueThree]];
  // console.log(str);
  const queryStr = [...str];
  return queryStr;
};


const findQuery = (obj, position = '', order = '', count = '*') => {
  if (position !== '') {
    if (position.includes('&')) {
      // console.log(position);

      const positionTwo = position.split('&');
      const split1 = positionTwo[0].split('=');
      const split2 = positionTwo[1].split('=');
      const where = `${split1[0]}=$1 AND ${split2[0]}=$2`;
      const values1 = split1[1];
      const values2 = split2[1];
      // console.log(split1, split2);

      let str = '';
      if (order !== '') {
        str = [`SELECT ${count} FROM ${obj} WHERE ${where} ORDER BY ${order} DESC`, [values1, values2]];
      } else {
        str = [`SELECT ${count} FROM ${obj} WHERE ${where}`, [values]];
      }
      // console.log(str, order);
      const queryStr = [...str];
      return queryStr;
    } else {
      const split = position.split('=');
      const where = `${split[0]}=$1`;
      const values = split[0] !== 'id' ? split[1] : parseInt(split[1], 10);
      let str = '';
      if (order !== '') {
        str = [`SELECT ${count} FROM ${obj} WHERE ${where} ORDER BY ${order} DESC`, [values]];
      } else {
        str = [`SELECT ${count} FROM ${obj} WHERE ${where}`, [values]];
      }
      // console.log(str, order);
      const queryStr = [...str];
      return queryStr;
    }
  }

  const queryStr = `SELECT ${count} FROM ${obj}`;
  return [queryStr];
};


const searchQuery = (obj, position = '', order = '', count = '*') => {
  if (position !== '') {
    const split = position.split('=');
    // split[1] = (split[0] !== 'id') ? split[1] : parseInt(split[1], 10);
    // console.log(typeof split[0], typeof split[1]);
    const where = `${split[0]} ILIKE '%${split[1]}%'`;
    let str = '';
    if (order !== '') {
      str = [`SELECT ${count} FROM ${obj} WHERE ${where} ORDER BY ${order} DESC`];
    } else {
      str = [`SELECT ${count} FROM ${obj} WHERE ${where}`];
    }
    // console.log(str, order);
    const queryStr = [...str];
    return queryStr;
  }

  const queryStr = `SELECT ${count} FROM ${obj}`;
  return [queryStr];
};


const listQuery = (obj, count = '*') => {
  const queryStr = `SELECT ${count} FROM ${obj} ORDER BY id DESC`;
  return [queryStr];
};


const pageQuery = (obj, page = '', perPage = '', order = '', count = '*') => {
  const queryStr = `SELECT ${count} FROM ${obj} ORDER BY id ${order} LIMIT ${perPage} OFFSET ${page}`;
  // console.log(queryStr);
  return [queryStr];
};


const deleteQuery = (obj, position) => {
  const split = position.split('=');
  const where = `${split[0]}=$1`;
  const values = split[0] !== 'id' ? split[1] : parseInt(split[1], 10);
  const str = [`DELETE FROM ${obj} WHERE ${where} RETURNING *`, [values]];
  // console.log(str);
  const queryStr = [...str];
  return queryStr;
};

export { updateQuery, saveQuery, findQuery, searchQuery, listQuery, pageQuery, deleteQuery };
