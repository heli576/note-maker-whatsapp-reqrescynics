const express=require("express");
const router=express.Router();

// required controller methods
const {
  signup,
  signin,
  signout,
  requireSignin
}=require("../controllers/auth");
const {userSignupValidator}=require("../validator");


router.post("/signup",userSignupValidator,signup);

//authentication routes
router.post("/signin",signin);
router.get("/signout",signout);



module.exports=router;
