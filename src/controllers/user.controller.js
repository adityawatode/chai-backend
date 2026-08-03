import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const generateAcessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })


        return {acessToken, refreshToken}


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating acess and refresh tokens")
    }
}


const registerUser = asyncHandler(async (req, res) => {
    // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token from response
    // check for user creation
    // return response


    const { fullname, email, username, password } = req.body;
    // console.log("email: ", email);

    if (
        [fullname, email, username, password].some((field) => 
         field?.trim() === "")
       ) {
        throw new ApiError(400, "All fields are required")
       }

       const existedUser = await User.findOne({
        $or: [{ username }, { email }]
       })

       if(existedUser) {
        throw new ApiError(409, "User with email or username already exists")
       }

       const avatarLocalPath = req.files?.avatar[0]?.path;
       const coverImageLocalPath = req.files?.coverImage[0]?.path;

       if(!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required");
       }

       const avatar = await uploadOnCloudinary(avatarLocalPath);
       const coverImage = await uploadOnCloudinary(coverImageLocalPath);

       if(!avatar) {
        throw new ApiError(400, "Avatar file is required");
       }

       const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
       })

       const createdUser = await User.findById(user._id).select(
           "-password -refreshToken"
       )   

       if(!createdUser) {
        throw new ApiError(500, "Something went wrong while registering user")
       }

       return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
       )
}) 

const LoginUser = asuncHandler(async (req, res) => {
    // req.body -> data
    // username and email
    // find the user in db
    // password check 
    // access token and refresh token
    // send cookie

    const {email, username, password} = req.body

    if(!(username || email)) {
        throw new ApiError(400, "Username or email is required")
    }

    const user = await User.findOne({
        $or: [{username}, {email}]
    })

    if(!user) {
        throw new ApiError(404, "User does not exist")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if(!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials")
    }

    const {accessToken, refreshToken} = await generateAcessAndRefreshTokens(user._id)

    const loggedInUser = await User.findbyId(user._id).select(
        "-password -refreshToken"
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.
    status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(200, 
            {
                user: LoggedInUser, accessToken, refreshToken
            },
            "User Logged in successfully"
         )
    )

})

const LogoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(
        new ApiResponse(200, {}, "User logged out")
    )
})

export { registerUser, loginUser, LogoutUser };