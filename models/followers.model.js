import mongoose, { Schema, model } from "mongoose";

const followersSchema = new Schema({
    follower: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    following: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, { timestamps: true });

followersSchema.index({ followers: 1, following: 1 }, { unique: true });

const Followers = model("Followers", followersSchema);

export default Followers;