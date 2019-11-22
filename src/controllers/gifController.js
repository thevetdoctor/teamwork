import GifModel from '../models/gifModel';
import CommentModel from '../models/commentModel';
import EmployeeModel from '../models/employeeModel';
import cloud from '../helpers/cloudinary';


class GifController {
// create GIFs

static async createGif(req, res) {
    const { title, imageUrl } = req.body;
  //  console.log(JSON.parse(req.body.thing));
   console.log(req.body);
        let authorId = req.body.authorId;

       const newImageUrl = await cloud.uploads(req.body.imageUrl);
                                      // // .then(result => { url, id })
                                      // .then(result => result)
                                      // .catch(e => console.log(e));
      
      console.log('new image url', newImageUrl);
      

    const newGif = new GifModel(authorId, title, imageUrl);

const missingValue = Object.keys(newGif)
                           .filter(item => ((newGif[item] === undefined) || (newGif[item] === '')));
if (missingValue.length > 0) {
      return res.status(400).json({
        status: 'error',  
        error: `${missingValue} not supplied`,
    });
}

    const url = req.protocol + '://' + req.get('host');
    newGif.imageUrl = url + '/images/' + '';
 
    const authorExist = await EmployeeModel.find(`userid=${newGif.authorId}`);
    if (authorExist) {
      if (authorExist.indexOf('not') >= 0) return res.status(400).json({ status: 'error', error: 'Some error found with author' });
      if (authorExist.length < 1) return res.status(400).json({ status: 'error', error: 'Author not found' });
    }

    const gifExist = await GifModel.find(`title=${newGif.title}`);
    if (gifExist) {
      if (gifExist.indexOf('not') >= 0) return res.status(400).json({ status: 'error', error: 'Some error found with GIF' });
      if (gifExist.length > 0) return res.status(400).json({ status: 'error', error: 'GIF already exists' });
    }

    // console.log('new gif', newGif);
  
    const createdGif = await newGif.save();
    if (createdGif.indexOf('not') >= 0) {
      return res.status(400).json({ status: 'error', error: 'Some error found with new GIF' });
    }

    const data = {
        gifId: createdGif[0].gifId,
        message: 'GIF image successfully posted',
        createdOn: createdGif[0].createdon,
        title: createdGif[0].title,
        imageUrl: createdGif[0].imageurl,
    }
    
    return res.status(201).json({
        status: 'success',
        data,
     });
  }
     
  
  // Delete GIFs by ID

  static async deleteGif(req, res) {
    const { gifId } = req.params;
    let authorId = req.body.authorId;

    if (authorId === undefined) {
          return res.status(400).json({
            status: 'error',  
            error: 'authorId not supplied',
        });
    }
      authorId = parseInt(authorId, 10);

    if (isNaN(gifId)) return res.status(400).json({ status: 'error', error: 'gifId must be a number'});
    if (isNaN(authorId)) return res.status(400).json({ status: 'error', error: 'authorId must be a number'});

    const gifExist = await GifModel.findByJoin('employees', `gifs.authorid=employees.userid`, `gifid=${gifId} AND authorid=${authorId}`);
    if (gifExist) {
      if (gifExist.indexOf('not') >= 0) return res.status(400).json({ status: 'error', error: 'Some error found with GIF' });
      if (gifExist.length < 1) return res.status(400).json({ status: 'error', error: 'GIF not found' });
    }
    // console.log('GIF exist', gifExist[0]);
    const gifDeleted = await GifModel.delete(`gifid=${gifId}`);

    return res.status(200).json({
      status: 'success',
      data: {
        message: 'gif post successfully deleted'
      }
    });
  }

// Create comment on gif posts by ID

static async createComment(req, res) {
    const { authorId, comment } = req.body;
    const { gifId } = req.params;
  
        const commentToBeCreated = new CommentModel(authorId, gifId, comment);
        commentToBeCreated.type = 'gif';
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
    
      if (isNaN(gifId)) return res.status(400).json({ status: 'error', error: 'gifId must be a number'});
      if (isNaN(authorId)) return res.status(400).json({ status: 'error', error: 'authorId must be a number'});
  
      const gifExist = await GifModel.findByJoin('employees', `gifs.authorid=employees.userid`, `gifid=${gifId} AND authorid=${authorId}`);
      if (gifExist) {
        if (gifExist.indexOf('not') >= 0) return res.status(400).json({ status: 'error', error: 'Some error found with gif post' });
        if (gifExist.length < 1) return res.status(400).json({ status: 'error', error: 'gif post not found' });
      }
      // console.log('GIF exist', gifExist[0]);

      const commentExist = await CommentModel.findByJoin('gifs', `comments.gifarticleid=gifs.gifid`, `gifs.gifid=${gifId} AND comments.comment='${comment}'`);
      // console.log('comment exist', commentExist);

      if (commentExist) {
        if (commentExist.indexOf('not') >= 0) return res.status(400).json({ status: 'error', error: 'Some error found with exisitng comment' });
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
        gifTitle: gifExist[0].title,
        comment,
      }
      return res.status(201).json({
        data,
      });
  }


  static async getGifById(req, res) {
    const { authorId } = req.body;
    const { gifId } = req.params;

    if (authorId === undefined) {
      return res.status(400).json({
        status: 'error',  
        error: 'authorId not supplied',
      });
    }
    if (isNaN(gifId)) {
      return res.status(400).json({ status: 'error', message: 'Invalid gif post ID' });
    }

    const gifFound = await GifModel.find(`gifid=${gifId}`);
    if (gifFound.length < 1) return res.status(400).json({ status: 'error', message: 'Gif post not found' });

    const commentsByGif = await CommentModel.find(`gifarticleid=${gifId}&type=gif`, 'createdon');
    // let message = 'List of comments';
    // if (commentsByArticle.length < 1) {
    //   message = `No comments for article with ID: ${articleId} in record`;
    // }

    const comments = commentsByGif.map(item => ({
              commentId: item.commentid,
              comment: item.comment,
              authorId: item.authorid
    }));
    const data = {
      id: gifFound[0].gifid,
      createdOn: gifFound[0].createdon,
      title: gifFound[0].title,
      url: gifFound[0].imageurl,
      comments
    };
    return res.status(200).json({
      status: 'success',
      data,
    });
  }

}

export default GifController;