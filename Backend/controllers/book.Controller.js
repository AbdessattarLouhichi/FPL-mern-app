import Book from '../models/book.js'


export const createBook = async (req,res)=>{
    try {
        if(req.file){
            const fileName = req.file.filename;
            const filePath =  `http://localhost:3000/uploads/${fileName}`;
            req.body.link = filePath;
        }
        const book = await Book.create(req.body);
        res.status(201).json({message : 'New Book successfully added!', data : book})
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

 
export const getBooks = async (req,res)=>{
    try {
        const books = await Book.find();
        res.status(200).json(books)
    } catch (error) {
        res.status(500).json({message : 'Server Error!'})
    }
};


export const getBookById  = async (req,res)=>{
    try {
        const book = await Book.findById(req.params.id);
        res.status(200).json({data : book})
    } catch (error) {
        res.status(500).json({message : 'Server Error!'})
    }
};


export const updateBook = async (req,res)=>{
    try {
        if(req.file){
            const fileName = req.file.filename;
            const filePath =  `http://localhost:3000/uploads/${fileName}`;
            req.body.link = filePath;
        }
        await Book.findByIdAndUpdate(req.params.id, req.body)
        const book = await Book.findOne({_id : req.params.id})
        res.status(200).json({message : "Successfully updated!", data : book})
    } catch (error) {
        res.status(500).json({message : error.message})
    }
};


export const deleteBook = async (req,res)=>{
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.status(204).json({message: "Book deleted!"})
    } catch (error) {
        res.status(500).json({message : error.message})
    }
};
