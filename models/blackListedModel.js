import mongoose, { mongo } from "mongoose";


const blackListSchema = new mongoose.Schema({
    token:{
        type:String,
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:86400
    }
})

const Token = mongoose.model("Token",blackListSchema);

export default Token;