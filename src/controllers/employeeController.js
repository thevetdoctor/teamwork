import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import EmployeeModel from '../models/employeeModel';
import 'dotenv/config';


class EmployeeController {
  static async createUser(req, res) {
    // console.log(req.body);

    const { firstName, lastName, email, password, gender, jobRole, department, address } = req.body;
 
    const employee = new EmployeeModel(firstName, lastName, email, password, gender, jobRole, department, address);

    // console.log(Object.keys(employee).filter(item => employee[item] === undefined));
    const missingValue = Object.keys(employee).filter(item => employee[item] === undefined);

    if (missingValue.length > 0) {
      return res.status(400).json({
        status: 'error',
        error: `${missingValue} not supplied`,
      });
    }
    const emailExist = await EmployeeModel.find(`email=${employee.email}`);

    // console.log('emailExist', emailExist);
    if (emailExist) {
      if (emailExist.indexOf('not') >= 0) return res.status(400).json({ status: 'error', error: 'Some error found with email' });
      if (emailExist.length > 0) return res.status(400).json({ status: 'error', error: 'Email already used' });
    }

    employee.password = bcrypt.hashSync(employee.password, 10);

    const newemployee = await employee.save();
    // console.log('new user', newemployee);
    if (newemployee.indexOf('not') >= 0) {
      return res.status(400).json({ error: 'Some error found with storing data' });
    }
    const tokenDetails = { 
                                id: newemployee[0].userid,
                                firstName: newemployee[0].firstname,
                                lastName: newemployee[0].lastname,
                                email: newemployee[0].email,
                                isadmin: newemployee[0].isadmin,
                              };
    const token = jwt.sign({ tokenDetails }, process.env.SECRET, { expiresIn: '2h' });
    // console.log('token details', tokenDetails);


    return res.status(201).json({
        status: 'success',
        data: {
            message: 'User account successfully created',
            token,
            userId: newemployee[0].userid,
      },
    });
  }


  static async signIn(req, res) {
    const { email, password } = req.body;

    let signinDetails = { email, password };
    const missingValue = Object.keys(signinDetails).filter(item => signinDetails[item] === undefined);
    // console.log('missing value', missingValue);
    if (missingValue.length > 0) {
      return res.status(400).json({
        status: 'error',
        error: `${missingValue} not supplied`,
      });
    }
    const emailExist = await EmployeeModel.find(`email=${email}`);

    // console.log('emailExist', emailExist);
    if (emailExist) {
      if (emailExist.indexOf('not') >= 0) return res.status(400).json({ status: 'error', error: 'Some error found with email' });
      if (emailExist.length < 1) return res.status(400).json({ status: 'error', error: 'User not registered' });
    }

    const compared = bcrypt.compareSync(password, emailExist[0].password);
    if (!compared) {
      return res.status(400).json({ status: 'error', error: 'Password is Invalid' });
    }

    const tokenDetails = { 
                              id: emailExist[0].userid,
                              firstName: emailExist[0].firstname,
                              lastName: emailExist[0].lastname,
                              email: emailExist[0].email,
                              isAdmin: emailExist[0].isadmin,
                            };
    const token = jwt.sign({ tokenDetails }, process.env.SECRET, { expiresIn: '2h' });

    return res.status(200).json({
      status: 'success',
      data: {
        token, 
        userId: emailExist[0].userid,
      },
    });
  }

}


export default EmployeeController;