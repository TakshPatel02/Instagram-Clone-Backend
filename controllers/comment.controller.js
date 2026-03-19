import Comment from "../models/comment.model.js";
import Post from "../models/post.model.js";
import commentSchema from "../validations/comment.validations.js";

const createComment = async (req, res) => {
    try {
        const validatedData = await commentSchema.safeParseAsync(req.body);

        if (validatedData.error) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed.',
                errors: validatedData.error.errors.map(err => ({
                    field: err.path[0],
                    message: err.message
                }))
            });
        }

        const { postId } = req.params;
        const { commentText } = validatedData.data;

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Post not found.'
            });
        }

        const comment = await Comment.create({
            userId: req.user.id,
            postId,
            commentText
        });

        post.comments.push({
            _id: comment._id,
            userId: req.user.id,
            commentText
        });

        await post.save();

        return res.status(201).json({
            success: true,
            message: 'Comment added successfully',
            data: {
                commentId: comment._id,
                postId: post._id,
                commentText: comment.commentText,
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

const getCommentsForPost = async (req, res) => {
    try {
        const { postId } = req.params;
        const post = await Post.findById(postId).populate('comments');

        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Post not found.'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Comments retrieved successfully',
            data: post.comments
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: err.message || 'Internal Server Error'
        });
    }
}

export {
    createComment,
    getCommentsForPost
}