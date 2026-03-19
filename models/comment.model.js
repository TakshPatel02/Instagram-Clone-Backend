import { Schema, model } from "mongoose";

const commentSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        postId: {
            type: Schema.Types.ObjectId,
            ref: "Post",
            required: true,
        },
        commentText: {
            type: String,
            requried: true,
        }
    },
    { timestamps: true },
);

const Comment = model("Comment", commentSchema);

export default Comment;