const saveQuery = (obj) => {
    const queryStr = `INSERT INTO ${obj}`;
    return queryStr;
  };
  
  
   
  const findQuery = (obj, position = '', order = '', count = '*') => {
    if (position !== '') {
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
  
    const queryStr = `SELECT ${count} FROM ${obj}`;
    return [queryStr];
  };
  
  
  const listQuery = (obj, count = '*') => {
    const queryStr = `SELECT ${count} FROM ${obj} ORDER BY id DESC`;
    return [queryStr];
  };
  
  
  export { saveQuery, findQuery, listQuery };