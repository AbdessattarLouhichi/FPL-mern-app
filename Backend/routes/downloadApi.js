import express from "express";
import passport from "passport";
import authRole from "../config/authRole.js";
import { ListOfDownloads, newDownload } from "../controllers/download.Conroller.js";


const router = express.Router();
//download
router.get('/download/:id',[passport.authenticate('bearer', { session: false }),authRole(["admin","Subscriber"])],newDownload)

// Get List of downloads
router.get('/downloads',[passport.authenticate('bearer', { session: false }),authRole("admin")], ListOfDownloads)
export default router
