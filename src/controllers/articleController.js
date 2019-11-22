import ArticleModel from '../models/articleModel';
import EmployeeModel from '../models/employeeModel';
import CommentModel from '../models/commentModel';


class ArticleController {
          
          // create articles

    static async createArticle(req, res) {
        const { title, article } = req.body;
        // console.log(req.body);
        const authorId = parseInt(req.body.authorId, 10);
    
        const newArticle = new ArticleModel(authorId, title, article);
    
        // console.log(newArticle, ArticleModel);

    const missingValue = Object.keys(newArticle)
                               .filter(item => ((newArticle[item] === undefined) || (newArticle[item] === '')));
    // console.log(missingValue);
    if (missingValue.length > 0) {
          return res.status(400).json({
            status: 'error',  
            error: `${missingValue} not supplied`,
        });
    }
     
        const authorExist = await EmployeeModel.find(`userid=${newArticle.authorId}`);
        if (authorExist) {
          if (authorExist.indexOf('not') >= 0) return res.status(400).json({ status: 'error', error: 'Some error found with author' });
          if (authorExist.length < 1) return res.status(400).json({ status: 'error', error: 'Author not found' });
        }
    
        const articleExist = await ArticleModel.find(`title=${newArticle.title}`);
        // console.log('article exist', articleExist);
        if (articleExist) {
          if (articleExist.indexOf('not') >= 0) return res.status(400).json({ status: 'error', error: 'Some error found with article' });
          if (articleExist.length > 0) return res.status(400).json({ status: 'error', error: 'Article already exists' });
        }
    
      
        const createdArticle = await newArticle.save();
        if (createdArticle.indexOf('not') >= 0) {
          return res.status(400).json({ status: 'error', error: 'Some error found with new article' });
        }

        const data = {
          message: 'Article successfully posted',
          articleId: createdArticle[0].articleid,
          createdOn: createdArticle[0].createdon,
          title: createdArticle[0].title,
        }
        
        return res.status(201).json({
            status: 'success',
            data,
         });
      }
    

      // Update articles by ID

  static async updateArticle(req, res) {
    const { title, article } = req.body;
    let { authorId } = req.body;
    // authorId = parseInt(authorId, 10);
    const articleId = parseInt(req.params.articleId, 10);
    // console.log(authorId, req.body, req.params);

    const articleToBeUpdated = new ArticleModel(authorId, title, article);
    // console.log(articleToBeUpdated);

    const missingValue = Object.keys(articleToBeUpdated)
                              .filter(item => ((articleToBeUpdated[item] === undefined) || articleToBeUpdated[item] === ''));
    // console.log('missing value', missingValue);

    if (isNaN(articleId)) return res.status(400).json({ status: 'error', error: 'ArticleId must be a number'});
    if (isNaN(authorId)) return res.status(400).json({ status: 'error', error: 'AuthorId must be a number'});

    if (missingValue.length > 0) {
          return res.status(400).json({
            status: 'error',  
            error: `${missingValue} not supplied`,
        });
    }

    const articleExist = await ArticleModel.findByJoin('employees', `articles.authorid=employees.userid`, `articleid=${articleId} AND authorid=${authorId}`);
    if (articleExist) {
      if (articleExist.indexOf('not') >= 0) return res.status(400).json({ status: 'error', error: 'Some error found with article' });
      if (articleExist.length < 1) return res.status(400).json({ status: 'error', error: 'Article not found' });
    }

    const updatedArticle = await ArticleModel.update(`title=${title}&article=${article}`, `articleid=${articleId}`);
    if (updatedArticle.indexOf('not') >= 0) {
      return res.status(400).json({ error: 'Some error found with updated answer' });
    }

    const data = {
      message: 'Article successfully updated',
      title: updatedArticle[0].title,
      article: updatedArticle[0].article,
      lastUpdated: updatedArticle[0].lastupdated,
    }
    return res.status(200).json({
      status: 'success',
      data,
    });
  }


  // Delete articles by ID

