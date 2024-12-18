import mongoose from "mongoose";


const connectDb =async()=>{
  
    try {
     const db = await  mongoose.connect(process.env.DB_URL).then(()=>{
        console.log("data base connectes successfully")
    }).catch((error)=>{
        console.log("error in connectiong to db");
        process.exit(1)
    })
    } catch (error) {
        console.log("error in data base connection");
        process.exit(1)
    }

}

export default connectDb