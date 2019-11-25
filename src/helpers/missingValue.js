import response from '../helpers/response';

exports.values = (res, ...args) => { 
    const argumentsObj = { args };

    const missingValue = Object.keys(argumentsObj).filter(item => ((argumentsObj[item] === undefined) || (argumentsObj[item] === '')));
    // console.log('missing value(s)', missingValue, args);
    if (missingValue.length < 0) return response.values(res, 400, `${missingValue} not supplied`);
}