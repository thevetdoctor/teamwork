import express from 'express';
import FeedController from '../controllers/feedController';

const router = express.Router();


router.get('/', FeedController.getFeed);


export default router;