import Download from '../models/download.js'
import  User from '../models/user.js'
import Book from '../models/book.js'
//import path from 'path'
//import { fileURLToPath } from 'url';

//const __filename = fileURLToPath(import.meta.url);

//const __dirname = path.dirname(__filename);
 /* res.download(path.join(__dirname, `${book.link}`), (err) => {
          if (err) {
              console.log(err);
          }
        })*/


// create new download        
export const newDownload = async (req, res)=>{
    try {
      // find user
      const customer =  await User.findById(req.user._id)
      // find book to download
      const book = await Book.findById(req.params.id)
      // the path of the target book
      const filePath = book.link
      
      // check the number of downloads 
      if(customer.NumbrDownloads < 5){
        // use res.download to download the target
        res.download(filePath, `${book.title}.pdf`, (err) => {
          if (err) {
              console.log(err);
          }
        })
        

      Download.create({ books: req.params.id, customer: req.user._id })
      // increment
      await Book.findByIdAndUpdate(req.params.id, { $inc: { countDownload: +1 } }, { new: true })
      await User.findByIdAndUpdate(req.user._id, {$inc:{NumbrDownloads: +1}}, {new: true})
      res.send({message: 'downloaded succefully', data: book})
      }
      else {
        res.status(400).json({message: "Only five downloads per month"})
      }
    } catch (error) {
      res.status(500).json({message: error.message}); 
    }
  }

  export const ListOfDownloads = async (req, res) => {
    try {
        const orders = await Order.find({}).populate('books').populate('customer')
        res.status(200).json(orders);
    } catch (error) {
        return res.status(500).json({ message: 'Error Server' })
    }
}

export const getDownloadById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('books').populate('customer');
        res.status(201).json(order);
    } catch (error) {
        return res.status(500).json({ message: 'Error Server' })
    }
}