const express=require("express");
const router=express.Router();

const {requireSignin,isAuth}=require("../controllers/auth");

const {userById,getNotes}=require("../controllers/user");

router.get("/notes/by/user/:userId",requireSignin,isAuth,getNotes);

router.param("userId",userById);

module.exports=router;
