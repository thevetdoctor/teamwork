import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import EmployeeModel from '../models/employeeModel';
import db from './index';
import tableQuery from './tables';

// console.log(tableQuery);

const migrate = async() => { 
    try {
        const tables = await db.query(tableQuery);
        const access = await EmployeeModel.find('lastname=access')
        if(access.length < 1) {
        const employee = new EmployeeModel('team', 'access', 'teamaccess@teamwork.com', 'teampass01', 'F', 'admin', 'admindept', 'hqtrs', true);
        employee.password = bcrypt.hashSync(employee.password, 10);
        const newemployee = await employee.save();
        }

        return tables; 
    } catch(e) {
        console.log(e); 
    }
};

    migrate().then(result => console.log('Tables created')).catch(e => console.log(e));

export default migrate;