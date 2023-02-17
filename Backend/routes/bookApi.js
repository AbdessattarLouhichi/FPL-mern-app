import express from "express";
import passport from "passport";
import authRole from "../config/authRole.js";
import upload from "../middlewares/upload.js";
import { createBook, getBooks, getBookById, deleteBook, updateBook} from "../controllers/book.Controller.js";


const router = express.Router();

router.post('/addBook', passport.authenticate('bearer', { session: false }),authRole("admin"), upload.single('file'),  createBook);

router.get('/Books', passport.authenticate('bearer', { session: false }), getBooks);

router.get('/Books/:id', passport.authenticate('bearer', { session: false }), getBookById);

router.put('/Books/:idBook',passport.authenticate('bearer', { session: false }),authRole("admin"), upload.single('file'),  updateBook);

router.delete('/Books/:idBook', passport.authenticate('bearer', { session: false }),authRole("admin"), deleteBook);


export default router