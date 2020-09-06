import express from 'express';
import EmployeeController from '../controllers/employeeController';
import checkAuth from '../checkAuth';
import authUser from '../checkAuth/authUser';
import admin from '../checkAuth/admin';

const router = express.Router();


router.post('/create-user', EmployeeController.createUser);

router.post('/signin', EmployeeController.signIn);

// router.get('/getuser', checkAuth, authUser, EmployeeController.getUser);
router.get('/getuser', EmployeeController.getUser);

router.get('/allAuth', EmployeeController.getUsers);


export default router;
