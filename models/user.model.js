import { Schema, model } from "mongoose";

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
            unique: true
        },
        refreshToken: {
            type: String,
            default: null
        },
        posts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Post"
            }
        ],
        // comments:[
        //     {
        //         type: Schema.Types.ObjectId,
        //         ref: "Comment"
        //     }
        // ],
    },
    { timestamps: true }
);

const User = model("User", userSchema);

export default User;