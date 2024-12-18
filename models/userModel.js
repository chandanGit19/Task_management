import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"


const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    tasks:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Task"
        }
    ]

},{
    timestamps:true
});



userSchema.methods.getJwtToken =async function(){
    return await jwt.sign({id:this._id},process.env.JWT_SECRET,{expiresIn:"1d"});
}

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}


userSchema.statics.generatePassowrd= async function(password){
    return await bcrypt.hash(password,10);
}

// or there is another method 
// userSchema.pre("save",async function(next){

//     if(!this.isModified("password")){
//          return
//     }

//     this.password = await bcrypt.hash(this.password,10);

// })








const User = mongoose.model("User",userSchema);

export default User;