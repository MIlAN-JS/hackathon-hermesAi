import express from 'express'
import cookieParser from "cookie-parser"
import cors from "cors"
import errHandler from './middlewares/error.middleware.js'
import chatRouter from './routes/chat.routes.js'
import authRouter from './routes/auth.routes.js'
import botRouter from './routes/bot.routes.js'

const app = express()

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static("public"))

// routes with cors
app.use("/api/auth", cors({ origin: "https://localhost:5173", credentials: true }), authRouter)
app.use("/api/bot", cors({ origin: "https://localhost:5173", credentials: true }), botRouter)
app.use("/api/chat", cors({ origin: "*" }), chatRouter)

// error handler
app.use(errHandler)

export default app