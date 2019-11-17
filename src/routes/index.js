import express from 'express';
import TestController from '../controllers';

const router = express.Router();

router.get('/test', TestController.test);

router.get('/', (req, res, next) => {
    
    res.send('<div style=\'text-align: center;\'><h1>Welcome to Teamwork</h1><h3>... where teams actually WORK!</h3></div>');
});

export default router;