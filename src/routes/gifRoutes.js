import express from 'express';
import GifController from '../controllers/gifController';

const router = express.Router();


// router.post('/', GifController.createGif);

router.delete('/:gifId', GifController.deleteGif);

router.post('/:gifId/comment', GifController.createComment);


export default router;