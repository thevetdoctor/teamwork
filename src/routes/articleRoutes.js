import express from 'express';
import ArticleController from '../controllers/articleController';

const router = express.Router();


router.post('/', ArticleController.createArticle);


export default router;