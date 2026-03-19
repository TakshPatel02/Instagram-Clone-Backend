import Post from "../models/post.model";

const likes = async (req, res) => {
    try {
        const { postId } = req.body;

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Post not found.'
            });
        }

        const userId = req.user.id;

        if (post.likes.includes(userId)) {
            // If user has already liked the post, remove the like (unlike)
            post.likes = post.likes.filter(id => id.toString() !== userId);
        } else {
            // Otherwise, add the user's like
            post.likes.push(userId);
        }

        await post.save();

        res.status(200).json({
            success: true,
            message: 'Like status updated successfully.'
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
    likes
}