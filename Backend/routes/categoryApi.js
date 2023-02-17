import express from "express";
import passport from "passport";
import { createCategory, getCategories, getCategoryById, deleteCategory, updateCategory } from "../controllers/category.Controller.js";



const router = express.Router();

router.post('/createCategory',passport.authenticate('bearer', {session : false}), createCategory);
router.get('/categories',getCategories);
router.get('/categories/:id', getCategoryById);
router.put('/categories/:id',passport.authenticate('bearer', {session : false}), updateCategory);
router.delete('/categories/:id',passport.authenticate('bearer', {session : false}), deleteCategory);

export default router