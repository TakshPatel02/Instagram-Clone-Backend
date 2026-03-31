import express from "express";
import { followUser, unfollowUser, getFollowers, getFollowing, isFollowing } from '../controllers/followers.controller.js';
import isAuthenticated from '../middlewares/authenticated.middleware.js';

const router = express.Router();

router.post("/follow/:userId", isAuthenticated, followUser);

router.delete("/unfollow/:userId", isAuthenticated, unfollowUser);

router.get("/followers/:userId", isAuthenticated, getFollowers);

router.get("/following/:userId", isAuthenticated, getFollowing);

router.get("/isFollowing/:userId", isAuthenticated, isFollowing);

export default router;