import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Please Enter Category Name']
    },
    books: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book"
      }
    ]
  },
  { timestamps :true , versionKey : false }
)

export default mongoose.model('Category',categorySchema);