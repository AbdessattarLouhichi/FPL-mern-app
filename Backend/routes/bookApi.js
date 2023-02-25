import express from "express";
import passport from "passport";
import authRole from "../config/authRole.js";
import upload from "../middlewares/upload.js";
import { createBook, getBooks, getBookById, deleteBook, updateBook} from "../controllers/book.Controller.js";


const router = express.Router();

router.post('/addBook',[passport.authenticate('bearer', { session: false }),authRole("admin"), upload.single('content')],  createBook);

router.get('/books', getBooks);

router.get('/books/:id', passport.authenticate('bearer', { session: false }), getBookById);

router.put('/books/:id',[passport.authenticate('bearer', { session: false }),authRole("admin"), upload.single('content')],  updateBook);

router.delete('/books/:id', passport.authenticate('bearer', { session: false }),authRole("admin"), deleteBook);


export default router