const Note=require("../models/notes");
const {errorHandler}=require("../helpers/dbErrorHandler");

exports.noteById=(req,res,next,id)=>{
  Note.findById(id)
  .exec((err,note)=>{
    if(err||!note){
      return res.status(400).json({error:"Note not found"});
    }
    req.note=note;
    next();
  });
};

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

exports.remove=(req,res)=>{
  let note=req.note;
  note.remove((err,deletedNote)=>{
    if(err){
      return res.status(400).json({error:errorHandler(err)});
    }
    res.json({message:"Note deleted successfully"});

  });
};
