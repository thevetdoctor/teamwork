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
    
} 


export default ArticleController;