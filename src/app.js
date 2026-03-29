import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

// security configurations
app.use(express.json({         // to parse json data from request body
    limit: "16kb"
}))
app.use(express.urlencoded({   // to parse urlencoded data from request body
    extended: true,
    limit: "16kb"
}))
app.use(express.static("public")) // to serve static files from public directory. such as images, files etc


export { app }