import { Schema, model } from "mongoose";

const postSchema = new Schema({
    postUrl: {
        type: String,
        required: true,
    },
    caption: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const Post = model('Post', postSchema);

export default Post;