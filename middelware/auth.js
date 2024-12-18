import jwt from "jsonwebtoken";
import Token from "../models/blackListedModel.js";
import User from "../models/userModel.js";


export const authUsers = async (req,res,next)=>{
    try {
        
        const token = req.cookies.token || req.headers['authorization']?.replace("bearer ", "");
        

        // console.log(token)

        if(!token){
            res.status(403).json({
                success:false,
                message:"Unauthorized"
            })
        }

        const blackToken = await Token.findOne({token});

        if(blackToken){
            res.status(403).json({
                success:false,
                message:"Unauthorized"
            })
        }

        let decode

       try {
         decode = await jwt.verify(token,process.env.JWT_SECRET);

       } catch (error) {
        console.log("someone try invalid token")
        throw new Error("UnAuthorised")
       }

        if(!decode){
            res.status(403).json({
                success:false,
                message:"Unauthorized"
            })
        }

        const user = await User.findById({_id:decode.id})

        req.user =user;

        next();



    } catch (error) {
        console.log("error in auth Middle-ware")
    }
}