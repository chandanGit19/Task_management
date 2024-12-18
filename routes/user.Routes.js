import express from "express";
import { CreateUser, login } from "../controllers/userControllers.js";
const userRoute = express.Router();



userRoute.post("/signUp",CreateUser);
userRoute.post("/login",login)





export default userRoute;