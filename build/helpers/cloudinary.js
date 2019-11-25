"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("dotenv/config");

var _assert = require("assert");

// import cloudinary from 'cloudinary';
var cloudinary = require('cloudinary');

// const cloud = cloudinary.v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
}); //   exports.uploads = (file) => {
//       return new Promise(resolve => {
//           cloudinary.v2.uploader.upload(file, (result) => {
//               resolve({ url: result.url, id: result.public_id })
//               resolve({ url: result.url, id: result.public_id })
//           }, { resource_type: 'auto'})
//       });
//     }

var _default = cloudinary;
exports["default"] = _default;