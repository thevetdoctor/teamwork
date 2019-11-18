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
        error: `${missingValue} not supplied`
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
    console.log('new user', newemployee);
    if (newemployee.indexOf('not') >= 0) {
      return res.status(400).json({ error: 'Some error found with storing data' });
    }
    console.log('displayed employee', displayedEmployee);
    const displayedEmployee = { 
                                id: newemployee[0].userid,
                                name: newemployee[0].firstName,
                                email: newemployee[0].email,
                              };
    const token = jwt.sign({ displayedEmployee }, process.env.SECRET, { expiresIn: '2h' });

    return res.status(201).json({
        status: 'success',
        data: {
            message: 'User account successfully created',
            token,
            userId: newemployee[0].userid,
      },
    });
  }


  
}


export default EmployeeController;