const express=require("express");
const router=express.Router();

const {requireSignin,isAuth}=require("../controllers/auth");

const {userById,getNotes,getPinNotes}=require("../controllers/user");

router.get("/notes/by/user/:userId",requireSignin,isAuth,getNotes);
router.get("/pinnotes/by/user/:userId",requireSignin,isAuth,getPinNotes);

router.param("userId",userById);

module.exports=router;