  static async deleteArticle(req, res) {
    const { articleId } = req.params;
    let authorId = req.body.authorId;

    if (authorId === undefined) {
          return res.status(400).json({
            status: 'error',  
            error: 'authorId not supplied',
        });
    }
      authorId = parseInt(authorId, 10);

    if (isNaN(articleId)) return res.status(400).json({ status: 'error', error: 'ArticleId must be a number'});
    if (isNaN(authorId)) return res.status(400).json({ status: 'error', error: 'AuthorId must be a number'});

    const articleExist = await ArticleModel.findByJoin('employees', `articles.authorid=employees.userid`, `articleid=${articleId} AND authorid=${authorId}`);
    if (articleExist) {
      if (articleExist.indexOf('not') >= 0) return res.status(400).json({ status: 'error', error: 'Some error found with article' });
      if (articleExist.length < 1) return res.status(400).json({ status: 'error', error: 'Article not found' });
    }
    // console.log('article exist', articleExist[0]);
    const articleDeleted = await ArticleModel.delete(`articleid=${articleId}`);

    return res.status(200).json({
      status: 'success',
      data: {
        message: 'Article successfully deleted'
      }
    });
  }


  // Create comment on articles

  static async createComment(req, res) {
    const { authorId, comment } = req.body;
    const { articleId } = req.params;
  
        const commentToBeCreated = new CommentModel(authorId, articleId, comment);
        // console.log(commentToBeCreated);
        
        const missingValue = Object.keys(commentToBeCreated)
                                  .filter(item => ((commentToBeCreated[item] === undefined) || (commentToBeCreated[item] === '')));
        // console.log(missingValue);
        if (missingValue.length > 0) {
              return res.status(400).json({
                status: 'error',  
                error: `${missingValue} not supplied`,
            });
        }
    
      if (isNaN(articleId)) return res.status(400).json({ status: 'error', error: 'ArticleId must be a number'});
      if (isNaN(authorId)) return res.status(400).json({ status: 'error', error: 'AuthorId must be a number'});
  
      const articleExist = await ArticleModel.findByJoin('employees', `articles.authorid=employees.userid`, `articleid=${articleId} AND authorid=${authorId}`);
      if (articleExist) {
        if (articleExist.indexOf('not') >= 0) return res.status(400).json({ status: 'error', error: 'Some error found with article' });
        if (articleExist.length < 1) return res.status(400).json({ status: 'error', error: 'Article not found' });
      }
      // console.log('article exist', articleExist[0]);

      const commentExist = await CommentModel.findByJoin('articles', `comments.gifarticleid=articles.articleid`, `articles.articleid=${articleId} AND comments.comment='${comment}'`);
      // console.log('comment exist', commentExist);

      if (commentExist) {
        if (commentExist.indexOf('not') >= 0) return res.status(400).json({ status: 'error', error: 'Some error found' });
        if (commentExist.length > 0) return res.status(400).json({ status: 'error', error: 'Same comment already given' });
      }

      const newComment = await commentToBeCreated.save();
      if (newComment.indexOf('not') >= 0) {
        return res.status(400).json({ error: 'Some error found with new comment' });
      }
      // console.log(newComment[0]);
      
      const data = {
        message: 'Comment successfully created',
        createdOn: newComment[0].createdon,
        articleTitle: articleExist[0].title,
        article: articleExist[0].article,
        comment,
      }
      return res.status(201).json({
        data,
      });
  }


  static async getArticleById(req, res) {
    const { authorId } = req.body;
    const { articleId } = req.params;

    // if (authorId === undefined) {
    //   return res.status(400).json({
    //     status: 'error',  
    //     error: 'authorId not supplied',
    //   });
    // }
    

    console.log(articleId, req.params, req.query);
    const regExp = 'category';
    console.log(regExp.includes(articleId));
    // if (regExp.includes(articleId)) {
    //   return res.status(400).json({
    //       status: 'error',
    //       error: 'Parameter should be \'category\''
    //   });
    // }
  if (articleId === 'category') {
      
      const { searchQuery } = req.query;
      console.log('search query', searchQuery);

      if (searchQuery === undefined) {
        return res.status(400).json({
          status: 'error',  
          error: 'search query not supplied',
        });
      }
      const searchResult = await ArticleModel.search(`article=${searchQuery}`);
      console.log('search result', searchResult);

      return res.status(200).json({
        status: 'success',
        data: searchResult,
      });
  } else {
        if (isNaN(articleId)) {
          return res.status(400).json({ status: 'error', message: 'Invalid article ID' });
        }

        const articleFound = await ArticleModel.find(`articleid=${articleId}`);
        if (articleFound.length < 1) return res.status(400).json({ status: 'error', message: 'Article not found' });

        const commentsByArticle = await CommentModel.find(`gifarticleid=${articleId}&type=article`, 'createdon');
        // let message = 'List of comments';
        // if (commentsByArticle.length < 1) {
        //   message = `No comments for article with ID: ${articleId} in record`;
        // }

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
        return res.status(200).json({
          status: 'success',
          data,
        });
    }
  }

} 


export default ArticleController;