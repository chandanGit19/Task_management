import User from "../models/userModel.js";



export const CreateUser = async(req,res)=>{
    try {
        const {userName,email,password} = req.body;

        if(!userName || !email || !password){
          return  res.status(401).json({
                success:false,
                message:"please provide all the details"
            })
        }

        console.log("1")

        const isUser = await User.findOne({email});

        if(isUser){
         return   res.status(402).json({
                success:false,
                message:"email already exist please provide other email"
            })
        }

        console.log("2")
        const hashPassword = await User.generatePassowrd(password)
 
        console.log("3",hashPassword)
        const user = new User({
            userName,
            email,
            password:hashPassword

        });

        await user.save();

        console.log("3")
        const token = await user.getJwtToken();


        res.cookie("token",token).status(200).json({
            success:true,
            message:"user created Successfuly",
            token
        })

        
    } catch (error) {
        console.log("error occurs in the createUser controllers")
    }
}


export const login = async (req,res)=>{
    try {
        const {email,password} = req.body;


        console.log(email,password)

        if(!email || ! password ){
        return    res.status(401).json({
                success:false,
                message:"please provide all the details",
            })
        }

        const isUser = await User.findOne({email});

        if(!isUser){
        return    res.status(401).json({
                success:false,
                message:"email or password is worng"
            })
        }

        const isPassword = await isUser.comparePassword(password);

        if(!isPassword){
         return   res.status(404).json({
                success:false,
                message:"email or password is worng"
            })
        }

        const token = await isUser.getJwtToken();

        res.cookie("token",token).status(200).json({
            success:true,
            message:"login successful",
            token
        })


    } catch (error) {
        console.log("error in login controllers")
    }
}