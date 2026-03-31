import Followers from "../models/followers.model.js";

const followUser = async (req, res) => {
    try {
        const followerId = req.user.id;
        const followingId = req.params.userId;

        if (followerId === followingId) {
            return res.status(400).json({
                success: false,
                message: "You cannot follow yourself."
            });
        }

        const existingFollow = await Followers.findOne({ follower: followerId, following: followingId });

        if (existingFollow) {
            return res.status(400).json({
                success: false,
                message: "You are already following this user."
            });
        }

        await Followers.create({
            follower: followerId,
            following: followingId
        });

        return res.status(200).json({
            success: true,
            message: "User followed successfully."
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: err.message || "An error occurred while following the user."
        })
    }
}

const unfollowUser = async (req, res) => {
    try {
        const followerId = req.user.id;
        const followingId = req.params.userId;

        const existingFollow = await Followers.findOne({ follower: followerId, following: followingId });

        if (!existingFollow) {
            return res.status(400).json({
                success: false,
                message: "You are not following this user."
            });
        }

        await Followers.findOneAndDelete({
            follower: followerId,
            following: followingId
        });

        return res.status(200).json({
            success: true,
            message: "User unfollowed successfully."
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: err.message || "An error occurred while unfollowing the user."
        })
    }
}

const getFollowers = async (req, res) => {
    try {
        const userId = req.params.userId;

        const followers = await Followers.find({ following: userId });

        return res.status(200).json({
            success: true,
            data: followers,
            count: followers.length
        })

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: err.message || "An error occurred while fetching followers."
        })
    }
}

const getFollowing = async (req, res) => {
    try{
        const userId = req.params.userId;

        const following = await Followers.find({ follower: userId });

        return res.status(200).json({
            success: true,
            data: following,
            count: following.length
        });

    } catch(err){
        console.error(err);
        res.status(500).json({
            success: false,
            message: err.message || "An error occurred while fetching following."
        })
    }
}

const isFollowing = async (req, res) => {
    try{
        const followerId = req.user.id;
        const followingId = req.params.userId;

        if (followerId === followingId) {
            return res.status(400).json({
                success: false,
                message: "You cannot follow yourself."
            });
        }

        const followDoc = await Followers.findOne({ follower: followerId, following: followingId });

        return res.status(200).json({
            success: true,
            isFollowing: !!followDoc
        });

    } catch(err){
        console.error(err);
        res.status(500).json({
            success: false,
            message: err.message || "An error occurred while checking follow status."
        })
    }
}

export {
    followUser,
    unfollowUser,
    getFollowers,
    getFollowing,
    isFollowing
}