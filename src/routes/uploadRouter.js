import express from 'express';
import postImage from '../cloudy/uploadController';
import upload from '../cloudy/multerConfig';

const router = express.Router(); 

router.get('/', (req, res) => {
    res.status(200).json({
        message: 'Success'
    });
});

// console.log(upload);
router.post('/postImg', upload.single('image'), postImage);

export default router;