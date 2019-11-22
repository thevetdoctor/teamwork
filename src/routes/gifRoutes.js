import express from 'express';
import GifController from '../controllers/gifController';
import multer from '../helpers/multerConfig';

const router = express.Router();

router.post('/', multer, GifController.createGif);
// router.post('/', GifController.createGif);

router.delete('/:gifId', GifController.deleteGif);

router.post('/:gifId/comment', GifController.createComment);

router.get('/:gifId', GifController.getGifById);



export default router;