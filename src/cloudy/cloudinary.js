import cloudinary from 'cloudinary';
import 'dotenv/config';

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET 
  });

  const uploadOptions = {
      folder: 'teamwork/', use_filename: true, unique_filename: false,
    };

  exports.uploads = file => {
      return new Promise(resolve => {
          cloudinary.uploader.upload(file, uploadOptions,
             (result) => {
              resolve({ url: result.url, id: result.public_id })
          }, { resource_type: 'auto'})
      })
    }