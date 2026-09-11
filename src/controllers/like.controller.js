import mongoose, {isValidObjectId} from "mongoose"
import {Like} from "../models/like.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const toggleVideoLike = asyncHandler(async (req, res) => {
    const {videoId} = req.params

    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video ID")
    }

    const removedLike = await Like.findOneAndDelete({
        video: videoId,
        likedBy: req.user._id
    })

    if (removedLike) {
        return res
            .status(200)
            .json(new ApiResponse(200, null, "Video unliked successfully"))
    }

    const like = await Like.create({
        video: videoId,
        likedBy: req.user._id
    })

    return res
        .status(201)
        .json(new ApiResponse(201, like, "Video liked successfully"))
})


const toggleCommentLike = asyncHandler(async (req, res) => {
    const {commentId} = req.params

    if(!isValidObjectId(commentId)) {
        throw new ApiError(400, "Invalid comment ID")
    }

    const removedCommentLike = await Like.findOneAndDelete({
        comment: commentId,
        likedBy: req.user._id
    })

    if(removedCommentLike) {
        return res
        .status(200)
        .json(new ApiResponse(200, null, "Comment unliked successfully"))
    }

    const commentLike = await Like.create({
        comment: commentId,
        likedBy: req.user._id
    })

    return res
    .status(201)
    .json(new ApiResponse(201, commentLike, "Comment liked successfully"))

})


const toggleTweetLike = asyncHandler(async (req, res) => {
    const {tweetId} = req.params
    
    if(!isValidObjectId(tweetId)) {
        throw new ApiError(400, "Invalid tweet ID")
    }

    const removedtweetLike = await Like.findOneAndDelete({
        tweet: tweetId,
        likedBy: req.user._id
    })

    if(removedtweetLike) {
        return res
        .status(200)
        .json(new ApiResponse(200, null, "Tweet unliked successfully"))
    }

    const tweetLike = await Like.create({
        tweet: tweetId,
        LikedBy: req.user?._id
    })

    return res
    .staus(201)
    .json(new ApiResponse(201, tweetLike, "Tweet liked successfully"))

})


const getLikedVideos = asyncHandler(async (req, res) => {
    const likedVideos = await Like.aggregate([
        {
            $match: {
                likedBy: new mongoose.Types.ObjectId(req.user._id),
                video: {$ne: null}
            }
        },
        {
            $lookup: {
                from: "videos",
                localField: "video",
                foreignField: "_id",
                as: "likedVideo",
                pipeline: [
                    {
                        $lookup: {
                            from: "users",
                            localField: "owner",
                            foreignField: "_id",
                            as: "ownerDetails",
                            pipeline: [
                                {
                                    $project: {
                                        fullname: 1,
                                        username: 1,
                                        avatar: 1
                                    }
                                }
                            ]
                        }
                    },
                    {$set: {owner: {$first: "$ownerDetails"}}}
                ]
            }
        },
        {$unwind: "$likedVideo"},
        {$replaceRoot: {newRoot: "$likedVideo"}}
    ])

    return res
        .status(200)
        .json(new ApiResponse(200, likedVideos, "Liked videos fetched successfully"))
})


export {
    toggleCommentLike,
    toggleTweetLike,
    toggleVideoLike,
    getLikedVideos
}
