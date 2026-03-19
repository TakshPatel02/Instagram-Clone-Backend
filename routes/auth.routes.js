import express from 'express';
import { loginUser, logoutUser, newRefreshTokenGeneration, signupUser } from '../controllers//auth.controller.js'
import isAuthenticated from '../middlewares/authenticated.middleware.js';

const router = express.Router();

router.post('/signup', signupUser);

router.post('/login', loginUser);

router.patch('/logout', isAuthenticated ,logoutUser);

router.get('/refresh-token', newRefreshTokenGeneration);

export default router;