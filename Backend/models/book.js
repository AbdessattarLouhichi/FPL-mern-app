import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'required']
      },
    author: {
        type: String,
        required: [true, 'required']
      },
    description: {
        type: String,
        required: [true, 'required']
      },
    content: {
        type: Buffer,
      },
    link: {
        type:String
      },
    categories:[ 
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "category"
        }
      ],
    countDownload: {
      type: Number,
      default: 0
    }
}
,
    { timestamps :true , versionKey : false }
)

export default mongoose.model('Book',bookSchema)