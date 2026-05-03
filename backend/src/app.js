import express from 'express'
import cookieParser from "cookie-parser"
import cors from "cors"
import errHandler from './middlewares/error.middleware.js'
import chatRouter from './routes/chat.routes.js'
import authRouter from './routes/auth.routes.js'
import botRouter from './routes/bot.routes.js'
import passport from "./config/passport.js"
const app = express()

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static("public"))

// routes with cors
app.use("/auth", cors({ origin: "http://localhost:5173", credentials: true }), authRouter)
app.use("/api/bot", cors({ origin: "http://localhost:5173", credentials: true }), botRouter)
app.use("/api/chat", cors({ origin: "*" }), chatRouter)


// google strategy

app.use(passport.initialize());


// error handler
app.use(errHandler)

export default app