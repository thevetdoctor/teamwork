import db from '../db';

class FeedController {
        
    // get feed of articles & gif posts

    static async getFeed(req, res) {

        const gifarticles = await db.query('SELECT * FROM articles UNION SELECT  * FROM gifs ORDER BY lastupdated DESC')
                                    .then(result => result.rows)
                                    .catch(err => {
                                        return 'Error found here!', err.message;
                                    });
           
            //   articleurl: item.article.includes('http') ? `${}` : `${}`,
            // const updated = gifarticles.map(item => item.lastupdated);
            // console.log(updated);
        
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
    }

export default FeedController;