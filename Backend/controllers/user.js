const User=require("../models/user");
const Note= require('../models/notes');
const { errorHandler } = require('../helpers/dbErrorHandler');
exports.userById=(req,res,next,id)=>{
  User.findById(id).exec((err,user)=>{
    if(err||!user){
      return res.status(400).json({
        error:"User not found"
      })
    }
    req.profile=user;
    next();
  });
};

exports.addNotes=(req,res,next)=>{
  let history=[];
  const note=new Note(req.body);
//console.log(note);
history.push(note);
User.findOneAndUpdate({_id:req.profile._id},{$push:{history:history}},{new:true},(error,data)=>{
  if(error){
    return res.status(400).json({
      error:"Could not update history."
    })
  }
  next();
})

}

exports.getNotes=(req,res)=>{
  Note.find({user:req.profile._id})
  .populate('user','_id username')
  .exec((err,notes)=>{
    if(err){
      return res.status(400).json({
        error:errorHandler(err)
      })
    }
    res.json(notes);
  })
}
