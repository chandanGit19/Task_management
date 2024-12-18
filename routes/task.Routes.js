import express from "express";
import { authUsers } from "../middelware/auth.js";
import { completedTask, createTask, deleteTask, getAllTask, getTask, isCompleted, updateTask } from "../controllers/taskController.js";
const taskRoute = express.Router();


taskRoute.post("/taskCreate",authUsers,createTask);

taskRoute.get("/getTasks",authUsers,getAllTask);

taskRoute.delete("/deleteTask/:id",authUsers,deleteTask);

taskRoute.put("/update/:id",authUsers,updateTask);

taskRoute.put("/completed/:id",authUsers,isCompleted);

taskRoute.get("/task/:id",authUsers,getTask);

taskRoute.get("/done",authUsers,completedTask)




export default taskRoute;