import express from 'express';
import FeedController from '../controllers/feedController';
import checkAuth from '../checkAuth';
import admin from '../checkAuth/admin';
import authUser from '../checkAuth/authUser';

const router = express.Router();


// router.get('/', checkAuth, authUser, FeedController.getFeed);
router.get('/', FeedController.getFeed);

router.patch('/like', checkAuth, authUser, FeedController.likeEntity);

router.patch('/flag', checkAuth, authUser, FeedController.flagEntity);

router.delete('/', checkAuth, authUser, admin, FeedController.deleteFlaggedEntity);


export default router;
