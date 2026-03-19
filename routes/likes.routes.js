import express from 'express';
import { likes } from '../controllers/likes.controller.js';
import isAuthenticated from '../middlewares/authenticated.middleware.js';

const router = express.Router();

router.post('/posts/:postId', isAuthenticated, likes);

export default router;