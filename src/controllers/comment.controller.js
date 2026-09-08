import mongoose from "mongoose";
import {Comment} from "../models/comment.model.js";
import {ApiError} from "../utils/appError.js";
import {ApiResponse} from "../utils/apiResponse.js";
import {asyncHandler} from "../utils/asyncHandler.js";

const getVideoComments = asyncHandler(async (req, res) => {
    const {videoId} = req.params;
    const {page = 1, limit = 10} = req.query;

    if(!mongoose.Types.ObjectId.isValid(videoId)) {
        throw new ApiError(400, "Invalid video ID");
    }

    page = Number(page);
    limit = Number(limit);

    if(Number.isNaN(page) || page < 1) page = 1;
    if(Number.isNaN(limit) || limit < 1) limit = 10;

    const comments = await Comment.find({video: videoId})
    .populate("owner", "username email")
    .sort({createdAt: -1})
    .skip((page - 1) * limit)
    .limit(limit);

    return res.status(200)
    .json(new ApiResponse(200, comments, "Comments retrieved successfully")
   );    
});


const addComment = asyncHandler(async (req, res) => {
    const {videoId} = req.params;
    const {content} = req.body;

    if(!mongoose.Types.ObjectId.isValid(videoId)) {
        throw new ApiError(400, "Invalid video ID");
    }

    if(!content || content.trim() === "") {
        throw new ApiError(400, "Content is required")
    }

    const comment = await Comment.create({
        video: videoId,
        owner: req.user._id,
        content: content.trim()
    });

    return res.status(201)
    .json(new ApiResponse(201, comment, "Comment added successfully")
    );
});


const updateComment = asyncHandler(async (req, res) => {
    const {commentId} = req.params;
    const {content} = req.body;

    if(!mongoose.Types.ObjectId.isValid(commentId)) {
        throw new ApiError(400, "Invalid comment ID");
    }

    if(!content || content.trim() === "") {
        throw new ApiError(400, "Content is required")
    }

    const comment = await Comment.findById(commentId);

    if(!comment) {
        throw new ApiError(404, "Comment not found")
    }

    if(comment.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You are not authorized to update this comment")
    }

    comment.content = content.trim();
    await comment.save();

    return res.status(200)
    .json(new ApiResponse(200, comment, "Comment updated successfully")
    );
});


const deleteComment = asyncHandler(async (req, res) => {
    const {commentId} = req.params;

    const comment = await Comment.findById(commentId)

    if(!comment) {
        throw new ApiError(404, "Comment not found")
    }

    if(comment.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You are not authorized to delete this comment")
    }

    await Comment.findByIdAndDelete(commentId);

    return res.status(200)
    .json(new ApiResponse(200, null, "Comment deleted successfully")
    );
});

export {
    getVideoComments,
    addComment,
    updateComment,
    deleteComment
}