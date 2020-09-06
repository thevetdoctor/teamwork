import cloud from './cloudinary';
import path, { dirname } from 'path';
const fs = require('fs');

const postImage = async(req, res) => {
    // console.log(req.file);
    if(req.file) {
        if (req.file.filename === 'fileExist') {
        return res.status(404).json({
            message: 'File exists already'
        });
    }
            try {
                    const img = { name: req.file.filename, image: path.join(__dirname, req.file.path), id: Date.now() }
                    await cloud.uploads(img.image).then((result) => {
                    // console.log(img, result);
                        let savedImg = { name: req.file.filename, image: result.url, id: result.id };
                        if (!result.url) {
                            return res.status(404).json({
                            message: 'Upload failed!'
                            });
                        }
                    // console.log('done');
                    return res.status(201).json({
                            uploadedImage: img, 
                            savedImg,
                            message: 'Media uploaded!'
                        });
                    });
                    // res.status(200).json({message: 'Yes'});
            } catch(err) {
            console.error(err)
            }
    } else {
        return res.status(404).json({
            message: 'Error found'
        })
    }
}

export default postImage;