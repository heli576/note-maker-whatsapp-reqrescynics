const express=require("express");
const router=express.Router();
const {requireSignin,isAuth}=require("../controllers/auth");
const {userById,addNotes}=require("../controllers/user");
const {create}=require("../controllers/notes");


router.post("/note/create/:userId",requireSignin,isAuth,addNotes,create);

router.param("userId",userById);




module.exports=router;
