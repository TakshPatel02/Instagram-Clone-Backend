import express from 'express';
import { createComment, getCommentsForPost } from '../controllers/comment.controller.js';
import isAuthenticated from '../middlewares/authenticated.middleware.js';

const router = express.Router();

router.post('/posts/:postId', isAuthenticated, createComment);

router.get('/posts/:postId', isAuthenticated, getCommentsForPost);

export default router;