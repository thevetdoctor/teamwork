import express from 'express';
import EmployeeController from '../controllers/employeeController';
import checkAuth from '../checkAuth';
import authUser from '../checkAuth/authUser';
import admin from '../checkAuth/admin';

const router = express.Router();


router.post('/create-user', checkAuth, authUser, admin, EmployeeController.createUser);

router.post('/signin', EmployeeController.signIn);


export default router;