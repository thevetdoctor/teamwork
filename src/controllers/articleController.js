import ArticleModel from '../models/articleModel';
import EmployeeModel from '../models/employeeModel';


class ArticleController {
    static async createArticle(req, res) {
        const { title, article } = req.body;
        console.log(req.body);
        const authorId = parseInt(req.body.authorId, 10);
    
        const newArticle = new ArticleModel(authorId, title, article);
    
        // console.log(newArticle, ArticleModel);

    const missingValue = Object.keys(newArticle)
                               .filter(item => ((newArticle[item] === undefined) && (isNaN(newArticle[item]))));
    console.log(missingValue);
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
    

      
  static async updateArticle(req, res) {
    const { title, article } = req.body;
    let { authorId } = req.body;
    // authorId = parseInt(authorId, 10);
    const articleId = parseInt(req.params.articleId, 10);
    // console.log(authorId, req.body, req.params);

    const articleToBeUpdated = new ArticleModel(authorId, title, article);
    console.log(articleToBeUpdated);

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

    const articleExist = await ArticleModel.findByJoinEmployees(`articles.authorid=employees.userid`, `articleid=${articleId} AND authorid=${authorId}`);
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

    const articleExist = await ArticleModel.findByJoinEmployees(`articles.authorid=employees.userid`, `articleid=${articleId} AND authorid=${authorId}`);
    if (articleExist) {
      if (articleExist.indexOf('not') >= 0) return res.status(400).json({ status: 'error', error: 'Some error found with article' });
      if (articleExist.length < 1) return res.status(400).json({ status: 'error', error: 'Article not found' });
    }
    console.log('article exist', articleExist[0]);
    const articleDeleted = await ArticleModel.delete(`articleid=${articleId}`);

    return res.status(200).json({
      status: 'success',
      data: {
        message: 'Article successfully deleted'
      }
    });
  }

} 


export default ArticleController;