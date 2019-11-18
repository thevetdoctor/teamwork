import express from 'express';
import EmployeeController from '../controllers/employeeController';

const router = express.Router();


router.post('/create-user', EmployeeController.createUser);

router.post('/signin', EmployeeController.signIn);


export default router;