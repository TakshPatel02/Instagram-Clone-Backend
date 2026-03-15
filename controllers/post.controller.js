import uploadImage from "../services/uploadImage.service.js";
import Post from "../models/post.model.js"

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
            postUrl: imageUpload.url,
            caption,
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

const getAllPosts = async (req, res) => {
    try{
        // -1 means sort in descending order (newest posts first)
        const posts = await Post.find().sort({
            createdAt: -1
        });

        return res.status(200).json({
            success: true,
            message: 'Posts retrieved successfully',
            data: posts
        })
        
    } catch(err){
        console.error(err);
        res.status(500).json({
            success: false,
            message: err.message || 'Internal Server Error'
        })
    }
}

export {
    createPost,
    getAllPosts
}