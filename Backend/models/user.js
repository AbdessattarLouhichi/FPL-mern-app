import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber:{
        type : String
    },
    role: {
        type: String,
        enum: ["admin", "Normal", "Subscriber"],
        default: "Normal",
    },
    NumbrDownloads: {
        type: Number,
        default: 0
      }
    },
    { timestamps :true , versionKey : false }
);


export default mongoose.model('User', userSchema)