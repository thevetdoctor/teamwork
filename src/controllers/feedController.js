import db from '../db';
import missingValue from '../helpers/missingValue';
import response from '../helpers/response';

class FeedController {
        
    // get feed of articles & gif posts

    static async getFeed(req, res) {
        const { id } = req.token;
        const authorId = id;
        
        missingValue.values(res, authorId);
                       
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
            
            return response.values(res, 200, data);
        }


    static async flagEntity(req, res) {
        const { entityId, type } = req.body;
        const { id } = req.token;
        const authorId = id;

        missingValue.values(res, authorId, entityId, type);

        const entityToFlag = await db.query(`SELECT * FROM ${type}s WHERE ${type}id=${entityId}`)
                                .then(result => result.rows)
                                .catch(err => response.values(res, 400, `${type} not found`));
                                                            
        if(entityToFlag.length < 1) return response.values(res, 400, `${type} not found`);

        const flaggedEntity = await db.query(`UPDATE ${type}s SET flagged=${entityToFlag[0].flagged ?  false : true} WHERE ${type}id=${entityId} RETURNING *`)
                                    .then(result => result.rows)
                                    .catch(err => response.values(res, 400, `${type} could not be FLAGGED`));
        
        return response.values(res, 200, flaggedEntity);
    }


    static async deleteFlaggedEntity(req, res) {
        const { id } = req.token;
        const { entityId, type } = req.body;
        const authorId = id;

        missingValue.values(res, authorId, entityId, type);
        
        const entityToDelete = await db.query(`SELECT * FROM ${type}s WHERE ${type}id=${entityId}`)
                                        .then(result => result.rows)
                                        .catch(err => response.values(res, 400, `${type} not found`));

        if(entityToDelete.length < 1) return response.values(res, 400, `${type} not found`);

        if(!entityToDelete[0].flagged) return response.values(res, 400, `${type} should be FLAGGED before DELETION`);
        const deletedEntity = await db.query(`DELETE FROM ${type}s WHERE ${type}id=${entityId} RETURNING *`)
                                    .then(result => result.rows)
                                    .catch(err => response.values(res, 400, `${type} could not be DELETED`));

        if(!deletedEntity) return response.values(res, 400, `${type} could not be deleted`);

        return response.values(res, 200, { message: `${type} successfully deleted`, deletedEntity });
    }

   
    static async likeEntity(req, res) {
        const { entityId, type } = req.body;
        const { id } = req.token;
        const authorId = id;

        missingValue.values(res, authorId, entityId, type);
        
        const entityToLike = await db.query(`SELECT * FROM ${type}s WHERE ${type}id=${entityId}`)
                                .then(result => result.rows)
                                .catch(err => {
                                    return response.values(res, 400, `${type} not found`);
                                });
        if(entityToLike.length < 1) return response.values(res, 400, `${type} not found`);

        const likedEntity = await db.query(`UPDATE ${type}s SET liked=liked + 1 WHERE ${type}id=${entityId} RETURNING *`)
                                .then(result => result.rows)
                                .catch(err => response.values(res, 400, `${type} could not be LIKED`));
        
        return response.values(res, 200, likedEntity);
    }
}


export default FeedController;