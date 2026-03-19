import express from 'express';
import upload from '../middlewares/upload.middleware.js';
import isAuthenticated from '../middlewares/authenticated.middleware.js';
import { createPost, getAllPosts } from '../controllers/post.controller.js';

const router = express.Router();

// Create a new post
router.post('/create-post', isAuthenticated, upload.single('image'), createPost);

router.get('/get-posts', isAuthenticated, getAllPosts);

export default router;