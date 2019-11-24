import express from 'express';
import FeedController from '../controllers/feedController';

const router = express.Router();


router.patch('/like', FeedController.likeEntity);

router.patch('/flag', FeedController.flagEntity);

router.get('/', FeedController.getFeed);

router.delete('/', FeedController.deleteFlaggedEntity);


export default router;