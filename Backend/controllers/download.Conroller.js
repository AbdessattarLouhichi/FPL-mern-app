import Download from '../models/download.js'
import  User from '../models/user.js'
import Book from '../models/book.js'

export const newDownload = async (req, res)=>{
    try {
      const customer =  await User.findByIdAndUpdate(req.user._id)
      if(customer.countDownload < 5){
        await Book.findByIdAndUpdate(req.body._id, { $inc: { countDownload: +1 } }, { new: true })
        await User.findByIdAndUpdate(req.user._id, {$inc:{NumbrDownloads: +1}}, {new: true})
        Download.create({ books: req.body._id, customer: req.user._id })
      res.send({message: 'downloaded succefully'})
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