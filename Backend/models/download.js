import mongoose from "mongoose";
const downloadSchema = new mongoose.Schema({
    books : [{type : mongoose.Schema.Types.ObjectId,ref:'Book'}], 
    customer: {
        type : mongoose.Schema.Types.ObjectId,ref:'User'
    }
}
,{
    timestamps :true , versionKey : false
       })

export default mongoose.model('Download',downloadSchema)