const express=require("express");
const router=express.Router();

// required controller methods
const {
  signin,
  signout,
  requireSignin
}=require("../controllers/auth");
const {userSignupValidator}=require("../validator");

//authentication routes
router.post("/signin",signin);
router.get("/signout",signout);



module.exports=router;
