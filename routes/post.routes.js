import express from 'express';
import upload from '../middlewares/upload.middleware.js';
import { createPost, getAllPosts } from '../controllers/post.controller.js';

const router = express.Router();

// Create a new post
router.post('/create-post', upload.single('image'), createPost);

router.get('/get-posts', getAllPosts);

export default router;