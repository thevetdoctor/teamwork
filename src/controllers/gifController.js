import GifModel from '../models/gifModel';
import CommentModel from '../models/commentModel';
import EmployeeModel from '../models/employeeModel';
import missingValue from '../helpers/missingValue';
import response from '../helpers/response';
import cloudinary from '../helpers/cloudinary';


class GifController {
// create GIFs

static async createGif(req, res) {
    const { title, imageUrl } = req.body;
    const { id } = req.token;
    let authorId = id;

    const newGif = new GifModel(authorId, title, imageUrl);

    missingValue.values(res, authorId, title, imageUrl);

    const authorExist = await EmployeeModel.find(`userid=${newGif.authorId}`);
    if (authorExist) {
      if (authorExist.indexOf('not') >= 0) return response.values(res, 400, 'Some error found with author');
      if (authorExist.length < 1) return response.values(res, 400, 'Author not found');
    }

    const gifExist = await GifModel.find(`title=${newGif.title}`);
    if (gifExist) {
      if (gifExist.indexOf('not') >= 0) return response.values(res, 400, 'Some error found with GIF');
      if (gifExist.length > 0) return res.status(res, 400, 'GIF already exists');
    }

    let multipleUpload = new Promise(async (resolve, reject) => {
            try {
              await cloudinary.v2.uploader.upload(imageUrl, { folder: 'teamwork/', use_filename: true, 
              unique_filename: false }, (error, result) => {
              if(result){
              resolve(result);
                } else {
                  console.log('error with upload');
                  reject(error)
                }
            })
          } catch(e) {
            return e;
          }

      })
      .then((result) => result)
      .catch((error) => console.log('error found in catch'))
  
      let upload = await multipleUpload;

      if (upload) {
        newGif.imageUrl = upload.url;
      } else {
        return response.values(res, 400, { message: 'Error with getting URL'});
      }


    const createdGif = await newGif.save();
    if (createdGif.indexOf('not') >= 0) return response.values(res, 400, 'Some error found with new GIF');

    const data = {
        gifId: createdGif[0].gifid,
        message: 'GIF image successfully posted',
        createdOn: createdGif[0].createdon,
        title: createdGif[0].title,
        imageUrl: createdGif[0].imageurl,
    }
    
    return response.values(res, 201, data);
  }
  
  // Delete GIFs by ID

  static async deleteGif(req, res) {
    const { gifId } = req.params;
    const { id } = req.token;
    let authorId = id;

    missingValue.values(res, authorId);

      authorId = parseInt(authorId, 10);

    if (isNaN(gifId)) return response.values(res, 400, 'gifId must be a number');
    if (isNaN(authorId)) return response.values(res, 400, 'authorId must be a number');

    const gifExist = await GifModel.findByJoin('employees', `gifs.authorid=employees.userid`, `gifid=${gifId} AND authorid=${authorId}`);
    if (gifExist) {
      if (gifExist.indexOf('not') >= 0) return response.values(res, 400, 'Some error found with GIF');
      if (gifExist.length < 1) return response.values(res, 400, 'GIF not found');
    }
 
    const gifDeleted = await GifModel.delete(`gifid=${gifId}`);

    return response.values(res, 200, { message: 'gif post successfully deleted' });
  }

// Create comment on gif posts by ID

static async createComment(req, res) {
    const { comment } = req.body;
    const { id } = req.token;
    const { gifId } = req.params;
    const authorId = id;
  
        const commentToBeCreated = new CommentModel(authorId, gifId, comment);
        commentToBeCreated.type = 'gif';
               
        missingValue.values(res, authorId, gifId, comment);
    
      if (isNaN(gifId)) return response.values(res, 400, 'gifId must be a number');
      if (isNaN(authorId)) return response.values(res, 400, 'authorId must be a number');
  
      const gifExist = await GifModel.findByJoin('employees', `gifs.authorid=employees.userid`, `gifid=${gifId} AND authorid=${authorId}`);
      if (gifExist) {
        if (gifExist.indexOf('not') >= 0) return response.values(res, 400, 'Some error found with gif post');
        if (gifExist.length < 1) return response.values(res, 400, 'gif post not found');
      }
     
      const commentExist = await CommentModel.findByJoin('gifs', `comments.gifarticleid=gifs.gifid`, `gifs.gifid=${gifId} AND comments.comment='${comment}'`);
     
      if (commentExist) {
        if (commentExist.indexOf('not') >= 0) return response.values(res, 400, 'Some error found with exisitng comment');
        if (commentExist.length > 0) return response.values(res,400, 'Same comment already given');
      }

      const newComment = await commentToBeCreated.save();
      if (newComment.indexOf('not') >= 0) return response.values(res, 400, 'Some error found with new comment');
  
      const data = {
        message: 'Comment successfully created',
        createdOn: newComment[0].createdon,
        gifTitle: gifExist[0].title,
        comment,
      }
      return response.values(res, 201, data);
  }


  static async getGifById(req, res) {
    const { id } = req.token;
    const authorId = id;
    const { gifId } = req.params;

    missingValue.values(res, authorId);

    if (isNaN(gifId)) return response.values(res, 400, 'Invalid gif post ID');

    const gifFound = await GifModel.find(`gifid=${gifId}`);
    if (gifFound.length < 1) return response.values(res, 400, 'Gif post not found');

    const commentsByGif = await CommentModel.find(`gifarticleid=${gifId}&type=gif`, 'createdon');
    
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
    return response.values(res, 200, data);
  }

}

export default GifController;