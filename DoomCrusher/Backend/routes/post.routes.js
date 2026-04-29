const express = require('express');
const postRouter = express.Router();
const postController = require('../controllers/post.controller');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });


/**
 * POST api/posts
 * -req.body: { caption, imgUrl }
 */

postRouter.post('/',upload.single("image"),postController.CreatePostController);
module.exports = postRouter;