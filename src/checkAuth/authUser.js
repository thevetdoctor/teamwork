import EmployeeModel from '../models/employeeModel';
import response from '../helpers/response';

const authUser = async(req, res, next) => {
    if(!req.token) return response.values(res, 403, 'No credentials');

    const userIsRegistered = await EmployeeModel.find(`userid=${req.token.id}`);
    if(!userIsRegistered) return response.values(res, 403, 'User not registered');
    console.log('Permission granted');
    next();
  };
   
  
  export default authUser;
  