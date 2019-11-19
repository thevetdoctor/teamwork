import express from 'express';
import ArticleController from '../controllers/articleController';

const router = express.Router();


router.post('/', ArticleController.createArticle);

router.patch('/:articleId', ArticleController.updateArticle);

router.delete('/:articleId', ArticleController.deleteArticle);
 

export default router;