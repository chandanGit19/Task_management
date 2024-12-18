import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors"
import userRoute from "./routes/user.Routes.js";
import connectDb from "./dbconnection/dbConnect.js";
import cookieParser from "cookie-parser";
import taskRoute from "./routes/task.Routes.js";
connectDb();




const app =express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(cookieParser())
const PORT = process.env.PORT || 5000;


app.use("/api/v1",userRoute);
app.use("/api/v1",taskRoute)

app.get("/",(req,res)=>{
    res.send("This is the first responces")
})


app.listen(PORT,()=>{
    console.log(`app is listing on port ${PORT}`)
})




