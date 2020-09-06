import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import EmployeeModel from '../models/employeeModel';
import missingValue from '../helpers/missingValue';
import response from '../helpers/response';
import 'dotenv/config';


class EmployeeController {
  static async createUser(req, res) {
    const {
      firstName, lastName, email, password, gender, jobRole, department, address,
    } = req.body;

    const employee = new EmployeeModel(firstName, lastName, email, password, gender, jobRole, department, address);

    missingValue.values(res, firstName, lastName, email, password, gender, jobRole, department, address);

    const emailExist = await EmployeeModel.find(`email=${employee.email}`);

    if (emailExist) {
      if (emailExist.indexOf('not') >= 0) return response.values(res, 400, 'Some error found with email');
      if (emailExist.length > 0) return response.values(res, 400, 'Email already used');
    }

    employee.password = bcrypt.hashSync(employee.password, 10);

    const newemployee = await employee.save();

    if (newemployee.indexOf('not') >= 0) response.values(res, 400, 'Some error found with storing data');

    const tokenDetails = {
      id: newemployee[0].userid,
      firstName: newemployee[0].firstname,
      lastName: newemployee[0].lastname,
      email: newemployee[0].email,
      isAdmin: newemployee[0].isadmin,
    };
    const token = jwt.sign({ tokenDetails }, process.env.SECRET, { expiresIn: '2h' });

    return response.values(res, 201, {
      message: 'User account successfully created',
      token,
      userId: newemployee[0].userid,
      user: {
        firstName,
        lastName,
        address,
        department,
        jobrole,
      },
    });
  }


  static async signIn(req, res) {
    const { email, password } = req.body;

    missingValue.values(res, email, password);
    const emailExist = await EmployeeModel.find(`email=${email}`);

    if (emailExist) {
      if (emailExist.indexOf('not') >= 0) return response.values(res, 400, 'Some error found with email');
      if (emailExist.length < 1) return response.values(res, 400, 'User not registered');
    }

    const compared = bcrypt.compareSync(password, emailExist[0].password);
    if (!compared) return response.values(res, 400, 'Password is Invalid');

    const tokenDetails = {
      id: emailExist[0].userid,
      firstName: emailExist[0].firstname,
      lastName: emailExist[0].lastname,
      email: emailExist[0].email,
      isAdmin: emailExist[0].isadmin,
    };
    const token = jwt.sign({ tokenDetails }, process.env.SECRET, { expiresIn: '2h' });
    console.log(emailExist[0].isadmin);
    const {
      firstname, lastname, isadmin, userid, address, department, jobrole,
    } = emailExist[0];

    return response.values(res, 200, {
      token,
      isAdmin: isadmin,
      user: {
        firstname,
        lastname,
        userid,
        address,
        department,
        jobrole,
      },
    });
  }

  static async getUser(req, res) {
    const { email } = req.query;
    console.log(req.query);

    missingValue.values(res, email);
    const emailExist = await EmployeeModel.find(`email=${email}`);

    if (emailExist) {
      if (emailExist.indexOf('not') >= 0) return response.values(res, 400, 'Some error found with email');
      if (emailExist.length < 1) return response.values(res, 400, 'User not found');
    }

    const userInfo = {
      firstName: emailExist[0].firstname,
      lastName: emailExist[0].lastname,
      gender: emailExist[0].gender,
      department: emailExist[0].department,
      jobrole: emailExist[0].jobrole,
      address: emailExist[0].address,
    };

    return response.values(res, 200, { userInfo });
  }

  static async getUsers(req, res) {

    const userList = await EmployeeModel.find();
    if (userList) {
      if (userList.length < 1) return response.values(res, 400, 'UserList is empty');
    }

    const userInfo = userList.map(user => ({
      firstName: user.firstname,
      lastName: user.lastname,
      gender: user.gender,
      department: user.department,
      jobrole: user.jobrole,
      address: user.address,
    }));

    return response.values(res, 200, { userInfo, users: userInfo.length });
  }
}


export default EmployeeController;
