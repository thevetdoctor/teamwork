import express from 'express';
import ArticleController from '../controllers/articleController';
import checkAuth from '../checkAuth';
import authUser from '../checkAuth/authUser';

const router = express.Router();


router.post('/', checkAuth, authUser, ArticleController.createArticle);

router.patch('/:articleId', checkAuth, authUser, ArticleController.updateArticle);

router.delete('/:articleId', checkAuth, authUser, ArticleController.deleteArticle);

router.post('/:articleId/comment', checkAuth, authUser, ArticleController.createComment);

// router.get('/', checkAuth, authUser, ArticleController.getArticles);

router.get('/:articleId', checkAuth, authUser, ArticleController.getArticleById);

router.get('/category?searchQuery', checkAuth, authUser, ArticleController.getArticleById);


export default router;
