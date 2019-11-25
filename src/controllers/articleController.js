import ArticleModel from '../models/articleModel';
import EmployeeModel from '../models/employeeModel';
import CommentModel from '../models/commentModel';
import missingValue from '../helpers/missingValue';
import response from '../helpers/response';


class ArticleController {
          
          // create articles

    static async createArticle(req, res) {
        const { title, article } = req.body;
        const { id } = req.token;
        const authorId = parseInt(id, 10);
    
        const newArticle = new ArticleModel(authorId, title, article);
    
        missingValue.values(res, authorId, title, article);
     
        const authorExist = await EmployeeModel.find(`userid=${newArticle.authorId}`);
        if (authorExist) {
          if (authorExist.indexOf('not') >= 0) return response.values(res, 400, 'Some error found with author');
          if (authorExist.length < 1) return response.values(res, 400, 'Author not found');
        }
    
        const articleExist = await ArticleModel.find(`title=${newArticle.title}`);
        if (articleExist) {
          if (articleExist.indexOf('not') >= 0) return response.values(res, 400, 'Some error found with article');
          if (articleExist.length > 0) return response.values(res, 400, 'Article already exists' );
        }
    
      
        const createdArticle = await newArticle.save();
        if (createdArticle.indexOf('not') >= 0) return response.values(res, 400, 'Some error found with new article');

        const data = {
          message: 'Article successfully posted',
          articleId: createdArticle[0].articleid,
          createdOn: createdArticle[0].createdon,
          title: createdArticle[0].title,
        }
        
        return response.values(res, 201, data);
      }
    
      // Update articles by ID

  static async updateArticle(req, res) {
    const { title, article } = req.body;
    const { id } = req.token;
    let authorId = id;
    
    const articleId = parseInt(req.params.articleId, 10);
    
    missingValue.values(res, authorId, title, article);   

    if (isNaN(articleId)) return response.values(res, 400, 'ArticleId must be a number');
    if (isNaN(authorId)) return response.values(res, 400, 'AuthorId must be a number');

    const articleExist = await ArticleModel.findByJoin('employees', `articles.authorid=employees.userid`, `articleid=${articleId} AND authorid=${authorId}`);
    if (articleExist) {
      if (articleExist.indexOf('not') >= 0) return response.values(res, 400, 'Some error found with article');
      if (articleExist.length < 1) return response.values(res, 400, 'Article not found');
    }

    const updatedArticle = await ArticleModel.update(`title=${title}&article=${article}`, `articleid=${articleId}`);
    if (updatedArticle.indexOf('not') >= 0) return response.values(res, 400, 'Some error found with updated answer' );

    const data = {
      message: 'Article successfully updated',
      title: updatedArticle[0].title,
      article: updatedArticle[0].article,
      lastUpdated: updatedArticle[0].lastupdated,
    }
    return response.values(res, 200, data);
  }

  // Delete articles by ID

  static async deleteArticle(req, res) {
    const { articleId } = req.params;
    const { id } = req.token;
    let authorId = id;

    missingValue.values(res, authorId);

      authorId = parseInt(authorId, 10);

    if (isNaN(articleId)) return response.values(res, 400, 'ArticleId must be a number');
    if (isNaN(authorId)) return response.values(res, 400, 'AuthorId must be a number');

    const articleExist = await ArticleModel.findByJoin('employees', `articles.authorid=employees.userid`, `articleid=${articleId} AND authorid=${authorId}`);
    console.log(articleExist);
    
    if (articleExist.length < 0) {
      if (articleExist.indexOf('not') >= 0) return response.values(res, 400, 'Some error found with article');
      if (articleExist.length < 1) return response.values(res, 400, 'Article not found');
    }

    const articleDeleted = await ArticleModel.delete(`articleid=${articleId}`);

    return response.values(res, 200, { message: 'Article successfully deleted' });
  }


  // Create comment on articles

  static async createComment(req, res) {
    const { id } = req.token;
    const { comment } = req.body;
    const { articleId } = req.params;
    const authorId = id;
  
        const commentToBeCreated = new CommentModel(authorId, articleId, comment);
        
        missingValue.values(res, authorId, articleId, comment);
    
      if (isNaN(articleId)) return response.values(res, 400, 'ArticleId must be a number');
      if (isNaN(authorId)) return response.values(res, 400, 'AuthorId must be a number');
  
      const articleExist = await ArticleModel.findByJoin('employees', `articles.authorid=employees.userid`, `articleid=${articleId} AND authorid=${authorId}`);
      if (articleExist) {
        if (articleExist.indexOf('not') >= 0) return response.values(res, 400, 'Some error found with article');
        if (articleExist.length < 1) return response.values(res, 400, 'Article not found');
      }

      const commentExist = await CommentModel.findByJoin('articles', `comments.gifarticleid=articles.articleid`, `articles.articleid=${articleId} AND comments.comment='${comment}'`);

      if (commentExist) {
        if (commentExist.indexOf('not') >= 0) return response.values(res, 400, 'Some error found');
        if (commentExist.length > 0) return response.values(res, 400, 'Same comment already given');
      }

      const newComment = await commentToBeCreated.save();
      if (newComment.indexOf('not') >= 0) return response.values(res, 400, 'Some error found with new comment');
      
      const data = {
        message: 'Comment successfully created',
        createdOn: newComment[0].createdon,
        articleTitle: articleExist[0].title,
        article: articleExist[0].article,
        comment,
      }
      return response.values(res, 201, data);
  }


  static async getArticleById(req, res) {
    const { id } = req.token;
    const { articleId } = req.params;

    const authorId = id;
  
    missingValue.values(res, authorId);    

      if (articleId === 'category') {
      
      const { searchQuery } = req.query;
     
      missingValue.values(res, searchQuery);

      const searchResult = await ArticleModel.search(`article=${searchQuery}`);
   
      return response.values(res, 200, searchResult);
  } else {
        if (isNaN(articleId)) return response.values(res, 400, 'Invalid article ID');
        }

        const articleFound = await ArticleModel.find(`articleid=${articleId}`);
        if (articleFound.length < 1) return response.values(res, 400, 'Article not found');

        const commentsByArticle = await CommentModel.find(`gifarticleid=${articleId}&type=article`, 'createdon');
      
        const comments = commentsByArticle.map(item => ({
                  commentId: item.commentid,
                  comment: item.comment,
                  authorId: item.authorid
        }));
        const data = {
          id: articleFound[0].articleid,
          createdOn: articleFound[0].createdon,
          title: articleFound[0].title,
          article: articleFound[0].article,
          comments
        };
        return response.values(res, 200, data);
  }
  
} 


export default ArticleController;