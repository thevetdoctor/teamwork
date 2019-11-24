import db from '../db';

class FeedController {
        
    // get feed of articles & gif posts

    static async getFeed(req, res) {
        const { authorId } = req.body;
        
        if (authorId === undefined) {
            return res.status(400).json({
              status: 'error',  
              error: 'authorId not supplied',
            });
          }
        const gifarticles = await db.query('SELECT * FROM articles UNION SELECT  * FROM gifs ORDER BY lastupdated DESC')
                                    .then(result => result.rows)
                                    .catch(err => {
                                        return 'Error found here!', err.message;
                                    });
           
            const data = gifarticles.map(item => (
                {
                    id: item.articleid,
                    lastUpdated: item.lastupdated,
                    createdOn: item.createdon,
                    title: item.title,
                    articleOrUrl: item.article,
                    authorId: item.authorid
                }
            ));
            // console.log(data);
        
            res.status(200).json({
                status: 'success',
                data,
            });
        }


        static async flagEntity(req, res) {
            const { authorId, id, type } = req.body;
   
            const argumentsObj = { authorId, id, type };
            const missingValue = Object.keys(argumentsObj)
            .filter(item => ((argumentsObj[item] === undefined) || (argumentsObj[item] === '')));
            // console.log(missingValue);
            if (missingValue.length > 0) {
            return res.status(400).json({
            status: 'error',  
            error: `${missingValue} not supplied`,
            });
            }

            console.log(req.body);

            const entityToFlag = await db.query(`SELECT * FROM ${type}s WHERE ${type}id=${id}`)
                                    .then(result => result.rows)
                                    .catch(err => {
                                        return res.status(400).json({
                                            status: 'error',
                                            error: `${type} not found`
                                        });
                                    });
            if(entityToFlag.length < 1) {
                return res.status(400).json({
                    status: 'error',
                    error: `${type} not found`
                })
            }
            // console.log(entityToFlag);
          const flaggedEntity = await db.query(`UPDATE ${type}s SET flagged=${entityToFlag[0].flagged ?  false : true} WHERE ${type}id=${id} RETURNING *`)
                                        .then(result => result.rows)
                                        .catch(err => {
                                            return res.status(400).json({
                                                status: 'error',
                                                error: `${type} could not be FLAGGED`
                                            });
                                        });
            
            return res.status(200).json({
                status: 'success',
                data: flaggedEntity
            });
        }


        static async deleteFlaggedEntity(req, res) {
            const { authorId, id, type } = req.body;
   
            const argumentsObj = { authorId, id, type };
            const missingValue = Object.keys(argumentsObj)
            .filter(item => ((argumentsObj[item] === undefined) || (argumentsObj[item] === '')));
            // console.log(missingValue);
            if (missingValue.length > 0) {
            return res.status(400).json({
            status: 'error',  
            error: `${missingValue} not supplied`,
            });
            }

            // console.log('req body', req.body);

            const entityToDelete = await db.query(`SELECT * FROM ${type}s WHERE ${type}id=${id}`)
                                            .then(result => result.rows)
                                            .catch(err => {
                                                return res.status(400).json({
                                                    status: 'error',
                                                    error: `${type} not found`
                                                });
                                            });
            if(entityToDelete.length < 1) {
                return res.status(400).json({
                    status: 'error',
                    error: `${type} not found`
                })
            }
            if(!entityToDelete[0].flagged) {
                return res.status(400).json({
                    status: 'error',
                    error: `${type} should be FLAGGED before DELETION`
                }) 
            }
            console.log('entity to delete', entityToDelete);
          const deletedEntity = await db.query(`DELETE FROM ${type}s WHERE ${type}id=${id} RETURNING *`)
                                        .then(result => result.rows)
                                        .catch(err => {
                                            return res.status(400).json({
                                                status: 'error',
                                                error: `${type} could not be DELETED`
                                            });
                                        });
            if(!deletedEntity) return res.status(400).json({ status: 'error', error: `${type} could not be deleted` });
            return res.status(200).json({
                status: 'success',
                data: {
                    message: `${type} successfully deleted`,
                    deletedEntity
                }
            });
        }


        
        static async likeEntity(req, res) {
            const { authorId, id, type } = req.body;
   
            const argumentsObj = { authorId, id, type };
            const missingValue = Object.keys(argumentsObj)
            .filter(item => ((argumentsObj[item] === undefined) || (argumentsObj[item] === '')));
            // console.log(missingValue);
            if (missingValue.length > 0) {
            return res.status(400).json({
            status: 'error',  
            error: `${missingValue} not supplied`,
            });
            }

            console.log(req.body);

            const entityToLike = await db.query(`SELECT * FROM ${type}s WHERE ${type}id=${id}`)
                                    .then(result => result.rows)
                                    .catch(err => {
                                        return res.status(400).json({
                                            status: 'error',
                                            error: `${type} not found`
                                        });
                                    });
            if(entityToLike.length < 1) {
                return res.status(400).json({
                    status: 'error',
                    error: `${type} not found`
                })
            }
            // console.log(entityToLike);
          const likedEntity = await db.query(`UPDATE ${type}s SET liked=liked + 1 WHERE ${type}id=${id} RETURNING *`)
                                        .then(result => result.rows)
                                        .catch(err => {
                                            return res.status(400).json({
                                                status: 'error',
                                                error: `${type} could not be LIKED`
                                            });
                                        });
            
            return res.status(200).json({
                status: 'success',
                data: likedEntity
            });
        }
    }


export default FeedController;