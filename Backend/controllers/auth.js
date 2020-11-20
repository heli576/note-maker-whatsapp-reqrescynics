const User=require("../models/user");
const jwt=require("jsonwebtoken");//generate signed token
const expressJwt=require("express-jwt");//authorization check
const {errorHandler}=require("../helpers/dbErrorHandler");



// using promise
/*exports.signup = (req, res) => {
    // console.log("req.body", req.body);
    const user = new User(req.body);
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                // error: errorHandler(err)
                error: 'Username is taken'
            });
        }
        user.salt = undefined;
        user.hashed_password = undefined;
        res.json({
            user
        });
    });
};*/

exports.signin=(req,res)=>{
  //find user based on username
  const {username,password}=req.body;
  User.findOne({username},(err,user)=>{
    if(err||!user){
      return res.status(400).json({error:"Username does not exist"});
    }
    //validate if user matches
    //create authenticate method in user model
    if(!user.authenticate(password)){
      return res.status(401).json({error:"Username and password don't match"});
    }

    //generate a signed token with user id
    const token=jwt.sign({_id:user._id},process.env.JWT_SECRET);
    res.cookie("t",token,{expire:new Date()+9999})
    const {_id,username}=user;
    return res.json({token,user:{_id,username}})

  });
};

exports.signout=(req,res)=>{
  res.clearCookie("t")
  res.json({message:"Signout successfully"});
};

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"], // added later
  userProperty: "auth",
});
