const multer = require('multer');
import path, { dirname } from 'path';
const fs = require('fs');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const dest = (req, file, callback) => {
  console.log('file', file); 
  callback(null, 'images');
};

const fname = (req, file, callback) => {
  const nameExt = file.originalname.split('.');
  const name = nameExt[0].split(' ').join('_');
  const extension = MIME_TYPES[file.mimetype];
  const fileExist = 'fileExist';
  console.log(path.join(__dirname, `images/${name + '.' + extension}`));
  if (fs.existsSync(path.join(__dirname, `images/${name + '.' + extension}`))) {
    return callback(null, fileExist);
  } else {
  return callback(null, name + '.' + extension);
}
};

const storage = multer.diskStorage({
  destination: dest,
  filename: fname
});


module.exports = multer({storage: storage});