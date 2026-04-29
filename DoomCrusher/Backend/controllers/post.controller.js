const mongoose = require('mongoose');
const postmodel = require('../models/post.model');
const ImageKit = require('@imagekit/nodejs');
const { toFile } = require('@imagekit/nodejs');
require('dotenv').config();

const client = new ImageKit({
        urlEndpoint: 'https://ik.imagekit.io/doomcrusher',
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
        publicKey: process.env.IMAGEKIT_PUBLIC_KEY
     
});


async function CreatePostController(req, res) {
 console.log(req.body ,req.file);

 const file = await client.files.upload({
  file: await toFile(Buffer.from('my bytes'), 'file'),
  fileName: 'fileName',
});
 if (!file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
res.send(file);
}
module.exports = { CreatePostController }