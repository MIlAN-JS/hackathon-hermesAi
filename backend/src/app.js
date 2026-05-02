import express from 'express';
import errHandler from './middlewares/error.middleware.js';


const app = express();


//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get("/",(req,res)=>{
    res.send("hello world")
})


app.use(errHandler)

export default app;
