import express from 'express';
import GifController from '../controllers/gifController';
import multer from '../helpers/multerConfig';
import checkAuth from '../checkAuth';
import authUser from '../checkAuth/authUser';

const router = express.Router();

// router.post('/', multer, GifController.createGif);
router.post('/', checkAuth, authUser, GifController.createGif);

router.delete('/:gifId', checkAuth, authUser, GifController.deleteGif);

router.post('/:gifId/comment', checkAuth, authUser, GifController.createComment);

router.get('/:gifId', checkAuth, authUser, GifController.getGifById);



export default router;