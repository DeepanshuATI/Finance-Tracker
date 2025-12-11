import { Router } from 'express';
import { registerUser, loginUser, getCurrentUser, deleteUser ,changeCurrentPassword ,logoutUser, refreshAccessToken} from '../controllers/user.controller.js';
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { asyncHandler } from '../utils/asyncHandler.js';
import upload from "../middlewares/upload.middleware.js";


const router = Router();


    router.route("/register").post( registerUser);
    router.route("/login").post(loginUser);
    router.route("/refresh-token").post(refreshAccessToken);
    router.route("/change-password").post(verifyJWT, changeCurrentPassword);
    router.route("/current-user").get(verifyJWT, asyncHandler(getCurrentUser));
    router.delete("/delete-user",verifyJWT,deleteUser);
    router.route("/logout").post(verifyJWT,logoutUser);
    
    router.post("/upload-image", upload.single("image"),(req,res) => {
        if(!req.file){
            return res.status(400).json({message:"No file uploaded"}); 
        }

        const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
        res.status(200).json({imageUrl}); 
    });



export default router;
