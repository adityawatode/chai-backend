// here request is handled with promise. if error occured, it will pass to the next middleware.

const asyncHandler = (requestHandler) => {
    (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((error) => next(error))
    }
}

export {asyncHandler}




// A higher-order function that wraps an asynchronous route handler and catches any errors that occur during its execution. It takes a function `fn` as an argument and returns a new function that executes `fn` and handles any errors that may arise, sending an appropriate response to the client.

// const asyncHandler = (fn) => async (req, res, next) => {
//     try {
//         await fn(req, res, next)
//     } catch (error) {
//         res.status(err.status || 500).json({
//             success: false,
//             message: err.message
//         });
//     }
// }