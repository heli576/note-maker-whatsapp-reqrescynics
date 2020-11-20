const Note=require("../models/notes");
const {errorHandler}=require("../helpers/dbErrorHandler");

exports.create=(req,res)=>{
req.body.user=req.profile;
//console.log(req.body.user);
const note=new Note(req.body);
//console.log(note);
note.save((error,data)=>{
  if(error){
    return res.status(400).json({
      error:errorHandler(error)
    })
  }

  res.json(data);
})


};
