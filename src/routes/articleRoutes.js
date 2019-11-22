import express from 'express';
import ArticleController from '../controllers/articleController';

const router = express.Router();


router.post('/', ArticleController.createArticle);

router.patch('/:articleId', ArticleController.updateArticle);

router.delete('/:articleId', ArticleController.deleteArticle);

router.post('/:articleId/comment', ArticleController.createComment);

router.get('/:articleId', ArticleController.getArticleById);

router.get('/category?searchQuery', ArticleController.getArticleById);
 

export default router;