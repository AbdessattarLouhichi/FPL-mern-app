import express from "express";
import passport from "passport";
import {register,login,logout,forgotPassword,resetPassword} from "../controllers/authentication.Controller.js";


const router = express.Router();
router.post('/register', register);
router.post('/login',login);
router.get('/logout',passport.authenticate('bearer', {session : false}),logout);
router.post('/forgotPassword',forgotPassword);
router.post('/resetPassword/:token',resetPassword);

export default router
