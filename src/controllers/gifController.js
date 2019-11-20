import GifModel from '../models/gifModel';
import CommentModel from '../models/commentModel';
// import EmployeeModel from '../models/employeeModel';


class GifController {
// create GIFs

// static async createGif(req, res) {
//     const { title, imageUrl } = req.body;
//     // const authorId = parseInt(req.body.authorId, 10);
//     let authorId = req.body.authorId;

//     const newGif = new GifModel(authorId, title, imageUrl);
//     // console.log(newGif);

// const missingValue = Object.keys(newGif)
//                            .filter(item => ((newGif[item] === undefined) || (newGif[item] === '')));
// // console.log(missingValue);
// if (missingValue.length > 0) {
//       return res.status(400).json({
//         status: 'error',  
//         error: `${missingValue} not supplied`,
//     });
// }
 
//     const authorExist = await EmployeeModel.find(`userid=${newGif.authorId}`);
//     if (authorExist) {
//       if (authorExist.indexOf('not') >= 0) return res.status(400).json({ status: 'error', error: 'Some error found with author' });
//       if (authorExist.length < 1) return res.status(400).json({ status: 'error', error: 'Author not found' });
//     }

//     const gifExist = await GifModel.find(`title=${newGif.title}`);
//     // console.log('gif exist', gifExist);
//     if (gifExist) {
//       if (gifExist.indexOf('not') >= 0) return res.status(400).json({ status: 'error', error: 'Some error found with GIF' });
//       if (gifExist.length > 0) return res.status(400).json({ status: 'error', error: 'GIF already exists' });
//     }

  
//     const createdGif = await newGif.save();
//     if (createdGif.indexOf('not') >= 0) {
//       return res.status(400).json({ status: 'error', error: 'Some error found with new GIF' });
//     }

//     const data = {
//         gifId: createdGif[0].gifId,
//         message: 'GIF image successfully posted',
//         createdOn: createdGif[0].createdon,
//         title: createdGif[0].title,
//         imageUrl: createdGif[0].imageurl,
//     }
    
//     return res.status(201).json({
//         status: 'success',
//         data,
//      });
//   }
     
  
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
      console.log(newComment[0]);

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

}

export default GifController;