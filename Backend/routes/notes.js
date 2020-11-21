const express=require("express");
const router=express.Router();
const {requireSignin,isAuth}=require("../controllers/auth");
const {userById,addNotes,addPinNotes}=require("../controllers/user");
const {create,remove,noteById}=require("../controllers/notes");


router.post("/note/create/:userId",requireSignin,isAuth,addNotes,create);
router.post("/pinnote/:noteId/:userId",requireSignin,isAuth,addPinNotes);
router.delete("/note/:noteId/:userId",requireSignin,isAuth,remove);

router.param("userId",userById);
router.param("noteId",noteById);




module.exports=router;
