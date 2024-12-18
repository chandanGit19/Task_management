import Task from "../models/taskModel.js";
import User from "../models/userModel.js";


export const createTask = async (req,res)=>{
    try {
        const {title,description} = req.body;

        console.log(title,description)
        if(!title || !description){
          return  res.status(401).json({
                success:false,
                message:"Please provide all the fields"
            })
        }

        // console.log(req.user._id)

        const isUser = await User.findById(req.user._id);

        if(!isUser){
          return  res.status(401).json({
                success:false,
                message:"Please log in first "
            })
        }

        const task = new Task({
            title,
            description
        });

        await task.save();

        await User.findByIdAndUpdate(req.user._id,{$push:{tasks:task._id}});

        res.status(200).json({
            success:true,
            message:"task created successfull"
        })


    } catch (error) {
        console.log("error in creating the task in controller taskContorller")

        res.status(401).json({
        success:false,
        message:"can't createt task rignt now"
    })
        
    }
}



export const getAllTask = async(req,res)=>{
    try {
        const tasks = await User.findById(req.user._id).select("-password").populate({
            path:"tasks",
            options:{sort:{createdAt:-1}}
        });

        res.status(200).json({
            success:true,
            message:"All task",
            tasks:tasks.tasks
        })

    } catch (error) {
        console.log("error in getAll task controllerin controller taskContorller")
        res.status(401).json({
            success:false,
            message:"can't fetch task right now"
        })
    }
}


export const deleteTask = async(req,res)=>{
    try {
        const {id} = req.params;

        if(!id){
          return  res.status(401).json({
                success:false,
                message:"please provide a valid id"
            })
        }

        const task = await Task.findById(id);

        if(!task){
          return  res.status(401).json({
                success:false,
                message:"please provide a valid id"
            })
        }

        const deletTask = await Task.findByIdAndDelete(id);

        const updateUser = await User.findByIdAndUpdate(req.user._id,{$pull:{tasks:task._id}});

        res.status(200).json({
            success:true,
            message:"Task deleted successful"
        })

    } catch (error) {
        console.log("there is a error in deleting the task in controller taskContorller ")
        res.status(401).json({
            success:false,
            message:"can't delet right now"
        })
    }
}


export const updateTask = async(req,res)=>{
    try {

        const {id} =req.params;
        const {title ,description} = req.body;

        const updateTask = await Task.findByIdAndUpdate(id,{title:title,description:description},{new:true});

        res.status(200).json({
            success:true,
            message:"task updated successfuly"
        })
        
    } catch (error) {
        console.log("error in updating the task in controller taskContorller")
        res.status(401).json({
            success:false,
            message:"can't update rignt now "
        })
        
    }
}

export const isCompleted = async(req,res)=>{
    try {
        
        const {id} = req.params;

        const tasks = await Task.findById(id);

        if(!tasks){
           return res.status(401).json({
                success:false,
                message:"please provide a valid id"
            })
        }

        const isCompoleted =  tasks.complete;

        await Task.findByIdAndUpdate(id,{complete:!isCompoleted});

        res.status(200).json({
            success:true,
            message:`task mark isCompleted ${!isCompoleted}`
        })

    } catch (error) {
        console.log("somethings is wrong in isCompleted in controller taskContorller")
        res.status(401).json({
            success:false,
            message:"can't mark right now"
        })
    
    }
}

export const getTask = async(req,res)=>{
    try {

        const {id} = req.params;

        if(!id){
          return  res.status(401).json({
                success:false,
                message:"please provide a valid id"
            })
        }

        const task = await Task.findById(id);

        if(!task){
          return  res.status(401).json({
                success:false,
                message:"please provide a valid id"
            })
        }

        res.status(200).json({
            success:true,
            message:"task fetch successfully",
            task
        })
        
    } catch (error) {

        console.log("error in geting task detials in getTask controller")

        res.status(401).json({
            success:false,
            message:"please provide a valid id"
        })
    
    }
}


export const completedTask = async(req,res)=>{
    try {
        
        const completedTask =  await User.findById(req.user._id).select("-password").populate({
            path:"tasks",
            match:{complete:true},
            options:{sort:{createdAt:-1}},
        })

        res.status(200).json({
            success:true,
            message:"completed Task",
            completedTask:completedTask.tasks
        })



    } catch (error) {
        console.log("error in comopletesTask controller")

        res.status(401).json({
            success:false,
            message:"please provide a valid id"
        })
    }
}