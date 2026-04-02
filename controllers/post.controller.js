import uploadImage from "../services/uploadImage.service.js";
import Post from "../models/post.model.js"
import User from "../models/user.model.js";
import Followers from "../models/followers.model.js";

const createPost = async (req, res) => {
    try {
        const { caption } = req.body;
        const image = req.file;

        if (!caption || !image) {
            return res.status(400).json({
                success: false,
                message: 'Caption and image are required'
            });
        }

        const imageUpload = await uploadImage(
            image.buffer,
            image.originalname
        );

        const post = await Post.create({
            userId: req.user.id,
            postUrl: imageUpload.url,
            caption,
        });

        await User.findByIdAndUpdate(req.user.id, {
            $push: { posts: post._id }
        });

        return res.status(201).json({
            success: true,
            message: 'Post created successfully',
            data: {
                postId: post._id,
                postUrl: post.postUrl,
                caption: post.caption,
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: err.message || 'Internal Server Error'
        });
    }
}

const getAllUsersPosts = async (req, res) => {
    try {
        // -1 means sort in descending order (newest posts first)
        const posts = await Post.find({ userId: req.user.id }).sort({ createdAt: -1 }); f

        return res.status(200).json({
            success: true,
            message: 'Posts retrieved successfully',
            data: posts
        })

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: err.message || 'Internal Server Error'
        })
    }
}

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 }).populate('userId', 'username');

        return res.status(200).json({
            success: true,
            message: 'Posts retrieved successfully',
            data: posts
        })

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: err.message || 'Internal Server Error'
        })
    }
}

const getPostsOfFollowing = async (req, res) => {
    try {
        const userId = req.user.id;

        const following = await Followers.find({ follower: userId }).select('following');

        const followingIds = following.map(f => f.following);

        const posts = await Post.find({ userId: { $in: followingIds } }).sort({ createdAt: -1 }).populate('userId', 'username');

        return res.status(200).json({
            success: true,
            message: 'Posts retrieved successfully',
            data: posts
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: err.message || 'Internal Server Error'
        })
    }
}

export {
    createPost,
    getAllUsersPosts,
    getAllPosts,
    getPostsOfFollowing
}