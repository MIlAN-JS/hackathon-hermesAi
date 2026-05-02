import express from 'express';
import errHandler from './middlewares/error.middleware.js';
import chatRouter from './routes/chat.routes.js';
import authRouter from './routes/auth.routes.js';
import cookieParser from "cookie-parser";

const app = express();


//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/chat",chatRouter);
app.use("/api/auth", authRouter);



app.use(errHandler)

export default app;
